import { Router } from "express";
import {
  getProfile,
  updateProfile,
  uploadImage,
  deleteImage,
  updatePassword,
  getUserProfileById,
} from "./Services/user.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { USER_TYPES } from "../../Constants/constants.js";
import { Multer } from "../../Middlewares/multer.middleware.js";
import { IMAGE_TYPES } from "../../Constants/constants.js";

const userRouter = Router();

userRouter.get(
  "/profile",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(getProfile)
);

userRouter.get(
  "/profile/:id",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(getUserProfileById)
);

userRouter.put(
  "/update-profile",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(updateProfile)
);

userRouter.patch(
  "/update-password",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(updatePassword)
);

userRouter.post(
  "/upload-profile-image",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  Multer("Users/Profile", IMAGE_TYPES).single("image"),
  errorHandlerMiddleware(uploadImage)
);

userRouter.delete(
  "/delete-profile-image",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(deleteImage)
);

export default userRouter;
