// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import path from "path";
// import routerHandler from "./Utils/router.handler.js";
// import connection from "./DB/connection.js";
// import { globalErrorHandler } from "./Middlewares/error.handler.middleware.js";
// config();

// const app = express();
// const port = process.env.PORT || 4000;

// const bootstrap = () => {
//     app.use(
//         cors({
//             origin: ["http://localhost:5173"],
//             methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//             credentials: true,
//             allowedHeaders: ["Content-Type", "Authorization"],
//         })
//     );

//     app.use(express.json());
//     app.use("/Media", express.static("Media"));
//     connection();

//     routerHandler(app);

//     app.use(globalErrorHandler);

//     // Serve React build
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, "client", "dist")));
//     app.use((req, res) => {
//         res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//     });

//     app.listen(port, () => {
//         console.log(`Server is running successfully on port ${port}`);
//     });
// };

// export default bootstrap;

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

// Configure app
app.use(
    cors({
        origin: process.env.CLIENT_URL || ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
// app.use("/Media", express.static("Media")); // Won't work on Vercel - use cloud storage

connection();
routerHandler(app);
app.use(globalErrorHandler);

// Only for local development with built client
if (process.env.NODE_ENV !== "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "client", "dist")));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}

// Export app for Vercel (don't call listen in production)
const bootstrap = () => {
    app.listen(port, () => {
        console.log(`Server is running successfully on port ${port}`);
    });
};

// For Vercel deployment
export default app;

// For local development
export { bootstrap };
