import s from "stripe";

import coursesModel from "../../../DB/Models/courses.model.js";

export const buyCourseIntent = async (req, res) => {
    const stripe = s(process.env.STRIPE_SECRET_KEY);
    try {
        const { coursesIds, options } = req.body;

        coursesIds.forEach(async (courseId) => {
            const course = await coursesModel.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
        });

        // CREATING PAYMENTINTENT FROM STRIPE
        const paymentIntent = await stripe.paymentIntents.create(options);

        res.status(200).json({
            message: "client secret created successfully",
            paymentIntent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create payment intent",
            error: error.message,
        });
    }
};

export const createSetupIntent = async (req, res) => {
    const stripe = s(process.env.STRIPE_SECRET_KEY);
    try {
        const { customer_id } = req.user;

        const customer = await stripe.customers.retrieve(customer_id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const setupIntent = await stripe.setupIntents.create({
            customer: customer_id,
            payment_method_types: ["card"],
        });

        res.status(200).json({
            message: "Setup intent was created successfully",
            clientSecret: setupIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const addPaymentMethod = async (req, res) => {
    const stripe = s(process.env.STRIPE_SECRET_KEY);
    try {
        const { pm_id } = req.body;
        const user = req.user;

        if (!pm_id) {
            return res
                .status(404)
                .json({ message: "Payment method not found" });
        }

        const paymentMethod = await stripe.paymentMethods.attach(pm_id, {
            customer: user.customer_id,
        });

        const fingerprint = paymentMethod.card?.fingerprint;
        if (!fingerprint)
            return res.status(404).json({ message: "fingerprint not found" });

        // Parse stripe_payment_methods if it's a string
        let stripe_payment_methods = user.stripe_payment_methods;
        if (typeof stripe_payment_methods === "string") {
            stripe_payment_methods = JSON.parse(stripe_payment_methods);
        }

        // Check if fingerprint is already exist
        const existingFingerpring = stripe_payment_methods.findIndex(
            (method) => method.fingerprint === fingerprint
        );

        if (existingFingerpring !== -1) {
            await stripe.paymentMethods.detach(pm_id);
            return res
                .status(401)
                .json({ message: "Payment method is already exist" });
        }

        // Updating stripe_payment_methods in user table
        const newPaymentMethodsArr = !stripe_payment_methods
            ? [{ pm_id, fingerprint }]
            : [...stripe_payment_methods, { pm_id, fingerprint }];

        const updatedUser = await usersModel.findById(user.id);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        updatedUser.stripe_payment_methods = newPaymentMethodsArr;
        await updatedUser.save();

        res.status(200).json({
            message: "Payment method was added successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removePaymentMethod = async (req, res) => {
    const stripe = s(process.env.STRIPE_SECRET_KEY);
    try {
        const { pmId } = req.params;

        if (!pmId) {
            return res
                .status(404)
                .json({ message: "Payment method not found" });
        }

        const detached = await stripe.paymentMethods.detach(pmId);

        // Parse stripe_payment_methods if it's a string
        let stripe_payment_methods = req.user.stripe_payment_methods;
        if (typeof stripe_payment_methods === "string") {
            stripe_payment_methods = JSON.parse(stripe_payment_methods);
        }

        // Find payment method id
        const paymentMethodId = stripe_payment_methods.find(
            (paymentMethod) => paymentMethod.pm_id === pmId
        );
        if (!paymentMethodId)
            return res
                .status(404)
                .json({ message: "Cannot find payment method" });

        const newPaymentMethodsArr = stripe_payment_methods.filter(
            (paymentMethod) => paymentMethod.pm_id !== pmId
        );

        const updatedUser = await usersModel.findById(user.id);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        updatedUser.stripe_payment_methods = newPaymentMethodsArr;
        await updatedUser.save();

        res.status(200).json({
            message: "Payment method was deleted successfully",
            paymentMethod: detached,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentMethods = async (req, res) => {
    const stripe = s(process.env.STRIPE_SECRET_KEY);
    try {
        const { customer_id } = req.user;

        if (!customer_id) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const customer = await stripe.customers.retrieve(customer_id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const paymentMethods = await stripe.paymentMethods.list({
            type: "card",
            customer: customer_id,
        });

        res.status(200).json({
            message: "Payment method fetched successfully",
            paymentMethods,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
