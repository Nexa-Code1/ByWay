import multer from "multer";

import cloudinary from "../Config/cloudinary.js";
import { getVideoDuration } from "../Utils/video.helper.js";

const attachFileMeta = async (file, req) => {
    const isCloudinaryFile =
        typeof file.path === "string" && file.path.startsWith("https");

    if (isCloudinaryFile) {
        file.fullUrl = file.path;

        // Only process video duration for video files
        if (file.mimetype?.startsWith("video/")) {
            try {
                file.duration = await getVideoDuration(file.path);
            } catch (error) {
                console.error(" Error getting video duration:", error);
                file.duration = 0;
            }
        } else {
            // For images, set duration to null
            file.duration = null;
        }

        // Return the modified file object
        return file;
    } else {
        file.fullUrl = `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`;
        if (file.mimetype?.startsWith("video/")) {
            try {
                file.duration = await getVideoDuration(file.path);
            } catch (error) {
                file.duration = 0;
            }
        } else {
            file.duration = null;
            console.log(file);
        }
    }

    // Return the modified file object
    return file;
};

const uploadToCloudinary = async (file, destinationPath) => {
    return new Promise((resolve, reject) => {
        // Dynamic folder routing based on file type
        let folder = destinationPath.replace(/^\//, "");

        if (file.mimetype?.startsWith("image/")) {
            folder = `${folder}/Images`;
        } else if (file.mimetype?.startsWith("video/")) {
            folder = `${folder}/Videos`;
        }

        const uploadOptions = {
            folder,
            resource_type: "auto",
        };

        cloudinary.uploader
            .upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
            .end(file.buffer);
    });
};

export const Multer = (destinationPath, allowedExtensions = []) => {
    const storage = multer.memoryStorage();

    const fileFilter = (_, file, cb) => {
        // If no allowed extensions specified, allow all files
        if (!allowedExtensions.length) {
            cb(null, true);
            return;
        }

        // Check if the file's MIME type is in the allowed extensions
        const isAllowed = allowedExtensions.includes(file.mimetype);

        if (isAllowed) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Invalid file type: ${file.mimetype}. Allowed types: ${allowedExtensions.join(", ")}`,
                ),
            );
        }
    };

    const upload = multer({ storage, fileFilter });

    return {
        single: (name) => (req, res, next) =>
            upload.single(name)(req, res, async (err) => {
                if (err) {
                    return next(err);
                }
                if (req.file) {
                    try {
                        const result = await uploadToCloudinary(
                            req.file,
                            destinationPath,
                        );
                        req.file.path = result.secure_url;
                        req.file.cloudinaryId = result.public_id;
                        await attachFileMeta(req.file, req);
                    } catch (error) {
                        return next(error);
                    }
                }

                next();
            }),

        array: (name, max) => (req, res, next) =>
            upload.array(name, max)(req, res, async (err) => {
                if (err) {
                    return next(err);
                }
                if (req.files) {
                    try {
                        for (const file of req.files) {
                            const result = await uploadToCloudinary(
                                file,
                                destinationPath,
                            );
                            file.path = result.secure_url;
                            file.cloudinaryId = result.public_id;
                            await attachFileMeta(file, req);
                        }
                    } catch (error) {
                        return next(error);
                    }
                }
                next();
            }),

        fields: (fields) => (req, res, next) =>
            upload.fields(fields)(req, res, async (err) => {
                if (err) return next(err);
                if (req.files) {
                    try {
                        for (const key of Object.keys(req.files)) {
                            for (const file of req.files[key]) {
                                const result = await uploadToCloudinary(
                                    file,
                                    destinationPath,
                                );
                                file.path = result.secure_url;
                                file.cloudinaryId = result.public_id;
                                await attachFileMeta(file, req);
                            }
                        }
                    } catch (error) {
                        return next(error);
                    }
                }
                next();
            }),
    };
};
