import multer from "multer";
import fs from "fs";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/cloudinary.js";
import { getLocalVideoDuration } from "../Utils/video.helper.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const attachFileMeta = async (file, req) => {
    const isCloudinaryFile =
        typeof file.path === "string" && file.path.startsWith("http");

    if (isCloudinaryFile) {
        file.fullUrl = file.path;

        if (file.mimetype?.startsWith("video/") && file.public_id) {
            try {
                await sleep(1500);
                const result = await cloudinary.api.resource(file.public_id, {
                    resource_type: "video",
                });
                file.duration = Math.round(result.duration || 0);
            } catch {
                file.duration = 0;
            }
        }
    } else {
        file.fullUrl = `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`;
        if (file.mimetype?.startsWith("video/")) {
            file.duration = await getLocalVideoDuration(file.path);
        } else {
            file.duration = null;
        }
    }
};

export const Multer = (destinationPath, allowedExtensions = []) => {
    const isServerless =
        process.env.VERCEL === "1" ||
        process.env.VERCEL_ENV ||
        process.env.AWS_LAMBDA_FUNCTION_NAME;

    const useCloudinary = isServerless || process.env.NODE_ENV === "production";

    let storage;

    if (useCloudinary) {
        storage = new CloudinaryStorage({
            cloudinary,
            params: {
                folder: destinationPath.replace(/^\//, ""),
                resource_type: "auto",
                ...(allowedExtensions.length && {
                    allowed_formats: allowedExtensions.map(
                        (m) => m.split("/")[1],
                    ),
                }),
            },
        });
    } else {
        const destinationFolder = path.join("Media", destinationPath);
        fs.mkdirSync(destinationFolder, { recursive: true });

        storage = multer.diskStorage({
            destination: (_, __, cb) => cb(null, destinationFolder),
            filename: (_, file, cb) => {
                const safeName = file.originalname
                    .replace(/\s+/g, "-")
                    .replace(/[^a-zA-Z0-9.-]/g, "");
                cb(null, `${Date.now()}-${safeName}`);
            },
        });
    }

    const fileFilter = (_, file, cb) => {
        if (
            !allowedExtensions.length ||
            allowedExtensions.includes(file.mimetype)
        ) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type: ${file.mimetype}`));
        }
    };

    const upload = multer({ storage, fileFilter });

    return {
        single: (name) => (req, res, next) =>
            upload.single(name)(req, res, async (err) => {
                if (err) return next(err);
                if (req.file) await attachFileMeta(req.file, req);
                next();
            }),

        array: (name, max) => (req, res, next) =>
            upload.array(name, max)(req, res, async (err) => {
                if (err) return next(err);
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
