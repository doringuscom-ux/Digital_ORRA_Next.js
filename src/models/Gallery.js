import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    category: { type: String, default: "Team & Events" },
    image: { type: String, required: true },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
