"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
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
  Save,
  Image as ImageIcon
} from "lucide-react";

export default function AdminWorkshopMediaPage() {
  const [items, setItems] = useState([]);
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
    category: "College Workshops",
    image: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const CATEGORIES = ["College Workshops", "School Workshops"];

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/workshop");
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load workshop images: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
      category: item.category || "College Workshops",
      image: item.image || ""
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload or provide an image URL");
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
        const res = await fetch(`/api/workshop/${editingId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update workshop image");
        }

        setFeedback({ type: "success", text: "Workshop image updated successfully!" });
      } else {
        const res = await fetch("/api/workshop", {
          method: "POST",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to add workshop image");
        }

        setFeedback({ type: "success", text: "Workshop image added successfully!" });
      }

      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title || 'this image'}"?`)) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
    try {
      const res = await fetch(`/api/workshop/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Workshop image deleted successfully!" });
        setItems((prev) => prev.filter((it) => it._id !== id));
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete workshop image");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const filtered = items.filter((it) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (it.title && it.title.toLowerCase().includes(q)) ||
      (it.category && it.category.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" || it.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5" /> Academy Media
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Skill Development Workshop Images
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Post and manage photos for the 2 categories (Workshop Practical & Student Projects) on /skill-development-workshop.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/skill-development-workshop"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            Live Page <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Workshop Photo
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

      {/* Filter and Search Bar */}
      <div className="bg-[#0F1B4C]/40 border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by caption or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all" ? "bg-pink-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All ({items.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat ? "bg-pink-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={fetchItems}
            title="Refresh"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer ml-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium">Loading workshop photos from database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0F1B4C]/20 border border-dashed border-white/10 rounded-3xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-400">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Photos Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
            {searchQuery
              ? "No photos match your current search."
              : "No workshop photos added yet. Click below to add your first photo in Workshop Practical or Student Projects."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Photo Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-[#0F1B4C]/50 border border-white/10 hover:border-pink-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title || "Workshop"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-cyan-300">
                  {item.category}
                </span>
              </div>

              <div className="p-3 flex items-center justify-between gap-2 border-t border-white/10 bg-[#0A1128]/80">
                <span className="text-xs text-slate-200 font-medium truncate">
                  {item.category}
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1530] border border-white/20 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-7 py-5 border-b border-white/10 flex items-center justify-between bg-[#111C40]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {isEditing ? "Edit Workshop Photo" : "Add Workshop Photo"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Category (Choose 1 of 2) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-pink-500 font-semibold cursor-pointer"
                >
                  <option value="College Workshops" className="bg-[#0A1128] text-white">
                    College Workshops
                  </option>
                  <option value="School Workshops" className="bg-[#0A1128] text-white">
                    School Workshops
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Workshop Image *
                </label>

                {/* Upload Button */}
                <div className="flex items-center gap-3 mb-3">
                  <label className="px-4 py-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Upload from Device"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">or enter direct image URL:</span>
                </div>

                <input
                  type="text"
                  required
                  placeholder="https://... or uploaded image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-pink-500"
                />

                {formData.image && (
                  <div className="mt-3 relative h-44 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/25 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : isEditing ? "Update Photo" : "Publish Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
