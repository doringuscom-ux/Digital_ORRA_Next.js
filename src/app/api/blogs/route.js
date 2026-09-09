import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// GET /api/blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().lean();

    // Sort by published date (newest first)
    blogs.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      if (dateA !== dateB) {
        return dateB - dateA;
      }
      const createdA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const createdB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return createdB - createdA;
    });

    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", message: err.message },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      category,
      image,
      imageAlt,
      metaTitle,
      metaDescription,
      metaKeywords,
      readTime,
      date,
      excerpt,
      content,
      author,
      titleColor,
      titleSize,
      titleAlign,
      bodyFontSize,
      fontFamily,
      accentColor,
    } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Blog title is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Auto generate slug if not provided
    let finalSlug = slug
      ? slug
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

    if (!finalSlug) {
      finalSlug = `blog-${Date.now()}`;
    }

    // Check if slug already exists
    const existing = await Blog.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = new Blog({
      title,
      slug: finalSlug,
      category: category || "Digital Marketing",
      image: image || "",
      imageAlt: imageAlt || title || "",
      metaTitle: metaTitle || title || "",
      metaDescription: metaDescription || excerpt || "",
      metaKeywords: metaKeywords || "",
      readTime: readTime || "5 min read",
      date: date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      excerpt: excerpt || "",
      content: content || "",
      author: author || "Digital ORRA Team",
      titleColor: titleColor || "#ffffff",
      titleSize: titleSize || "large",
      titleAlign: titleAlign || "left",
      bodyFontSize: bodyFontSize || "normal",
      fontFamily: fontFamily || "sans",
      accentColor: accentColor || "#FF3399",
    });

    await newBlog.save();

    return NextResponse.json({
      success: true,
      message: "Blog published successfully!",
      blog: newBlog,
    });
  } catch (err) {
    console.error("Create blog error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create blog.", error: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/blogs - Update existing blog
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully!",
      blog: updatedBlog,
    });
  } catch (err) {
    console.error("Update blog error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update blog.", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs?id=xxx - Delete blog
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    console.error("Delete blog error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog.", error: err.message },
      { status: 500 }
    );
  }
}
