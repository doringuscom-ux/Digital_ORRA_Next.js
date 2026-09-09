import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

// GET /api/courses/:id
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const course = await Course.findOne({ id });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch course", message: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/courses/:id
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const updated = await Course.findOneAndUpdate(
      { id },
      { $set: body },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update course", message: err.message },
      { status: 400 }
    );
  }
}

// DELETE /api/courses/:id
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const deleted = await Course.findOneAndDelete({ id });
    if (!deleted) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete course", message: err.message },
      { status: 500 }
    );
  }
}
