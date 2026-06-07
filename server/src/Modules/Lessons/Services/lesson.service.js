import coursesModel from "../../../DB/Models/courses.model.js";
import lessonsModel from "../../../DB/Models/lessons.model.js";
import fs from "fs";
import { getVideoDuration } from "../../../Utils/video.helper.js";

export const createLesson = async (req, res) => {
    const { courseId, sectionId } = req.params;
    const { title, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Video is required" });
    }

    const videoURL = req.file.fullUrl;

    // Get duration (from Cloudinary, middleware, or request body)
    const durationInSeconds = await getVideoDuration(req.file.path);

    const course = await coursesModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.content.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const lesson = await lessonsModel.create({
        course_Id: courseId,
        section_ID: sectionId,
        title,
        description,
        link: videoURL,
        duration: durationInSeconds,
    });

    section.lessons.push(lesson._id);
    await course.save();

    return res.json({
        message: "Lesson created successfully",
        lesson,
    });
};

export const updateLesson = async (req, res) => {
    const { courseId, sectionId, lessonId } = req.params;
    const { title, description, isCompleted } = req.body;
    const userRole = req.user?.role;

    const course = await coursesModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.content.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const lesson = await lessonsModel.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // If user is a student, only allow updating isCompleted
    if (userRole === "student") {
        if (
            req.body.hasOwnProperty("title") ||
            req.body.hasOwnProperty("description") ||
            req.file
        ) {
            return res.status(403).json({
                message: "Students can only update isCompleted status",
            });
        }
        if (isCompleted !== undefined) lesson.isCompleted = isCompleted;
    } else {
        // Instructors can update all fields
        let videoURL = lesson.link;
        let durationInSeconds = lesson.duration;

        if (req.file) {
            if (videoURL) {
                fs.unlink(videoURL, (err) => {
                    if (err) console.log("Failed to delete old video:", err);
                });
            }

            videoURL = req.file.fullUrl;
            durationInSeconds = await getVideoDuration(req.file.path);
        }

        if (title !== undefined) lesson.title = title;
        if (description !== undefined) lesson.description = description;
        if (req.file) {
            lesson.link = videoURL;
            lesson.duration = durationInSeconds;
        }
    }

    await lesson.save();

    // Calculate and update course progress when a student updates lesson completion
    if (userRole === "student" && isCompleted !== undefined) {
        let totalLessons = 0;
        let completedLessons = 0;

        for (const section of course.content) {
            for (const lessonId of section.lessons) {
                totalLessons++;
                const lesson = await lessonsModel.findById(lessonId);
                if (lesson && lesson.isCompleted) {
                    completedLessons++;
                }
            }
        }

        const progress =
            totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;
        course.progress = progress;
        await course.save();
    }

    return res.json({ message: "Lesson updated successfully", lesson });
};

export const deleteLesson = async (req, res) => {
    const { lessonId } = req.params;

    const lesson = await lessonsModel.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (lesson.link) {
        const oldPath = lesson.link
            .replace(`${req.protocol}://${req.get("host")}/`, "")
            .replace(/\//g, "\\");
        fs.unlink(oldPath, (err) => {
            if (err) console.log("Failed to delete video:", err);
        });
    }

    await lessonsModel.findByIdAndDelete(lessonId);

    return res.json({ message: "Lesson deleted successfully" });
};

export const getLessonById = async (req, res) => {
    const { lessonId } = req.params;

    const lesson = await lessonsModel.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    return res.json({ lesson });
};

export const getFirstIncompleteLesson = async (req, res) => {
    const { courseId } = req.params;

    const course = await coursesModel.findById(courseId).populate({
        path: "content.lessons",
        model: lessonsModel,
    });

    if (!course) return res.status(404).json({ message: "Course not found" });

    for (const section of course.content) {
        for (const lessonId of section.lessons) {
            const lesson = await lessonsModel.findById(lessonId);
            if (lesson && !lesson.isCompleted) {
                return res.json({ lesson });
            }
        }
    }

    return res.status(404).json({ message: "No incomplete lessons found" });
};
