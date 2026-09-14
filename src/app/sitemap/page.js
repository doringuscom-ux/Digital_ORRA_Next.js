"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { Copy, Check, ExternalLink, Search, Globe, Layers, BookOpen, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { servicesData } from "../../data/servicesData";

export default function HtmlSitemapPage() {
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dynamicLinks, setDynamicLinks] = useState({
    services: [],
    blogs: [],
    locations: [],
  });
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://digitalorra.com";

  // Core Static Pages
  const corePages = [
    { title: "Home Page", url: `${baseUrl}/`, path: "/", priority: "1.0", category: "core" },
    { title: "About Us", url: `${baseUrl}/about-us`, path: "/about-us", priority: "0.8", category: "core" },
    { title: "Our Core Team", url: `${baseUrl}/our-team`, path: "/our-team", priority: "0.8", category: "core" },
    { title: "Services Catalog", url: `${baseUrl}/services`, path: "/services", priority: "0.9", category: "core" },
    { title: "Academy Courses", url: `${baseUrl}/courses`, path: "/courses", priority: "0.8", category: "core" },
    { title: "Company Profile", url: `${baseUrl}/company-profile`, path: "/company-profile", priority: "0.7", category: "core" },
    { title: "Media Gallery", url: `${baseUrl}/gallery`, path: "/gallery", priority: "0.6", category: "core" },
    { title: "Client Testimonials", url: `${baseUrl}/testimonial`, path: "/testimonial", priority: "0.8", category: "core" },
    { title: "Our Portfolio", url: `${baseUrl}/portfolio`, path: "/portfolio", priority: "0.9", category: "core" },
    { title: "Skill Workshop", url: `${baseUrl}/skill-development-workshop`, path: "/skill-development-workshop", priority: "0.8", category: "core" },
    { title: "Careers / Join Team", url: `${baseUrl}/join-our-team`, path: "/join-our-team", priority: "0.7", category: "core" },
    { title: "Blog & Insights", url: `${baseUrl}/blog`, path: "/blog", priority: "0.9", category: "core" },
    { title: "Contact Us", url: `${baseUrl}/contact`, path: "/contact", priority: "0.8", category: "core" },
    { title: "FAQs", url: `${baseUrl}/faqs`, path: "/faqs", priority: "0.6", category: "core" },
    { title: "Privacy Policy", url: `${baseUrl}/privacy-policy`, path: "/privacy-policy", priority: "0.6", category: "core" },
    { title: "Scan QR", url: `${baseUrl}/scan-qr`, path: "/scan-qr", priority: "0.6", category: "core" },
  ];

  useEffect(() => {
    async function loadDynamicLinks() {
      try {
        // Fetch services, blogs, locations concurrently
        const [servicesRes, blogsRes, locationsRes] = await Promise.allSettled([
          fetch("/api/services").then((r) => (r.ok ? r.json() : [])),
          fetch("/api/blog?limit=100").then((r) => (r.ok ? r.json() : [])),
          fetch("/api/locations").then((r) => (r.ok ? r.json() : [])),
        ]);

        const rawServices = servicesRes.status === "fulfilled" && Array.isArray(servicesRes.value) && servicesRes.value.length > 0
          ? servicesRes.value
          : servicesData;

        const services = rawServices.map((s) => ({
          title: s.title || s.name || s.id,
          url: `${baseUrl}/${s.id || s.slug}`,
          path: `/${s.id || s.slug}`,
          priority: "0.85",
          category: "services",
        }));

        let blogs = [];
        if (blogsRes.status === "fulfilled" && Array.isArray(blogsRes.value)) {
          blogs = blogsRes.value.filter((b) => b.slug).map((b) => ({
            title: b.title || b.slug,
            url: `${baseUrl}/${b.slug}`,
            path: `/${b.slug}`,
            priority: "0.75",
            category: "blogs",
          }));
        }

        let locations = [];
        if (locationsRes.status === "fulfilled" && Array.isArray(locationsRes.value)) {
          locations = locationsRes.value.filter((l) => l.slug).map((l) => ({
            title: l.metaTitle || l.city || l.slug,
            url: `${baseUrl}/${l.slug}`,
            path: `/${l.slug}`,
            priority: "0.90",
            category: "locations",
          }));
        }

        setDynamicLinks({ services, blogs, locations });
      } catch (err) {
        console.error("Error loading sitemap links:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicLinks();
  }, []);

  const allLinks = [
    ...corePages,
    ...dynamicLinks.services,
    ...dynamicLinks.blogs,
    ...dynamicLinks.locations,
  ];

  const filteredLinks = allLinks.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      item.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleCopyAll = () => {
    const text = filteredLinks.map((item) => item.url).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#080D1F] text-white flex flex-col relative selection:bg-pink-500 selection:text-white">
      <DynamicSeoHead path="/sitemap" />
      <Navbar />

      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[35%] right-[10%] w-[550px] h-[550px] bg-pink-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            SITEMAP
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-36">
          {/* Header Card */}
          <div className="rounded-3xl bg-gradient-to-r from-[#121B38]/90 via-[#0B1229]/95 to-[#080E24]/90 border border-white/15 p-6 sm:p-10 mb-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-pink-500"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Navigation Directory</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">Sitemap Directory</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl font-light">
                  Browse all live pages, services, articles, and location landing pages. Click any URL to open, or click <strong className="text-white font-semibold">Copy</strong> to copy link directly to your clipboard.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleCopyAll}
                  className="btn-glow-pink px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  {copiedAll ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                  <span>{copiedAll ? "Copied All Links!" : "Copy All Filtered Links"}</span>
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all hover:border-cyan-400/50"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Raw XML</span>
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-center">
                <div className="text-[11px] font-mono text-gray-400 uppercase">Total Pages</div>
                <div className="text-xl font-black text-cyan-300 mt-0.5">{allLinks.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-center">
                <div className="text-[11px] font-mono text-gray-400 uppercase">Core Pages</div>
                <div className="text-xl font-black text-white mt-0.5">{corePages.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-center">
                <div className="text-[11px] font-mono text-gray-400 uppercase">Services</div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">{dynamicLinks.services.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-center">
                <div className="text-[11px] font-mono text-gray-400 uppercase">Blogs &amp; Locations</div>
                <div className="text-xl font-black text-pink-400 mt-0.5">{dynamicLinks.blogs.length + dynamicLinks.locations.length}</div>
              </div>
            </div>
          </div>

          {/* Controls: Search & Category Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
              {[
                { id: "all", label: `All (${allLinks.length})`, icon: Globe },
                { id: "core", label: `Core Pages (${corePages.length})`, icon: Layers },
                { id: "services", label: `Services (${dynamicLinks.services.length})`, icon: Sparkles },
                { id: "blogs", label: `Blogs (${dynamicLinks.blogs.length})`, icon: BookOpen },
                { id: "locations", label: `Locations (${dynamicLinks.locations.length})`, icon: MapPin },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "bg-[#101833] text-gray-300 hover:text-white border border-white/10 hover:border-cyan-400/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by URL or page title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0E1733] border border-white/15 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-[#131F45] transition-all"
              />
            </div>
          </div>

          {/* Links Directory Table / Grid */}
          <div className="rounded-3xl border border-white/15 overflow-hidden bg-[#0B132B]/80 backdrop-blur-xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">Page Title &amp; URL</th>
                    <th className="py-3.5 px-4 w-32 text-center">Category</th>
                    <th className="py-3.5 px-4 w-24 text-center">Priority</th>
                    <th className="py-3.5 px-4 w-36 text-center">Copy Link</th>
                    <th className="py-3.5 px-4 w-28 text-center">Open</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredLinks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400">
                        No pages match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLinks.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-cyan-500/[0.06] transition-colors group"
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 text-center text-xs text-gray-400 font-mono">
                          {idx + 1}
                        </td>

                        {/* Title & URL */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <span className="truncate max-w-md text-cyan-400/80">{item.url}</span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider border ${
                              item.category === "core"
                                ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                                : item.category === "services"
                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                : item.category === "blogs"
                                ? "bg-pink-500/15 border-pink-500/30 text-pink-300"
                                : "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-xs font-mono font-bold text-cyan-300 bg-white/[0.05] px-2 py-1 rounded-md border border-white/10">
                            {item.priority}
                          </span>
                        </td>

                        {/* Copy Link Button */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleCopy(item.url)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto border ${
                              copiedUrl === item.url
                                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                : "bg-white/[0.08] hover:bg-cyan-500/20 border-white/15 hover:border-cyan-400/50 text-gray-200 hover:text-cyan-300"
                            }`}
                            title="Copy link to clipboard"
                          >
                            {copiedUrl === item.url ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Open Link Button */}
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/30 transition-all"
                          >
                            <span>Visit</span>
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer hideCta={true} />
    </main>
  );
}
