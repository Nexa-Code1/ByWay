import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        views: { type: Number, default: 0 },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
