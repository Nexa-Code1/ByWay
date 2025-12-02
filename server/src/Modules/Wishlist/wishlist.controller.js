import { Router } from "express";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { USER_ROLES } from "../../Constants/constants.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import {
  addToWishlist,
  clearWishlist,
  deleteFromWishlist,
  getMyWishlist,
} from "./Services/wishlist.service.js";

const wishlistRouter = Router();

wishlistRouter.get(
  "/my-wishlist",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(getMyWishlist)
);

wishlistRouter.post(
  "/add-to-wishlist/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(addToWishlist)
);

wishlistRouter.delete(
  "/delete-from-wishlist/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(deleteFromWishlist)
);

wishlistRouter.delete(
  "/clear-wishlist",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(clearWishlist)
);

export default wishlistRouter;
