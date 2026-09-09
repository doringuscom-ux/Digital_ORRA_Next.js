import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import { servicesData } from "@/data/servicesData";

// GET /api/services
export async function GET() {
  try {
    await dbConnect();
    let services = await Service.find().sort({ order: 1, createdAt: 1 });

    // If database has no services yet, seed with default servicesData
    if (!services || services.length === 0) {
      const seeded = await Service.insertMany(
        servicesData.map((s, idx) => ({ ...s, order: idx }))
      );
      services = seeded;
    }

    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch services", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/services
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newService = new Service(body);
    await newService.save();
    return NextResponse.json(newService, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create service", message: err.message },
      { status: 400 }
    );
  }
}
