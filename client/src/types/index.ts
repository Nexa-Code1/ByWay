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

export interface IContactUs {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
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

export interface ICourseCartRes {
    course: ICourseCart;
    quantity: number;
    totalPrice: number;
    _id: string;
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

export interface ICourse {
    _id: string;
    title: string;
    subTitle: string;
    instructor: IInstructor;
    rate: number;
    students: [];
    description: string;
    requirements: string[];
    content: [];
    status: CourseStatusType;
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
    image: string;
}

export type CourseStatusType = "draft" | "published";

export interface ICourseDetails extends ICourse {
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

export interface ICourseDataBasicInfo {
    title: string;
    subTitle: string;
    price: number;
    description: string;
    requirements: string[];
    content: string[];
    category: string;
    image: File | null;
}

export interface ICourseContent {
    section: string;
    _id: string;
    lessons: ICourseSectionLesson[];
}

export interface ICourseLessonData {
    link: File;
    title: string;
    description: string;
}

export interface ICourseLessonUpdatedData {
    link?: File;
    title?: string;
    description?: string;
}

export interface ICourseSectionLesson extends ICourseLessonData {
    _id: string;
    section_ID: string;
    duration: number;
    isCompleted: boolean;
}

export interface IBuyCourseIntentOptions {
    amount: number;
    currency: string;
    customer?: string;
    payment_method?: string;
    off_session?: boolean;
    confirm?: boolean;
    automatic_payment_methods?: {
        enabled: boolean;
    };
}

export type CardBrand = "visa" | "mastercard";
