import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";

// GET /api/contact
export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve inquiries.", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/contact
export async function POST(req) {
  try {
    const { fullName, email, phone, service, budget, message } = await req.json();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide full name, email, and a message." },
        { status: 400 }
      );
    }

    await dbConnect();
    const newInquiry = new Contact({
      fullName,
      email,
      phone: phone || "",
      service: service || "General Inquiry",
      budget: budget || "Flexible",
      message,
    });

    await newInquiry.save();

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully! Our team will get back to you within 2 hours.",
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error while submitting your inquiry. Please try again.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
