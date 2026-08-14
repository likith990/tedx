

import express from "express";
import Speaker from "../models/Speaker.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const speakers = await Speaker.find().sort({ order: 1, createdAt: 1 });
    res.json(speakers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch speakers.", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) return res.status(404).json({ message: "Speaker not found." });
    res.json(speaker);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch speaker.", error: err.message });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);
    res.status(201).json(speaker);
  } catch (err) {
    res.status(400).json({ message: "Failed to create speaker.", error: err.message });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!speaker) return res.status(404).json({ message: "Speaker not found." });
    res.json(speaker);
  } catch (err) {
    res.status(400).json({ message: "Failed to update speaker.", error: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) return res.status(404).json({ message: "Speaker not found." });
    res.json({ message: "Speaker deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete speaker.", error: err.message });
  }
});

export default router;