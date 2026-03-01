import lessonsModel from "../../../DB/Models/lessons.model.js";
import coursesModel from "../../../DB/Models/courses.model.js";

export const validateCourseImage = (req, isUpdate = false) => {
    const imageFile = req.files?.image?.[0] || req.file; // Handle both structures
    if (!isUpdate && !imageFile) {
        return { isValid: false, message: "Course image is required" };
    }
    return { isValid: true, imageUrl: imageFile?.fullUrl };
};

export const parseCourseData = (requirements, courseContent) => {
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

export const validateCourseContent = (parsedCourseContent) => {
    if (!parsedCourseContent || !Array.isArray(parsedCourseContent)) {
        return {
            isValid: false,
            message: "Course content must be an array of sections",
        };
    }
    return { isValid: true };
};

export const validateSectionAndLessons = (sectionData) => {
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

export const processLesson = async (
    lessonData,
    courseId,
    videoFileMap = null,
) => {
    let lesson;

    // Determine video URL from uploaded files or existing data
    let videoUrl = lessonData.videoUrl || "";
    let duration = lessonData.duration || 0;

    // If we have video files and the videoUrl is a filename, try to find the uploaded file
    if (videoFileMap && videoUrl && typeof videoUrl === "string") {
        // Check if the videoUrl matches any uploaded file's original name
        const uploadedFile = videoFileMap.get(videoUrl);

        if (uploadedFile) {
            videoUrl = uploadedFile.fullUrl;
            // Use duration from uploaded file if available
            if (
                uploadedFile.duration !== undefined &&
                uploadedFile.duration !== null
            ) {
                duration = uploadedFile.duration;
            }
        }
    }

    // If lesson has an ID, try to find existing lesson first
    if (lessonData._id) {
        lesson = await lessonsModel.findById(lessonData._id);

        if (lesson && lesson.course_Id.toString() === courseId.toString()) {
            lesson.title = lessonData.title;
            lesson.description = lessonData.description || "";
            lesson.link = videoUrl || lesson.link;
            // Only update duration if we have a new video with duration
            if (duration !== 0) {
                lesson.duration = duration;
            }
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
                link: videoUrl,
                duration,
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
            link: videoUrl,
            duration,
        });
        return lesson;
    }
};

export const processCourseContent = async (
    courseContent,
    courseId,
    videoFiles = [],
) => {
    const processedContent = [];
    const newLessonIds = [];

    // Create a map of video files by their original filename for easy lookup
    const videoFileMap = new Map();
    if (videoFiles && Array.isArray(videoFiles)) {
        videoFiles.forEach((file) => {
            // Use the original filename as the key
            const originalName = file.originalname;
            videoFileMap.set(originalName, file);
        });
    }

    for (const sectionData of courseContent) {
        const validation = validateSectionAndLessons(sectionData);
        if (!validation.isValid) {
            return { isValid: false, message: validation.message };
        }

        const sectionLessons = [];

        // Process lessons for this section
        if (sectionData.lessons && Array.isArray(sectionData.lessons)) {
            for (const lessonData of sectionData.lessons) {
                const lesson = await processLesson(
                    lessonData,
                    courseId,
                    videoFileMap,
                );
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

export const updateLessonSectionIds = async (courseContent) => {
    for (let i = 0; i < courseContent.length; i++) {
        const section = courseContent[i];
        await lessonsModel.updateMany(
            { _id: { $in: section.lessons } },
            { section_ID: section._id },
        );
    }
};

export const getPopulatedCourse = async (courseId) => {
    return await coursesModel.findById(courseId).populate([
        { path: "category", select: "name slug" },
        { path: "instructor", select: "firstName lastName headLine bio image" },
        {
            path: "content.lessons",
            select: "section_ID title description link duration isCompleted",
        },
    ]);
};
