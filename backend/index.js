import express from 'express';
import connectDb from './config/db.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import cors from "cors";
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1508;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : ["http://localhost:5173","http://localhost:5174"],
  credentials : true
}))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
