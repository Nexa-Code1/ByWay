import coursesModel from "../../../DB/Models/courses.model.js";
import categoryModel from "../../../DB/Models/categories.model.js";
import { COURSE_STATUS } from "../../../Constants/constants.js";
import cartModel from "../../../DB/Models/cart.model.js";
import wishlistModel from "../../../DB/Models/wishlist.model.js";
import enrollmentModel from "../../../DB/Models/enrollments.modle.js";
import {
    validateCourseImage,
    parseCourseData,
    validateCourseContent,
    processCourseContent,
    updateLessonSectionIds,
    getPopulatedCourse,
} from "../Helpers/course.helpers.js";
import lessonsModel from "../../../DB/Models/lessons.model.js";
import {
    deleteFileFromCloudinary,
    deleteMultipleFilesFromCloudinary,
} from "../../../Utils/fileUtils.js";

export const createCourseWithContent = async (req, res) => {
    const { id } = req.user;
    const {
        title,
        subTitle,
        price,
        description,
        requirements,
        category,
        courseContent,
    } = req.body;

    // Validate image
    const imageValidation = validateCourseImage(req);
    if (!imageValidation.isValid) {
        return res.status(400).json({ message: imageValidation.message });
    }

    // Parse and validate data
    const parsedData = parseCourseData(requirements, courseContent);
    if (!parsedData.isValid) {
        return res.status(400).json({ message: parsedData.message });
    }

    const contentValidation = validateCourseContent(
        parsedData.parsedCourseContent,
    );
    if (!contentValidation.isValid) {
        return res.status(400).json({ message: contentValidation.message });
    }

    // Create course with draft status
    const course = await coursesModel.create({
        title,
        subTitle,
        instructor: id,
        content: [],
        price,
        description,
        requirements: parsedData.parsedRequirements,
        category,
        image: imageValidation.imageUrl,
        status: COURSE_STATUS.DRAFT,
    });

    // Process course content with video files
    const videoFiles = req.files?.videos || [];
    const contentResult = await processCourseContent(
        parsedData.parsedCourseContent,
        course._id,
        videoFiles,
    );
    if (!contentResult.isValid) {
        return res.status(400).json({ message: contentResult.message });
    }

    // Update course with processed content
    course.content = contentResult.processedContent;
    await course.save();

    // Update lesson section_IDs
    await updateLessonSectionIds(course.content);

    // Get populated course for response
    const populatedCourse = await getPopulatedCourse(course._id);

    res.status(201).json({
        message: "Course created successfully with content",
        course: populatedCourse,
    });
};

export const updateCourseWithContent = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        subTitle,
        price,
        description,
        requirements,
        category,
        courseContent,
    } = req.body;

    // Find and validate course ownership
    const course = await coursesModel.findById(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized, you are not the instructor of this course",
        });
    }

    // Validate image (optional for updates)
    const imageValidation = validateCourseImage(req, true);
    const imageUrl = imageValidation.imageUrl || course.image;

    // Parse and validate data
    const parsedData = parseCourseData(requirements, courseContent);
    if (!parsedData.isValid) {
        return res.status(400).json({ message: parsedData.message });
    }

    // Update basic course information
    const updateData = {
        title,
        subTitle,
        price,
        description,
        requirements: parsedData.parsedRequirements,
        category,
        image: imageUrl,
    };

    // Handle content updates if provided
    if (
        parsedData.parsedCourseContent &&
        Array.isArray(parsedData.parsedCourseContent)
    ) {
        // Get current lessons for cleanup
        const currentLessonIds = [];
        course.content.forEach((section) => {
            currentLessonIds.push(...section.lessons);
        });

        // Process new content with video files
        const videoFiles = req.files?.videos || [];
        const contentResult = await processCourseContent(
            parsedData.parsedCourseContent,
            course._id,
            videoFiles,
        );
        if (!contentResult.isValid) {
            return res.status(400).json({ message: contentResult.message });
        }

        // Delete lessons that are no longer in the content and their associated assets
        const lessonsToDelete = currentLessonIds.filter(
            (lessonId) =>
                !contentResult.newLessonIds.some(
                    (id) => id.toString() === lessonId.toString(),
                ),
        );

        // Collect asset URLs for deletion
        const assetUrlsToDelete = [];

        for (const lessonId of lessonsToDelete) {
            const lesson = await lessonsModel.findById(lessonId);
            if (lesson && lesson.link) {
                assetUrlsToDelete.push(lesson.link);
            }
            await lessonsModel.findByIdAndDelete(lessonId);
        }

        // Delete assets from Cloudinary with logging
        if (assetUrlsToDelete.length > 0) {
            console.log(
                "Attempting to delete video assets:",
                assetUrlsToDelete,
            );
            const deletionResult =
                await deleteMultipleFilesFromCloudinary(assetUrlsToDelete);
            console.log("Video deletion result:", deletionResult);
        }

        updateData.content = contentResult.processedContent;
    }

    // Update course
    await coursesModel.updateOne({ _id: id }, updateData);

    // Update lesson section_IDs if content was updated
    if (
        parsedData.parsedCourseContent &&
        Array.isArray(parsedData.parsedCourseContent)
    ) {
        const updatedCourse = await coursesModel.findById(id);
        await updateLessonSectionIds(updatedCourse.content);
    }

    // Get updated course with populated data
    const updatedCourse = await getPopulatedCourse(id);

    res.status(200).json({
        message: "Course updated successfully with content",
        course: updatedCourse,
    });
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    const course = await coursesModel.findById(id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    // Collect all asset URLs for deletion
    const assetUrlsToDelete = [];

    // Add course image if it exists
    if (course.image) {
        assetUrlsToDelete.push(course.image);
    }

    // Get all lessons and collect their video URLs
    const allLessonIds = [];
    course.content.forEach((section) => {
        allLessonIds.push(...section.lessons);
    });

    if (allLessonIds.length > 0) {
        const lessons = await lessonsModel.find({ _id: { $in: allLessonIds } });
        lessons.forEach((lesson) => {
            if (lesson.link) {
                assetUrlsToDelete.push(lesson.link);
            }
        });
    }

    // Delete the course from database
    await coursesModel.findByIdAndDelete(id);

    // Delete all lessons
    if (allLessonIds.length > 0) {
        await lessonsModel.deleteMany({ _id: { $in: allLessonIds } });
    }

    // Delete assets from Cloudinary with logging
    if (assetUrlsToDelete.length > 0) {
        console.log("Attempting to delete course assets:", assetUrlsToDelete);

        const deletionResult =
            await deleteMultipleFilesFromCloudinary(assetUrlsToDelete);
        console.log("Asset deletion result:", deletionResult);
    } else {
        console.log("No assets found to delete for course:", id);
    }

    res.status(200).json({
        message: "Course deleted successfully",
    });
};

