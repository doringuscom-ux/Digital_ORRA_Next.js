"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Upload,
  Save
} from "lucide-react";

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    category: "Web Development",
    image: "",
    link: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const CATEGORY_OPTIONS = [
    "Web Development",
    "App Design",
    "UI/UX Design",
    "Branding",
    "Performance Marketing",
    "360° Virtual Tours"
  ];

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolios(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load projects: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Direct upload using /api/upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      category: item.category || "Web Development",
      image: item.image || "",
      link: item.link || ""
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload or enter a project cover image URL");
      return;
    }

    setSaving(true);
    setFeedback({ type: "", text: "" });

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    try {
      if (isEditing) {
        const res = await fetch(`/api/portfolio/${editingId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update project");
        }

        setFeedback({ type: "success", text: "Project updated successfully!" });
      } else {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to add project");
        }

        setFeedback({ type: "success", text: "Project added successfully!" });
      }

      setModalOpen(false);
      fetchPortfolios();
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Project deleted successfully!" });
        setPortfolios((prev) => prev.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete project");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const filtered = portfolios.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" /> Project Showcase
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Our Portfolio & Case Studies
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage projects displayed on the live /portfolio page and homepage portfolio section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portfolio"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            Live Page <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      {/* Alert Feedback */}
      {feedback.text && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback({ type: "", text: "" })} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="bg-[#0F1B4C]/40 border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All ({portfolios.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={fetchPortfolios}
            title="Refresh"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer ml-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium">Loading portfolio from database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0F1B4C]/20 border border-dashed border-white/10 rounded-3xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
            {searchQuery
              ? "No projects match your current search query."
              : "No portfolio projects added yet. Click below to add your first work."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-[#0F1B4C]/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-cyan-300">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-white text-sm font-bold truncate">{item.title}</h4>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span className="truncate">{item.link}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400">Internal Showcase</span>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1530] border border-white/15 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111C40]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isEditing ? "Edit Portfolio Project" : "Add Portfolio Project"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Real Estate 3D Portal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c} className="bg-[#0A1128] text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Live Project URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Cover Image *
                </label>
                
                {/* File Upload Button */}
                <div className="flex items-center gap-3 mb-2">
                  <label className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? "Uploading..." : "Upload from Device"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-gray-400">or paste image URL below</span>
                </div>

                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/... or uploaded URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />

                {formData.image && (
                  <div className="mt-3 relative h-32 w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : isEditing ? "Update Project" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
