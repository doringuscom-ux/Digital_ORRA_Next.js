import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: "General" },
    location: { type: String, default: "Panchkula, India" },
    experience: { type: String, default: "Minimum 2 Years" },
    type: { type: String, default: "On-site Role" },
    salary: { type: String, default: "As per market standard" },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    responsibilities: [{ type: String }],
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Career || mongoose.model("Career", careerSchema);
