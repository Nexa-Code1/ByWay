import axios, { AxiosError } from "axios";

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
        const error = err as AxiosError<{ message?: string }>;
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.";
        throw new Error(message);
    }
}
