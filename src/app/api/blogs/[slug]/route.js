import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// GET /api/blogs/:slug
export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const rawSlug = (slug || "").trim();

    await dbConnect();
    let blog = await Blog.findOne({ slug: rawSlug });

    // Fallback: match by title regex or id
    if (!blog && rawSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(rawSlug);
    }

    if (!blog) {
      // Find by relaxed slug match
      const all = await Blog.find({}, { title: 1, slug: 1 });
      const found = all.find((b) => {
        const norm = (b.title || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return norm === rawSlug || b.slug === rawSlug;
      });
      if (found) {
        blog = await Blog.findById(found._id);
      }
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch blog", message: err.message },
      { status: 500 }
    );
  }
}
