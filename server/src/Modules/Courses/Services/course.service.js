import coursesModel from "../../../DB/Models/courses.model.js";
import categoryModel from "../../../DB/Models/categories.model.js";
import { COURSE_STATUS } from "../../../Constants/constants.js";
import cartModel from "../../../DB/Models/cart.model.js";
import wishlistModel from "../../../DB/Models/wishlist.model.js";
import lessonsModel from "../../../DB/Models/lessons.model.js";

// START: Helper functions for create and udpate courses
const validateCourseImage = (req, isUpdate = false) => {
    if (!isUpdate && !req.file) {
        return { isValid: false, message: "Course image is required" };
    }
    return { isValid: true, imageUrl: req.file?.fullUrl };
};

const parseCourseData = (requirements, courseContent) => {
    let parsedRequirements = requirements;
    let parsedCourseContent = courseContent;

    try {
        if (typeof requirements === "string") {
            parsedRequirements = JSON.parse(requirements);
        }
        if (typeof courseContent === "string") {
            parsedCourseContent = JSON.parse(courseContent);
        }
    } catch (error) {
        return {
            isValid: false,
            message: "Invalid data format for requirements or courseContent",
        };
    }

    return { isValid: true, parsedRequirements, parsedCourseContent };
};

const validateCourseContent = (parsedCourseContent) => {
    if (!parsedCourseContent || !Array.isArray(parsedCourseContent)) {
        return {
            isValid: false,
            message: "Course content must be an array of sections",
        };
    }
    return { isValid: true };
};

const validateSectionAndLessons = (sectionData) => {
    if (!sectionData.section) {
        return {
            isValid: false,
            message: "Each section must have a section name",
        };
    }

    if (sectionData.lessons && Array.isArray(sectionData.lessons)) {
        for (const lessonData of sectionData.lessons) {
            if (!lessonData.title) {
                return {
                    isValid: false,
                    message: "Each lesson must have a title",
                };
            }
        }
    }

    return { isValid: true };
};

const processLesson = async (lessonData, courseId) => {
    let lesson;

    // If lesson has an ID, try to find existing lesson first
    if (lessonData._id) {
        lesson = await lessonsModel.findById(lessonData._id);

        if (lesson && lesson.course_Id.toString() === courseId.toString()) {
            lesson.title = lessonData.title;
            lesson.description = lessonData.description || "";
            lesson.link = lessonData.videoUrl || lesson.link;
            lesson.duration = lessonData.duration || lesson.duration;
            await lesson.save();
            return lesson;
        } else {
            // Create new lesson with the provided ID
            lesson = await lessonsModel.create({
                _id: lessonData._id, // Use the client-provided ID
                course_Id: courseId,
                section_ID: null, // Will be set after section is created
                title: lessonData.title,
                description: lessonData.description || "",
                link: lessonData.videoUrl || "",
                duration: lessonData.duration || 0,
            });
            return lesson;
        }
    } else {
        // Create new lesson without ID (generate new one)
        lesson = await lessonsModel.create({
            course_Id: courseId,
            section_ID: null, // Will be set after section is created
            title: lessonData.title,
            description: lessonData.description || "",
            link: lessonData.videoUrl || "",
            duration: lessonData.duration || 0,
        });
        return lesson;
    }
};

const processCourseContent = async (courseContent, courseId) => {
    const processedContent = [];
    const newLessonIds = [];

    for (const sectionData of courseContent) {
        const validation = validateSectionAndLessons(sectionData);
        if (!validation.isValid) {
            return { isValid: false, message: validation.message };
        }

        const sectionLessons = [];

        // Process lessons for this section
        if (sectionData.lessons && Array.isArray(sectionData.lessons)) {
            for (const lessonData of sectionData.lessons) {
                const lesson = await processLesson(lessonData, courseId);
                if (lesson) {
                    sectionLessons.push(lesson._id);
                    newLessonIds.push(lesson._id);
                }
            }
        }

        // Add section to course content
        processedContent.push({
            section: sectionData.section,
            _id: sectionData._id,
            lessons: sectionLessons,
        });
    }

    return { isValid: true, processedContent, newLessonIds };
};

const updateLessonSectionIds = async (courseContent) => {
    for (let i = 0; i < courseContent.length; i++) {
        const section = courseContent[i];
        await lessonsModel.updateMany(
            { _id: { $in: section.lessons } },
            { section_ID: section._id },
        );
    }
};

const getPopulatedCourse = async (courseId) => {
    return await coursesModel.findById(courseId).populate([
        { path: "category", select: "name slug" },
        { path: "instructor", select: "firstName lastName headLine bio image" },
        {
            path: "content.lessons",
            select: "section_ID title description link duration isCompleted",
        },
    ]);
};
// END:Helper functions for create and udpate courses

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

    // Process course content
    const contentResult = await processCourseContent(
        parsedData.parsedCourseContent,
        course._id,
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

        // Process new content
        const contentResult = await processCourseContent(
            parsedData.parsedCourseContent,
            course._id,
        );
        if (!contentResult.isValid) {
            return res.status(400).json({ message: contentResult.message });
        }

        // Delete lessons that are no longer in the content
        const lessonsToDelete = currentLessonIds.filter(
            (lessonId) =>
                !contentResult.newLessonIds.some(
                    (id) => id.toString() === lessonId.toString(),
                ),
        );

        for (const lessonId of lessonsToDelete) {
            await lessonsModel.findByIdAndDelete(lessonId);
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

    await coursesModel.findByIdAndDelete(id);

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
