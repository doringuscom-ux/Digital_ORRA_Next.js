"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Upload,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Camera,
  Save
} from "lucide-react";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState([]);
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

  // File input ref for Cloudinary direct upload
  const fileInputRef = useRef(null);

  const initialFormState = {
    title: "",
    category: "Team & Events",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Standard category options
  const defaultCategories = [
    "Workshop Practical",
    "Student Projects",
    "Team & Events",
    "Office & Workspace",
    "Client Wins & Workshops",
    "Celebrations & Festivals",
    "Academy & Sessions",
  ];

  // Fetch Gallery Items
  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGallery(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load gallery items: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle Cloudinary Image Upload
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

      if (!res.ok) throw new Error("Upload failed. Check Cloudinary credentials.");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      category: item.category || "Team & Events",
      image: item.image || "",
    });
    setModalOpen(true);
  };

  // Save (Create or Update)
  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload or provide an image URL.");
      return;
    }

    setSaving(true);
    try {
      let res;
      if (isEditing) {
        res = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingId, ...formData }),
        });
      } else {
        res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        setFeedback({
          type: "success",
          text: isEditing ? "Photo updated successfully!" : "New photo added to gallery!",
        });
        setModalOpen(false);
        fetchGallery();
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save photo.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteItem = async (id, title) => {
    if (!window.confirm(`Delete this photo from gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Photo removed successfully." });
        setGallery((prev) => prev.filter((item) => item._id !== id));
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete.");
      }
    } catch (err) {
      alert("Error deleting photo: " + err.message);
    }
  };

  // Categories Filter: ONLY show categories that actually exist in current gallery
  const categoriesList = [
    "all",
    ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean))),
  ];

  const filteredGallery = gallery.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1520px] mr-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
            <Camera className="w-4 h-4" />
            <span>Visual Brand Media Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Manage <span className="text-gradient">Media Gallery</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Upload and organize agency culture photos, team events, and office moments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            target="_blank"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 px-4 py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 transition-all"
          >
            <span>Preview Public Gallery</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback.text && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback({ type: "", text: "" })}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Category Filters Row */}
      <div className="flex items-center gap-2 bg-[#0F1B4C]/40 border border-white/10 p-4 rounded-2xl backdrop-blur-xl overflow-x-auto">
        {/* Category Pills (Dynamic: only existing categories appear here) */}
        <div className="flex flex-wrap items-center gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#FF3399] text-white shadow-md shadow-[#FF3399]/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat === "all" ? "All Photos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#FF3399] mx-auto" />
          <p className="text-sm font-medium">Loading gallery photos from database...</p>
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-[#0F1B4C]/20 border border-white/10 space-y-3">
          <Camera className="w-12 h-12 text-gray-500 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-white">No Photos Found</h3>
          <p className="text-xs sm:text-sm text-gray-400">
            Upload your first team, event, or office moment using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item._id || idx}
              className="rounded-3xl bg-[#0F1B4C]/45 border border-white/10 overflow-hidden backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              {/* Image Container with Preview Aspect Ratio */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A1128]">
                <img
                  src={item.image}
                  alt={item.title || item.category || "Gallery Photo"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300 shadow-sm">
                    {item.category || "Moment"}
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    {item.title || "Untitled Moment"}
                  </h4>
                  <p className="text-[11px] font-mono text-gray-400 truncate">
                    {new Date(item.createdAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
                    title="Edit Photo Info"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item._id, item.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1128] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 custom-editor-scrollbar my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#FF3399] to-[#d6006e] text-white">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {isEditing ? "Edit Gallery Photo" : "Upload New Gallery Photo"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    Image will instantly display on the live public /gallery page.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveItem} className="space-y-6">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Photo (Cloudinary Upload) *
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {formData.image ? (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/15 group shadow-lg">
                    <img
                      src={formData.image}
                      alt="Uploaded Moment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-56 rounded-2xl border-2 border-dashed border-white/20 hover:border-pink-500 bg-[#0F1B4C]/40 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-8 h-8 text-[#FF3399] animate-spin" />
                        <span className="text-sm font-semibold text-gray-300">
                          Uploading to Cloudinary...
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="p-3 rounded-2xl bg-white/5 text-pink-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-bold text-white block">
                            Click to Upload Image
                          </span>
                          <span className="text-xs text-gray-400">
                            Auto uploads to Cloudinary (PNG, JPG, WEBP)
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Direct Image URL input fallback */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste direct Cloudinary image URL..."
                    className="w-full px-4 py-2.5 bg-[#0F1B4C]/70 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Diwali Celebration at Digital ORRA HQ"
                  className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Category Dropdown / Custom input */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Category / Event Type *
                </label>
                <div className="space-y-2">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {defaultCategories.map((c) => (
                      <option key={c} value={c} className="bg-[#0A1128] text-white">
                        {c}
                      </option>
                    ))}
                    <option value="custom" className="bg-[#0A1128] text-pink-400 font-bold">
                      + Custom Category...
                    </option>
                  </select>

                  {(!defaultCategories.includes(formData.category) || formData.category === "custom") && (
                    <input
                      type="text"
                      value={formData.category === "custom" ? "" : formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Type custom category name..."
                      className="w-full px-4 py-2.5 bg-[#0F1B4C]/70 border border-pink-500/40 rounded-xl text-white text-sm focus:outline-none focus:border-pink-400"
                    />
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Photo...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditing ? "Save Changes" : "Publish Photo"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
