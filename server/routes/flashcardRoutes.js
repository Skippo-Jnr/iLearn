import express from "express";
import { protect } from "../middleware/auth.js";
import {
  deleteFlashcardSet,
  getAllFlashcardSets,
  getFlashcards,
  reviewFlashcard,
  toggleStarFlashcard,
} from "../controllers/flashcardController.js";

const flashcardRouter = express.Router();

flashcardRouter.use(protect);

flashcardRouter.get("/", getAllFlashcardSets);
flashcardRouter.get("/:documentId", getFlashcards);
flashcardRouter.post("/:cardId/review", reviewFlashcard);
flashcardRouter.put("/:cardId/star", toggleStarFlashcard);
flashcardRouter.delete("/:id", deleteFlashcardSet);

export default flashcardRouter;
