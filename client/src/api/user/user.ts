import api from "../api";
import { catchError } from "../catchError";
import type { IUpdatePassword, IUpdateProfile } from "@/types";

export async function handleGetProfile() {
    try {
        const res = await api.get(`users/profile`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetProfileById(id?: string) {
    try {
        if (!id) throw new Error("ID is required");
        const res = await api.get(`users/profile/${id}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdateProfile(updatedValues: IUpdateProfile) {
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

        const res = await api.put(
            `users/update-profile`,
            formattedUpdatedValues
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUploadProfileImg(file: File | null) {
    try {
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        const res = await api.post(`users/upload-profile-image`, formData);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteProfileImg() {
    try {
        const res = await api.delete(`users/delete-profile-image`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdatePassword(values: IUpdatePassword) {
    try {
        const res = await api.patch(`users/update-password`, values);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
