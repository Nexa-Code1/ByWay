import type { ReactNode } from "react";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    language: "ar" | "en";
    links: string[];
    role: RoleType;
    isPrivate: boolean;
    isVerified: boolean;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface INewAccount {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: boolean;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISendOTP {
    email: string;
}

export interface IVerifyOTP {
    email: string;
    otp: string;
}

export interface IResetPassword {
    email: string;
    newPassword: string;
    confirmNewPassword: string;
}

export type RoleType = "student" | "instructor";

export type AuthType =
    | "login"
    | "signup"
    | "send-otp"
    | "verify-otp"
    | "reset-password";

export type MenuItemType = { key: string; icon?: ReactNode; label: ReactNode };
