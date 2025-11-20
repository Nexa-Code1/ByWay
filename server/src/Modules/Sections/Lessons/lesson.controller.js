import { Router } from "express";
import { authorizationMiddleware } from "../../../Middlewares/authorization.middleware.js";
import { authenticationMiddleware } from "../../../Middlewares/authentication.middleware.js";
import { errorHandlerMiddleware } from "../../../Middlewares/error.handler.middleware.js";
import { USER_ROLES, VIDEO_TYPES } from "../../../Constants/constants.js";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "./Services/lesson.service.js";
import { Multer } from "../../../Middlewares/multer.middleware.js";

const lessonsRouter = Router();

lessonsRouter.post(
  "/create-lesson/:courseId/:sectionId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  Multer("/Lessons/Videos", VIDEO_TYPES).single("link"),
  errorHandlerMiddleware(createLesson)
);

lessonsRouter.put(
  "/update-lesson/:courseId/:sectionId/:lessonId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  Multer("/Lessons/Videos", VIDEO_TYPES).single("link"),
  errorHandlerMiddleware(updateLesson)
);

lessonsRouter.delete(
  "/delete-lesson/:lessonId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(deleteLesson)
);

export default lessonsRouter;
