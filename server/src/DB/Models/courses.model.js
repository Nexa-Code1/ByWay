import mongoose from "mongoose";
import { COURSE_STATUS } from "../../Constants/constants.js";
import { v2 as cloudinary } from "cloudinary";
import lessonModel from "../Models/lessons.model.js";
import wishlistModel from "../Models/wishlist.model.js";
import cartModel from "../Models/cart.model.js";

const courseSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        rate: { type: Number, default: 0 },

        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        description: { type: String, required: true },
        requirements: { type: [String], required: true },

        content: [
            {
                sectionID: mongoose.Schema.Types.ObjectId,
                section: { type: String, required: true },
                lessons: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
                ],
            },
        ],

        status: {
            type: String,
            enum: Object.values(COURSE_STATUS),
            default: COURSE_STATUS.DRAFT,
        },

        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },

        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        isFavourite: { type: Boolean, default: false },
        progress: { type: Number, default: 0 },
    },
    { timestamps: true },
);

const getPublicId = (url) => {
    if (!url) return null;

    const parts = url.split("/");
    const file = parts[parts.length - 1];

    return file.split(".")[0];
};

courseSchema.pre("findOneAndDelete", async function (next) {
    try {
        const course = await this.model
            .findOne(this.getQuery())
            .populate("content.lessons");

        if (!course) return next();

        if (course.image) {
            const publicId = getPublicId(course.image);

            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        for (const section of course.content) {
            for (const lesson of section.lessons) {
                if (lesson?.link) {
                    const publicId = getPublicId(lesson.link);

                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId, {
                            resource_type: "video",
                        });
                    }
                }

                await lessonModel.findByIdAndDelete(lesson._id);
            }
        }

        await wishlistModel.deleteMany({
            course_ID: course._id,
        });
        await cartModel.updateMany(
            {},
            { $pull: { courses: { course: course._id } } },
        );

        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
