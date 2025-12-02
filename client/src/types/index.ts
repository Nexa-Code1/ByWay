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

export interface IStatisticItem {
    statistic: string;
    label: ILangObj;
}

export interface IAllInOneEle {
    icon: ReactNode;
    iconBgColor: string;
    title: ILangObj;
    content: ILangObj;
}

export interface ICategory {
    id: string;
    name: ILangObj;
    slug: string;
    description: ILangObj;
    icon: string;
    color: string;
}

export interface ILangObj {
    en: string;
    ar: string;
}

export interface IBlog {
    id: string;
    image: string;
    title: string;
    content: string;
    // category: string;
    // author: {
    //     name: string;
    //     avatar: string;
    // };
    // seen: number;
    // createdAt: Date;
    // updatedAt: Date;
}

export interface IFilterCoursesBy {
    price?: string;
    category?: string;
    title?: string;
    sort?: "time-asc" | "time-desc" | "price-asc" | "price-desc";
    page?: number;
    limit?: number;
}

export type RoleType = "student" | "instructor";

export type AuthType =
    | "login"
    | "signup"
    | "send-otp"
    | "verify-otp"
    | "reset-password";

export type MenuItemType = { key: string; icon?: ReactNode; label: ReactNode };
