
import express from "express";
import Venue from "../models/Venue.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const venue = await Venue.findOne();
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch venue.", error: err.message });
  }
});

router.put("/", requireAdmin, async (req, res) => {
  try {
    const venue = await Venue.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json(venue);
  } catch (err) {
    res.status(400).json({ message: "Failed to update venue.", error: err.message });
  }
});

router.delete("/", requireAdmin, async (req, res) => {
  try {
    await Venue.deleteMany({});
    res.json({ message: "Venue details cleared." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete venue.", error: err.message });
  }
});

export default router;