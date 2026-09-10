import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    location: { type: String },
    category: { type: String, default: "General" },
    project: { type: String },
    rating: { type: Number, default: 5 },
    quote: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
