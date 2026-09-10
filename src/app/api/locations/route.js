import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import LocationPage from "@/models/LocationPage";

// GET /api/locations - Fetch all location pages
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    
    const filter = {};
    if (city && city !== "all") {
      filter.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    const pages = await LocationPage.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(pages, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch location pages", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/locations - Create a location page
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ message: "Page title is required" }, { status: 400 });
    }

    // Generate or clean slug
    let finalSlug = body.slug
      ? body.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : body.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    if (!finalSlug) {
      finalSlug = `location-${Date.now()}`;
    }

    // Check duplicate slug
    const existing = await LocationPage.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newPage = new LocationPage({
      ...body,
      slug: finalSlug,
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.heroSubheadline || body.whyLocalContent?.slice(0, 160) || "",
    });

    await newPage.save();
    return NextResponse.json(newPage, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create location page", error: err.message },
      { status: 500 }
    );
  }
}
