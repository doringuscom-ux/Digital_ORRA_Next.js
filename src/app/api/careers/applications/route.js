import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";

// GET /api/careers/applications - View candidate job submissions
export async function GET() {
  try {
    await dbConnect();
    const applications = await Application.find().sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch job applications", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/careers/applications?id=XYZ - Remove application
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await Application.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete application", message: err.message },
      { status: 500 }
    );
  }
}
