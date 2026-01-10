import express from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import routerHandler from "./Utils/router.handler.js";
import connection from "./DB/connection.js";
import { globalErrorHandler } from "./Middlewares/error.handler.middleware.js";

config();

const app = express();
const port = process.env.PORT || 4000;

// Detect environment
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production" || isVercel;

// CORS configuration
app.use(
    cors({
        origin: isProduction
            ? process.env.ALLOWED_ORIGINS?.split(",") || "*"
            : ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Only serve static files in development (not on Vercel)
if (!isVercel) {
    app.use("/Media", express.static("Media"));
}

// Connect to database
connection();

// Register routes
routerHandler(app);

// Global error handler
app.use(globalErrorHandler);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "API is running",
        status: "OK",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

// Serve React build (only in development, not on Vercel)
if (!isVercel) {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "..", "client", "dist")));
    app.use((req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "dist", "index.html")
        );
    });
}

// Bootstrap function for local development
const bootstrap = () => {
    app.listen(port, () => {
        console.log(`Server is running successfully on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
};

// Export both the app and bootstrap function
export default bootstrap;
export { app };
