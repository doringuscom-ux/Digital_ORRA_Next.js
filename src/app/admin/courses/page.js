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
  BookOpen,
  Award,
  Layers,
  Clock,
  Save
} from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal / Drawer state for Create or Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Data State matching Course model & coursesData schema
  const initialFormState = {
    title: "",
    category: "Digital Marketing",
    level: "Beginner to Advanced",
    duration: "3 Months (Live Practical)",
    badge: "Flagship Program",
    price: "₹25,000",
    originalPrice: "₹40,000",
    discount: "35% OFF",
    shortDesc: "",
    fullDesc: "",
    rating: "4.9",
    enrolledCount: "1,200+",
    certification: "Digital ORRA & Industry Recognized",
    placementAssistance: true,
    hasInternship: true,
    popular: false,
    order: 0,
    // Modules list: [{ title: "", topicsText: "" }]
    modules: [
      {
        title: "Module 1: Fundamentals & Core Concepts",
        topicsText: "Orientation & Industry Overview\nFoundations & Tool Setup\nLive Strategy Session",
      },
    ],
    // Key highlights: string of newline-separated items
    highlightsText: "100% Practical Client Ad Accounts\n1-on-1 Mentorship & Doubts Clearing\nPaid Internship & Placement Assistance\nRecognized Industry Certification",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load courses: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (course) => {
    setIsEditing(true);
    setEditingId(course._id || course.id);

    // Convert modules topics array into newline string for easy editing
    const mappedModules =
      Array.isArray(course.modules) && course.modules.length > 0
        ? course.modules.map((m) => ({
            title: m.title || "",
            topicsText: Array.isArray(m.topics) ? m.topics.join("\n") : "",
          }))
        : [
            {
              title: "Module 1: Fundamentals",
              topicsText: "Core Concepts\nPractical Live Projects",
            },
          ];

    // Convert highlights array to newline string
    const mappedHighlights = Array.isArray(course.highlights)
      ? course.highlights.join("\n")
      : "";

    setFormData({
      title: course.title || "",
      category: course.category || "Digital Marketing",
      level: course.level || "Beginner to Advanced",
      duration: course.duration || "3 Months",
      badge: course.badge || "",
      price: course.price || "",
      originalPrice: course.originalPrice || "",
      discount: course.discount || "",
      shortDesc: course.shortDesc || "",
      fullDesc: course.fullDesc || course.description || "",
      rating: course.rating || "4.9",
      enrolledCount: course.enrolledCount || "500+",
      certification: course.certification || "Digital ORRA Certified",
      placementAssistance: course.placementAssistance ?? true,
      hasInternship: course.hasInternship ?? true,
      popular: course.popular ?? false,
      order: course.order || 0,
      modules: mappedModules,
      highlightsText: mappedHighlights,
    });

    setModalOpen(true);
  };

  // Handle Module additions / modifications
  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: `Module ${prev.modules.length + 1}: `,
          topicsText: "",
        },
      ],
    }));
  };

  const handleRemoveModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const handleModuleChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.modules];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, modules: updated };
    });
  };

  // Save Course (POST or PUT)
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a course title.");
      return;
    }

    setSaving(true);
    try {
      // Format modules & highlights back to arrays for public page compatibility
      const formattedModules = formData.modules
        .filter((m) => m.title.trim())
        .map((m) => ({
          title: m.title.trim(),
          topics: m.topicsText
            .split("\n")
            .map((t) => t.trim())
            .filter(Boolean),
        }));

      const formattedHighlights = formData.highlightsText
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        badge: formData.badge,
        price: formData.price,
        originalPrice: formData.originalPrice,
        discount: formData.discount,
        shortDesc: formData.shortDesc,
        fullDesc: formData.fullDesc,
        rating: formData.rating,
        enrolledCount: formData.enrolledCount,
        certification: formData.certification,
        placementAssistance: formData.placementAssistance,
        hasInternship: formData.hasInternship,
        popular: formData.popular,
        order: Number(formData.order) || 0,
        modules: formattedModules,
        highlights: formattedHighlights,
        syllabus: formattedModules.map((m) => m.title),
      };

      let res;
      if (isEditing) {
        res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingId, ...payload }),
        });
      } else {
        res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setFeedback({
          type: "success",
          text: isEditing
            ? "Course updated successfully!"
            : "New course created successfully!",
        });
        setModalOpen(false);
        fetchCourses();
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save course.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/courses?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedback({ type: "success", text: `Deleted "${title}" successfully.` });
        setCourses((prev) => prev.filter((c) => (c._id || c.id) !== id));
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete.");
      }
    } catch (err) {
      alert("Error deleting course: " + err.message);
    }
  };

  // Filter Categories
  const categoriesList = [
    "all",
    ...Array.from(new Set(courses.map((c) => c.category).filter(Boolean))),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCat =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      (course.title &&
        course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.category &&
        course.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.level &&
        course.level.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1520px] mr-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academy & Training Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Manage <span className="text-gradient">Academy Courses</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Add, edit, or reorder master programs without disturbing the public layout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-4 py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 transition-all"
          >
            <span>Preview Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
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

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0F1B4C]/40 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs by title, category, level..."
            className="w-full pl-10 pr-4 py-2 bg-[#0A1128]/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#FF3399] text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course List Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#FF3399] mx-auto" />
          <p className="text-sm font-medium">Loading academy programs from database...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-[#0F1B4C]/20 border border-white/10 space-y-3">
          <GraduationCap className="w-12 h-12 text-gray-500 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-white">No Courses Found</h3>
          <p className="text-xs text-gray-400">
            Create your first academy master program using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <div
              key={course._id || course.id || idx}
              className="rounded-3xl bg-[#0F1B4C]/45 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Badges Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {course.category || "General"}
                  </span>
                  {course.badge && (
                    <span className="text-[11px] sm:text-xs font-black uppercase px-3 py-1 rounded-full bg-gradient-to-r from-[#FF3399] to-pink-600 text-white shadow-sm">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-[15px] text-gray-300 line-clamp-3 leading-relaxed">
                  {course.shortDesc || course.description || course.fullDesc || "No description provided."}
                </p>

                {/* Key Meta Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-200">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1128]/80 border border-white/10 truncate">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate font-semibold">{course.duration || "Flexible"}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1128]/80 border border-white/10 truncate">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate font-bold text-emerald-300">{course.price || "Free Demo"}</span>
                  </div>
                </div>

                {/* Modules summary badge */}
                <div className="text-xs sm:text-[13px] text-gray-300 font-medium flex items-center gap-2 pt-1">
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span>
                    {course.modules?.length || course.syllabus?.length || 0} Modules / Topics Configured
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-bold text-amber-400">
                  ★ {course.rating || "4.9"} <span className="text-gray-400 font-normal">({course.enrolledCount || "500+"})</span>
                </span>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(course)}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Edit Course"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCourse(course._id || course.id, course.title)}
                    className="p-2 sm:p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL DRAWER */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1128] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 custom-editor-scrollbar my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#FF3399] to-[#d6006e] text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {isEditing ? "Edit Master Course" : "Create New Academy Course"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    Changes will seamlessly sync with the live public /courses page.
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
            <form onSubmit={handleSaveCourse} className="space-y-6">
              {/* Row 1: Title */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Full-Stack Digital Marketing Mastery"
                  className="w-full px-5 py-3.5 bg-[#0F1B4C]/80 border border-white/15 rounded-2xl text-white text-base sm:text-lg font-bold focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>

              {/* Row 2: Category, Badge, Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Digital Marketing, Paid Media"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Flagship Program, High ROAS"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-pink-300 text-sm sm:text-[15px] font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Skill Level
                  </label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="e.g. Beginner to Advanced"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Row 3: Duration, Price, Rating, Enrolled */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 3 Months (Live)"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Course Fee / Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹25,000"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-emerald-400 font-bold text-sm sm:text-base focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Rating (out of 5)
                  </label>
                  <input
                    type="text"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="4.9"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-amber-300 text-sm sm:text-[15px] font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Students Enrolled
                  </label>
                  <input
                    type="text"
                    value={formData.enrolledCount}
                    onChange={(e) => setFormData({ ...formData, enrolledCount: e.target.value })}
                    placeholder="1,200+"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] font-medium focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Row 4: Short Description */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Card Short Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Summary shown on public course card..."
                  className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] leading-relaxed focus:outline-none focus:border-[#FF3399]"
                />
              </div>

              {/* Row 5: Full In-Depth Description */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Full Syllabus Modal Description
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Detailed course description displayed inside the curriculum modal..."
                  className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] leading-relaxed focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Row 6: Curriculum & Modules Manager */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/15 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-300">
                    <BookOpen className="w-5 h-5" />
                    <span>Curriculum Modules & Topics</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Module</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.modules.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#0A1128] border border-white/15 space-y-3 shadow-inner"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => handleModuleChange(mIdx, "title", e.target.value)}
                          placeholder={`Module ${mIdx + 1} Title`}
                          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm sm:text-base font-bold text-white focus:outline-none focus:border-cyan-400"
                        />
                        {formData.modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(mIdx)}
                            className="text-sm text-red-400 hover:text-red-300 p-2 rounded-xl hover:bg-red-500/10 cursor-pointer transition-all"
                            title="Remove this module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 font-semibold mb-1.5">
                          Topics Covered (one topic per line):
                        </label>
                        <textarea
                          rows={4}
                          value={mod.topicsText}
                          onChange={(e) =>
                            handleModuleChange(mIdx, "topicsText", e.target.value)
                          }
                          placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm sm:text-[14px] text-gray-200 focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 7: Highlights (One per line) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Key Highlights / Feature Perks (One item per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.highlightsText}
                  onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                  placeholder="Live Practical Ad Campaigns&#10;1-on-1 Mentorship&#10;100% Placement Support"
                  className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm sm:text-[15px] leading-relaxed focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Row 8: Checkbox switches for Placement & Internship */}
              <div className="flex flex-wrap items-center gap-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-200">
                  <input
                    type="checkbox"
                    checked={formData.placementAssistance}
                    onChange={(e) =>
                      setFormData({ ...formData, placementAssistance: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#FF3399] rounded cursor-pointer"
                  />
                  <span>100% Placement Assistance</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-200">
                  <input
                    type="checkbox"
                    checked={formData.hasInternship}
                    onChange={(e) =>
                      setFormData({ ...formData, hasInternship: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#FF3399] rounded cursor-pointer"
                  />
                  <span>Agency Live Internship Access</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-200">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) =>
                      setFormData({ ...formData, popular: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#FF3399] rounded cursor-pointer"
                  />
                  <span>Mark as Most Popular</span>
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Course...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditing ? "Save Changes" : "Create Program"}</span>
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
