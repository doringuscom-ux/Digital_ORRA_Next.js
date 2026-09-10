import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// GET /api/blogs/:slug
export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const rawSlug = (slug || "").trim();

    await dbConnect();
    let blog = await Blog.findOne({ slug: rawSlug }).lean();

    // Fallback: match by id if valid ObjectId
    if (!blog && rawSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(rawSlug).lean();
    }

    if (!blog) {
      // Find by normalized slug match limit 1
      const escaped = rawSlug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      blog = await Blog.findOne({
        $or: [
          { slug: { $regex: new RegExp(`^${escaped}$`, 'i') } },
          { title: { $regex: new RegExp(`^${escaped.replace(/-/g, ' ')}$`, 'i') } }
        ]
      }).lean();
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch blog", message: err.message },
      { status: 500 }
    );
  }
}
