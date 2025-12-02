import axios from "axios";

import { catchError } from "../catchError";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleGetAllCategories() {
    try {
        const res = await axios.get(`${BASE_URL}categories/get-all-categories`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
