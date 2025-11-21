import axios from "axios";

import type {
    IResetPassword,
    ILogin,
    INewAccount,
    ISendOTP,
    IVerifyOTP,
} from "../../types";
import { catchError } from "../catchError";

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
        catchError(err);
    }
}

export async function handleVerifyEmail(verifyEmailToken: string) {
    try {
        const res = await axios.post(
            `${BASE_URL}auth/verify/${verifyEmailToken}`
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleLogin(formValues: ILogin) {
    try {
        const res = await axios.post(`${BASE_URL}auth/login`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleLogout(token: string, refreshToken: string) {
    try {
        const res = await axios.post(`${BASE_URL}auth/logout`, {
            token,
            refreshToken,
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleSendOTP(formValues: ISendOTP) {
    try {
        const res = await axios.post(`${BASE_URL}auth/send-otp`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleVerifyOTP(formValues: IVerifyOTP) {
    try {
        const res = await axios.post(`${BASE_URL}auth/verify-otp`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleForgetPassword(formValues: IResetPassword) {
    try {
        const res = await axios.post(
            `${BASE_URL}auth/forget-password`,
            formValues
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
