import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Digital Marketing" },
    image: { type: String },
    imageAlt: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    date: { type: String },
    excerpt: { type: String },
    content: { type: String },
    author: { type: String, default: "Digital ORRA Team" },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
