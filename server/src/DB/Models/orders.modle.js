import mongoose from "mongoose";
import { ORDER_STATUS } from "../../Constants/constants.js";

const orderSchema = new mongoose.Schema(
    {
        student_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course_IDs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            },
        ],

        amount: { type: Number, required: true },

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING,
        },

        payment_intent_id: { type: String, required: true },
        payment_method: {
            type: String,
            default: "card",
        },

        coupon_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    },
    { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
