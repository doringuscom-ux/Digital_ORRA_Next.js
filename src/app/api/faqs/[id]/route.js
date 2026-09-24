import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faq";
import { verifyAdmin } from "@/lib/auth";

// PUT /api/faqs/[id]
export async function PUT(req, { params }) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    const updatePayload = {};
    if (body.question !== undefined) updatePayload.question = body.question;
    if (body.answer !== undefined) updatePayload.answer = body.answer;
    if (body.category !== undefined) updatePayload.category = body.category;
    if (body.order !== undefined) updatePayload.order = Number(body.order) || 0;
    if (body.isActive !== undefined) updatePayload.isActive = Boolean(body.isActive);

    const faq = await Faq.findByIdAndUpdate(id, updatePayload, { new: true });
    if (!faq) {
      return NextResponse.json({ message: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating FAQ", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/faqs/[id]
export async function DELETE(req, { params }) {
  try {
    const authCheck = verifyAdmin(req);
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { id } = await params;
    await dbConnect();
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) {
      return NextResponse.json({ message: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting FAQ", error: error.message },
      { status: 500 }
    );
  }
}
