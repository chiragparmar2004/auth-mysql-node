import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// Route to handle user registration
router.post("/register", register);

// Route to handle user login
router.post("/login", login);

export default router;
