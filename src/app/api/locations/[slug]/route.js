import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import LocationPage from "@/models/LocationPage";
import mongoose from "mongoose";

function getQueryFilter(slugOrId) {
  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return { $or: [{ _id: slugOrId }, { slug: slugOrId }] };
  }
  return { slug: slugOrId };
}

// GET /api/locations/[slug]
export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const page = await LocationPage.findOne(getQueryFilter(slug)).lean();
    if (!page) {
      return NextResponse.json({ message: "Location page not found" }, { status: 404 });
    }

    return NextResponse.json(page, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch location page", error: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/locations/[slug]
export async function PUT(req, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();
    const body = await req.json();

    const updated = await LocationPage.findOneAndUpdate(
      getQueryFilter(slug),
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Location page not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update location page", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/locations/[slug]
export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const deleted = await LocationPage.findOneAndDelete(getQueryFilter(slug));
    if (!deleted) {
      return NextResponse.json({ message: "Location page not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Location page deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete location page", error: err.message },
      { status: 500 }
    );
  }
}
