import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";

// GET /api/gallery (Optional ?category=XYZ)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query = category ? { category: { $regex: new RegExp(`^${category}$`, "i") } } : {};
    const items = await Gallery.find(query).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch gallery items", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/gallery
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.image) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const newItem = new Gallery({
      title: body.title || "",
      category: body.category || "Team & Events",
      image: body.image,
    });

    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create gallery item", message: err.message },
      { status: 400 }
    );
  }
}

// PUT /api/gallery (Update item by ID)
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Item _id is required for update" },
        { status: 400 }
      );
    }

    const updated = await Gallery.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update gallery item", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery?id=XYZ
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Gallery item deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete gallery item", message: err.message },
      { status: 500 }
    );
  }
}
