
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },
    role: { type: String, required: true, trim: true },
    team: { type: String, default: "" }, 
    socials: {
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);