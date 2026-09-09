import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    pagePath: { 
      type: String, 
      required: true, 
      unique: true, // e.g. "/", "/about-us", "/services", etc.
      trim: true 
    },
    pageName: { 
      type: String, 
      required: true 
    }, // e.g. "Home Page", "About Us", etc.
    metaTitle: { 
      type: String, 
      required: true 
    },
    metaDescription: { 
      type: String, 
      required: true 
    },
    metaKeywords: { 
      type: String, 
      default: "" 
    },
    ogImage: { 
      type: String, 
      default: "/DO JPG.jpeg" 
    },
    canonicalUrl: { 
      type: String, 
      default: "" 
    },
    robots: { 
      type: String, 
      default: "index, follow" 
    },
    pageSlug: { 
      type: String, 
      trim: true 
    },
    structuredData: { 
      type: String, 
      default: "" 
    } // Optional JSON-LD Schema
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Seo || mongoose.model("Seo", seoSchema);
