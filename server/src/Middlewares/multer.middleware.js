import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

export const Multer = (destinationPath, allowedExtensions = []) => {
    const isVercel = !!(
        (
            process.env.VERCEL === "1" ||
            process.env.VERCEL === "true" ||
            process.env.VERCEL_URL ||
            process.env.VERCEL_ENV ||
            process.env.AWS_LAMBDA_FUNCTION_NAME
        ) // Vercel uses AWS Lambda
    );

    const isProduction = process.env.NODE_ENV === "production";
    const useCloudinary = isVercel || isProduction;

    let storage;

    // Cloudinary storage (for Vercel/Production)
    if (useCloudinary) {
        console.log("✅ Using Cloudinary storage for:", destinationPath);

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
    }
    // Local disk storage (for Development only)
    else {
        console.log("✅ Using local storage for:", destinationPath);

        const destinationFolder = "Media/" + destinationPath;

        // Create directory only in development
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
                    `Invalid file type. Allowed: ${allowedExtensions.join(
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
                        const isCloudinaryFile =
                            req.file.path.startsWith("http");

                        if (isCloudinaryFile) {
                            req.file.fullUrl = req.file.path;

                            if (req.file.mimetype?.startsWith("video/")) {
                                try {
                                    const publicId = req.file.filename;
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
                                } catch (error) {
                                    console.error(
                                        "Error getting video duration:",
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
                            const isCloudinaryFile =
                                file.path.startsWith("http");

                            if (isCloudinaryFile) {
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
                                const isCloudinaryFile =
                                    file.path.startsWith("http");

                                if (isCloudinaryFile) {
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
