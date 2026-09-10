import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req, { params }) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    const portfolio = await Portfolio.findByIdAndUpdate(id, body, { new: true });
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio item not found" }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
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

    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio item not found" }, { status: 404 });
    }

    if (portfolio.imageId) {
      await cloudinary.uploader.destroy(portfolio.imageId);
    }

    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

