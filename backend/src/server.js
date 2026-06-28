import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";
import { protectedRoute, protectedAdminRoute } from "./middlewares/authMiddleware.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import adminRoute from "./routes/adminRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  }),
);

// public route
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// admin route
app.use("/api/admins", protectedAdminRoute, adminRoute);
// private route
app.use("/api/users", protectedRoute, userRoute);

// Running server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`::: Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
