import express from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import routerHandler from "./Utils/router.handler.js";
import connection from "./DB/connection.js";
import { globalErrorHandler } from "./Middlewares/error.handler.middleware.js";

config();

const app = express();
const isVercel = !!process.env.VERCEL;

const allowedOrigins = (
    process.env.FRONTEND_URL || process.env.FRONTEND_DEFAULT_URL
)
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""));

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

if (!isVercel) {
    app.use("/Media", express.static("Media"));
}

connection();
routerHandler(app);
app.use(globalErrorHandler);

app.get("/", (req, res) => {
    res.json({
        message: "API is running",
        status: "OK",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

if (!isVercel) {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "..", "client", "dist")));
    app.use((req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "dist", "index.html")
        );
    });
}

export default app;
