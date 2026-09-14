"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers
} from "lucide-react";

export default function SkillDevelopmentWorkshopPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Exactly 2 categories as requested
  const CATEGORIES = [
    { id: "all", label: "All Workshops" },
    { id: "college-workshops", label: "College Workshops", matchTags: ["College Workshops", "college", "colleges"] },
    { id: "school-workshops", label: "School Workshops", matchTags: ["School Workshops", "school", "schools"] },
  ];

  useEffect(() => {
    async function fetchWorkshopMedia() {
      try {
        const res = await fetch("/api/workshop");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setItems(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch workshop images from database:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshopMedia();
  }, []);

  // Built-in showcase pictures for the 2 categories if database is fresh
  const displayItems = useMemo(() => {
    if (items.length > 0) {
      return items;
    }

    // Default curated practical workshop images
    const fallbackWorkshopData = [
      {
        _id: "w1",
        title: "Live Ad Campaigns Lab",
        category: "Workshop Practical",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w2",
        title: "E-Commerce Funnel Architecture",
        category: "Student Projects",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w3",
        title: "Hands-on Brand Studio Shoot",
        category: "Workshop Practical",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w4",
        title: "Fintech Dashboard Redesign",
        category: "Student Projects",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w5",
        title: "Meta Ads ROAS Optimization Sprint",
        category: "Workshop Practical",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w6",
        title: "D2C Brand Identity System",
        category: "Student Projects",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w7",
        title: "Client Pitching & Masterclass",
        category: "Workshop Practical",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "w8",
        title: "Modern Next.js Portfolio Project",
        category: "Student Projects",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
      }
    ];

    return items.length > 0 ? items : fallbackWorkshopData;
  }, [items]);

  // Filter strictly by the 2 categories
  const filteredList = useMemo(() => {
    if (activeCategory === "all") return displayItems;

    const targetDef = CATEGORIES.find((c) => c.id === activeCategory);
    if (!targetDef || !targetDef.matchTags) return displayItems;

    return displayItems.filter((item) => {
      const itemCat = (item.category || "").toLowerCase();
      return targetDef.matchTags.some((tag) => itemCat.includes(tag.toLowerCase()));
    });
  }, [displayItems, activeCategory]);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (filteredList.length === 0) return;
    const nextIdx = (selectedIndex + 1) % filteredList.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(filteredList[nextIdx]);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (filteredList.length === 0) return;
    const prevIdx = (selectedIndex - 1 + filteredList.length) % filteredList.length;
    setSelectedIndex(prevIdx);
    setSelectedImage(filteredList[prevIdx]);
  };

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/skill-development-workshop" />

      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Radial Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[12%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
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
          <h1 
            style={{ 
              pointerEvents: "none",
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            SKILL WORKSHOP
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-36">
          <h2 className="sr-only">Hands-on Skill Development Workshops & Industrial Digital Training</h2>

          {/* Clean 2-Category Tab Selector */}
          <div className="relative z-20 mb-10 w-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-2 max-w-2xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-[13.5px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-[#FF66B2] via-pink-400 to-[#FF85C0] text-white shadow-[0_0_18px_rgba(255,102,178,0.45)] font-bold"
                      : "text-slate-300 hover:text-white bg-[#0B132B]/90 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Count Subtitle */}
          <div className="flex items-center justify-between text-sm text-slate-300 mb-8 px-1">
            <span>
              Showing <strong className="text-white font-bold">{filteredList.length}</strong> workshop photos
            </span>
            <span className="text-cyan-400 text-xs hidden sm:inline-block">
              Click any photo to view full resolution →
            </span>
          </div>

          {/* Only Images Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-[#111A38]/40 border border-white/10 overflow-hidden animate-pulse aspect-square"
                />
              ))}
            </div>
          ) : filteredList.length === 0 ? (
            <div className="rounded-3xl bg-gradient-to-b from-[#111A38]/60 to-[#0A1128]/80 border border-white/15 p-12 text-center max-w-xl mx-auto mb-20 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4 text-pink-400">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Photos Found</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Workshop images for this category are being updated from our recent batches.
              </p>
              <Link
                href="/courses"
                className="btn-glow-pink inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20">
              {filteredList.map((item, idx) => (
                <div
                  key={item._id || idx}
                  onClick={() => openLightbox(item, idx)}
                  className="group relative rounded-3xl overflow-hidden aspect-square bg-[#0A1128] border border-white/15 hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.25)] cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title || "Skill Development Workshop"}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {item.category && (
                      <span className="text-xs font-semibold text-cyan-300">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Zoom Icon Button */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Conversion Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 via-[#0C142B] to-cyan-500/15 border border-pink-500/30 p-8 sm:p-10 mb-14 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-400 mb-2 inline-block">
                Digital ORRA Academy
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Want Practical Agency Experience?
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                Join our upcoming batch to work directly on live client accounts, media production, and performance ads.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/courses"
                className="btn-glow-pink w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                View Academy Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-6 h-6 text-pink-400" />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Fullscreen Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title || "Workshop Preview"}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
            />
            {selectedImage.category && (
              <div className="mt-3 text-center">
                <span className="text-xs text-cyan-300 font-semibold px-4 py-1.5 rounded-full bg-black/70 border border-white/15">
                  {selectedImage.category}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
