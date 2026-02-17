import DOMPurify from "dompurify";

import blogsModel from "../../../DB/Models/blogs.model.js";
import categoryModel from "../../../DB/Models/categories.model.js";
import cloudinary from "../../../Config/cloudinary.js";

// Create a new blog
export const createBlog = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized, please login!" });

    const { id: instructorId } = req.user;
    const { title, description, content, category } = req.body;

    // Check if image was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Blog image is required" });
    }

    // Get image URL from middleware (works for both local and Cloudinary)
    const imageUrl = req.file.fullUrl;

    // Validate category exists
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
    }

    // Sanitize blog content
    const cleanHtml = DOMPurify.sanitize(content, {
        USE_PROFILES: { html: true },
    });

    // Create the blog
    const blog = await blogsModel.create({
        title,
        description,
        content: cleanHtml,
        image: imageUrl,
        instructor: instructorId,
        category,
    });

    // Populate the blog with instructor and category details
    await blog.populate([
        { path: "instructor", select: "firstName lastName image" },
        { path: "category", select: "name" },
    ]);

    res.status(201).json({
        message: "Blog created successfully",
        data: blog,
    });
};

// Update blog
export const updateBlog = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized, please login!" });

    const { id } = req.params;
    const { id: instructorId } = req.user;
    const { title, description, content, category } = req.body;

    // Find the blog and check ownership
    const blog = await blogsModel.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is the owner of the blog
    if (blog.instructor.toString() !== instructorId) {
        return res
            .status(403)
            .json({ message: "You can only update your own blogs" });
    }

    // Validate category if provided
    if (category) {
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }
    }

    // Prepare update object
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;

    // Handle image update if provided
    if (req.file) {
        // Store old image URL for deletion
        const oldImageUrl = blog.image;
        updateData.image = req.file.fullUrl;

        // Delete old image from Cloudinary after successful update
        if (oldImageUrl && oldImageUrl !== req.file.fullUrl) {
            deleteImageFromCloudinary(oldImageUrl);
        }
    }

    // Update the blog
    const updatedBlog = await blogsModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate("instructor", "firstName lastName image")
        .populate("category", "name");

    res.status(200).json({
        message: "Blog updated successfully",
        data: updatedBlog,
    });
};

// Extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) {
        return null;
    }

    try {
        // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
        const urlParts = url.split("/");
        const uploadIndex = urlParts.findIndex((part) => part === "upload");

        if (uploadIndex === -1) return null;

        // Get everything after 'upload/' and remove the file extension
        const publicIdWithExtension = urlParts.slice(uploadIndex + 1).join("/");
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Remove file extension

        return publicId;
    } catch (error) {
        console.error("Error extracting public_id from URL:", error);
        return null;
    }
};

// Delete image from Cloudinary
const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        const publicId = extractPublicIdFromUrl(imageUrl);

        if (!publicId) {
            console.log(
                "Not a Cloudinary URL or unable to extract public_id:",
                imageUrl,
            );
            return;
        }

        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
    }
};

// Delete blog
export const deleteBlog = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized, please login!" });

    const { id } = req.params;
    const { id: instructorId } = req.user;

    // Find the blog and check ownership
    const blog = await blogsModel.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is the owner of the blog
    if (blog.instructor.toString() !== instructorId) {
        return res
            .status(403)
            .json({ message: "You can only delete your own blogs" });
    }

    // Store image URL for deletion
    const imageUrl = blog.image;

    // Delete the blog from database
    await blogsModel.findByIdAndDelete(id);

    // Delete image from Cloudinary (async, don't wait for completion)
    if (imageUrl) {
        deleteImageFromCloudinary(imageUrl);
    }

    res.status(200).json({
        message: "Blog deleted successfully",
    });
};

// Get all blogs (for authenticated users)
export const getAllBlogs = async (req, res) => {
    const { page = 1, limit = 10, category, search, sortBy } = req.query;

    // Build filter object
    const filter = {};

    // Filter by category if provided
    if (category) {
        const foundCategory = await categoryModel.findOne({ slug: category });

        if (!foundCategory) {
            return res.status(400).json({
                message: "Invalid category slug",
                category,
            });
        }

        filter.category = foundCategory._id;
    }

    // Search by title if provided
    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    // Determine sort order based on sortBy parameter
    let sortOptions = { createdAt: -1 }; // default: newest first only
    if (sortBy) {
        sortOptions = { views: -1, createdAt: -1 };
    }

    const blogs = await blogsModel
        .find(filter)
        .populate("instructor", "firstName lastName image")
        .populate("category", "name slug")
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await blogsModel.countDocuments(filter);

    res.status(200).json({
        message: "Blogs retrieved successfully",
        data: {
            blogs,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                total,
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            },
        },
    });
};

//  Get blog details by ID
export const getBlogDetails = async (req, res) => {
    const { id } = req.params;

    const blog = await blogsModel
        .findById(id)
        .populate("instructor", "firstName lastName image")
        .populate("category", "name slug");

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // Increment view count only if the viewer is not the blog creator
    const viewerId = req.user?.id;
    const isCreator = viewerId && blog.instructor._id.toString() === viewerId;

    if (!isCreator) {
        blog.views += 1;
        await blog.save();
    }

    res.status(200).json({
        message: "Blog details retrieved successfully",
        data: blog,
    });
};

// Get blogs by instructor
export const getInstructorBlogs = async (req, res) => {
    const { instructorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const blogs = await blogsModel
        .find({ instructor: instructorId })
        .populate("instructor", "firstName lastName image")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await blogsModel.countDocuments({ instructor: instructorId });

    res.status(200).json({
        message: "Instructor blogs retrieved successfully",
        data: {
            blogs,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                total,
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            },
        },
    });
};
