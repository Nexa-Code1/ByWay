import visaImg from "@/assets/images/visa.png";
import mastercardImg from "@/assets/images/mastercard.png";
import { message } from "antd";

// Helper to convert file → Base64 for image preview
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function imageValidation({
    file,
    fileSize = "2MB",
    fileTypes = ["image/jpeg", "image/png"],
}: {
    file: File;
    fileSize?: string;
    fileTypes?: string[];
}) {
    // validate type => jpg or png only
    const valid = fileTypes.includes(file.type);

    if (!valid) {
        message.error("Only JPG/PNG images are allowed.");
        throw new Error("Only JPG/PNG images are allowed.");
    }

    // validate size max fileSize prop
    const isUnderFileSize =
        file.size && file.size / 1024 / 1024 < parseFloat(fileSize);
    if (!isUnderFileSize) {
        message.error(`Image must be smaller than ${fileSize}.`);
        throw new Error(`Image must be smaller than ${fileSize}.`);
    }
}

export async function videoUrlToFile(url: string) {
    const res = await fetch(url); // fetch the video
    const blob = await res.blob(); // convert to Blob
    return new File([blob], "placeholder-video.mp4", { type: blob.type });
}

export const brandLogoSrc = (brand?: string) => {
    if (!brand) return;
    switch (brand) {
        case "visa":
            return visaImg;
        case "mastercard":
            return mastercardImg;
    }
};

export const formatDuration = (durationInSeconds: number) => {
    const hrs = Math.floor(durationInSeconds / 3600);
    const mins = Math.floor((durationInSeconds % 3600) / 60);
    const secs = Math.floor(durationInSeconds % 60);

    return [
        String(hrs).padStart(2, "0"),
        String(mins).padStart(2, "0"),
        String(secs).padStart(2, "0"),
    ].join(":");
};

/**
 * Utility functions for handling MongoDB ObjectIds
 * Generate a valid MongoDB ObjectId string (24 hex characters)
 */
export const generateObjectId = (): string => {
    // Generate exactly 24 hex characters
    const timestamp = Date.now().toString(16).padStart(8, "0"); // 8 chars
    const random = Math.random().toString(16).substring(2, 18); // 16 chars
    const id = (timestamp + random).substring(0, 24);

    // Validate the generated ID
    if (!/^[0-9a-f]{24}$/.test(id)) {
        // Fallback to a simpler method if something goes wrong
        return Array.from({ length: 24 }, () =>
            Math.floor(Math.random() * 16).toString(16),
        ).join("");
    }

    return id;
};

// Calc price after discount
export const calcPriceAfterDiscount = (price: number, discount?: number) => {
    return discount && discount !== 0
        ? (price - price * (discount / 100)).toFixed(2)
        : price.toFixed(2);
};
