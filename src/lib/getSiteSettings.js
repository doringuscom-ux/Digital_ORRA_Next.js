import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import SiteSetting from "@/models/SiteSetting";

export const SITE_SETTINGS_TAG = "site-settings";

// Cached until an admin saves new settings (PUT /api/settings revalidates the tag + pages)
const loadSiteSettings = unstable_cache(
  async () => {
    await dbConnect();
    const settings = await SiteSetting.findOne({ key: "global" }).lean();
    return {
      gaMeasurementId: settings?.gaMeasurementId || "",
      gaEnabled: Boolean(settings?.gaEnabled),
    };
  },
  ["site-settings"],
  { tags: [SITE_SETTINGS_TAG] }
);

export async function getSiteSettings() {
  try {
    return await loadSiteSettings();
  } catch (error) {
    // Never break the website if the DB is unreachable
    console.error("getSiteSettings error:", error.message);
    return { gaMeasurementId: "", gaEnabled: false };
  }
}
