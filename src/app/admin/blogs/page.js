"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Search,
  RefreshCw,
  Plus,
  ExternalLink,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  ArrowUpRight,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function AdminBlogsPage() {
  const router = useRouter();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isClient) return;
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let isSubscribed = true;

    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : [];
          if (isSubscribed) {
            setBlogs(list);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        if (isSubscribed) setLoading(false);
      }
    }

    loadBlogs();

    return () => {
      isSubscribed = false;
    };
  }, [isClient, router, refreshTrigger]);

  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this blog'}"?`)) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert(data.message || "Failed to delete blog.");
      }
    } catch (err) {
      alert(err.message || "Error deleting blog.");
    }
  };

  // Unique categories list
  const categories = [
    "all",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat =
      selectedCategory === "all" || blog.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  if (!isClient) return null;

  return (
    <div className="w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F1B4C]/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 uppercase mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Content Library
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Blogs & <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
            Manage your published insights, thought leadership articles, and SEO marketing blogs.
          </p>
        </div>

        {/* Action button & metrics */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-[#0A1128]/80 border border-white/10 text-center min-w-[110px]">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
            <span className="text-2xl font-black text-white">{blogs.length}</span>
          </div>

          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Blog</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by blog title, slug, or excerpt keywords..."
            className="w-full pl-10 pr-4 py-3 bg-[#0F1B4C]/50 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[#0F1B4C]/50 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0A1128] text-white">
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <button
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            disabled={loading}
            title="Refresh List"
            className="p-3 bg-[#0F1B4C]/50 hover:bg-[#0F1B4C]/80 border border-white/10 rounded-2xl text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="text-center py-24 text-gray-400">
          <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Fetching published articles from database...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 rounded-3xl bg-[#0F1B4C]/30 border border-white/10 p-8">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-20 text-cyan-400" />
          <h3 className="text-base font-bold text-white">No Articles Found</h3>
          <p className="text-xs text-gray-400 mt-1">Try changing your search terms or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group rounded-3xl bg-[#0F1B4C]/45 border border-white/10 hover:border-cyan-500/50 p-5 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,229,255,0.15)] hover:-translate-y-1 overflow-hidden"
            >
              <div>
                {/* Blog Image or Placeholder */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-[#0A1128]/80 border border-white/5">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title || "Blog cover"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <FileText className="w-10 h-10 opacity-30 text-cyan-400" />
                    </div>
                  )}

                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1128]/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-cyan-300">
                    {blog.category || "General"}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {blog.date || (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recent")}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {blog.readTime || "5 min read"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors mb-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {blog.excerpt || "No description preview available for this post."}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-500 truncate max-w-[120px]">
                  /{blog.slug}
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/blog/${blog.slug || ""}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer"
                    title="View Live Blog"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/admin/blogs/edit/${blog._id}`}
                    className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all cursor-pointer"
                    title="Edit Blog"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleDeleteBlog(blog._id, blog.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                    title="Delete Blog"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
