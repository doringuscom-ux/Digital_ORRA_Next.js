"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Quote,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  MapPin,
  Sparkles,
  Save
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "General",
  "Performance & Ads",
  "SEO & Search",
  "Web & Tech",
  "Branding & Media",
  "360° Virtual Tours"
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    clientName: "",
    role: "",
    company: "",
    location: "",
    category: "General",
    project: "",
    rating: 5,
    quote: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } else {
        setFeedback({ type: "error", text: "Failed to fetch reviews" });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (rev) => {
    setIsEditing(true);
    setEditingId(rev._id);
    setFormData({
      clientName: rev.clientName || "",
      role: rev.role || "",
      company: rev.company || "",
      location: rev.location || "",
      category: rev.category || "General",
      project: rev.project || "",
      rating: rev.rating || 5,
      quote: rev.quote || ""
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", text: "" });

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    try {
      if (isEditing) {
        const res = await fetch(`/api/reviews/${editingId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update review");
        }

        setFeedback({ type: "success", text: "Review updated successfully!" });
      } else {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers,
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to create review");
        }

        setFeedback({ type: "success", text: "Review added successfully!" });
      }

      setModalOpen(false);
      fetchReviews();
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete review from "${name}"?`)) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Review deleted successfully!" });
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete review");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  // Filtered reviews
  const filtered = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (r.clientName && r.clientName.toLowerCase().includes(q)) ||
      (r.company && r.company.toLowerCase().includes(q)) ||
      (r.quote && r.quote.toLowerCase().includes(q)) ||
      (r.project && r.project.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" || r.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
            <Quote className="w-3.5 h-3.5" /> Client Proof
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Client Testimonials & Reviews
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage genuine client reviews stored in MongoDB displayed on the live /testimonial page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/testimonial"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            Live Page <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </div>
      </div>

      {/* Alert Feedback Banner */}
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
          <button
            onClick={() => setFeedback({ type: "", text: "" })}
            className="text-gray-400 hover:text-white"
          >
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
            placeholder="Search by client, company, quote..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-pink-500 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All ({reviews.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={fetchReviews}
            title="Refresh"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer ml-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Reviews Table / Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium">Loading MongoDB reviews...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0F1B4C]/20 border border-dashed border-white/10 rounded-3xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-400">
            <Quote className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Reviews Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
            {searchQuery
              ? "No reviews match your current search or category filter."
              : "No reviews have been published yet in the database. Click below to add your first real client review."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Review Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((rev) => (
            <div
              key={rev._id}
              className="bg-[#0F1B4C]/50 border border-white/10 hover:border-pink-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
                    {rev.category || "General"}
                  </span>
                </div>

                <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed italic mb-4">
                  "{rev.quote}"
                </p>

                {rev.project && (
                  <div className="flex items-center gap-1.5 text-[11px] text-pink-300 mb-4 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-lg">
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{rev.project}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-white text-xs font-bold truncate">{rev.clientName}</h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {rev.role ? `${rev.role}, ` : ""}{rev.company || "Client"}
                  </p>
                  {rev.location && (
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{rev.location}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEdit(rev)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Edit Review"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id, rev.clientName)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1530] border border-white/15 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111C40]">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-pink-400" />
                <h3 className="text-base font-bold text-white">
                  {isEditing ? "Edit Testimonial" : "Add Client Testimonial"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harpreet Singh"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Role / Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tricity Infra & Builders"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mohali, Punjab"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-pink-500"
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
                    Rating (Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value={5} className="bg-[#0A1128] text-white">5 Stars (Excellent)</option>
                    <option value={4} className="bg-[#0A1128] text-white">4 Stars (Great)</option>
                    <option value={3} className="bg-[#0A1128] text-white">3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project / Scope Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3D Virtual Tours & Lead Generation"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Client Review Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter the authentic feedback or review given by client..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 leading-relaxed"
                />
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
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : isEditing ? "Update Review" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
