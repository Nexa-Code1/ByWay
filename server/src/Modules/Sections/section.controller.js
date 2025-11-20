import { Router } from "express";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { USER_ROLES } from "../../Constants/constants.js";
import {
  createSection,
  deleteSection,
  updateSection,
} from "./Services/section.service.js";

const sectionsRouter = Router();

sectionsRouter.post(
  "/create-section/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(createSection)
);

sectionsRouter.patch(
  "/update-section/:courseId/:sectionId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(updateSection)
);

sectionsRouter.delete(
  "/delete-section/:courseId/:sectionId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(deleteSection)
);

export default sectionsRouter;
