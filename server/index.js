// For Vercel - export the app
export { default } from "./src/main.js";

import bootstrap from "./src/main.js";

// For local development
if (process.env.NODE_ENV !== "production") {
    bootstrap();
}
