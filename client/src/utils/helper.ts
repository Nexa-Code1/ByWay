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
        return;
    }

    // validate size max fileSize prop
    const isUnderFileSize =
        file.size && file.size / 1024 / 1024 < parseFloat(fileSize);
    if (!isUnderFileSize) {
        message.error(`Image must be smaller than ${fileSize}.`);
        return;
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
