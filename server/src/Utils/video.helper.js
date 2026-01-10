import { v2 as cloudinary } from "cloudinary";

/**
 * Get video duration from Cloudinary or use provided duration
 * @param {object} file - req.file object
 * @param {number} fallbackDuration - Duration from request body (optional)
 * @returns {number} - Duration in seconds
 */
export const getVideoDuration = async (file, fallbackDuration = 0) => {
    try {
        // If duration already set (from Cloudinary in middleware)
        if (file.duration !== null && file.duration !== undefined) {
            return Math.round(file.duration);
        }

        // If in production/Vercel and it's a Cloudinary URL
        if (file.path && file.path.includes("cloudinary.com")) {
            try {
                // Extract public_id from URL or filename
                const publicId = file.filename;

                // Get resource details from Cloudinary
                const result = await cloudinary.api.resource(publicId, {
                    resource_type: "video",
                });

                return Math.round(result.duration || fallbackDuration);
            } catch (error) {
                console.error("Error getting duration from Cloudinary:", error);
                return fallbackDuration;
            }
        }

        // Use fallback duration (from frontend or request body)
        return fallbackDuration;
    } catch (error) {
        console.error("Error getting video duration:", error);
        return fallbackDuration;
    }
};
