"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Globe,
  Save,
  Check,
  Building2,
  Eye,
  FileText,
  Sliders,
  ChevronRight,
  Upload,
  Image as ImageIcon
} from "lucide-react";

export default function AdminLocationsPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingLocal, setUploadingLocal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal / Drawer state for Create or Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);

  // Form State
  const initialFormState = {
    title: "",
    slug: "",
    city: "Panchkula",
    heroBadge: "Premier Web Solutions in Panchkula",
    heroHeadline: "",
    heroSubheadline: "",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    whyLocalTitle: "Why Every Panchkula Business Needs a Strong Digital Identity",
    whyLocalContent: "",
    whyLocalImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    whyChooseTitle: "Why Choose Digital ORRA as Your Web Development Partner in Panchkula?",
    whyChooseReasonsText: "Custom Web Design: Your business is unique, and so should your website be. Our web designers create bespoke designs tailored to reflect your brand identity.\nExpert Development Team: Our web developers leverage the latest technologies including HTML5, CSS3, PHP, React, and WordPress to build fast, secure, and scalable websites.\nMobile Optimization: With mobile traffic on the rise, we ensure that your website is responsive and functions seamlessly on all devices.\nSEO-Optimized Code: We follow SEO best practices from the start, ensuring your site gets indexed properly and ranks higher in search engines.\nUser Experience Focused: Our web designs are not just beautiful—they’re intuitive, easy to navigate, and built for engagement.",
    servicesTitle: "Our Comprehensive Website Services in Panchkula",
    servicesSubtitle: "As a trusted web development company in Panchkula, we provide an extensive suite of services tailored to different business models and industries.",
    servicesListText: "Corporate Website Design: Tailored corporate web design that establishes authority.\nE-commerce Website Development: Scalable online stores built with high converting checkouts.\nCustom Web Applications: Tailored React & Next.js applications solving complex operations.\nWordPress and CMS Solutions: Easy to manage content systems empowering your team.\nLanding Page Design: High conversion lead-generation landing pages for ad campaigns.\nWebsite Redesign & Upgradation: Modernize outdated designs with fresh cyber UI and faster speeds.\nMaintenance & Technical Support: 24/7 bug fixes, uptime monitoring, and security patching.\nSEO and Analytics Integration: Google Analytics, GTM, and technical SEO schema implemented.",
    processTitle: "The Digital ORRA Development Process",
    processStepsText: "Discovery & Planning: Understanding goals, competitors, and audience.\nWireframe Design: Laying out structural flows and wireframes.\nUI/UX Prototyping: Crafting aesthetic high-fidelity responsive visuals.\nDevelopment & Integration: Writing clean, modern code and backend connectivity.\nTesting & Quality Assurance: Rigorous cross-browser and speed audits.\nLaunch & Support: Seamless deployment and ongoing technical SLA.",
    whyBestTitle: "Why We’re the Best Website Designing Company in Panchkula",
    whyBestPointsText: "Experienced Professionals: Our web designers and developers bring years of expertise across diverse domains.\nClient-Centric Approach: We involve you at every stage of the project with full transparency.\nLocal Advantage: Being based in the Tricity area, we understand the local market and customer behavior.\nAffordable Pricing: Quality doesn’t have to break the bank. Our pricing is competitive and transparent.",
    localAdvantageTitle: "Local Presence, Global Standards",
    localAdvantageContent: "At Digital ORRA, we take pride in offering Panchkula businesses global-standard websites with a local touch. Whether you’re a local boutique, a school, a hospital, or a corporate firm, we build websites that elevate your digital game.",
    localAdvantageImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    ctaTitle: "Your Digital Journey Starts Here",
    ctaSubtitle: "Don’t let an outdated or poorly designed website hold your business back. Choose Digital ORRA—Panchkula’s trusted website development company—and give your brand the online presence it deserves.",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    isPublished: true
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch all location pages
  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/locations");
      if (res.ok) {
        const data = await res.json();
        setPages(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load location pages: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Upload handler for Cloudinary
  const handleUploadImage = async (file, fieldKey, setLoader) => {
    if (!file) return;
    setLoader(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Upload failed. Please check credentials.");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, [fieldKey]: data.url }));
      setFeedback({ type: "success", text: "Image uploaded successfully to Cloudinary!" });
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setLoader(false);
    }
  };

  // Helper parsers for textareas into structured arrays
  const parseLinesToItems = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(":");
        if (parts.length > 1) {
          return {
            title: parts[0].trim(),
            desc: parts.slice(1).join(":").trim()
          };
        }
        return { title: line, desc: "" };
      });
  };

  const parseProcessSteps = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const parts = line.split(":");
        return {
          step: `PHASE 0${idx + 1}`,
          title: parts[0].trim(),
          desc: parts.slice(1).join(":").trim()
        };
      });
  };

  // Convert array back to string format for editing
  const formatItemsToText = (items) => {
    if (!Array.isArray(items)) return "";
    return items.map((it) => (it.desc ? `${it.title}: ${it.desc}` : it.title)).join("\n");
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingSlug(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setIsEditing(true);
    setEditingSlug(p.slug);
    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      city: p.city || "Panchkula",
      heroBadge: p.heroBadge || "",
      heroHeadline: p.heroHeadline || "",
      heroSubheadline: p.heroSubheadline || "",
      heroImage: p.heroImage || "",
      whyLocalTitle: p.whyLocalTitle || "",
      whyLocalContent: p.whyLocalContent || "",
      whyLocalImage: p.whyLocalImage || "",
      whyChooseTitle: p.whyChooseTitle || "",
      whyChooseReasonsText: formatItemsToText(p.whyChooseReasons),
      servicesTitle: p.servicesTitle || "",
      servicesSubtitle: p.servicesSubtitle || "",
      servicesListText: formatItemsToText(p.servicesList),
      processTitle: p.processTitle || "",
      processStepsText: formatItemsToText(p.processSteps),
      whyBestTitle: p.whyBestTitle || "",
      whyBestPointsText: formatItemsToText(p.whyBestPoints),
      localAdvantageTitle: p.localAdvantageTitle || "",
      localAdvantageContent: p.localAdvantageContent || "",
      localAdvantageImage: p.localAdvantageImage || "",
      ctaTitle: p.ctaTitle || "",
      ctaSubtitle: p.ctaSubtitle || "",
      metaTitle: p.metaTitle || "",
      metaDescription: p.metaDescription || "",
      metaKeywords: p.metaKeywords || "",
      isPublished: p.isPublished !== false
    });
    setModalOpen(true);
  };

  // Title change with auto-slug
  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      heroHeadline: prev.heroHeadline || val,
      slug: prev.slug === "" || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ? generatedSlug : prev.slug
    }));
  };

  // Save (Create or Update, as Published or Draft)
  const handleSave = async (e, forcePublishedState = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.title) {
      alert("Page title is required!");
      return;
    }

    const publishState = forcePublishedState !== null ? forcePublishedState : formData.isPublished;

    setSaving(true);
    setFeedback({ type: "", text: "" });

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      city: formData.city,
      heroBadge: formData.heroBadge,
      heroHeadline: formData.heroHeadline || formData.title,
      heroSubheadline: formData.heroSubheadline,
      heroImage: formData.heroImage,
      whyLocalTitle: formData.whyLocalTitle,
      whyLocalContent: formData.whyLocalContent,
      whyLocalImage: formData.whyLocalImage,
      whyChooseTitle: formData.whyChooseTitle,
      whyChooseReasons: parseLinesToItems(formData.whyChooseReasonsText),
      servicesTitle: formData.servicesTitle,
      servicesSubtitle: formData.servicesSubtitle,
      servicesList: parseLinesToItems(formData.servicesListText),
      processTitle: formData.processTitle,
      processSteps: parseProcessSteps(formData.processStepsText),
      whyBestTitle: formData.whyBestTitle,
      whyBestPoints: parseLinesToItems(formData.whyBestPointsText),
      localAdvantageTitle: formData.localAdvantageTitle,
      localAdvantageContent: formData.localAdvantageContent,
      localAdvantageImage: formData.localAdvantageImage,
      ctaTitle: formData.ctaTitle,
      ctaSubtitle: formData.ctaSubtitle,
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription || formData.heroSubheadline,
      metaKeywords: formData.metaKeywords,
      isPublished: publishState
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(`/api/locations/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save location page");
      }

      setFeedback({
        type: "success",
        text: publishState
          ? (isEditing ? "Location page updated and published!" : "New location page published successfully!")
          : (isEditing ? "Draft updated successfully!" : "Saved as draft! You can complete and publish it anytime.")
      });
      setModalOpen(false);
      fetchPages();
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (slug, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/locations/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ type: "success", text: "Page deleted successfully." });
        fetchPages();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  // Filtered pages
  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === "all" || p.city?.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const uniqueCities = Array.from(new Set(pages.map((p) => p.city).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0F1B4C]/80 via-[#0A1128] to-[#1E0B36]/80 border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-wide text-white">Location Pages Manager</h1>
          </div>
          <p className="text-sm text-gray-400">
            Create high-ranking local landing pages for Panchkula, Mohali, Chandigarh, and other cities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPages}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:opacity-95 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>Create Location Page</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="flex-1">{feedback.text}</span>
          <button onClick={() => setFeedback({ type: "", text: "" })} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, city, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B132B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Cities ({pages.length})</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table List of Location Pages */}
      <div className="rounded-2xl bg-[#091124] border border-white/10 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-cyan-400 mb-3" />
            <p>Loading location landing pages...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <MapPin className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Location Pages Found</h3>
            <p className="text-sm text-gray-500 mb-6">Create your first city landing page to dominate local SEO searches.</p>
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors"
            >
              Add Panchkula Page Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Page Title / Headline</th>
                  <th className="px-6 py-4">Target City</th>
                  <th className="px-6 py-4">Live URL Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPages.map((p) => (
                  <tr key={p._id || p.slug} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-sm">
                        {p.heroSubheadline || p.whyLocalContent?.slice(0, 70)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
                        <MapPin className="w-3 h-3" /> {p.city || "Panchkula"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-pink-400">
                      /{p.slug}
                    </td>
                    <td className="px-6 py-4">
                      {p.isPublished !== false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "Recent"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Preview</span>
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-400 border border-white/10 transition-colors"
                        title="Edit Page"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.slug, p.title)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 border border-white/10 transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#091122] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FF3399]/10 border border-[#FF3399]/30 text-[#FF3399]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {isEditing ? "Edit Location Page" : "Create New Location Page"}
                  </h2>
                  <p className="text-xs text-gray-400">Configure visual mockups, photos, service highlights, and SEO tags.</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Row 1: Title & Target City */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Website Designing & Development Company in Panchkula"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Target City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Panchkula"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                  />
                </div>
              </div>

              {/* Row 2: Live Slug & Hero Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    URL Slug (Root path) *
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 rounded-l-xl bg-white/5 border border-r-0 border-white/10 text-gray-400 text-xs">
                      /
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-r-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#FF3399]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Hero Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroBadge}
                    onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                    placeholder="e.g. Premier Web Solutions in Panchkula"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                  />
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 1: HERO & MAIN INTRO */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
                      SECTION 1
                    </span>
                    <span className="text-sm font-bold text-white">Hero Section (Top of the Page)</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Live Heading, Badge, Intro & Right Image</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Hero Intro Paragraph / Subheadline
                    </label>
                    <textarea
                      rows={3}
                      value={formData.heroSubheadline}
                      onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                      placeholder="In the vibrant city of Panchkula, businesses are rapidly embracing digital transformation to stay ahead..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* HERO RIGHT VISUAL IMAGE */}
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-2.5">
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4" /> Hero Right Visual Showcase Image
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/15 shrink-0">
                        {formData.heroImage ? (
                          <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={formData.heroImage}
                          onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                          placeholder="Paste Image URL or upload from local device..."
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                        <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingHero ? "Uploading..." : "Upload Hero Showcase Image"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadImage(e.target.files?.[0], "heroImage", setUploadingHero)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 2: LOCAL MARKET DOMINANCE */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-teal-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold font-mono">
                      SECTION 2
                    </span>
                    <span className="text-sm font-bold text-white">Local Market Dominance</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Heading outside box + Inner content & photo</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={formData.whyLocalTitle}
                      onChange={(e) => setFormData({ ...formData, whyLocalTitle: e.target.value })}
                      placeholder="Why Every Panchkula Business Needs a Strong Digital Identity"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Card Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.whyLocalContent}
                      onChange={(e) => setFormData({ ...formData, whyLocalContent: e.target.value })}
                      placeholder="Panchkula is a vibrant urban center with a growing mix of startups, small businesses, and enterprises..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  {/* Local Section Photo */}
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4" /> Section 2 Right Showcase Photo
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-black/40 border border-white/15 shrink-0">
                        {formData.whyLocalImage ? (
                          <img src={formData.whyLocalImage} alt="Market Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">No Photo</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1.5 w-full">
                        <input
                          type="text"
                          value={formData.whyLocalImage}
                          onChange={(e) => setFormData({ ...formData, whyLocalImage: e.target.value })}
                          placeholder="Local section photo URL..."
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs cursor-pointer">
                          <Upload className="w-3 h-3 text-teal-400" />
                          <span>{uploadingLocal ? "Uploading..." : "Upload Market Section Photo"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadImage(e.target.files?.[0], "whyLocalImage", setUploadingLocal)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 3: WHY CHOOSE DIGITAL ORRA */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#FF3399]/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF3399]/20 border border-[#FF3399]/40 text-[#FF3399] text-xs font-bold font-mono">
                      SECTION 3
                    </span>
                    <span className="text-sm font-bold text-white">Why Choose Digital ORRA</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Multi-card Grid (Centered bottom row)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={formData.whyChooseTitle}
                      onChange={(e) => setFormData({ ...formData, whyChooseTitle: e.target.value })}
                      placeholder="Why Choose Digital ORRA as Your Web Development Partner in Panchkula?"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Feature Cards (Format: Title : Description)
                      </label>
                      <span className="text-[11px] text-gray-400 font-mono">1 card per line</span>
                    </div>
                    <textarea
                      rows={5}
                      value={formData.whyChooseReasonsText}
                      onChange={(e) => setFormData({ ...formData, whyChooseReasonsText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#FF3399]"
                    />
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 4: NOTICE ABOUT CORE SERVICES */}
              {/* ============================================================ */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-pink-500/30 flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold font-mono shrink-0">
                  SECTION 4
                </span>
                <div className="flex-1 text-xs text-gray-200">
                  <strong className="text-white font-semibold">Our Core Services in {formData.city || "City"} (GIF Bento Cards):</strong> Automatically displayed right here on the live page with 6 animated GIF cards tailored to your target city. No manual inputs needed!
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 5: DEVELOPMENT PROCESS */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-purple-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono">
                      SECTION 5
                    </span>
                    <span className="text-sm font-bold text-white">The Development Process Roadmap</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Milestones (Min 2 per row)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={formData.processTitle}
                      onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                      placeholder="The Digital ORRA Development Process"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                        Process Steps (Format: Step Title : Description)
                      </label>
                      <span className="text-[11px] text-gray-400 font-mono">1 step per line</span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.processStepsText}
                      onChange={(e) => setFormData({ ...formData, processStepsText: e.target.value })}
                      placeholder="Strategy & Wireframing : Deep dive into your audience...&#10;High-Fidelity UI/UX : Designing bespoke user experiences...&#10;Next.js Engineering : Fast, secure and scalable..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* SECTION 6: LOCAL PRESENCE & REGIONAL AUTHORITY */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
                      SECTION 6
                    </span>
                    <span className="text-sm font-bold text-white">Local Presence & Regional Authority</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Office banner & global standards</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Banner Heading
                    </label>
                    <input
                      type="text"
                      value={formData.localAdvantageTitle}
                      onChange={(e) => setFormData({ ...formData, localAdvantageTitle: e.target.value })}
                      placeholder="Local Presence, Global Standards"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Office & Regional Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.localAdvantageContent}
                      onChange={(e) => setFormData({ ...formData, localAdvantageContent: e.target.value })}
                      placeholder="Describe your physical regional presence, SCO address, and delivery standards..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* SEO METADATA SETTINGS */}
              {/* ============================================================ */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> SEO & Google Ranking Meta Tags
                  </div>
                  <span className="text-[11px] text-gray-400">Search Engine Optimization</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Meta Title Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Website Designing Company in Panchkula | Digital ORRA"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      placeholder="website development panchkula, web design, digital orra"
                      value={formData.metaKeywords}
                      onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Meta Description (Google Snippet)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Meta Description (Summary for Google Search snippets)..."
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Unfinished? Click <strong>Save as Draft</strong> to complete anytime.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>

                  {/* Save as Draft Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={(e) => handleSave(e, false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all hover:border-cyan-400/50 disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>{saving ? "Saving..." : "Save as Draft"}</span>
                  </button>

                  {/* Publish Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={(e) => handleSave(e, true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Publishing..." : isEditing ? "Update & Publish" : "Publish Location Page"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
