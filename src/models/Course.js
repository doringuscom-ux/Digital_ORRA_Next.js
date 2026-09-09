import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    category: { type: String },
    level: { type: String },
    duration: { type: String },
    badge: { type: String },
    price: { type: String },
    originalPrice: { type: String },
    discount: { type: String },
    subtitle: { type: String },
    description: { type: String },
    shortDesc: { type: String },
    fullDesc: { type: String },
    idealFor: { type: String },
    popular: { type: Boolean },
    hasInternship: { type: Boolean },
    placementAssistance: { type: Boolean },
    rating: { type: String, default: "4.9" },
    enrolledCount: { type: String, default: "500+" },
    certification: { type: String },
    syllabus: [{ type: String }],
    modules: [
      {
        title: { type: String },
        topics: [{ type: String }],
      },
    ],
    highlights: [{ type: String }],
    curriculumPDF: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
