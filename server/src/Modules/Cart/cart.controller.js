import { Router } from "express";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  deleteCourseFromCart,
  getCartService,
  increaseQuantity,
} from "./Services/cart.service.js";
import { USER_ROLES } from "../../Constants/constants.js";
const cartRouter = Router();

cartRouter.get(
  "/my-cart",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(getCartService)
);

cartRouter.post(
  "/add-to-cart/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(addToCart)
);

cartRouter.patch(
  "/increase-quantity/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(increaseQuantity)
);

cartRouter.patch(
  "/decrease-quantity/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(decreaseQuantity)
);

cartRouter.delete(
  "/remove-from-cart/:courseId",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(deleteCourseFromCart)
);

cartRouter.delete(
  "/clear-cart",
  authenticationMiddleware,
  authorizationMiddleware(USER_ROLES.STUDENT),
  errorHandlerMiddleware(clearCart)
);
export default cartRouter;
