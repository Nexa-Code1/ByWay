import express from "express";
import { config } from "dotenv";
import cors from "cors";
import routerHandler from "./Utils/router.handler.js";
import connection from "./DB/connection.js";
import { globalErrorHandler } from "./Middlewares/error.handler.middleware.js";
config();

const app = express();
const port = process.env.PORT || 4000;

const bootstrap = () => {
    app.use(
        cors({
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"],
        })
    );

    app.use(express.json());
    app.use("/Media", express.static("Media"));
    connection();

    routerHandler(app);

    app.use(globalErrorHandler);
    app.listen(port, () => {
        console.log(`Server is running successfully on port ${port}`);
    });
};

export default bootstrap;
