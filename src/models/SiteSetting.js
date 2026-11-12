import mongoose from "mongoose";

// Single global settings document (key: "global") editable from the Admin Panel
const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "global",
    },
    gaMeasurementId: {
      type: String,
      default: "",
      trim: true,
    },
    gaEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", siteSettingSchema);
