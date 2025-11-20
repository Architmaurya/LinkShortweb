import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

// Clean BASE_URL (remove trailing slash)
// const FRONTEND_URL = process.env.BASE_URL?.replace(/\/$/, "");

app.use(
  cors({
    origin: [
      process.env.BASE_URL?.replace(/\/$/, ""),  // main frontend
      /\.vercel\.app$/,                           // all Vercel deployments
    ],
    methods: ["GET", "POST"],
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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running `);
});
