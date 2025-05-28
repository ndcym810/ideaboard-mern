import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoute from "./routes/notes.routes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/v1/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