export const getCourseDetails = async (req, res) => {
    const { id } = req.params;

    const course = await coursesModel.findById(id).populate([
        { path: "category", select: "name slug" },
        { path: "instructor", select: "firstName lastName headLine bio image" },
        {
            path: "content.lessons",
            select: "section_ID title description link duration isCompleted",
        },
    ]);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    let isInCart = false;
    let isFavourite = false;

    if (!req.isGuest) {
        const cart = await cartModel.findOne({ student_ID: req.user.id });
        isInCart = cart
            ? cart.courses.some((c) => c.course.toString() === id)
            : false;

        const wishlist = await wishlistModel.findOne({
            student_ID: req.user.id,
            course_ID: id,
        });

        isFavourite = Boolean(wishlist);
    }

    res.status(200).json({
        message: "Course details fetched successfully",
        course: {
            ...course.toObject(),
            isInCart,
            isFavourite,
        },
    });
};

export const getAllCourses = async (req, res) => {
    const { price, category, title, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    if (price) {
        if (price.includes("-")) {
            const [min, max] = price.split("-");
            query.price = { $gte: Number(min), $lte: Number(max) };
        } else {
            query.price = Number(price);
        }
    }

    if (category) {
        const foundCategory = await categoryModel.findOne({ slug: category });

        if (!foundCategory) {
            return res.status(400).json({
                message: "Invalid category slug",
                category,
            });
        }

        query.category = foundCategory._id;
    }

    if (title) {
        query.title = { $regex: title, $options: "i" };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let courses = await coursesModel
        .find(query)
        .populate([
            { path: "category", select: "name slug" },
            { path: "instructor", select: "firstName lastName email image" },
            {
                path: "content.lessons",
                select: "section_ID title description link duration isCompleted",
            },
        ])
        .select("title subTitle image price discount category instructor rate");

    // Sorting
    if (sort) {
        const [field, order] = sort.split("-");
        const sortValue = order === "desc" ? -1 : 1;

        if (field === "price") {
            courses = courses.sort((a, b) => (a.price - b.price) * sortValue);
        }

        if (field === "time") {
            courses = courses.sort(
                (a, b) =>
                    (new Date(a.createdAt) - new Date(b.createdAt)) * sortValue,
            );
        }

        if (field === "rate") {
            courses = courses.sort((a, b) => (a.rate - b.rate) * sortValue);
        }
    }

    const totalCourses = courses.length;
    const paginatedCourses = courses.slice(skip, skip + limitNumber);
    let paginatedCoursesWithFlags = paginatedCourses;

    if (!req.isGuest) {
        const cart = await cartModel.findOne({ student_ID: req.user.id });
        const cartCoursesIds = cart
            ? cart.courses.map((c) => c.course.toString())
            : [];

        const wishlist = await wishlistModel.find({ student_ID: req.user.id });
        const wishlistCourseIds = wishlist.map((w) => w.course_ID.toString());

        paginatedCoursesWithFlags = paginatedCourses.map((c) => ({
            ...c.toObject(),
            isInCart: cartCoursesIds.includes(c._id.toString()),
            isFavourite: wishlistCourseIds.includes(c._id.toString()),
        }));
    }

    res.status(200).json({
        message: "Courses fetched successfully",
        courses: paginatedCoursesWithFlags,
        pagination: {
            total: totalCourses,
            totalPages: Math.ceil(totalCourses / limitNumber),
            currentPage: pageNumber,
            nextPage:
                pageNumber * limitNumber < totalCourses ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        },
    });
};

export const publishCourse = async (req, res) => {
    const { id } = req.params;

    const course = await coursesModel.findById(id).populate([
        { path: "category", select: "name slug" },
        { path: "instructor", select: "firstName lastName headLine bio image" },
    ]);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor._id.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized, you are not the instructor of this course",
        });
    }

    // Validate course has content
    if (!course.content || course.content.length === 0) {
        return res.status(400).json({
            message: "Course must have at least one section to be published",
        });
    }

    // Get all lesson IDs from course content
    const allLessonIds = [];
    for (const section of course.content) {
        if (!section.lessons || section.lessons.length === 0) {
            return res.status(400).json({
                message: `Section "${section.section}" must have at least one lesson to be published`,
            });
        }
        allLessonIds.push(...section.lessons);
    }

    // Fetch all lessons in one query
    const lessons = await lessonsModel.find({ _id: { $in: allLessonIds } });

    // Validate all lessons have required content
    for (const section of course.content) {
        for (const lessonId of section.lessons) {
            const lesson = lessons.find(
                (l) => l._id.toString() === lessonId.toString(),
            );
            if (lesson && (!lesson.title || !lesson.link)) {
                return res.status(400).json({
                    message:
                        "All lessons must have a title and video content before publishing",
                });
            }
        }
    }

    await coursesModel.updateOne(
        { _id: id },
        { status: COURSE_STATUS.PUBLISHED },
    );

    res.status(200).json({ message: "Course published successfully" });
};

