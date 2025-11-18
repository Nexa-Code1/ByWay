import multer from "multer";
import fs from "fs";

export const Multer = (destinationPath, allowedExtensions = []) => {
  const destinationFolder = "Media/" + destinationPath;

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = file.originalname + "-" + uniqueSuffix;
      file.path = `${destinationFolder}/${fileName}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ fileFilter, storage });

  return upload;
};
