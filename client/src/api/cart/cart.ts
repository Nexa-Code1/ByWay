import axios from "axios";
import { catchError } from "../catchError";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleAddToCart(token: string, courseId: string) {
    try {
        const res = await axios.post(
            `${BASE_URL}cart/add-to-cart/${courseId}`,
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

export async function handleGetMyCart(token: string) {
    try {
        const res = await axios.get(`${BASE_URL}cart/my-cart`, {
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

export async function handleRemoveCartItem(token: string, courseId: string) {
    try {
        const res = await axios.delete(
            `${BASE_URL}cart/remove-from-cart/${courseId}`,
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

export async function handleClearCart(token: string) {
    try {
        const res = await axios.delete(`${BASE_URL}cart/clear-cart`, {
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
