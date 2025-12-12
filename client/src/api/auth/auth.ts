import type {
    IResetPassword,
    ILogin,
    INewAccount,
    ISendOTP,
    IVerifyOTP,
} from "@/types";
import { catchError } from "../catchError";
import api from "../api";

export async function handleSignup(formValues: INewAccount) {
    try {
        const values = {
            ...formValues,
            role: formValues.role ? "instructor" : "student",
        };
        const res = await api.post(`auth/register`, values);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleVerifyEmail(verifyEmailToken: string) {
    try {
        const res = await api.post(`auth/verify/${verifyEmailToken}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleLogin(formValues: ILogin) {
    try {
        const res = await api.post(`auth/login`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleLogout(token: string, refreshToken: string) {
    try {
        const res = await api.post(`auth/logout`, {
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
        const res = await api.post(`auth/send-otp`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleVerifyOTP(formValues: IVerifyOTP) {
    try {
        const res = await api.post(`auth/verify-otp`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleForgetPassword(formValues: IResetPassword) {
    try {
        const res = await api.post(`auth/forget-password`, formValues);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleRefreshToken(refreshToken: string) {
    try {
        const res = await api.post(`auth/refresh-token`, { refreshToken });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
