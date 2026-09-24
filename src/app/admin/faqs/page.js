"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Sparkles,
  Save,
  Check,
  Eye,
  EyeOff,
  Filter,
  ArrowUpDown
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "General",
  "Web Development",
  "Digital Marketing",
  "SEO & Ranking",
  "Pricing & Timeline",
  "Support & Growth"
];

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Delete confirm state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const initialForm = {
    question: "",
    answer: "",
    category: "General",
    order: 0,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const getAuthToken = () => {
    return typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  };

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faqs?all=true");
      if (res.ok) {
        const data = await res.json();
        setFaqs(Array.isArray(data) ? data : []);
      } else {
        setFeedback({ type: "error", text: "Failed to load FAQs" });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setIsEditing(true);
    setEditingId(faq._id);
    setFormData({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "General",
      order: faq.order ?? 0,
      isActive: faq.isActive ?? true,
    });
    setModalOpen(true);
  };

  const handleToggleStatus = async (faq) => {
    const token = getAuthToken();
    if (!token) {
      setFeedback({ type: "error", text: "Admin token missing. Please log in again." });
      return;
    }

    try {
      const res = await fetch(`/api/faqs/${faq._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !faq.isActive }),
      });

      if (res.ok) {
        setFaqs((prev) =>
          prev.map((item) =>
            item._id === faq._id ? { ...item, isActive: !item.isActive } : item
          )
        );
        setFeedback({
          type: "success",
          text: `FAQ marked as ${!faq.isActive ? "Active" : "Inactive"}`,
        });
      } else {
        setFeedback({ type: "error", text: "Failed to update FAQ status." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  const handleSaveFaq = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      setFeedback({ type: "error", text: "Question and Answer are required." });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setFeedback({ type: "error", text: "Admin token missing. Please log in again." });
      return;
    }

    setSaving(true);
    try {
      const url = isEditing ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedFaq = await res.json();
        if (isEditing) {
          setFaqs((prev) => prev.map((item) => (item._id === editingId ? savedFaq : item)));
          setFeedback({ type: "success", text: "FAQ updated successfully!" });
        } else {
          setFaqs((prev) => [savedFaq, ...prev]);
          setFeedback({ type: "success", text: "New FAQ added successfully!" });
        }
        setModalOpen(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        setFeedback({ type: "error", text: errData.message || "Failed to save FAQ." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (faq) => {
    setFaqToDelete(faq);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;
    const token = getAuthToken();
    if (!token) {
      setFeedback({ type: "error", text: "Admin token missing." });
      return;
    }

    try {
      const res = await fetch(`/api/faqs/${faqToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFaqs((prev) => prev.filter((item) => item._id !== faqToDelete._id));
        setFeedback({ type: "success", text: "FAQ deleted successfully." });
      } else {
        setFeedback({ type: "error", text: "Failed to delete FAQ." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setDeleteModalOpen(false);
      setFaqToDelete(null);
    }
  };

  // Filtered FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      (faq.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.answer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.category || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && faq.isActive) ||
      (selectedStatus === "inactive" && !faq.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = faqs.length;
  const activeCount = faqs.filter((f) => f.isActive).length;
  const inactiveCount = totalCount - activeCount;
  const categoriesCount = new Set(faqs.map((f) => f.category || "General")).size;

  return (
    <div className="space-y-8">
      {/* Toast Feedback */}
      {feedback.text && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between border backdrop-blur-md transition-all animate-fadeIn ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/15 border-red-500/30 text-red-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback({ type: "", text: "" })}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#091122]/90 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3399]/15 border border-[#FF3399]/30 text-[#FF3399] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Homepage & Public Q&A
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-400">
            Manage FAQs displayed on the Digital ORRA homepage. Add, edit, reorder, or toggle visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchFaqs}
            disabled={loading}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            title="Refresh FAQs"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] hover:from-[#FF007A] hover:to-pink-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,0,122,0.35)] hover:shadow-[0_0_30px_rgba(255,0,122,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#091122]/70 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total FAQs</span>
          <div className="text-3xl font-black text-white mt-1">{totalCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#091122]/70 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Active Online</span>
          <div className="text-3xl font-black text-emerald-300 mt-1">{activeCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#091122]/70 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Hidden / Draft</span>
          <div className="text-3xl font-black text-gray-400 mt-1">{inactiveCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#091122]/70 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Categories</span>
          <div className="text-3xl font-black text-cyan-300 mt-1">{categoriesCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#091122]/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3399]"
            >
              <option value="all" className="bg-[#091122]">All Categories</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} className="bg-[#091122]">{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="all" className="bg-[#091122]">All Status</option>
              <option value="active" className="bg-[#091122]">Active Only</option>
              <option value="inactive" className="bg-[#091122]">Hidden Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-3 border-[#FF3399] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-medium">Loading FAQs from database...</span>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#091122]/50 border border-white/10">
          <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No FAQs Found</h3>
          <p className="text-sm text-gray-400 mb-5">
            {searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
              ? "Try adjusting your search query or filters."
              : "No questions added yet. Click 'Add New FAQ' to create your first item."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white font-bold text-sm"
          >
            Create First FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq._id}
              className={`p-5 rounded-2xl border transition-all ${
                faq.isActive
                  ? "bg-[#091122]/80 border-white/10 hover:border-white/20"
                  : "bg-[#091122]/40 border-dashed border-white/10 opacity-70"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FF3399]/15 border border-[#FF3399]/30 text-[#FF3399] text-xs font-semibold">
                      {faq.category || "General"}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      Order: {faq.order ?? 0}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        faq.isActive
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-gray-500/15 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {faq.isActive ? <Check className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {faq.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {faq.question}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start flex-shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleToggleStatus(faq)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      faq.isActive
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    title={faq.isActive ? "Hide FAQ from Home Page" : "Show FAQ on Home Page"}
                  >
                    {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{faq.isActive ? "Active" : "Show"}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(faq)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
                    title="Edit FAQ"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => confirmDelete(faq)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-400/40 hover:bg-red-500/10 transition-all"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#091122] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF3399]/15 border border-[#FF3399]/30 flex items-center justify-center text-[#FF3399]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {isEditing ? "Edit FAQ" : "Add New FAQ"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {isEditing ? "Update question, answer or visibility" : "Create a new question for the home page"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveFaq} className="space-y-5">
              {/* Question */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Question <span className="text-[#FF3399]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., What services does Digital ORRA provide?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Answer */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Answer <span className="text-[#FF3399]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide a clear, helpful, and concise answer..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors leading-relaxed"
                />
              </div>

              {/* Category & Order in 2-Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091122] border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Display Order / Rank
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <p className="text-[11px] text-gray-500">Lower numbers appear first (0, 1, 2...)</p>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-sm font-bold text-white">Display on Home Page</div>
                  <div className="text-xs text-gray-400">
                    Turn off if you want to keep this question saved as a draft.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] hover:from-[#FF007A] hover:to-pink-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(255,0,122,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isEditing ? "Update FAQ" : "Save FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && faqToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#091122] border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete this FAQ?</h3>
            <p className="text-sm text-gray-300 mb-4">
              Are you sure you want to permanently delete:
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white font-medium mb-6">
              "{faqToDelete.question}"
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setFaqToDelete(null);
                }}
                className="px-4 py-2 rounded-xl border border-white/15 text-gray-300 hover:text-white text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
