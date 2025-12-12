import api from "../api";
import { catchError } from "../catchError";

export async function handleAddToWishlist(courseId: string) {
    try {
        const res = await api.post(`wishlist/add-to-wishlist/${courseId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteFromWishlist(courseId: string) {
    try {
        const res = await api.delete(
            `wishlist/delete-from-wishlist/${courseId}`
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetMyWishlist() {
    try {
        const res = await api.get(`wishlist/my-wishlist`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
