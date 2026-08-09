import express from "express";
import { protect } from "../middleware/auth.js";
import { getDashboard } from "../controllers/progressController.js";

const progressRouter = express.Router();

progressRouter.use(protect);
progressRouter.get("/dashboard", getDashboard);

export default progressRouter;
