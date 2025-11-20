import axios, { AxiosError } from "axios";
import type { INewAccount } from "../../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleSignup(formValues: INewAccount) {
    try {
        const res = await axios.post(`${BASE_URL}auth/register`, formValues);
        return res.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.";
        throw new Error(message);
    }
}
