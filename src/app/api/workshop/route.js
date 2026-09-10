import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WorkshopMedia from "@/models/WorkshopMedia";
import { verifyAdmin } from "@/lib/auth";

// GET /api/workshop (Optional ?category=XYZ)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter = category && category !== "all" ? { category } : {};
    const items = await WorkshopMedia.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch workshop media", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/workshop (Admin)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.image) {
      return NextResponse.json({ message: "Image URL is required" }, { status: 400 });
    }

    const item = new WorkshopMedia({
      title: body.title || "",
      category: body.category || "College Workshops",
      image: body.image,
      imageId: body.imageId || "",
    });

    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to add workshop image", error: err.message },
      { status: 500 }
    );
  }
}
