import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WorkshopMedia from "@/models/WorkshopMedia";
import { verifyAdmin } from "@/lib/auth";

// PUT /api/workshop/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    const updated = await WorkshopMedia.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Workshop item not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update workshop image", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/workshop/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const deleted = await WorkshopMedia.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Workshop item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Workshop image deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete workshop image", error: err.message },
      { status: 500 }
    );
  }
}
