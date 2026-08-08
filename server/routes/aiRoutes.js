import express from "express";
import { protect } from "../middleware/auth.js";
import {
  chat,
  explainConcept,
  generateFlashcards,
  generateQuiz,
  generateSummary,
  getChatHistory,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.use(protect);

aiRouter.post("/generate-flashcards", generateFlashcards);
aiRouter.post("/generate-quiz", generateQuiz);
aiRouter.post("/generate-summary", generateSummary);
aiRouter.post("/chat", chat);
aiRouter.post("/explain-concept", explainConcept);
aiRouter.get("/chat-history/:documentId", getChatHistory);

export default aiRouter;
