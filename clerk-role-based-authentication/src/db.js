import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            connectTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};