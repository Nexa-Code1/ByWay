export interface IUser {
    role: "student" | "instructor";
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
