import cloudinary from "../Config/cloudinary.js";

/**
 * Extract public_id from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - Public ID or null if not a Cloudinary URL
 */
export const extractPublicIdFromUrl = (url) => {
    if (!url) {
        console.error("No URL provided for public ID extraction");
        return null;
    }

    try {
        // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
        // or https://res.cloudinary.com/{cloud_name}/video/upload/{version}/{public_id}.{format}
        const urlParts = url.split("/");
        const uploadIndex = urlParts.findIndex((part) => part === "upload");

        if (uploadIndex === -1) {
            console.error("No 'upload' segment found in URL");
            return null;
        }

        // Get everything after 'upload/'
        const pathAfterUpload = urlParts.slice(uploadIndex + 1);

        // Remove version number if present (starts with 'v' followed by digits)
        if (pathAfterUpload.length > 0 && /^v\d+/.test(pathAfterUpload[0])) {
            pathAfterUpload.shift(); // Remove the version part
        }

        // Join remaining parts and remove the file extension
        const publicIdWithExtension = pathAfterUpload.join("/");
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Remove file extension

        return publicId;
    } catch (error) {
        console.error("Error extracting public_id from URL:", error);
        return null;
    }
};

/**
 * Extract resource type from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string} - Resource type ('image', 'video', etc.)
 */
export const extractResourceTypeFromUrl = (url) => {
    if (!url) return "image"; // Default to image

    try {
        const urlParts = url.split("/");
        const resourceTypeIndex = urlParts.findIndex(
            (part) =>
                part === "image" ||
                part === "video" ||
                part === "raw" ||
                part === "javascript" ||
                part === "css",
        );

        if (resourceTypeIndex !== -1) {
            return urlParts[resourceTypeIndex];
        }

        // Fallback: check if it's a video URL by common patterns
        if (
            url.includes(".mp4") ||
            url.includes(".mov") ||
            url.includes(".avi")
        ) {
            return "video";
        }

        return "image"; // Default fallback
    } catch (error) {
        console.error("Error extracting resource type from URL:", error);
        return "image";
    }
};

/**
 * Delete file from Cloudinary (supports both images and videos)
 * @param {string} fileUrl - Cloudinary URL
 * @param {string} resourceType - Type of resource ('image', 'video', etc. If not provided, will be extracted from URL)
 * @returns {Promise<object>} - Cloudinary deletion result
 */
export const deleteFileFromCloudinary = async (
    fileUrl,
    resourceType = null,
) => {
    try {
        // Extract resource type from URL if not provided
        const detectedResourceType =
            resourceType || extractResourceTypeFromUrl(fileUrl);

        const publicId = extractPublicIdFromUrl(fileUrl);

        if (!publicId) {
            console.error(
                "Not a Cloudinary URL or unable to extract public_id:",
                fileUrl,
            );
            return { success: false, message: "Not a Cloudinary URL" };
        }
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: detectedResourceType,
        });

        return { success: true, result };
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Delete multiple files from Cloudinary
 * @param {string[]} fileUrls - Array of Cloudinary URLs
 * @param {string} resourceType - Type of resource (optional, will be auto-detected from URLs)
 * @returns {Promise<object>} - Deletion results summary
 */
export const deleteMultipleFilesFromCloudinary = async (
    fileUrls,
    resourceType = null,
) => {
    const results = {
        success: 0,
        failed: 0,
        details: [],
    };

    if (!fileUrls || fileUrls.length === 0) {
        return results;
    }

    for (const fileUrl of fileUrls) {
        try {
            const result = await deleteFileFromCloudinary(
                fileUrl,
                resourceType,
            );
            if (result.success) {
                results.success++;
                results.details.push({ url: fileUrl, status: "success" });
            } else {
                results.failed++;
                results.details.push({
                    url: fileUrl,
                    status: "failed",
                    error: result.error,
                });
            }
        } catch (error) {
            results.failed++;
            results.details.push({
                url: fileUrl,
                status: "failed",
                error: error.message,
            });
        }
    }

    return results;
};
