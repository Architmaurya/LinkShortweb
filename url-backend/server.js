import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Welcome Route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend is running successfully!");
});

// Connect DB
connectDB();

// API Routes
app.use("/api", statusRoutes);

// URL Routes
app.use("/", urlRoutes);

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () =>
  console.log(`🚀 Server running at `)
);
