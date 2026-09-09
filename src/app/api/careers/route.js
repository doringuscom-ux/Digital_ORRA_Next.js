import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

const defaultJobs = [
  {
    title: "Senior Performance Marketing Specialist",
    department: "Marketing & Paid Ads",
    location: "Panchkula, India",
    experience: "2 - 5 Years",
    type: "Full-Time (On-site)",
    salary: "₹35,000 - ₹60,000 / mo",
    description: "Lead high-ROAS Meta and Google ad campaigns for premier e-commerce and lead-gen brands. Experience with CAPI, lookalikes, and scaling frameworks is essential.",
    requirements: [
      "2+ years running profitable Meta & Google ad campaigns",
      "Proficiency in GA4, Meta Pixel, and CRO",
      "Analytical mindset with creative copy understanding"
    ],
    responsibilities: [
      "Manage daily ad spend across client accounts",
      "A/B test creatives, hooks, and landing pages",
      "Deliver weekly performance reports to stakeholders"
    ],
    isOpen: true,
  },
  {
    title: "SEO Strategist & Technical Lead",
    department: "Search & Growth",
    location: "Panchkula, India",
    experience: "2 - 4 Years",
    type: "Full-Time (On-site)",
    salary: "₹30,000 - ₹50,000 / mo",
    description: "Drive commercial organic rankings for our global and national clients. Expertise in technical audits, topical clusters, schema markup, and AI search (AEO/GEO) required.",
    requirements: [
      "Proven track record ranking high-competition keywords",
      "Experience with Ahrefs, SEMrush, Screaming Frog",
      "Strong grasp of on-page, off-page, and technical SEO"
    ],
    responsibilities: [
      "Perform deep technical site audits and fix indexing issues",
      "Execute high-quality backlink outreach campaigns",
      "Collaborate with content teams for keyword-rich blogs"
    ],
    isOpen: true,
  },
  {
    title: "Full-Stack Web Developer (Next.js & MERN)",
    department: "Engineering & Tech",
    location: "Panchkula, India",
    experience: "1 - 3 Years",
    type: "Full-Time (On-site)",
    salary: "₹30,000 - ₹55,000 / mo",
    description: "Build ultra-fast, responsive web applications, landing pages, and internal tools using Next.js 15, React, Node.js, and MongoDB.",
    requirements: [
      "Solid knowledge of React, Next.js, and Tailwind CSS",
      "Experience with MongoDB and REST/GraphQL APIs",
      "Eye for modern design animations and page speed"
    ],
    responsibilities: [
      "Develop and maintain agency web platforms and client projects",
      "Ensure 95+ Google PageSpeed scores and mobile responsiveness",
      "Integrate payment gateways and CRM webhooks"
    ],
    isOpen: true,
  }
];

// GET /api/careers
export async function GET() {
  try {
    await dbConnect();
    let jobs = await Career.find().sort({ createdAt: -1 });

    // Seed default jobs if collection is completely empty
    if (!jobs || jobs.length === 0) {
      jobs = await Career.insertMany(defaultJobs);
    }

    return NextResponse.json(jobs);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch career openings", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/careers (Create Job Opening)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    const newJob = new Career({
      title: body.title,
      department: body.department || "General",
      location: body.location || "Panchkula, India",
      experience: body.experience || "1 - 3 Years",
      type: body.type || "Full-Time (On-site)",
      salary: body.salary || "Competitive",
      description: body.description || "",
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      isOpen: body.isOpen ?? true,
    });

    await newJob.save();
    return NextResponse.json(newJob, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create job opening", message: err.message },
      { status: 400 }
    );
  }
}

// PUT /api/careers (Update Job Opening)
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Job _id is required for update" },
        { status: 400 }
      );
    }

    const updated = await Career.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Job opening not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update job opening", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/careers?id=XYZ
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Career.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Job opening not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Job opening deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete job opening", message: err.message },
      { status: 500 }
    );
  }
}
