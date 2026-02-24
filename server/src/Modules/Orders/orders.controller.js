import { Router } from "express";
import {
    createOrder,
    getOrdersByStudent,
    getOrderById,
} from "./Services/orders.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { USER_ROLES } from "../../Constants/constants.js";

const ordersRouter = Router();

ordersRouter.post(
    "/create-order",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(createOrder)
);

ordersRouter.get(
    "/student-orders",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(getOrdersByStudent)
);

ordersRouter.get(
    "/:orderId",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(getOrderById)
);

export default ordersRouter;
