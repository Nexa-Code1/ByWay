import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Detect environment - check VERCEL first, then NODE_ENV
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production" || isVercel;

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

export const Multer = (destinationPath, allowedExtensions = []) => {
    let storage;

    if (isVercel) {
        // PRODUCTION (VERCEL): Use Cloudinary - NO filesystem operations
        console.log("Using Cloudinary storage for:", destinationPath);

        storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
                return {
                    folder: destinationPath.replace(/^\//, ""),
                    resource_type: "auto",
                    allowed_formats:
                        allowedExtensions.length > 0
                            ? allowedExtensions.map(
                                  (mime) => mime.split("/")[1]
                              )
                            : undefined,
                };
            },
        });
    } else {
        // DEVELOPMENT: Use local disk storage
        console.log("Using local storage for:", destinationPath);

        const destinationFolder = "Media/" + destinationPath;

        // Only create directories in local development
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, destinationFolder);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix =
                    Date.now() + "-" + Math.round(Math.random() * 1e9);
                const fileName = file.originalname + "-" + uniqueSuffix;
                cb(null, fileName);
            },
        });
    }

    const fileFilter = (req, file, cb) => {
        if (
            allowedExtensions.length === 0 ||
            allowedExtensions.includes(file.mimetype)
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Invalid file type. Allowed types: ${allowedExtensions.join(
                        ", "
                    )}`
                ),
                false
            );
        }
    };

    const upload = multer({ fileFilter, storage });

    return {
        single: (fieldName) => {
            return async (req, res, next) => {
                upload.single(fieldName)(req, res, async (err) => {
                    if (err) {
                        return next(err);
                    }

                    if (req.file) {
                        // Add fullUrl
                        if (isVercel || req.file.path.startsWith("http")) {
                            req.file.fullUrl = req.file.path;

                            // Get duration from Cloudinary for videos
                            if (req.file.mimetype?.startsWith("video/")) {
                                try {
                                    const publicId = req.file.filename;

                                    // Small delay to allow Cloudinary to process
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                    );

                                    const result =
                                        await cloudinary.api.resource(
                                            publicId,
                                            {
                                                resource_type: "video",
                                            }
                                        );

                                    req.file.duration = result.duration || 0;
                                    console.log(
                                        "Video duration from Cloudinary:",
                                        req.file.duration
                                    );
                                } catch (error) {
                                    console.error(
                                        "Error getting video duration from Cloudinary:",
                                        error
                                    );
                                    req.file.duration = 0;
                                }
                            }
                        } else {
                            req.file.fullUrl = `${req.protocol}://${req.get(
                                "host"
                            )}/${req.file.path.replace(/\\/g, "/")}`;
                            req.file.duration = null;
                        }
                    }

                    next();
                });
            };
        },

        array: (fieldName, maxCount) => {
            return async (req, res, next) => {
                upload.array(fieldName, maxCount)(req, res, async (err) => {
                    if (err) {
                        return next(err);
                    }

                    if (req.files && req.files.length > 0) {
                        for (const file of req.files) {
                            if (isVercel || file.path.startsWith("http")) {
                                file.fullUrl = file.path;

                                if (file.mimetype?.startsWith("video/")) {
                                    try {
                                        const publicId = file.filename;
                                        await new Promise((resolve) =>
                                            setTimeout(resolve, 1000)
                                        );
                                        const result =
                                            await cloudinary.api.resource(
                                                publicId,
                                                {
                                                    resource_type: "video",
                                                }
                                            );
                                        file.duration = result.duration || 0;
                                    } catch (error) {
                                        console.error(
                                            "Error getting video duration:",
                                            error
                                        );
                                        file.duration = 0;
                                    }
                                }
                            } else {
                                file.fullUrl = `${req.protocol}://${req.get(
                                    "host"
                                )}/${file.path.replace(/\\/g, "/")}`;
                                file.duration = null;
                            }
                        }
                    }

                    next();
                });
            };
        },

        fields: (fields) => {
            return async (req, res, next) => {
                upload.fields(fields)(req, res, async (err) => {
                    if (err) {
                        return next(err);
                    }

                    if (req.files) {
                        for (const fieldName of Object.keys(req.files)) {
                            for (const file of req.files[fieldName]) {
                                if (isVercel || file.path.startsWith("http")) {
                                    file.fullUrl = file.path;

                                    if (file.mimetype?.startsWith("video/")) {
                                        try {
                                            const publicId = file.filename;
                                            await new Promise((resolve) =>
                                                setTimeout(resolve, 1000)
                                            );
                                            const result =
                                                await cloudinary.api.resource(
                                                    publicId,
                                                    {
                                                        resource_type: "video",
                                                    }
                                                );
                                            file.duration =
                                                result.duration || 0;
                                        } catch (error) {
                                            console.error(
                                                "Error getting video duration:",
                                                error
                                            );
                                            file.duration = 0;
                                        }
                                    }
                                } else {
                                    file.fullUrl = `${req.protocol}://${req.get(
                                        "host"
                                    )}/${file.path.replace(/\\/g, "/")}`;
                                    file.duration = null;
                                }
                            }
                        }
                    }

                    next();
                });
            };
        },
    };
};
