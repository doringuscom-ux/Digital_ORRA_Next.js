import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { verifyAdmin } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const review = await Review.findByIdAndUpdate(id, body, { new: true });
    if (!review) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating review", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    await dbConnect();
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting review", error: error.message },
      { status: 500 }
    );
  }
}

