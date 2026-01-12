import { v2 as cloudinary } from "cloudinary";

const extractPublicId = (cloudinaryUrl) => {
    const url = new URL(cloudinaryUrl);
    const pathname = url.pathname;

    // Remove version segment (v123456789)
    const parts = pathname.split("/").filter((p) => !p.startsWith("v"));

    // Remove extension (.mp4)
    const publicIdWithExt = parts.slice(4).join("/");
    return publicIdWithExt.replace(/\.[^/.]+$/, "");
};

export const getVideoDuration = async (file, fallbackDuration = 0) => {
    try {
        if (!file?.fullUrl) return fallbackDuration;

        const publicId = extractPublicId(file.fullUrl);

        const result = await cloudinary.api.resource(publicId, {
            resource_type: "video",
        });

        return Math.round(result.duration || fallbackDuration);
    } catch (error) {
        console.error("Cloudinary duration fetch failed:", error.message);
        return fallbackDuration;
    }
};
