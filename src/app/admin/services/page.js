"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Layers,
  Star,
  Check,
  Save,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Share2,
  Search as SearchIcon,
  Palette,
  Code,
  Globe,
  Sliders,
  Upload,
  Camera,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote
} from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal / Drawer state for Create or Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // File input ref for main image upload
  const fileInputRef = useRef(null);
  const spotlightFileInputRef = useRef(null);
  const spotlightEditorRef = useRef(null);
  const [uploadingSpotlight, setUploadingSpotlight] = useState(false);

  // WYSIWYG command helper for Spotlight content
  const formatSpotlightDoc = (cmd, value = null) => {
    if (typeof document !== "undefined") {
      document.execCommand(cmd, false, value);
      if (spotlightEditorRef.current) {
        setFormData((prev) => ({ ...prev, spotlightContent: spotlightEditorRef.current.innerHTML }));
      }
    }
  };

  const handleSpotlightAddLink = () => {
    const url = prompt("Enter Web Link (e.g. https://digitalorra.com/contact):");
    if (!url) return;
    formatSpotlightDoc("createLink", url);
  };

  // Upload Spotlight Image to Cloudinary
  const handleSpotlightImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSpotlight(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Upload failed. Check Cloudinary credentials.");
      const data = await res.json();
      setFormData((prev) => ({ 
        ...prev, 
        spotlightImage: data.url,
        spotlightImageAlt: prev.spotlightImageAlt || prev.spotlightTitle || "Spotlight Image"
      }));
    } catch (err) {
      alert("Error uploading spotlight image: " + err.message);
    } finally {
      setUploadingSpotlight(false);
    }
  };

  // Form State
  const initialFormState = {
    id: "",
    title: "",
    category: "Social & Brand",
    tag: "High Impact",
    shortDesc: "",
    fullDesc: "",
    image: "",
    imageAlt: "",
    iconName: "Globe",
    order: 0,
    stats: [
      { label: "Avg Growth", value: "+250%" },
      { label: "Client Satisfaction", value: "99%" },
      { label: "Projects Delivered", value: "500+" }
    ],
    featuresText: "Strategy & Roadmap Planning\nCustom Campaign Execution\nDedicated Account Manager\nMonthly Performance Reports",
    deliverables: [
      { title: "Custom Strategy", desc: "Tailored execution blueprint focused on measurable ROI." },
      { title: "Asset Creation", desc: "High quality creatives, copies, and technical setups." }
    ],
    process: [
      { step: "01", title: "Audit & Analysis", desc: "Initial research and competitor analysis." },
      { step: "02", title: "Strategy & Plan", desc: "Formulating custom roadmap and targets." },
      { step: "03", title: "Execution", desc: "Deploying campaigns with active management." },
      { step: "04", title: "Scale & Optimize", desc: "Reviewing metrics and scaling top performers." }
    ],
    faqs: [
      { q: "How soon do we see results?", a: "Initial momentum begins within the first 14-30 days." },
      { q: "Do we get dedicated support?", a: "Yes, a dedicated project lead will be assigned to your brand." }
    ],
    spotlightBadge: "",
    spotlightTitle: "",
    spotlightContent: "",
    spotlightImage: "",
    spotlightImageAlt: "",
    spotlightImagePosition: "right"
  };

  const [formData, setFormData] = useState(initialFormState);

  // Available categories for filtering and selection
  const categories = [
    "Social & Brand",
    "Performance",
    "Search & SEO",
    "Creative & Content",
    "Web & Tech",
    "Growth & Consulting"
  ];

  // Load Services from API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data);
        }
      } else {
        throw new Error("Failed to load services");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Failed to load services." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filtered Services list
  const filteredServices = services.filter((srv) => {
    const matchesCategory =
      selectedCategory === "all" || srv.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === "" ||
      (srv.title && srv.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (srv.id && srv.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (srv.tag && srv.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (srv.shortDesc && srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Direct file upload to Cloudinary
  const handleFileUpload = async (e) => {
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
      setFormData((prev) => ({ 
        ...prev, 
        image: data.url,
        imageAlt: prev.imageAlt || prev.title || "Service Showcase Image"
      }));
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      ...initialFormState,
      id: "service-" + Date.now().toString().slice(-4),
      order: services.length + 1
    });
    setTimeout(() => {
      if (spotlightEditorRef.current) {
        spotlightEditorRef.current.innerHTML = "";
      }
    }, 50);
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (srv) => {
    setIsEditing(true);
    setEditingId(srv._id || srv.id);

    setFormData({
      id: srv.id || "",
      title: srv.title || "",
      category: srv.category || "Social & Brand",
      tag: srv.tag || "",
      shortDesc: srv.shortDesc || srv.desc || "",
      fullDesc: srv.fullDesc || srv.desc || "",
      image: srv.image || "",
      imageAlt: srv.imageAlt || "",
      iconName: srv.iconName || "Globe",
      order: srv.order !== undefined ? srv.order : 0,
      stats: srv.stats && srv.stats.length > 0 ? srv.stats : initialFormState.stats,
      featuresText: Array.isArray(srv.features) ? srv.features.join("\n") : "",
      deliverables: srv.deliverables && srv.deliverables.length > 0 ? srv.deliverables : initialFormState.deliverables,
      process: srv.process && srv.process.length > 0 ? srv.process : initialFormState.process,
      faqs: srv.faqs && srv.faqs.length > 0 ? srv.faqs : initialFormState.faqs,
      spotlightBadge: srv.spotlightBadge || "",
      spotlightTitle: srv.spotlightTitle || "",
      spotlightContent: srv.spotlightContent || "",
      spotlightImage: srv.spotlightImage || "",
      spotlightImageAlt: srv.spotlightImageAlt || "",
      spotlightImagePosition: srv.spotlightImagePosition || "right"
    });
    setTimeout(() => {
      if (spotlightEditorRef.current) {
        spotlightEditorRef.current.innerHTML = srv.spotlightContent || "";
      }
    }, 50);
    setModalOpen(true);
  };

  // Open modal for Duplicate (Clone an existing service as a new service)
  const handleDuplicateService = (srv) => {
    setIsEditing(false);
    setEditingId(null);

    // Generate unique new slug
    const newSlug = `${srv.id || "service"}-copy-${Date.now().toString().slice(-4)}`;

    setFormData({
      id: newSlug,
      title: `${srv.title || "Service"} (Copy)`,
      category: srv.category || "Social & Brand",
      tag: srv.tag || "",
      shortDesc: srv.shortDesc || srv.desc || "",
      fullDesc: srv.fullDesc || srv.desc || "",
      image: srv.image || "",
      imageAlt: srv.imageAlt || "",
      iconName: srv.iconName || "Globe",
      order: services.length + 1,
      stats: srv.stats && srv.stats.length > 0 ? JSON.parse(JSON.stringify(srv.stats)) : initialFormState.stats,
      featuresText: Array.isArray(srv.features) ? srv.features.join("\n") : "",
      deliverables: srv.deliverables && srv.deliverables.length > 0 ? JSON.parse(JSON.stringify(srv.deliverables)) : initialFormState.deliverables,
      process: srv.process && srv.process.length > 0 ? JSON.parse(JSON.stringify(srv.process)) : initialFormState.process,
      faqs: srv.faqs && srv.faqs.length > 0 ? JSON.parse(JSON.stringify(srv.faqs)) : initialFormState.faqs,
      spotlightBadge: srv.spotlightBadge || "",
      spotlightTitle: srv.spotlightTitle || "",
      spotlightContent: srv.spotlightContent || "",
      spotlightImage: srv.spotlightImage || "",
      spotlightImageAlt: srv.spotlightImageAlt || "",
      spotlightImagePosition: srv.spotlightImagePosition || "right"
    });

    setTimeout(() => {
      if (spotlightEditorRef.current) {
        spotlightEditorRef.current.innerHTML = srv.spotlightContent || "";
      }
    }, 50);

    setFeedback({
      type: "success",
      text: `Duplicated "${srv.title}". You can now customize details and click Save!`
    });
    setModalOpen(true);
  };

  // Delete Service
  const handleDelete = async (srv) => {
    const targetId = srv._id || srv.id;
    if (!window.confirm(`Are you sure you want to delete "${srv.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/services/${targetId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setFeedback({ type: "success", text: `"${srv.title}" deleted successfully.` });
        setServices((prev) => prev.filter((s) => (s._id || s.id) !== targetId));
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete service.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto generate slug if changing title on create
      ...(name === "title" && !isEditing && !prev.id.startsWith("custom-")
        ? {
            id: value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
          }
        : {})
    }));
  };

  // Helper for array of stats
  const handleStatChange = (index, field, val) => {
    const updated = [...formData.stats];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, stats: updated }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "Metric Label", value: "99%" }]
    }));
  };

  const removeStat = (idx) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== idx)
    }));
  };

  // Helper for Deliverables
  const handleDeliverableChange = (index, field, val) => {
    const updated = [...formData.deliverables];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, deliverables: updated }));
  };

  const addDeliverable = () => {
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, { title: "Deliverable Title", desc: "Explanation of deliverable." }]
    }));
  };

  const removeDeliverable = (idx) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== idx)
    }));
  };

  // Helper for Process Steps (Proven Playbook / Strategic Engine)
  const handleProcessChange = (index, field, val) => {
    const updated = [...formData.process];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, process: updated }));
  };

  const addProcess = () => {
    setFormData((prev) => {
      const nextStepNum = String(prev.process.length + 1).padStart(2, "0");
      return {
        ...prev,
        process: [
          ...prev.process,
          { step: nextStepNum, title: "Step Title", desc: "Explanation of this step." }
        ]
      };
    });
  };

  const removeProcess = (idx) => {
    setFormData((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== idx)
    }));
  };

  // Helper for FAQs
  const handleFaqChange = (index, field, val) => {
    const updated = [...formData.faqs];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: "Frequently asked question?", a: "Helpful answer." }]
    }));
  };

  const removeFaq = (idx) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };

  // Submit Form (Save / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", text: "" });

    try {
      // Parse features from lines
      const featuresArray = formData.featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        id: formData.id.trim(),
        title: formData.title.trim(),
        category: formData.category,
        tag: formData.tag.trim(),
        shortDesc: formData.shortDesc.trim(),
        desc: formData.shortDesc.trim(), // sync for legacy views
        fullDesc: formData.fullDesc.trim(),
        image: formData.image ? formData.image.trim() : "",
        imageAlt: formData.imageAlt ? formData.imageAlt.trim() : "",
        iconName: formData.iconName.trim() || "Globe",
        order: Number(formData.order) || 0,
        stats: formData.stats.filter((s) => s.label && s.value),
        features: featuresArray,
        deliverables: formData.deliverables.filter((d) => d.title),
        process: formData.process.filter((p) => p.title),
        faqs: formData.faqs.filter((f) => f.q),
        spotlightBadge: formData.spotlightBadge ? formData.spotlightBadge.trim() : "",
        spotlightTitle: formData.spotlightTitle ? formData.spotlightTitle.trim() : "",
        spotlightContent: spotlightEditorRef.current ? spotlightEditorRef.current.innerHTML.trim() : (formData.spotlightContent ? formData.spotlightContent.trim() : ""),
        spotlightImage: formData.spotlightImage ? formData.spotlightImage.trim() : "",
        spotlightImageAlt: formData.spotlightImageAlt ? formData.spotlightImageAlt.trim() : "",
        spotlightImagePosition: formData.spotlightImagePosition || "right"
      };

      let res;
      if (isEditing) {
        res = await fetch(`/api/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        const savedData = await res.json();
        setFeedback({
          type: "success",
          text: isEditing
            ? `Service "${savedData.title}" updated successfully.`
            : `Service "${savedData.title}" created successfully!`
        });
        setModalOpen(false);
        fetchServices();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.message || "Failed to save service.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1520px] mr-auto">
      {/* Top Header Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0F1B4C] via-[#091024] to-[#0F1B4C] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Services Management
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
            Create, edit, or customize Digital ORRA core agency services, deliverable plans, KPIs, and FAQs. Changes immediately reflect across public catalog and dedicated slug pages.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105"
            title="Refresh Services"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,51,153,0.35)] flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast Notification */}
      {feedback.text && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-sm font-medium transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/15 border-red-500/30 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
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

      {/* Search & Category Filter Bar */}
      <div className="rounded-2xl bg-[#091024] border border-white/10 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by service title, tag, slug, or summary..."
            className="w-full bg-[#0E1736] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
            }`}
          >
            All Services ({services.length})
          </button>
          {categories.map((cat) => {
            const count = services.filter((s) => s.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid Listing */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-medium">Loading services catalog from database...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl bg-[#091024] border border-dashed border-white/15 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mx-auto mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Services Found</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            {searchQuery || selectedCategory !== "all"
              ? "No services matched your active search query or category filter."
              : "You haven't added any services yet. Click below to add your first service."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Service</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv._id || srv.id}
              className="group rounded-2xl bg-[#091024] border border-white/10 hover:border-cyan-400/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Category Badge & Slug */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {srv.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    /{srv.id}
                  </span>
                </div>

                {/* Title & Tag & Optional Thumbnail */}
                <div className="flex items-start gap-3 mb-2">
                  {srv.image && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex-shrink-0">
                      <img 
                        src={srv.image} 
                        alt={srv.imageAlt || srv.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {srv.title}
                    </h3>
                    {srv.tag && (
                      <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider block">
                        ✦ {srv.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
                  {srv.shortDesc || srv.desc || "No summary provided."}
                </p>

                {/* Quick stats preview */}
                {srv.stats && srv.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4 text-center">
                    {srv.stats.slice(0, 3).map((st, i) => (
                      <div key={i}>
                        <div className="text-xs font-black text-white">{st.value}</div>
                        <div className="text-[10px] text-gray-400 truncate">{st.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <Link
                  href={`/${srv.id}`}
                  target="_blank"
                  className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDuplicateService(srv)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-300 transition-colors"
                    title="Duplicate / Clone Service"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 transition-colors"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT DRAWER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#091024] border border-white/20 rounded-3xl p-6 sm:p-8 my-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{isEditing ? "Modify Service Package" : "Publish New Agency Service"}</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {isEditing ? `Edit: ${formData.title}` : "Create Service Offering"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Title, Slug, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Social Media Management"
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-[#091024]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Slug/ID & Highlight Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    URL Slug / ID * <span className="text-gray-400 font-normal">(e.g. /your-slug)</span>
                  </label>
                  <input
                    type="text"
                    name="id"
                    required
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="e.g. performance-marketing"
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Badge / Tagline <span className="text-gray-400 font-normal">(e.g. High ROAS, Viral Growth)</span>
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. Viral Growth Engine"
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Short Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Short Description (For Catalog Cards) *
                </label>
                <textarea
                  name="shortDesc"
                  required
                  rows={2}
                  value={formData.shortDesc}
                  onChange={handleChange}
                  placeholder="Concise 1-2 sentence overview shown on the main services catalog grid..."
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl p-3.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Row 4: Full In-Depth Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Detailed Description (For Dedicated /services/[slug] Page)
                </label>
                <textarea
                  name="fullDesc"
                  rows={3}
                  value={formData.fullDesc}
                  onChange={handleChange}
                  placeholder="Comprehensive breakdown of value proposition, framework, and strategy..."
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl p-3.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Service Hero Showcase Image & Alt Text */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-200">
                    Service Showcase Image &amp; SEO Alt Text
                  </label>
                  <span className="text-[11px] text-cyan-400 font-mono">Hero Banner / Card Visual</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: File Upload */}
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
                      Upload from Device
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0E1736] border border-dashed border-white/20 hover:border-cyan-400/60 text-gray-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5"
                    >
                      {uploading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Choose Image File</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Option 2: Image URL */}
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
                      Or Image URL / Link
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://... or /assets/..."
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Alt Text Input */}
                <div>
                  <label className="block text-[11px] text-gray-300 mb-1.5 font-semibold">
                    Image Alt Text <span className="text-cyan-400 font-normal">(Crucial for SEO &amp; Screen Readers)</span>
                  </label>
                  <input
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleChange}
                    placeholder="e.g. Social media marketing campaign dashboard by Digital ORRA"
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Live Image Preview */}
                {formData.image && (
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/15 flex-shrink-0 relative">
                      <img
                        src={formData.image}
                        alt={formData.imageAlt || "Preview"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-emerald-400 font-medium truncate flex items-center gap-1">
                        <Check className="w-3 h-3" /> Image linked successfully
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        Alt: {formData.imageAlt || "No alt text provided"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "", imageAlt: "" }))}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded bg-rose-500/10"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Row 5: Features (One per line) */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Core Highlights / Features <span className="text-gray-400 font-normal">(One feature per line)</span>
                </label>
                <textarea
                  name="featuresText"
                  rows={4}
                  value={formData.featuresText}
                  onChange={handleChange}
                  placeholder="Multi-Channel Funnel Architecture&#10;Real-Time Budget Scaling&#10;Audience Retargeting&#10;Conversion Rate Optimization"
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl p-3 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors leading-relaxed"
                />
              </div>

              {/* Row 6: KPI & Stats Counters */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-200">
                    Key Performance Metrics / Stat Badges
                  </label>
                  <button
                    type="button"
                    onClick={addStat}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    + Add Metric
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {formData.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 relative"
                    >
                      <input
                        type="text"
                        placeholder="Value (e.g. +350%)"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                        className="w-full bg-[#0E1736] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Reach Scaled)"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                        className="w-full bg-[#0E1736] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-300"
                      />
                      {formData.stats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStat(idx)}
                          className="text-[10px] text-rose-400 hover:text-rose-300 mt-1 block"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 7: Deliverables */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-200">
                    Deliverables & Output
                  </label>
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    + Add Deliverable
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                    >
                      <input
                        type="text"
                        placeholder="Title (e.g. Viral Reels & Carousels)"
                        value={del.title}
                        onChange={(e) => handleDeliverableChange(idx, "title", e.target.value)}
                        className="w-full sm:w-1/3 bg-[#0E1736] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Short Description of deliverable output..."
                        value={del.desc}
                        onChange={(e) => handleDeliverableChange(idx, "desc", e.target.value)}
                        className="w-full sm:w-2/3 bg-[#0E1736] border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-300"
                      />
                      {formData.deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDeliverable(idx)}
                          className="text-gray-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 8: Strategic Process Engine (Steps 01, 02, 03, 04) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-200 flex items-center gap-2">
                    <span>Strategic Engine / Process (01, 02, 03, 04)</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">Proven Playbook</span>
                  </label>
                  <button
                    type="button"
                    onClick={addProcess}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    + Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.process && formData.process.map((stepItem, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="01"
                          value={stepItem.step || String(idx + 1).padStart(2, '0')}
                          onChange={(e) => handleProcessChange(idx, "step", e.target.value)}
                          className="w-16 bg-[#0E1736] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-cyan-400 font-mono font-bold text-center"
                        />
                        <input
                          type="text"
                          placeholder="Step Title (e.g. Audit & Persona Analysis)"
                          value={stepItem.title}
                          onChange={(e) => handleProcessChange(idx, "title", e.target.value)}
                          className="flex-1 bg-[#0E1736] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                        />
                        {formData.process.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProcess(idx)}
                            className="text-gray-400 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description of this step..."
                        value={stepItem.desc}
                        onChange={(e) => handleProcessChange(idx, "desc", e.target.value)}
                        className="w-full bg-[#0E1736] border border-white/10 rounded-lg p-2.5 text-xs text-gray-300 resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 9: FAQs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-200">
                    Frequently Asked Questions (FAQs)
                  </label>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    + Add FAQ
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Question (e.g. Which ad platforms do you handle?)"
                          value={faq.q}
                          onChange={(e) => handleFaqChange(idx, "q", e.target.value)}
                          className="w-full bg-[#0E1736] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-bold"
                        />
                        {formData.faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFaq(idx)}
                            className="text-gray-400 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Answer..."
                        value={faq.a}
                        onChange={(e) => handleFaqChange(idx, "a", e.target.value)}
                        className="w-full bg-[#0E1736] border border-white/10 rounded-lg p-2.5 text-xs text-gray-300 resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 10: In-Depth Spotlight / Deep-Dive Framework (Rich Content Editor) */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111A38] to-[#0A122A] border border-cyan-500/25 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <label className="text-xs font-bold text-white uppercase tracking-wider">
                        Spotlight Deep-Dive Section (One Side Image + One Side Rich Content)
                      </label>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Optional in-depth block placed between Deliverables and Process Engine. Leave blank if not needed.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-300 font-medium">Image Side:</span>
                    <select
                      name="spotlightImagePosition"
                      value={formData.spotlightImagePosition}
                      onChange={handleChange}
                      className="bg-[#0E1736] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-bold focus:outline-none"
                    >
                      <option value="right">Right Side</option>
                      <option value="left">Left Side</option>
                    </select>
                  </div>
                </div>

                {/* Badge + Title */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      name="spotlightBadge"
                      value={formData.spotlightBadge}
                      onChange={handleChange}
                      placeholder="e.g. OUR FRAMEWORK"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">Section Heading</label>
                    <input
                      type="text"
                      name="spotlightTitle"
                      value={formData.spotlightTitle}
                      onChange={handleChange}
                      placeholder="e.g. Data-Backed Viral Content Architecture"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Spotlight Image Upload / URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">Spotlight Image</label>
                  <input
                    type="file"
                    ref={spotlightFileInputRef}
                    onChange={handleSpotlightImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="spotlightImage"
                      value={formData.spotlightImage}
                      onChange={handleChange}
                      placeholder="https://... or upload image"
                      className="flex-1 bg-[#0E1736] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => spotlightFileInputRef.current?.click()}
                      disabled={uploadingSpotlight}
                      className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 disabled:opacity-50"
                    >
                      {uploadingSpotlight ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingSpotlight ? "Uploading..." : "Upload"}</span>
                    </button>
                  </div>
                  {formData.spotlightImage && (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg border border-white/15 overflow-hidden bg-black/40 flex-shrink-0">
                        <img src={formData.spotlightImage} alt="Spotlight Preview" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        name="spotlightImageAlt"
                        value={formData.spotlightImageAlt}
                        onChange={handleChange}
                        placeholder="Image Alt Text (for SEO)"
                        className="flex-1 bg-[#0E1736] border border-white/15 rounded-lg px-2.5 py-1 text-[11px] text-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Rich Text Editor Toolbar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold text-gray-300">
                      Rich Content (H1-H5, Bold, Italic, Underline, Links, Lists, Quotes)
                    </label>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#090F24] border border-white/15 rounded-t-xl">
                    {/* Headings dropdown */}
                    <div className="relative">
                      <select
                        defaultValue="<p>"
                        onChange={(e) => formatSpotlightDoc("formatBlock", e.target.value)}
                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer pr-6"
                      >
                        <option value="<p>" className="bg-[#0A1128] text-gray-200">Paragraph</option>
                        <option value="<h1>" className="bg-[#0A1128] text-white font-bold">H1 - Heading 1</option>
                        <option value="<h2>" className="bg-[#0A1128] text-white font-bold">H2 - Heading 2</option>
                        <option value="<h3>" className="bg-[#0A1128] text-[#FF3399] font-bold">H3 - Subheading</option>
                        <option value="<h4>" className="bg-[#0A1128] text-cyan-300 font-bold">H4 - Minor Heading</option>
                        <option value="<h5>" className="bg-[#0A1128] text-amber-300 font-bold">H5 - Small Heading</option>
                      </select>
                    </div>

                    <div className="h-4 w-px bg-white/15 mx-0.5" />

                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("bold")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("italic")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("underline")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-white/15 mx-0.5" />

                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("insertUnorderedList")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300"
                      title="Bullet List"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("insertOrderedList")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatSpotlightDoc("formatBlock", "<blockquote>")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-pink-400 hover:text-pink-300"
                      title="Quote"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-white/15 mx-0.5" />

                    <button
                      type="button"
                      onClick={handleSpotlightAddLink}
                      className="px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Insert Hyperlink"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Link</span>
                    </button>
                  </div>

                  {/* WYSIWYG Editable Box */}
                  <div
                    ref={spotlightEditorRef}
                    contentEditable
                    onInput={(e) => setFormData((prev) => ({ ...prev, spotlightContent: e.currentTarget.innerHTML }))}
                    className="min-h-[140px] max-h-[260px] overflow-y-auto bg-[#0A1128] border border-t-0 border-white/15 rounded-b-xl p-3.5 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 custom-editor-scrollbar leading-relaxed"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold shadow-lg shadow-pink-500/30 flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving Changes..." : isEditing ? "Update Service" : "Create Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
