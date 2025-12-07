import type { AxiosError } from "axios";

export function catchError(err: unknown) {
    console.error(err);
    const error = err as AxiosError<{ message?: string }>;
    const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
    throw new Error(message);
}
