import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo DB connnected successfully.")
    } catch (error) {
        console.log("Mongo DB Error.")
    }
}

export default connectDb;