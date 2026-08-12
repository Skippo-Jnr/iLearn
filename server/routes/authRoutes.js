import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import {
  changePassword,
  getProfile,
  isAuth,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/authController.js";

const authRouter = express.Router();

// Validation Rules
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Public Routes
authRouter.post("/register", registerValidation, validate, register);
authRouter.post("/login", loginValidation, validate, login);
authRouter.post("/logout", logout);

// Protected Routes
authRouter.get("/profile", protect, getProfile);
authRouter.put("/profile", protect, updateProfile);
authRouter.post("/change-password", protect, changePassword);
authRouter.get("/is-auth", protect, isAuth);

export default authRouter;
