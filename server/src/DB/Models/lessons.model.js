import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    section_ID: mongoose.Schema.Types.ObjectId,

    title: { type: String, required: true },
    description: String,

    link: String,
    duration: Number,

    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
