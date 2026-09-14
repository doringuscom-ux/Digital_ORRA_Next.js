import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String },
    shortDesc: { type: String },
    desc: { type: String },
    fullDesc: { type: String },
    image: { type: String },
    imageAlt: { type: String },
    iconName: { type: String, default: "Globe" },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    features: [{ type: String }],
    deliverables: [
      {
        title: { type: String },
        desc: { type: String },
      },
    ],
    process: [
      {
        step: { type: String },
        title: { type: String },
        desc: { type: String },
      },
    ],
    faqs: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
