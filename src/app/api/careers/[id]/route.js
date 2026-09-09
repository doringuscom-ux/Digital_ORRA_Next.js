import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

// GET /api/careers/:id
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const job = await Career.findById(id);
    if (!job) {
      return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch job details", message: err.message },
      { status: 500 }
    );
  }
}
