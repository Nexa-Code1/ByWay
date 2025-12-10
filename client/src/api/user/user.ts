import axios from "axios";
import { catchError } from "../catchError";
import type { IUpdatePassword, IUpdateProfile } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleGetProfile(token: string) {
    try {
        const res = await axios.get(`${BASE_URL}users/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdateProfile(
    token: string,
    updatedValues: IUpdateProfile
) {
    try {
        const {
            firstName,
            lastName,
            headLine,
            bio,
            language,
            isPrivate,
            facebookLink,
            instagramLink,
        } = updatedValues;

        const formattedUpdatedValues = {
            firstName,
            lastName,
            headLine,
            bio,
            language,
            isPrivate,
            links: [
                { name: "facebook", link: facebookLink },
                { name: "instagram", link: instagramLink },
            ],
        };

        const res = await axios.put(
            `${BASE_URL}users/update-profile`,
            formattedUpdatedValues,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUploadProfileImg(token: string, file: File | null) {
    try {
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            `${BASE_URL}users/upload-profile-image`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteProfileImg(token: string) {
    try {
        const res = await axios.delete(
            `${BASE_URL}users/delete-profile-image`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdatePassword(
    token: string,
    values: IUpdatePassword
) {
    try {
        const res = await axios.patch(
            `${BASE_URL}users/update-password`,
            values,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
