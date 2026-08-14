

import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },
    designation: { type: String, required: true, trim: true },
    talkTitle: { type: String, default: "" },
    bio: { type: String, default: "" },
    tags: { type: [String], default: [] },
    socials: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Speaker", speakerSchema);