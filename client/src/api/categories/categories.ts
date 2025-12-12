import { catchError } from "../catchError";
import api from "../api";

export async function handleGetAllCategories() {
    try {
        const res = await api.get(`categories/get-all-categories`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
