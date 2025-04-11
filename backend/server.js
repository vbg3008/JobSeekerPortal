import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import jobRoutes from "./routes/jobRoutes.js";
app.use("/api/jobs", jobRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the JobSeekerPortal API" });
});

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
