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
