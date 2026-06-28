import express from "express";
import { authAdmin } from "../controllers/adminController.js";
import { refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", authAdmin);
// router.post('/refresh', refreshToken);


export default router;
