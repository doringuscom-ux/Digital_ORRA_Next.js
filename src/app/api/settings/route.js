import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { SITE_SETTINGS_TAG } from "@/lib/getSiteSettings";
import dbConnect from "@/lib/dbConnect";
import SiteSetting from "@/models/SiteSetting";
import { verifyAdmin } from "@/lib/auth";

// GA4 Measurement IDs look like "G-ABC123XYZ9"
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

function toPublic(settings) {
  return {
    gaMeasurementId: settings?.gaMeasurementId || "",
    gaEnabled: Boolean(settings?.gaEnabled),
    updatedAt: settings?.updatedAt || null,
  };
}

// GET /api/settings (public — only non-secret values are returned)
export async function GET() {
  try {
    await dbConnect();
    const settings = await SiteSetting.findOne({ key: "global" }).lean();

    return NextResponse.json(toPublic(settings), {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching settings", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/settings (Admin only)
export async function PUT(req) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const body = await req.json();
    const gaMeasurementId = String(body.gaMeasurementId || "").trim().toUpperCase();
    const gaEnabled = Boolean(body.gaEnabled);

    if (gaMeasurementId && !GA_ID_PATTERN.test(gaMeasurementId)) {
      return NextResponse.json(
        { message: "Invalid Measurement ID. It should look like G-XXXXXXXXXX." },
        { status: 400 }
      );
    }

    if (gaEnabled && !gaMeasurementId) {
      return NextResponse.json(
        { message: "Enter a Measurement ID before enabling Google Analytics." },
        { status: 400 }
      );
    }

    await dbConnect();
    const settings = await SiteSetting.findOneAndUpdate(
      { key: "global" },
      { $set: { gaMeasurementId, gaEnabled } },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    ).lean();

    // Expire cached settings immediately and rebuild every page with the new GA ID in its HTML
    revalidateTag(SITE_SETTINGS_TAG, { expire: 0 });
    revalidatePath("/", "layout");

    return NextResponse.json(toPublic(settings));
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving settings", error: error.message },
      { status: 500 }
    );
  }
}
