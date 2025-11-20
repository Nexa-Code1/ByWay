import coursesModel from "../../../../DB/Models/courses.model.js";
import lessonsModel from "../../../../DB/Models/lessons.model.js";
import { getVideoDurationInSeconds } from "get-video-duration";
import fs from "fs";

export const createLesson = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const { title, description } = req.body;

  const videoPath = req.file ? req.file.path : null;

  const videoURL =
    `${req.protocol}://${req.get("host")}/` + videoPath.replace(/\\/g, "/");

  if (!videoPath) {
    return res.status(400).json({ message: "Video is required" });
  }
  const durationInSeconds = await getVideoDurationInSeconds(videoPath);

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
  const { title, description } = req.body;

  const course = await coursesModel.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const section = course.content.id(sectionId);
  if (!section) return res.status(404).json({ message: "Section not found" });

  const lesson = await lessonsModel.findById(lessonId);
  if (!lesson) return res.status(404).json({ message: "Lesson not found" });

  let videoURL = lesson.link;
  let durationInSeconds = lesson.duration;

  if (req.file) {
    const videoPath = req.file.path;

    if (lesson.link) {
      const oldPath = lesson.link
        .replace(`${req.protocol}://${req.get("host")}/`, "")
        .replace(/\//g, "\\");
      fs.unlink(oldPath, (err) => {
        if (err) console.log("Failed to delete old video:", err);
      });
    }

    videoURL =
      `${req.protocol}://${req.get("host")}/` + videoPath.replace(/\\/g, "/");
    durationInSeconds = await getVideoDurationInSeconds(videoPath);
  }

  lesson.title = title;
  lesson.description = description;
  lesson.link = videoURL;
  lesson.duration = durationInSeconds;

  await lesson.save();

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
