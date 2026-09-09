"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Sliders,
  Sparkles,
  FileText,
  Tag,
  Eye,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code
} from "lucide-react";

export default function AdminSeoPage() {
  const [pagesSeo, setPagesSeo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPath, setSelectedPath] = useState("/");
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // Active Selected Page Form State
  const [formData, setFormData] = useState({
    pagePath: "/",
    pageName: "Home Page",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "",
    robots: "index, follow",
    structuredData: ""
  });

  // Fetch SEO data for all static pages
  const fetchSeoData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPagesSeo(data);
          // Set form to active path or first page
          const current = data.find((p) => p.pagePath === selectedPath) || data[0];
          if (current) {
            setSelectedPath(current.pagePath);
            setFormData({
              pagePath: current.pagePath || "",
              pageName: current.pageName || "",
              metaTitle: current.metaTitle || "",
              metaDescription: current.metaDescription || "",
              metaKeywords: current.metaKeywords || "",
              ogImage: current.ogImage || "/DO JPG.jpeg",
              canonicalUrl: current.canonicalUrl || "",
              robots: current.robots || "index, follow",
              structuredData: current.structuredData || ""
            });
          }
        }
      } else {
        throw new Error("Failed to load SEO pages");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Failed to load SEO data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  // Handle switching page from sidebar list
  const handleSelectPage = (page) => {
    setSelectedPath(page.pagePath);
    setFormData({
      pagePath: page.pagePath || "",
      pageName: page.pageName || "",
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      metaKeywords: page.metaKeywords || "",
      ogImage: page.ogImage || "/DO JPG.jpeg",
      canonicalUrl: page.canonicalUrl || "",
      robots: page.robots || "index, follow",
      structuredData: page.structuredData || ""
    });
    setFeedback({ type: "", text: "" });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save SEO Configuration
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: "", text: "" });

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const result = await res.json();
        setFeedback({
          type: "success",
          text: `SEO for "${formData.pageName}" saved successfully!`
        });

        // Update local list
        setPagesSeo((prev) =>
          prev.map((p) => (p.pagePath === formData.pagePath ? result.data : p))
        );
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update SEO.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const [filterTab, setFilterTab] = useState("all");

  // Filtered pages in left list with client-side deduplication
  const filteredPages = React.useMemo(() => {
    const seen = new Set();
    return pagesSeo.filter((p) => {
      const path = p.pagePath || (p.pageSlug ? (p.pageSlug === "home" ? "/" : "/" + p.pageSlug) : "/");
      const name = p.pageName || "";
      const slug = p.pageSlug || "";

      // Ensure no duplicate path ever enters the list
      if (seen.has(path)) return false;
      seen.add(path);

      const isService = path.startsWith("/services") || slug.startsWith("services");
      const isBlog = slug.startsWith("blog/") || (!isService && path !== "/" && path !== "/about-us" && path !== "/courses" && path !== "/company-profile" && path !== "/gallery" && path !== "/join-our-team" && path !== "/contact" && path !== "/contact-us" && path !== "/faqs" && path !== "/blog" && path !== "/our-team" && path !== "/scan-qr" && path !== "/portfolio" && path !== "/academy" && path !== "/it-company" && path !== "/testimonial");
      const isCoreStatic = !isService && !isBlog;

      // Tab filter
      if (filterTab === "static" && !isCoreStatic) {
        return false;
      } else if (filterTab === "services" && !isService) {
        return false;
      } else if (filterTab === "blogs" && !isBlog) {
        return false;
      }

      const matchesSearch =
        searchQuery.trim() === "" ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [pagesSeo, filterTab, searchQuery]);

  // Character counts helper
  const titleLen = formData.metaTitle.length;
  const descLen = formData.metaDescription.length;

  return (
    <div className="space-y-6 max-w-[1520px] mr-auto">
      {/* Top Header Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0F1B4C] via-[#091024] to-[#0F1B4C] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Website SEO Management
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
            Control search engine rankings, Google SERP snippets, OpenGraph social previews, canonical tags, and indexing rules for all static pages, services, and 71+ blog articles.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={fetchSeoData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105"
            title="Refresh SEO data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
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
            ✕
          </button>
        </div>
      )}

      {/* Main 2-Column SEO Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Static Pages List (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#091024] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>All Pages ({filteredPages.length})</span>
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by page name or path..."
              className="w-full bg-[#0E1736] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Type Filter Pills with Live Counts */}
          <div className="flex items-center gap-1.5 pb-1 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "All" },
              { id: "static", label: "Main Pages" },
              { id: "services", label: "Services" },
              { id: "blogs", label: "Articles" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterTab === tab.id
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Page Selector Tabs */}
          {loading ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
              Loading pages...
            </div>
          ) : (
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1.5 custom-editor-scrollbar">
              {filteredPages.map((page, idx) => {
                const isActive = page.pagePath === selectedPath;
                return (
                  <button
                    key={page._id || page.pagePath || `page-${idx}`}
                    onClick={() => handleSelectPage(page)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                      isActive
                        ? "bg-gradient-to-r from-[#0F1B4C] to-[#142042] border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-gray-300"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold truncate group-hover:text-cyan-300 transition-colors">
                        {page.pageName}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono truncate">
                        {page.pagePath}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: SEO Configuration Form & Google Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Google SERP Preview Card */}
          <div className="rounded-2xl bg-[#091024] border border-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-pink-400" />
                Live Google Search Preview (SERP)
              </span>
              <Link
                href={formData.pagePath}
                target="_blank"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <span>Visit Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Google Result Mock */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0c1222] border border-white/10 font-sans max-w-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-[#FF3399]/20 border border-[#FF3399]/40 flex items-center justify-center text-[10px] font-black text-[#FF3399]">
                  DO
                </div>
                <div className="text-xs text-gray-400 truncate">
                  https://digitalorra.com{formData.pagePath === "/" ? "" : formData.pagePath}
                </div>
              </div>
              <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1">
                {formData.metaTitle || "Page Meta Title Goes Here | Digital ORRA"}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                {formData.metaDescription ||
                  "Add your comprehensive meta description here to see how it will appear on Google search result pages..."}
              </p>
            </div>
          </div>

          {/* SEO Edit Form */}
          <form onSubmit={handleSave} className="rounded-2xl bg-[#091024] border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Target: {formData.pagePath}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Edit SEO for {formData.pageName}
                </h2>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-[0_0_20px_rgba(255,51,153,0.35)] flex items-center gap-2 transition-all disabled:opacity-50 hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving Changes..." : "Save SEO"}</span>
              </button>
            </div>

            {/* Page Display Name & Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Page Display Name *
                </label>
                <input
                  type="text"
                  name="pageName"
                  required
                  value={formData.pageName}
                  onChange={handleChange}
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  URL Route Path *
                </label>
                <input
                  type="text"
                  name="pagePath"
                  required
                  value={formData.pagePath}
                  onChange={handleChange}
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-200">
                  Meta Title *
                </label>
                <span
                  className={`text-[11px] font-semibold ${
                    titleLen >= 50 && titleLen <= 60
                      ? "text-emerald-400"
                      : titleLen > 60
                      ? "text-rose-400"
                      : "text-amber-400"
                  }`}
                >
                  {titleLen}/60 chars (Recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                name="metaTitle"
                required
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="e.g. Best Digital Marketing Agency in Panchkula | Digital ORRA"
                className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-200">
                  Meta Description *
                </label>
                <span
                  className={`text-[11px] font-semibold ${
                    descLen >= 140 && descLen <= 160
                      ? "text-emerald-400"
                      : descLen > 160
                      ? "text-rose-400"
                      : "text-amber-400"
                  }`}
                >
                  {descLen}/160 chars (Recommended: 140-160)
                </span>
              </div>
              <textarea
                name="metaDescription"
                required
                rows={3}
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="High-converting summary that entices users to click from Google search..."
                className="w-full bg-[#0E1736] border border-white/15 rounded-xl p-3.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-2">
                Meta Keywords / Search Tags <span className="text-gray-400 font-normal">(Comma separated)</span>
              </label>
              <input
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="e.g. digital marketing, performance ads, SEO agency, Digital ORRA"
                className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* OpenGraph Image & Canonical URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Social Sharing Image (OG:Image URL)
                </label>
                <input
                  type="text"
                  name="ogImage"
                  value={formData.ogImage}
                  onChange={handleChange}
                  placeholder="/DO JPG.jpeg or https://..."
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  placeholder="https://digitalorra.com/..."
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Robots Indexing & Structured Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Robots Meta Tag
                </label>
                <select
                  name="robots"
                  value={formData.robots}
                  onChange={handleChange}
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="index, follow" className="bg-[#091024]">index, follow (Recommended)</option>
                  <option value="noindex, follow" className="bg-[#091024]">noindex, follow</option>
                  <option value="noindex, nofollow" className="bg-[#091024]">noindex, nofollow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Custom JSON-LD Schema <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="structuredData"
                  value={formData.structuredData}
                  onChange={handleChange}
                  placeholder='{"@context": "https://schema.org", ...}'
                  className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,51,153,0.35)] flex items-center gap-2 transition-all disabled:opacity-50 hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving Changes..." : "Save SEO Configuration"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
