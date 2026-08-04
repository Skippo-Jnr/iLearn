import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import documentRouter from "./routes/documentRoutes.js";

// ES6 module _dirname alternative
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const port = process.env.PORT;

connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use("/uploads", express.static(path.join(_dirname, "uploads")));

// API Endpoints
app.get("/", (req, res) => res.send("API is working"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/documents", documentRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    statusCode: 404,
  });
});

app.use(errorHandler);

// start server
app.listen(port, () => console.log(`Server started on http:localhost:${port}`));

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
