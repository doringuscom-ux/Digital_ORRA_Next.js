import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";

// Initial seed data if collection is empty
const initialTeamData = [
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-1_f4x9zl.jpg",
    name: "Team Member 1",
    role: "",
    order: 1,
    isActive: true,
  },
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-2_j8k3lp.jpg",
    name: "Team Member 2",
    role: "",
    order: 2,
    isActive: true,
  },
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-3_q0we9k.jpg",
    name: "Team Member 3",
    role: "",
    order: 3,
    isActive: true,
  },
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-4_b7t1zq.jpg",
    name: "Team Member 4",
    role: "",
    order: 4,
    isActive: true,
  },
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-5_m4n2vx.jpg",
    name: "Team Member 5",
    role: "",
    order: 5,
    isActive: true,
  },
  {
    image: "https://res.cloudinary.com/dxj3r7kqv/image/upload/v1715423851/team-6_l9p1xs.jpg",
    name: "Team Member 6",
    role: "",
    order: 6,
    isActive: true,
  },
];

// GET: List all team photos sorted strictly by order
export async function GET(req) {
  try {
    await dbConnect();
    let members = await Team.find().sort({ order: 1, createdAt: 1 });

    if (!members || members.length === 0) {
      await Team.insertMany(initialTeamData);
      members = await Team.find().sort({ order: 1, createdAt: 1 });
    }

    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members", message: error.message },
      { status: 500 }
    );
  }
}

// POST: Add a new photo
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.image) {
      return NextResponse.json({ error: "Image URL is required." }, { status: 400 });
    }

    if (body.order === undefined || body.order === null || body.order === "") {
      const highest = await Team.findOne().sort({ order: -1 });
      body.order = highest && highest.order !== undefined ? highest.order + 1 : 1;
    }

    const newMember = await Team.create({
      image: body.image,
      name: body.name || "",
      role: body.role || "",
      order: Number(body.order) || 1,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add team photo", message: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update photo details or reorder positions
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Batch reorder: { reorder: [{ _id, order }, ...] }
    if (body.reorder && Array.isArray(body.reorder)) {
      const bulkOps = body.reorder.map((item) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: { order: Number(item.order) } },
        },
      }));
      await Team.bulkWrite(bulkOps);
      const updatedList = await Team.find().sort({ order: 1, createdAt: 1 });
      return NextResponse.json({ success: true, data: updatedList });
    }

    if (!body._id) {
      return NextResponse.json({ error: "Item ID (_id) is required" }, { status: 400 });
    }

    const updated = await Team.findByIdAndUpdate(
      body._id,
      {
        $set: {
          image: body.image,
          name: body.name || "",
          role: body.role || "",
          order: Number(body.order) || 1,
          isActive: body.isActive !== false,
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team photo", message: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove photo
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await Team.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Photo removed successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team photo", message: error.message },
      { status: 500 }
    );
  }
}
