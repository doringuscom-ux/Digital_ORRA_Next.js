import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import { verifyAdmin } from "@/lib/auth";

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
