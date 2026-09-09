import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    imageId: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
