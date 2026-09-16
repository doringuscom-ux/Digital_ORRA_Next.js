import mongoose from "mongoose";

const locationPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    city: { type: String, default: "Panchkula" },
    heroBadge: { type: String, default: "Premier Web Solutions in Panchkula" },
    heroHeadline: { type: String, required: true },
    heroSubheadline: { type: String },
    heroImage: { type: String, default: "" },
    
    // Overview / Why Local section
    whyLocalSuperTitle: { type: String, default: "" },
    whyLocalTitle: { type: String, default: "" },
    whyLocalContent: { type: String },
    whyLocalImage: { type: String, default: "" },
    whyLocalImagePosition: { type: String, default: "right" },

    // Additional Custom Sections (Like Local Market Dominance card style)
    customSections: [
      {
        superTitle: { type: String, default: "" },
        title: { type: String, default: "" },
        content: { type: String, default: "" },
        image: { type: String, default: "" },
        imagePosition: { type: String, default: "right" } // "left" or "right"
      }
    ],
    
    // Why Choose Digital ORRA
    whyChooseTitle: { type: String, default: "Why Choose Digital ORRA as Your Web Development Partner" },
    whyChooseReasons: [
      {
        title: { type: String },
        desc: { type: String },
        iconName: { type: String, default: "CheckCircle2" }
      }
    ],

    // Comprehensive Services
    servicesTitle: { type: String, default: "Our Comprehensive Website Services" },
    servicesSubtitle: { type: String },
    servicesList: [
      {
        title: { type: String },
        desc: { type: String },
        image: { type: String, default: "" }
      }
    ],

    // Development Process
    processTitle: { type: String, default: "The Digital ORRA Development Process" },
    processSubtitle: { type: String },
    processSteps: [
      {
        step: { type: String },
        title: { type: String },
        desc: { type: String }
      }
    ],

    // Why We're the Best
    whyBestTitle: { type: String, default: "Why We're the Best Website Designing Company" },
    whyBestPoints: [
      {
        title: { type: String },
        desc: { type: String }
      }
    ],

    // Bottom highlights
    localAdvantageTitle: { type: String, default: "Local Presence, Global Standards" },
    localAdvantageContent: { type: String },
    localAdvantageImage: { type: String, default: "" },

    ctaTitle: { type: String, default: "Your Digital Journey Starts Here" },
    ctaSubtitle: { type: String },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    ogImage: { type: String, default: "/DO JPG.jpeg" },
    
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true, strict: false }
);

if (mongoose.models.LocationPage) {
  delete mongoose.models.LocationPage;
}

export default mongoose.model("LocationPage", locationPageSchema);
