import { v2 as cloudinary } from "cloudinary";

export const getVideoDuration = async (file, fallbackDuration = 0) => {
    try {
        if (file.duration) {
            return Math.round(file.duration);
        }

        if (file.fullUrl && file.fullUrl.includes("cloudinary.com")) {
            const urlParts = file.fullUrl.split("/");
            const lastSegment = urlParts[urlParts.length - 1].split(".")[0];

            const publicId = lastSegment;

            const result = await cloudinary.api.resource(publicId, {
                resource_type: "video",
            });

            return Math.round(result.duration || fallbackDuration);
        }

        return fallbackDuration;
    } catch (error) {
        console.error("Error getting duration from Cloudinary:", error);
        return fallbackDuration;
    }
};
