import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    image: { type: String, required: true },
    order: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
