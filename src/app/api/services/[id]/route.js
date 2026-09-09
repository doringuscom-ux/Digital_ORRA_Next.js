import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import mongoose from "mongoose";

function getQueryFilter(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }, { id }] };
  }
  return { id };
}

// GET /api/services/:id
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const service = await Service.findOne(getQueryFilter(id));
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch service", message: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/services/:id
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const updated = await Service.findOneAndUpdate(
      getQueryFilter(id),
      { $set: body },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update service", message: err.message },
      { status: 400 }
    );
  }
}

// DELETE /api/services/:id
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const deleted = await Service.findOneAndDelete(getQueryFilter(id));
    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete service", message: err.message },
      { status: 500 }
    );
  }
}
