import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

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

    if (isProduction) {
        // PRODUCTION: Use Cloudinary
        console.log("Using Cloudinary storage for:", destinationPath);

        storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
                return {
                    folder: destinationPath.replace(/^\//, ""),
                    resource_type: "auto",
                    allowed_formats: allowedExtensions.map(
                        (mime) => mime.split("/")[1]
                    ),
                };
            },
        });
    } else {
        // DEVELOPMENT: Use local disk storage
        console.log("Using local storage for:", destinationPath);

        const destinationFolder = "Media/" + destinationPath;

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
                        if (isProduction || req.file.path.startsWith("http")) {
                            req.file.fullUrl = req.file.path;

                            // Get duration from Cloudinary for videos
                            if (req.file.mimetype?.startsWith("video/")) {
                                try {
                                    // Extract public_id from Cloudinary response
                                    const publicId = req.file.filename;

                                    // Get resource details from Cloudinary
                                    const result =
                                        await cloudinary.api.resource(
                                            publicId,
                                            {
                                                resource_type: "video",
                                            }
                                        );

                                    req.file.duration = result.duration || 0; // Duration in seconds
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
                            req.file.duration = null; // Will be set by controller for local files
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
                            if (isProduction || file.path.startsWith("http")) {
                                file.fullUrl = file.path;

                                if (file.mimetype?.startsWith("video/")) {
                                    try {
                                        const publicId = file.filename;
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
                                if (
                                    isProduction ||
                                    file.path.startsWith("http")
                                ) {
                                    file.fullUrl = file.path;

                                    if (file.mimetype?.startsWith("video/")) {
                                        try {
                                            const publicId = file.filename;
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
