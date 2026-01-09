import mongoose from "mongoose";

const connection = async () => {
    try {
        // OLD => Local DB
        // await mongoose.connect(process.env.DATABASE_URL);

        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to database");
    } catch (error) {
        console.log("Database connection failed", error);
    }
};

export default connection;
