"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Eye,
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  Calendar,
  Clock,
  User,
  X,
  Trash2,
  Globe,
  Search,
  Key,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function EditBlogPage() {
  const params = useParams();
  const blogId = params?.id;
  const router = useRouter();

  const fileInputRef = useRef(null);
  const inlineFileInputRef = useRef(null);
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [rightTab, setRightTab] = useState("preview"); // "preview" or "seo"

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Digital Marketing",
    author: "Digital ORRA Team",
    image: "",
    imageAlt: "",
    excerpt: "",
    content: "",
    readTime: "5 min read",
    date: "",
    // SEO & Meta Data
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    // Styling Controls
    titleColor: "#ffffff",
    titleAlign: "left",
    titleSize: "large",
    bodyFontSize: "normal",
    fontFamily: "sans",
    accentColor: "#FF3399",
  });

  // Fetch Existing Blog Details
  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (res.ok) {
          const blog = await res.json();
          setFormData({
            title: blog.title || "",
            slug: blog.slug || "",
            category: blog.category || "Digital Marketing",
            author: blog.author || "Digital ORRA Team",
            image: blog.image || "",
            imageAlt: blog.imageAlt || "",
            excerpt: blog.excerpt || "",
            content: blog.content || "",
            readTime: blog.readTime || "5 min read",
            date: blog.date || "",
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            metaKeywords: blog.metaKeywords || "",
            titleColor: blog.titleColor || "#ffffff",
            titleAlign: blog.titleAlign || "left",
            titleSize: blog.titleSize || "large",
            bodyFontSize: blog.bodyFontSize || "normal",
            fontFamily: blog.fontFamily || "sans",
            accentColor: blog.accentColor || "#FF3399",
          });

          if (editorRef.current) {
            editorRef.current.innerHTML = blog.content || "";
          }
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  // Set editor HTML once loaded
  useEffect(() => {
    if (!loading && editorRef.current && formData.content) {
      if (!editorRef.current.innerHTML) {
        editorRef.current.innerHTML = formData.content;
      }
    }
  }, [loading, formData.content]);

  // WYSIWYG Command Helper
  const formatDoc = (cmd, value = null) => {
    if (typeof document !== "undefined") {
      document.execCommand(cmd, false, value);
      if (editorRef.current) {
        setFormData((prev) => ({ ...prev, content: editorRef.current.innerHTML }));
      }
    }
  };

  // Upload Cover Image to Cloudinary
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setFeedback({ type: "success", text: "Cover image uploaded to Cloudinary!" });
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to upload image." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Upload error." });
    } finally {
      setUploadingCover(false);
      setTimeout(() => setFeedback({ type: "", text: "" }), 3000);
    }
  };

  // Upload In-Article Image to Cloudinary visually
  const handleInlineImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingInline(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        formatDoc("insertImage", data.url);
        setFeedback({ type: "success", text: "Image inserted into article!" });
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to upload." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Upload failed." });
    } finally {
      setUploadingInline(false);
      setTimeout(() => setFeedback({ type: "", text: "" }), 3000);
    }
  };

  // Add Link Prompt visually
  const handleAddLink = () => {
    const url = prompt("Enter Web Link (e.g. https://digitalorra.com):");
    if (!url) return;
    formatDoc("createLink", url);
  };

  // Save Updates
  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    const finalContent = editorRef.current ? editorRef.current.innerHTML : formData.content;

    if (!formData.title) {
      setFeedback({ type: "error", text: "Please enter a blog title." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          ...formData,
          content: finalContent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: "Blog updated successfully! Redirecting..." });
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1200);
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to update." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Server error while updating." });
    } finally {
      setSaving(false);
    }
  };

  // Delete Blog
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${blogId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Blog deleted successfully.");
        router.push("/admin/blogs");
      }
    } catch (err) {
      alert("Error deleting blog: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1700px] mx-auto p-12 text-center text-gray-400">
        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium">Loading blog details for editing...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1520px] mr-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              Edit <span className="text-gradient">Blog Article</span>
            </h1>
            <p className="text-xs text-gray-400">
              Update article content, layout colors, and live media.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>

          <button
            type="button"
            onClick={handleSaveUpdate}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-[0_8px_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Update</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback.text && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border-red-500/30 text-red-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Split Grid (WordPress Studio Style: Content on Left 8 Cols, Settings & SEO on Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Title & Slug */}
          <div className="rounded-3xl bg-[#0F1B4C]/40 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Type className="w-4 h-4" />
                1. Article Title & Permalink
              </h2>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Article Headline / Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter compelling article headline..."
                className="w-full px-5 py-3.5 bg-[#0A1128]/80 border border-white/10 rounded-2xl text-white text-base sm:text-lg font-bold focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            {/* Slug & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Permalink / Slug
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs">/blog/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full pl-16 pr-4 py-2.5 bg-[#0A1128]/80 border border-white/10 rounded-2xl text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A1128]/80 border border-white/10 rounded-2xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div className="rounded-3xl bg-[#0F1B4C]/40 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                2. Short Excerpt / Summary
              </h2>
              <span className="text-[11px] text-gray-500 font-mono">
                {formData.excerpt?.length || 0} characters
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary that appears on blog cards, search previews, and social media shares..."
              className="w-full min-h-[110px] px-5 py-3.5 bg-[#0A1128]/80 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-amber-400 leading-relaxed transition-all"
            />
          </div>

          {/* Article Content / Visual Editor */}
          <div className="rounded-3xl bg-[#0F1B4C]/40 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                3. Article Content (WYSIWYG Visual Editor)
              </h2>
              <span className="text-[11px] text-gray-500">Live visual formatting</span>
            </div>

            <input
              type="file"
              ref={inlineFileInputRef}
              onChange={handleInlineImageUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Visual Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-2 bg-[#0A1128] border border-white/10 rounded-2xl">
              {/* Heading Dropdown (Paragraph, H1, H2, H3, H4, H5) */}
              <div className="relative">
                <select
                  defaultValue="<p>"
                  onChange={(e) => {
                    formatDoc("formatBlock", e.target.value);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer appearance-none pr-7"
                >
                  <option value="<p>" className="bg-[#0A1128] text-gray-200">Paragraph (Normal)</option>
                  <option value="<h1>" className="bg-[#0A1128] text-white font-bold">H1 - Main Title</option>
                  <option value="<h2>" className="bg-[#0A1128] text-white font-bold">H2 - Big Heading</option>
                  <option value="<h3>" className="bg-[#0A1128] text-[#FF3399] font-bold">H3 - Subheading</option>
                  <option value="<h4>" className="bg-[#0A1128] text-cyan-300 font-bold">H4 - Small Heading</option>
                  <option value="<h5>" className="bg-[#0A1128] text-amber-300 font-bold">H5 - Minor Heading</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 text-[10px]">
                  ▼
                </div>
              </div>

              <div className="h-4 w-px bg-white/15 mx-0.5" />

              <button
                type="button"
                onClick={() => formatDoc("bold")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("italic")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("underline")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Underline"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-white/15 mx-1" />

              <button
                type="button"
                onClick={() => formatDoc("insertUnorderedList")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5 text-cyan-400" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("insertOrderedList")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={() => formatDoc("formatBlock", "<blockquote>")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                title="Quote Box"
              >
                <Quote className="w-3.5 h-3.5 text-[#FF3399]" />
              </button>

              <div className="h-4 w-px bg-white/15 mx-1" />

              <button
                type="button"
                onClick={handleAddLink}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="Insert Link"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>

              <button
                type="button"
                onClick={() => inlineFileInputRef.current?.click()}
                disabled={uploadingInline}
                className="px-2.5 py-1.5 rounded-lg bg-[#FF3399]/10 hover:bg-[#FF3399]/20 text-[#FF3399] border border-[#FF3399]/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="Insert Image"
              >
                {uploadingInline ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5" />
                )}
                <span>Insert Cloudinary Image</span>
              </button>
            </div>

            {/* Visual Editor Body */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => {
                if (editorRef.current) {
                  setFormData((prev) => ({ ...prev, content: editorRef.current.innerHTML }));
                }
              }}
              className="w-full min-h-[520px] max-h-[700px] px-6 py-5 bg-[#0A1128]/90 border border-white/10 rounded-2xl text-white text-base focus:outline-none focus:border-amber-400 leading-relaxed overflow-y-auto custom-editor-scrollbar space-y-4 [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-white [&>h1]:mt-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-6 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#FF3399] [&>h3]:mt-4 [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-cyan-300 [&>h4]:mt-3 [&>h5]:text-base [&>h5]:font-bold [&>h5]:text-amber-300 [&>h5]:mt-2 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF3399] [&>blockquote]:bg-[#0F1B4C]/50 [&>blockquote]:p-3.5 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>img]:rounded-2xl [&>img]:my-4 [&>img]:border [&>img]:border-white/10 [&>a]:text-[#2271b1] hover:[&>a]:text-[#135e96] [&>a]:underline [&>a]:decoration-[#2271b1] [&>a]:font-semibold [&>a]:underline-offset-2"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Settings, Cover Image & SEO Meta Data (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Publish & Meta Quick Info */}
          <div className="rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Publish Details
              </span>
              {formData.slug && (
                <Link
                  href={`/blog/${formData.slug}`}
                  target="_blank"
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Publish Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Featured Cover Image & Alt Text */}
          <div className="rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Featured Cover Image
              </h3>
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCoverUpload}
              accept="image/*"
              className="hidden"
            />

            {formData.image ? (
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 group shadow-lg bg-[#0A1128] flex items-center justify-center p-2">
                <Image
                  src={formData.image}
                  alt={formData.imageAlt || "Cover Preview"}
                  fill
                  unoptimized
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:scale-105 transition-transform cursor-pointer shadow-md"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-52 sm:h-60 rounded-2xl border-2 border-dashed border-white/15 hover:border-amber-400 bg-[#0A1128]/50 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
              >
                {uploadingCover ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-7 h-7 text-amber-400 animate-spin" />
                    <span className="text-xs font-semibold text-gray-300">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 rounded-2xl bg-white/5 text-amber-400 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-white block">Upload Cover Image</span>
                      <span className="text-xs text-gray-500">Auto uploads to Cloudinary (PNG, JPG, WEBP)</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Alt Text */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Alt Text (SEO)</span>
                <span className="text-[10px] text-gray-500">Google Images</span>
              </label>
              <input
                type="text"
                value={formData.imageAlt || ""}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                placeholder="e.g. Best Digital Marketing Agency"
                className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Card 3: Custom Styling & Typography */}
          <div className="rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2 pb-2 border-b border-white/10">
              <Palette className="w-4 h-4" />
              Design & Typography
            </h3>

            <div className="space-y-3">
              {/* Title Color */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Headline Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.titleColor}
                    onChange={(e) => setFormData({ ...formData, titleColor: e.target.value })}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                  />
                  <div className="flex items-center gap-1.5">
                    {["#ffffff", "#00E5FF", "#FF3399", "#FBBF24"].map((clr) => (
                      <button
                        key={clr}
                        type="button"
                        onClick={() => setFormData({ ...formData, titleColor: clr })}
                        style={{ backgroundColor: clr }}
                        className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Headline Alignment */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Headline Alignment
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, titleAlign: "left" })}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      formData.titleAlign === "left"
                        ? "bg-[#FF3399] text-white border-[#FF3399]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                    }`}
                  >
                    <AlignLeft className="w-3 h-3" /> Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, titleAlign: "center" })}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      formData.titleAlign === "center"
                        ? "bg-[#FF3399] text-white border-[#FF3399]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" /> Center
                  </button>
                </div>
              </div>

              {/* Article Body Text Size */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Article Body Text Size
                </label>
                <select
                  value={formData.bodyFontSize}
                  onChange={(e) => setFormData({ ...formData, bodyFontSize: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF3399] cursor-pointer"
                >
                  <option value="small">Compact (0.95rem)</option>
                  <option value="normal">Standard (1.1rem)</option>
                  <option value="large">Large / Editorial (1.25rem)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 4: Google SEO & Meta Data Manager */}
          <div className="rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Google SEO & Metadata
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                SERP
              </span>
            </div>

            {/* Google Search Live Result Card */}
            <div className="p-4 rounded-2xl bg-[#070D1E] border border-cyan-500/30 shadow-inner space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono truncate">
                <span>https://digitalorra.com › blog › {formData.slug || "slug"}</span>
              </div>
              <div className="text-sm font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate">
                {formData.metaTitle || formData.title || "Meta Title | Digital ORRA"}
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                {formData.metaDescription || formData.excerpt || "Meta description provides concise summary of this article to improve search engine click-through rates..."}
              </p>
            </div>

            <div className="space-y-4">
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                    Meta Title
                  </label>
                  <span className={`text-[10px] font-mono ${(formData.metaTitle || formData.title).length > 60 ? "text-amber-400" : "text-gray-500"}`}>
                    {(formData.metaTitle || formData.title).length}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle || ""}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder={formData.title || "Custom SEO Title for Google"}
                  className="w-full px-3.5 py-2.5 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span className={`text-[10px] font-mono ${(formData.metaDescription || formData.excerpt).length > 160 ? "text-amber-400" : "text-gray-500"}`}>
                    {(formData.metaDescription || formData.excerpt).length}/160
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder={formData.excerpt || "Write an enticing 150-160 character description that drives clicks from Google search..."}
                  className="w-full min-h-[90px] px-3.5 py-2.5 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs sm:text-[13px] focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Focus Keywords
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords || ""}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  placeholder="marketing, seo, web design"
                  className="w-full px-3 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
