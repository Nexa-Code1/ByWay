import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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

export const Multer = (destinationPath, allowedExtensions = []) => {
    // Getting file types (e.g. jpeg, ... from image/jpeg, ...)
    const extractedFormats = allowedExtensions.length
        ? allowedExtensions.map((m) => {
              const format = m.split("/")[1];
              return format;
          })
        : [];

    const storage = new CloudinaryStorage({
        cloudinary,
        params: (req, file) => {
            // Dynamic folder routing based on file type
            let folder = destinationPath.replace(/^\//, "");

            if (file.mimetype?.startsWith("image/")) {
                folder = `${folder}/Images`;
            } else if (file.mimetype?.startsWith("video/")) {
                folder = `${folder}/Videos`;
            }

            return {
                folder,
                resource_type: "auto",
                ...(allowedExtensions.length && {
                    allowed_formats: extractedFormats,
                }),
            };
        },
    });

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
                if (req.file) await attachFileMeta(req.file, req);

                next();
            }),

        array: (name, max) => (req, res, next) =>
            upload.array(name, max)(req, res, async (err) => {
                if (err) {
                    return next(err);
                }
                if (req.files) {
                    for (const file of req.files)
                        await attachFileMeta(file, req);
                }
                next();
            }),

        fields: (fields) => (req, res, next) =>
            upload.fields(fields)(req, res, async (err) => {
                if (err) return next(err);
                if (req.files) {
                    for (const key of Object.keys(req.files)) {
                        for (const file of req.files[key])
                            await attachFileMeta(file, req);
                    }
                }
                next();
            }),
    };
};
