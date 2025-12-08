import axios from "axios";
import { catchError } from "../catchError";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleAddToWishlist(token: string, courseId: string) {
    try {
        const res = await axios.post(
            `${BASE_URL}wishlist/add-to-wishlist/${courseId}`,
            undefined,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteFromWishlist(
    token: string,
    courseId: string
) {
    try {
        const res = await axios.delete(
            `${BASE_URL}wishlist/delete-from-wishlist/${courseId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetMyWishlist(token: string) {
    try {
        const res = await axios.get(`${BASE_URL}wishlist/my-wishlist`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
