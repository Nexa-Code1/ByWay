import type { IBuyCourseIntentOptions } from "@/types";
import api from "../api";
import { catchError } from "../catchError";

export async function handleBuyCourseIntent(
    coursesIds: string[],
    options: IBuyCourseIntentOptions
) {
    try {
        const res = await api.post(`payment/buy-course-intent`, {
            coursesIds,
            options,
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleCreateSetupIntent() {
    try {
        const res = await api.post(`payment/create-setup-intent`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleAddPaymentMethod(paymentMethodId: string) {
    try {
        const res = await api.post(`payment/add-payment-method`, {
            pm_id: paymentMethodId,
        });

        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleRemovePaymentMethod(paymentMethodId: string) {
    try {
        const res = await api.delete(
            `payment/remove-payment-method/${paymentMethodId}`
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export const handleGetPaymentMethods = async () => {
    try {
        const res = await api.get(`payment/payment-methods`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
};
