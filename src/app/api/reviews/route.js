import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { verifyAdmin } from "@/lib/auth";

// GET /api/reviews
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching reviews", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/reviews (Admin only)
export async function POST(req) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    await dbConnect();
    const body = await req.json();
    const review = new Review(body);
    await review.save();
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding review", error: error.message },
      { status: 500 }
    );
  }
}
