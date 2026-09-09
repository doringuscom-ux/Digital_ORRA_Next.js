import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

import { coursesData } from "@/data/coursesData";

// GET /api/courses
export async function GET() {
  try {
    await dbConnect();
    let courses = await Course.find().sort({ order: 1, createdAt: 1 });
    
    // If database has no courses yet, automatically populate with existing coursesData
    if (!courses || courses.length === 0) {
      const seeded = await Course.insertMany(
        coursesData.map((c, idx) => ({ ...c, order: idx }))
      );
      courses = seeded;
    }

    return NextResponse.json(courses);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch courses", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/courses
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newCourse = new Course(body);
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create course", message: err.message },
      { status: 400 }
    );
  }
}

// PUT /api/courses (Update course by ID)
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Course _id is required for update" },
        { status: 400 }
      );
    }

    const updated = await Course.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update course", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/courses?id=XYZ
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete course", message: err.message },
      { status: 500 }
    );
  }
}
