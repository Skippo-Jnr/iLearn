import express from "express";
import { protect } from "../middleware/auth.js";
import {
  deleteQuiz,
  getQuizById,
  getQuizResults,
  getQuizzes,
  submitQuiz,
} from "../controllers/quizContoller.js";

const quizRouter = express.Router();

quizRouter.use(protect);

quizRouter.get("/:documentId", getQuizzes);
quizRouter.get("/quiz/:id", getQuizById);
quizRouter.post("/:id/submit", submitQuiz);
quizRouter.get("/:id/results", getQuizResults);
quizRouter.delete("/:id", deleteQuiz);

export default quizRouter;
