import { Router } from "express";
import { register, verifyEmail } from "./Services/auth.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/error.handler.middleware.js";
const authRouter = Router();

authRouter.post("/register", errorHandlerMiddleware(register));
authRouter.get("/verify/:token", errorHandlerMiddleware(verifyEmail));

export default authRouter;
