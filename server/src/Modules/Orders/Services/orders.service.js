import ordersModel from "../../../DB/Models/orders.modle.js";
import coursesModel from "../../../DB/Models/courses.model.js";
import { ORDER_STATUS } from "../../../Constants/constants.js";

export const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const { student_ID, course_IDs, amount, currency, payment_intent_id } =
            req.body;
        const userId = req.user.id;

        // Validate that the student_ID matches the authenticated user
        if (student_ID !== userId) {
            return res.status(403).json({
                message: "You can only create orders for yourself",
            });
        }

        // Validate that course_IDs is an array and not empty
        if (!Array.isArray(course_IDs) || course_IDs.length === 0) {
            return res.status(400).json({
                message: "At least one course must be provided",
            });
        }

        // Check if all courses exist
        const courses = await coursesModel.find({ _id: { $in: course_IDs } });
        if (courses.length !== course_IDs.length) {
            return res.status(404).json({
                message: "One or more courses not found",
            });
        }

        // Check if user already has orders for any of these courses
        const existingOrders = await ordersModel.findOne({
            student_ID: userId,
            course_IDs: { $in: course_IDs },
            status: { $in: [ORDER_STATUS.PENDING, ORDER_STATUS.COMPLETED] },
        });

        if (existingOrders) {
            return res.status(400).json({
                message:
                    "You already have an order for one or more of these courses",
                order: existingOrders,
            });
        }

        // Calculate total amount from courses with discounts and validate
        const totalAmount = courses.reduce((sum, course) => {
            const priceAfterDiscount =
                course.discount && course.discount !== 0
                    ? course.price - (course.price * course.discount) / 100
                    : course.price;
            return sum + priceAfterDiscount;
        }, 0);
        if (amount !== totalAmount) {
            return res.status(400).json({
                message: "Amount does not match total course price",
                expectedAmount: totalAmount,
                providedAmount: amount,
            });
        }

        // Create the order
        const order = await ordersModel.create({
            student_ID: userId,
            course_IDs: course_IDs,
            amount: amount,
            payment_intent_id: payment_intent_id,
            status: ORDER_STATUS.PENDING,
        });

        // Populate the order with course and student details
        const populatedOrder = await ordersModel
            .findById(order._id)
            .populate("course_IDs", "title subTitle image price")
            .populate("student_ID", "firstName lastName email");

        res.status(201).json({
            message: "Order created successfully",
            order: populatedOrder,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            message: "Failed to create order",
            error: error.message,
        });
    }
};

export const getOrdersByStudent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, status } = req.query;

        // Build query
        const query = { student_ID: userId };
        if (status) {
            query.status = status;
        }

        const orders = await ordersModel
            .find(query)
            .populate("course_IDs", "title subTitle image price")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await ordersModel.countDocuments(query);

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalOrders: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await ordersModel
            .findOne({
                _id: orderId,
                student_ID: userId,
            })
            .populate("course_IDs", "title subTitle image price description")
            .populate("student_ID", "firstName lastName email");

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(200).json({
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({
            message: "Failed to fetch order",
            error: error.message,
        });
    }
};
