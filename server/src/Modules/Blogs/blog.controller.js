import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { USER_ROLES, USER_TYPES } from "../../Constants/constants.js";
import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogDetails,
    getInstructorBlogs,
    updateBlog,
} from "./Services/blog.service.js";
import { Multer } from "../../Middlewares/multer.middleware.js";
import { IMAGE_TYPES } from "../../Constants/constants.js";

const blogsRouter = Router();

// Create blog (Instructor only)
blogsRouter.post(
    "/create-blog",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    Multer("Blogs/Images", IMAGE_TYPES).single("image"),
    errorHandlerMiddleware(createBlog),
);

// Update blog (Instructor only - own blogs)
blogsRouter.put(
    "/update-blog/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    Multer("Blogs/Images", IMAGE_TYPES).single("image"),
    errorHandlerMiddleware(updateBlog),
);

// Delete blog (Instructor only - own blogs)
blogsRouter.delete(
    "/delete-blog/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.INSTRUCTOR),
    errorHandlerMiddleware(deleteBlog),
);

// Get all blogs
blogsRouter.get(
    "/get-blogs",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getAllBlogs),
);

// Get blog details
blogsRouter.get(
    "/get-blog/:id",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getBlogDetails),
);

// Get blogs by instructor
blogsRouter.get(
    "/get-instructor-blogs/:instructorId",
    authenticationMiddleware,
    authorizationMiddleware(USER_TYPES),
    errorHandlerMiddleware(getInstructorBlogs),
);

export default blogsRouter;
