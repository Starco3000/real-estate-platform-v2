import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import { protectedRoute } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true,
  }),
);

// public route
app.use('/api/auth', authRoute);

// private route
app.use(protectedRoute);
app.use('/api/users', userRoute);

// Running server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`::: Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
