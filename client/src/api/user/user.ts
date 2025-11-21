import axios from "axios";
import { catchError } from "../catchError";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleGetProfile(token: string) {
    try {
        const res = await axios.get(`${BASE_URL}users/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.user;
    } catch (err) {
        catchError(err);
    }
}
