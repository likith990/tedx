

import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    mapEmbedUrl: { type: String, default: "" },
    directionsUrl: { type: String, default: "" }, 
    date: { type: String, default: "" }, 
    time: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Venue", venueSchema);