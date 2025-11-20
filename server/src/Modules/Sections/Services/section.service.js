import coursesModel from "../../../DB/Models/courses.model.js";
import fs from "fs";
import path from "path";

export const createSection = async (req, res) => {
  const { courseId } = req.params;
  const { section } = req.body;

  if (!courseId) {
    return res.status(401).json({
      message: "Course id is Required",
    });
  }

  const course = await coursesModel.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unauthorized, you are not the instructor of this course",
    });
  }

  course.content.push({ section, lessons: [] });
  await course.save();

  return res.json({ message: "Section added", course });
};

export const updateSection = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const { section } = req.body;

  if (!courseId || !sectionId) {
    return res.status(401).json({
      message: "Course id & sectionId are Required",
    });
  }

  const course = await coursesModel.findOneAndUpdate(
    { _id: courseId, "content._id": sectionId },
    { $set: { "content.$.section": section } },
    { new: true }
  );

  if (!course) return res.status(404).json({ message: "Section not found" });

  return res.json({ message: "Section updated", course });
};

export const deleteSection = async (req, res) => {
  const { courseId, sectionId } = req.params;

  const course = await coursesModel.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unauthorized, you are not the instructor of this course",
    });
  }

  const section = course.content.id(sectionId);
  if (!section) {
    return res.status(404).json({ message: "Section not found" });
  }

  section.lessons.forEach((lesson) => {
    if (lesson.link) {
      const filePath = path.resolve(lesson.link);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Failed to delete video:", err.message);
        }
      });
    }
  });

  await coursesModel.findByIdAndUpdate(
    courseId,
    {
      $pull: { content: { _id: sectionId } },
    },
    { new: true }
  );

  return res.json({
    message: "Section and all its lessons (with videos) deleted",
  });
};
