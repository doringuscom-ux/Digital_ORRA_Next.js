import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/auth";

// GET /api/faqs
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const getAll = searchParams.get("all") === "true";

    const filter = getAll ? {} : { isActive: true };
    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json(faqs, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching FAQs", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/faqs (Admin only)
export async function POST(req) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      );
    }

    await dbConnect();
    const body = await req.json();

    if (!body.question || !body.answer) {
      return NextResponse.json(
        { message: "Question and Answer are required." },
        { status: 400 }
      );
    }

    const faq = new Faq({
      question: body.question,
      answer: body.answer,
      category: body.category || "General",
      order: Number(body.order) || 0,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    });

    await faq.save();
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating FAQ", error: error.message },
      { status: 500 }
    );
  }
}
