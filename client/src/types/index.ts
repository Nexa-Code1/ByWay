export interface IUser {
    role: "student" | "instructor";
}

export interface INewAccount {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleType;
}

export type RoleType = "student" | "instructor";

export type AuthType = "login" | "signup" | "forget-password";
