import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { USER_ROLES, USER_TYPES } from "../../Constants/constants.js";
import {
    createCourseWithContent,
    deleteCourse,
    getAllCourses,
    getCourseDetails,
    getInstructorCourses,
    getStudentCourses,
    publishCourse,
    updateCourseWithContent,
} from "./Services/course.service.js";
import { Multer } from "../../Middlewares/multer.middleware.js";
import { IMAGE_TYPES, VIDEO_TYPES } from "../../Constants/constants.js";

// Create a combined array of all allowed MIME types for the fields method
const ALL_ALLOWED_TYPES = [...IMAGE_TYPES, ...VIDEO_TYPES];

const coursesRouter = Router();

coursesRouter.post(
    "/create-course",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    Multer("Byway/Courses", ALL_ALLOWED_TYPES).fields([
        { name: "image", maxCount: 1 },
        { name: "videos", maxCount: 500 },
    ]),
    errorHandlerMiddleware(createCourseWithContent),
);

coursesRouter.put(
    "/update-course/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    Multer("Byway/Courses", ALL_ALLOWED_TYPES).fields([
        { name: "image", maxCount: 1 },
        { name: "videos", maxCount: 500 },
    ]),
    errorHandlerMiddleware(updateCourseWithContent),
);

coursesRouter.delete(
    "/delete-course/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    errorHandlerMiddleware(deleteCourse),
);

coursesRouter.patch(
    "/publish-course/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    errorHandlerMiddleware(publishCourse),
);

coursesRouter.get(
    "/get-course/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getCourseDetails),
);

coursesRouter.get(
    "/get-courses",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getAllCourses),
);

coursesRouter.get(
    "/get-instructor-courses/:instructorId",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getInstructorCourses),
);

coursesRouter.get(
    "/get-student-courses",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getStudentCourses),
);

export default coursesRouter;
