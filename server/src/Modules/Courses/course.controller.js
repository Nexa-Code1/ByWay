import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { USER_ROLES, USER_TYPES } from "../../Constants/constants.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  publishCourse,
  updateCourse,
} from "./Services/course.service.js";

const coursesRouter = Router();

coursesRouter.post(
  "/create-course",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(createCourse)
);

coursesRouter.put(
  "/update-course/:id",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(updateCourse)
);

coursesRouter.delete(
  "/delete-course/:id",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(deleteCourse)
);

coursesRouter.get(
  "/get-course/:id",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(getCourseDetails)
);

coursesRouter.get(
  "/get-courses",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(getAllCourses)
);

coursesRouter.patch(
  "/publish-course/:id",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.INSTRUCTOR),
  errorHandlerMiddleware(publishCourse)
);

coursesRouter.get(
  "/get-instructor-courses/:instructorId",
  authenticationMiddleware,
  authorizationMiddleware(USER_TYPES),
  errorHandlerMiddleware(getInstructorCourses)
);

export default coursesRouter;
