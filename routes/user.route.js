import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the authMiddleware
import { getProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Protected route to get user profile
router.get("/profile", authMiddleware, getProfile);

export default router;
