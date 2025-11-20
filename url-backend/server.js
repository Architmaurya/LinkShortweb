import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

// Clean BASE_URL (remove trailing slash)
const FRONTEND_URL = process.env.BASE_URL?.replace(/\/$/, "");

app.use(
  cors({
    origin: FRONTEND_URL,   // <-- Pick frontend URL from .env
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use(express.json());

// Welcome Route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend is running successfully!");
});

// Connect DB
connectDB();

// URL Routes
app.use("/", urlRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
