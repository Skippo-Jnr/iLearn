import express from "express";
import { protect } from "../middleware/auth.js";
import {
  deleteDocument,
  getDocument,
  getDocuments,
  updateDocument,
  uploadDocument,
} from "../controllers/documentController.js";
import upload from "../config/multer.js";

const documentRouter = express.Router();

// all routes are protected, so we can use the protect middleware for all routes in this router
documentRouter.use(protect);

documentRouter.post("/upload", upload.single("file"), uploadDocument);
documentRouter.get("/", getDocuments);
documentRouter.get("/:id", getDocument);
documentRouter.delete("/:id", deleteDocument);
documentRouter.put("/:id", updateDocument);

export default documentRouter;
