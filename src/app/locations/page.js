"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  Layers,
  Video,
  Share2,
  SearchCode,
  Megaphone,
  Code2,
  Palette
} from "lucide-react";

// Intelligent service detector & aesthetic theme mapper
function getServiceTheme(title = "", slug = "") {
  const str = `${title} ${slug}`.toLowerCase();

  if (str.includes("video") || str.includes("editing") || str.includes("reels") || str.includes("animation")) {
    return {
      label: "Video Production",
      icon: Video,
      iconColor: "text-rose-400",
      bgIcon: "bg-rose-500/15 border-rose-500/30 group-hover:bg-rose-500/25 group-hover:border-rose-500/50",
      badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      borderHover: "hover:border-rose-500/50 hover:shadow-[0_20px_50px_rgba(244,63,94,0.15)]",
      glowGradient: "group-hover:via-rose-500",
      glowColor: "bg-rose-500/20",
      highlights: ["4K Cine Color Grading", "Viral Hooks & Reels", "YouTube & Ads"]
    };
  }

  if (str.includes("social") || str.includes("smm") || str.includes("instagram")) {
    return {
      label: "Social Media Growth",
      icon: Share2,
      iconColor: "text-fuchsia-400",
      bgIcon: "bg-fuchsia-500/15 border-fuchsia-500/30 group-hover:bg-fuchsia-500/25 group-hover:border-fuchsia-500/50",
      badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
      borderHover: "hover:border-fuchsia-500/50 hover:shadow-[0_20px_50px_rgba(217,70,239,0.15)]",
      glowGradient: "group-hover:via-[#FF3399]",
      glowColor: "bg-fuchsia-500/20",
      highlights: ["Viral Growth Loops", "Community Curation", "Multi-Platform ROI"]
    };
  }

  if (str.includes("seo") || str.includes("ranking") || str.includes("search")) {
    return {
      label: "SEO & Traffic",
      icon: SearchCode,
      iconColor: "text-emerald-400",
      bgIcon: "bg-emerald-500/15 border-emerald-500/30 group-hover:bg-emerald-500/25 group-hover:border-emerald-500/50",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      borderHover: "hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]",
      glowGradient: "group-hover:via-emerald-400",
      glowColor: "bg-emerald-500/20",
      highlights: ["Rank #1 Google SERP", "High-Intent Backlinks", "Technical Schema"]
    };
  }

  if (str.includes("marketing") || str.includes("digital") || str.includes("ads") || str.includes("ppc")) {
    return {
      label: "Digital Marketing",
      icon: Megaphone,
      iconColor: "text-amber-400",
      bgIcon: "bg-amber-500/15 border-amber-500/30 group-hover:bg-amber-500/25 group-hover:border-amber-500/50",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      borderHover: "hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]",
      glowGradient: "group-hover:via-amber-400",
      glowColor: "bg-amber-500/20",
      highlights: ["High ROAS Meta Ads", "Full-Funnel CRO", "Targeted Retargeting"]
    };
  }

  // Default: Web Designing & Development
  return {
    label: "Web Engineering",
    icon: Code2,
    iconColor: "text-cyan-400",
    bgIcon: "bg-cyan-500/15 border-cyan-500/30 group-hover:bg-cyan-500/25 group-hover:border-cyan-500/50",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    borderHover: "hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]",
    glowGradient: "group-hover:via-cyan-400",
    glowColor: "bg-cyan-500/20",
    highlights: ["Ultra-Fast Next.js", "Bespoke Cyber UI/UX", "100% Mobile Responsive"]
  };
}

