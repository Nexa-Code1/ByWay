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

export type RoleType = "student" | "instructor";

export type AuthType = "login" | "signup" | "forget-password";

export type MenuItemType = { key: string; icon?: ReactNode; label: ReactNode };
