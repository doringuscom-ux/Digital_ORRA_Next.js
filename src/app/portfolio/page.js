"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { 
  ExternalLink, 
  Layers, 
  ArrowRight, 
  Sparkles,
  Search,
  Maximize2,
  X
} from "lucide-react";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setPortfolios(data);
          }
        }
      } catch (err) {
        console.error("Error loading portfolio projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, []);

  // Extract distinct category tabs dynamically
  const categories = React.useMemo(() => {
    const set = new Set();
    portfolios.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });

    const list = [{ id: "all", label: "All Projects" }];
    set.forEach((cat) => {
      list.push({ id: cat, label: cat });
    });
    return list;
  }, [portfolios]);

  // Filter projects by category and search
  const filteredProjects = portfolios.filter((p) => {
    const matchesCategory =
      activeTab === "all" ||
      (p.category || "").toLowerCase() === activeTab.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/portfolio" />

      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Background Radial Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[12%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Exact Same Watermark Pattern */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div 
          style={{ pointerEvents: "none" }} 
          className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
        >
          <span 
            style={{ 
              pointerEvents: "none",
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            OUR PORTFOLIO
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-36">

          {/* Category Filter Tabs (if multiple categories available) */}
          {categories.length > 1 && (
            <div className="relative z-20 mb-10 w-full flex items-center justify-center">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-2 w-full max-w-5xl">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-[13.5px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      activeTab.toLowerCase() === cat.id.toLowerCase()
                        ? "bg-gradient-to-r from-[#FF66B2] via-pink-400 to-[#FF85C0] text-white shadow-[0_0_18px_rgba(255,102,178,0.45)] font-bold"
                        : "text-slate-300 hover:text-white bg-[#0B132B]/90 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search & Counter Bar with Elegant Typography */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-sm text-slate-300 font-normal">
              Showing <span className="text-white font-bold">{filteredProjects.length}</span> featured projects
            </div>

            {portfolios.length > 4 && (
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/15 rounded-full text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-[#111A38]/40 border border-white/10 overflow-hidden animate-pulse h-80 flex flex-col justify-end p-6"
                >
                  <div className="h-4 w-20 bg-white/10 rounded-full mb-3" />
                  <div className="h-5 w-48 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-32 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl bg-gradient-to-b from-[#111A38]/60 to-[#0A1128]/80 border border-white/15 p-12 text-center max-w-2xl mx-auto mb-20 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Projects Published Yet</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Client case studies and creative showcases are being updated. Check back shortly or contact our strategists.
              </p>
              <Link
                href="/contact"
                className="btn-glow-pink inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
              >
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Portfolio Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="group relative rounded-3xl overflow-hidden bg-[#0A1128] border border-white/15 hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] flex flex-col justify-between"
                >
                  {/* Card Media Container */}
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                    {/* Category Chip */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md border border-white/20 text-cyan-300 tracking-wide">
                        {project.category || "Featured Work"}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-pink-500 hover:border-pink-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                      title="View Full Preview"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Details Footer with Refined Clean Typography */}
                  <div className="p-5 sm:p-6 relative z-10 bg-gradient-to-b from-[#0A1128]/95 to-[#070D1E] flex items-center justify-between gap-4 border-t border-white/10">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white font-semibold text-base sm:text-[17px] leading-snug group-hover:text-cyan-300 transition-colors truncate tracking-normal">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-400 truncate mt-1 font-normal tracking-wide">
                        {project.category || "Design & Growth"}
                      </p>
                    </div>

                    {project.link && project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-pink-500 text-gray-300 hover:text-white border border-white/10 hover:border-pink-500 flex items-center justify-center transition-all flex-shrink-0 shadow-md group-hover:scale-105"
                        title="Visit Live Project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-cyan-500 text-gray-300 hover:text-slate-950 border border-white/10 hover:border-cyan-500 flex items-center justify-center transition-all flex-shrink-0 shadow-md cursor-pointer"
                        title="View Project"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Conversion Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 via-[#0C142B] to-cyan-500/15 border border-pink-500/30 p-8 sm:p-10 mb-14 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-400 mb-2 inline-block">
                Custom Engineering & Growth
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Have a Vision You Want Built to Perfection?
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                From high-performing web apps and 3D virtual tours to enterprise marketing funnels, our core team delivers flawless execution.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="btn-glow-pink w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Project Modal Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0D1530] border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111C40]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5 text-pink-400" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[70vh] overflow-hidden bg-black/50 flex items-center justify-center">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Footer Action */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-[#0A1128]">
              <span className="text-xs text-gray-400">Digital ORRA Client Portfolio</span>
              {selectedProject.link && selectedProject.link !== "#" ? (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-pink px-5 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
                >
                  Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="btn-glow-pink px-5 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
                >
                  Start Similar Project <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
