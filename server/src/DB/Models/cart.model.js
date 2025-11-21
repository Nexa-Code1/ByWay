import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    student_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    courses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        quantity: { type: Number, default: 1 },
        totalPrice: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
