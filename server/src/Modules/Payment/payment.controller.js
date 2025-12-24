import { Router } from "express";

import {
    createSetupIntent,
    addPaymentMethod,
    removePaymentMethod,
    getPaymentMethods,
    buyCourseIntent,
} from "./Services/payment.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
import { USER_ROLES } from "../../Constants/constants.js";

const paymentRouter = Router();

paymentRouter.post(
    "/buy-course-intent",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(buyCourseIntent)
);
paymentRouter.post(
    "/create-setup-intent",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(createSetupIntent)
);
paymentRouter.get(
    "/payment-methods",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(getPaymentMethods)
);
paymentRouter.post(
    "/add-payment-method",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(addPaymentMethod)
);
paymentRouter.delete(
    "/remove-payment-method/:pmId",
    authenticationMiddleware,
    authorizationMiddleware(USER_ROLES.STUDENT),
    errorHandlerMiddleware(removePaymentMethod)
);

export default paymentRouter;
