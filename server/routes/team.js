
import express from "express";
import TeamMember from "../models/TeamMember.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team members.", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Team member not found." });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team member.", error: err.message });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: "Failed to create team member.", error: err.message });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ message: "Team member not found." });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: "Failed to update team member.", error: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Team member not found." });
    res.json({ message: "Team member deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete team member.", error: err.message });
  }
});

export default router;