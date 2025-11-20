import axios, { AxiosError } from "axios";
import type { ILogin, INewAccount } from "../../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleSignup(formValues: INewAccount) {
    try {
        const values = {
            ...formValues,
            role: formValues.role ? "instructor" : "student",
        };
        const res = await axios.post(`${BASE_URL}auth/register`, values);
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

export async function handleVerifyEmail(verifyEmailToken: string) {
    try {
        const res = await axios.post(
            `${BASE_URL}auth/verify/${verifyEmailToken}`
        );
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

export async function handleLogin(formValues: ILogin) {
    try {
        const res = await axios.post(`${BASE_URL}auth/login`, formValues);
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
