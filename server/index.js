

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import speakerRoutes from "./routes/speakers.js";


dotenv.config();
const app=express();
const PORT= process.env.PORT || 8080;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/speakers", speakerRoutes);


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});