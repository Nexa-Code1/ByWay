import visaImg from "@/assets/images/visa.png";
import mastercardImg from "@/assets/images/mastercard.png";

// Helper to convert file → Base64 for image preview
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
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
