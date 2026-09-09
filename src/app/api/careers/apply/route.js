import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";

// POST /api/careers/apply
export async function POST(req) {
  try {
    const {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      experience,
      currentCompany,
      portfolioLink,
      resumeUrl,
      coverLetter,
    } = await req.json();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required fields." },
        { status: 400 }
      );
    }

    await dbConnect();
    const application = new Application({
      jobId: jobId || null,
      jobTitle: jobTitle || "General Application",
      fullName,
      email,
      phone,
      experience: experience || "Fresher",
      currentCompany: currentCompany || "N/A",
      portfolioLink: portfolioLink || "",
      resumeUrl: resumeUrl || "",
      coverLetter: coverLetter || "",
    });

    await application.save();

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully! Our HR team will reach out soon.",
        applicationId: application._id,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit application", message: err.message },
      { status: 500 }
    );
  }
}
