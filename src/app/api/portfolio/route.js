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

// GET /api/portfolio
export async function GET() {
  try {
    await dbConnect();
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching portfolio", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/portfolio (Multipart form data or JSON, Admin only)
export async function POST(req) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json({ message: authCheck.error }, { status: authCheck.status });
    }

    const contentType = req.headers.get("content-type") || "";
    await dbConnect();

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const title = formData.get("title");
      const category = formData.get("category");
      const link = formData.get("link") || "";
      const file = formData.get("image");

      if (!file || typeof file === "string") {
        return NextResponse.json({ message: "Image file is required" }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "digitalorra/portfolio" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      const uploadResult = await uploadPromise;

      const portfolio = new Portfolio({
        title,
        category,
        link,
        image: uploadResult.secure_url,
        imageId: uploadResult.public_id,
      });

      await portfolio.save();
      return NextResponse.json(portfolio, { status: 201 });
    } else {
      // JSON payload
      const body = await req.json();
      const portfolio = new Portfolio(body);
      await portfolio.save();
      return NextResponse.json(portfolio, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
