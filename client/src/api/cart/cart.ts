import api from "../api";
import { catchError } from "../catchError";

export async function handleAddToCart(courseId: string) {
    try {
        const res = await api.post(`cart/add-to-cart/${courseId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetMyCart() {
    try {
        const res = await api.get(`cart/my-cart`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleRemoveCartItem(courseId: string) {
    try {
        const res = await api.delete(`cart/remove-from-cart/${courseId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleClearCart() {
    try {
        const res = await api.delete(`cart/clear-cart`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
