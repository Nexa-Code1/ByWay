import type { ReactNode } from "react";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    language: "ar" | "en";
    links: ProfileLink[];
    role: RoleType;
    isPrivate: boolean;
    isVerified: boolean;
    image: string;
    bio: string;
    headLine: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUpdateProfile {
    firstName?: string;
    lastName?: string;
    headLine?: string;
    bio?: string;
    language?: "en" | "ar";
    isPrivate?: boolean;
    facebookLink?: string;
    instagramLink?: string;
}

export interface IUpdatePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export type ProfileLink = { name: string; link: string };

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
    _id: string;
    name: ILangObj;
    slug: string;
    description: ILangObj;
    icon?: string;
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
    sort?: ISortCoursesBy;
    page?: number | 1;
    limit?: number;
}

export type ISortCoursesBy =
    | "time-asc"
    | "time-desc"
    | "price-asc"
    | "price-desc";

export interface ICourseCart {
    _id: string;
    title: string;
    subTitle: string;
    instructor: IInstructor;
    rate: 0;
    price: 160;
    discount: 0;
    reviews: [];
    isFavourite: false;
    image: string;
}

export interface IWishlist {
    _id: string;
    student_ID: string;
    course_ID: IWishlistItem;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IWishlistItem {
    _id: string;
    title: string;
    subTitle: string;
    instructor: IInstructor;
    price: number;
    discount: number;
    isFavourite: boolean;
    isInCart: boolean;
    image: string;
    rate: number;
}

export interface ICourseDetails {
    _id: string;
    title: string;
    subTitle: string;
    instructor: IInstructor;
    rate: number;
    students: [];
    description: string;
    requirements: string[];
    content: [];
    status: string;
    price: number;
    discount: number;
    reviews: IReview[];
    category: ICategory;
    isFavourite: boolean;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    isInCart: boolean;
}

export interface IInstructor {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
    bio: string;
    headLine: string;
}

export interface IReview {
    _id: string;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
    rate: number;
    createdAt: Date;
    comment: string;
}

export type RoleType = "student" | "instructor";

export type AuthType =
    | "login"
    | "signup"
    | "send-otp"
    | "verify-otp"
    | "reset-password";

export type MenuItemType = { key: string; icon?: ReactNode; label: ReactNode };