export const getInstructorCourses = async (req, res) => {
    const { instructorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    let statusFilter = {};

    if (req.user?.id !== instructorId || req.isGuest) {
        statusFilter.status = COURSE_STATUS.PUBLISHED;
    }

    if (req.user?.id === instructorId && req.query.status) {
        statusFilter.status = req.query.status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const query = {
        instructor: instructorId,
        ...statusFilter,
    };

    const totalCourses = await coursesModel.countDocuments(query);

    const courses = await coursesModel
        .find(query)
        .populate([{ path: "category", select: "name slug" }])
        .skip(skip)
        .limit(limitNumber);

    res.status(200).json({
        message: "Courses fetched successfully",
        courses,
        pagination: {
            total: totalCourses,
            totalPages: Math.ceil(totalCourses / limitNumber),
            currentPage: pageNumber,
            nextPage:
                pageNumber * limitNumber < totalCourses ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        },
    });
};

export const getStudentCourses = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const studentId = req.user.id;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    try {
        // Get all enrollments for this student to verify course purchases
        const enrollments = await enrollmentModel
            .find({
                student_ID: studentId,
            })
            .populate("course_ID");

        if (!enrollments || enrollments.length === 0) {
            return res.status(200).json({
                message: "No purchased courses found",
                courses: [],
                pagination: {
                    total: 0,
                    totalPages: 0,
                    currentPage: pageNumber,
                    nextPage: null,
                    prevPage: null,
                },
            });
        }

        // Extract course IDs from enrollments
        const courseIds = enrollments.map(
            (enrollment) => enrollment.course_ID._id,
        );

        // Get total count for pagination
        const totalCourses = await coursesModel.countDocuments({
            _id: { $in: courseIds },
            status: COURSE_STATUS.PUBLISHED,
        });

        // Get paginated courses
        const courses = await coursesModel
            .find({
                _id: { $in: courseIds },
                status: COURSE_STATUS.PUBLISHED,
            })
            .populate([{ path: "category", select: "name slug" }])
            .select("image title category progress")
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 });

        // Add enrollment date to each course
        const coursesWithEnrollmentDate = courses.map((course) => {
            const enrollment = enrollments.find(
                (e) => e.course_ID._id.toString() === course._id.toString(),
            );

            return {
                ...course.toObject(),
                enrolledAt: enrollment.createdAt,
                progress: course.progress || 0,
            };
        });

        res.status(200).json({
            message: "Student courses fetched successfully",
            courses: coursesWithEnrollmentDate,
            pagination: {
                total: totalCourses,
                totalPages: Math.ceil(totalCourses / limitNumber),
                currentPage: pageNumber,
                nextPage:
                    pageNumber * limitNumber < totalCourses
                        ? pageNumber + 1
                        : null,
                prevPage: pageNumber > 1 ? pageNumber - 1 : null,
            },
        });
    } catch (error) {
        console.error("Error fetching student courses:", error);
        res.status(500).json({
            message: "Internal server error while fetching student courses",
            error: error.message,
        });
    }
};
