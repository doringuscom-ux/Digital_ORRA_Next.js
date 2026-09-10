import mongoose from "mongoose";

const workshopMediaSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    category: { 
      type: String, 
      default: "College Workshops",
      required: true 
    },
    image: { type: String, required: true },
    imageId: { type: String, default: "" },
  },
  { timestamps: true }
);

if (mongoose.models.WorkshopMedia) {
  delete mongoose.models.WorkshopMedia;
}

export default mongoose.model("WorkshopMedia", workshopMediaSchema);