export default function LocationsDirectoryPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("/api/locations");
        if (res.ok) {
          const data = await res.json();
          // Filter published only
          const published = Array.isArray(data) ? data.filter((p) => p.isPublished !== false) : [];
          setLocations(published);
        }
      } catch (err) {
        console.error("Failed to load locations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  // Filtered
  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = 
      loc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.heroHeadline?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === "all" || loc.city?.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const uniqueCities = Array.from(new Set(locations.map((l) => l.city).filter(Boolean)));

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col selection:bg-pink-500 selection:text-white">
      <DynamicSeoHead 
        path="/locations" 
        customTitle="Our Locations | Digital ORRA Regional Web & Marketing Agency"
        customDesc="Explore Digital ORRA's regional hubs, local offices, and city landing pages across Panchkula, Chandigarh, Mohali, and beyond."
      />
      <Navbar />

      {/* Cyberpunk & Ambient Glow Backdrops */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[170px] animate-pulse"></div>
        <div className="absolute top-[35%] right-[5%] w-[650px] h-[650px] bg-[#FF3399]/15 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[5%] left-[20%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <main className="flex-1 pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-[0_0_25px_rgba(255,51,153,0.25)]">
              <span className="flex h-2 w-2 rounded-full bg-[#FF3399] animate-ping" />
              <Globe2 className="w-4 h-4 text-[#FF3399]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-white">
                Regional Presence & Expansion
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-[#FF3399]">Locations</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              We empower businesses with localized digital marketing, custom web design, and AI automation tailored to your city’s unique competitive market.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-gray-300">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{uniqueCities.length || 1}+ Key Regions</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Compass className="w-4 h-4 text-pink-400" />
                <span>{locations.length} Local Landing Hubs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Top Local SERP Ranking</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#0b1429]/80 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row gap-2.5 items-center">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city, service or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  spellCheck={false}
                  suppressHydrationWarning
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {uniqueCities.length > 1 && (
                <div className="w-full sm:w-auto">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#091122] border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF3399]"
                  >
                    <option value="all">All Cities ({locations.length})</option>
                    {uniqueCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Locations Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Discovering regional locations...</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto space-y-4">
              <MapPin className="w-12 h-12 text-gray-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Locations Found</h3>
              <p className="text-sm text-gray-400">
                Try searching with different keywords or clear the filter to see all locations.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredLocations.map((loc) => {
                const theme = getServiceTheme(loc.title, loc.slug);
                const IconComponent = theme.icon;

                return (
                  <Link
                    key={loc._id || loc.slug}
                    href={`/${loc.slug}`}
                    className={`group relative rounded-3xl bg-[#0b1329]/90 backdrop-blur-xl border border-white/10 ${theme.borderHover} hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 flex flex-col justify-between overflow-hidden p-6 sm:p-7 hover:-translate-y-1.5`}
                  >
                    {/* Top Glow Edge */}
                    <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${theme.glowGradient} transition-all duration-700`}></div>

                    {/* Ambient subtle background glow */}
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${theme.glowColor}`}></div>

                    <div>
                      {/* Top Header with City Badge & Category Icon */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        {/* Service Category Icon */}
                        <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-3 border transition-all duration-500 shadow-lg ${theme.bgIcon} group-hover:scale-110`}>
                          <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${theme.iconColor}`} />
                        </div>

                        {/* Badges Stack */}
                        <div className="flex flex-col items-end gap-1.5">
                          {/* City Badge */}
                          <div className="px-3 py-1 rounded-full bg-[#070D1E]/90 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-[#FF3399]" />
                            <span className="text-xs font-bold tracking-wide text-white">
                              {loc.city || "Panchkula"}
                            </span>
                          </div>

                          {/* Live Hub Indicator */}
                          <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 text-emerald-300 text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Active Hub</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Pill */}
                      <div className="mb-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wider uppercase border ${theme.badgeBg}`}>
                          {theme.label}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                          {loc.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed font-light">
                          {loc.heroSubheadline || loc.whyLocalContent || "Premier web development, UI/UX designing, and full-funnel digital marketing services."}
                        </p>
                      </div>

                      {/* Feature Highlights Pills */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {theme.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 font-medium group-hover:border-white/20 transition-colors"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                        <span>Explore Hub</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Bottom Regional HQ CTA Banner Image */}
          <Link
            href="/contact"
            className="mt-16 sm:mt-24 block relative rounded-3xl overflow-hidden border border-white/15 hover:border-cyan-400/50 shadow-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
          >
            <img
              src="https://res.cloudinary.com/fykd8cyh/image/upload/v1789629445/Loction_page.png"
              alt="Need a dedicated local landing page for your city? Talk to Our Team"
              className="w-full h-auto object-cover block"
            />
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}
