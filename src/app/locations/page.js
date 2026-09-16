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
  Layers
} from "lucide-react";

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
                const coverImage = 
                  loc.heroImage || 
                  loc.whyLocalImage || 
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

                return (
                  <Link
                    key={loc._id || loc.slug}
                    href={`/${loc.slug}`}
                    className="group relative rounded-3xl bg-[#0b1329] border border-white/15 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Glow Edge */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-[#FF3399] transition-all duration-700"></div>

                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#040814]">
                        <img
                          src={coverImage}
                          alt={loc.title || `Digital ORRA Agency in ${loc.city || 'City'}`}
                          title={loc.heroHeadline ? `${loc.title} - ${loc.heroHeadline}` : loc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/30 to-transparent" />

                        {/* City Badge */}
                        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#070D1E]/90 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <MapPin className="w-3.5 h-3.5 text-[#FF3399]" />
                          <span className="text-xs font-bold tracking-wide text-white">
                            {loc.city || "Panchkula"}
                          </span>
                        </div>

                        {/* Verified Live Badge */}
                        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5 text-emerald-300 text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active Hub</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-7 space-y-3">
                        <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                          {loc.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed font-light">
                          {loc.heroSubheadline || loc.whyLocalContent || "Premier web development, UI/UX designing, and full-funnel digital marketing services."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-6 sm:px-7 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                      <span className="text-xs font-mono text-pink-400 font-semibold group-hover:text-pink-300 transition-colors">
                        /{loc.slug}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                        <span>Explore Hub</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Bottom Regional HQ CTA */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F1B4C]/80 via-[#0A1128] to-[#1E0B36]/80 border border-white/15 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF3399]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Expand Your Local Presence
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Need a dedicated local landing page for your city?
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light max-w-2xl">
                  Contact our strategy team to engineer a high-speed, SEO-optimized local hub designed to dominate your regional market.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,0,122,0.4)] hover:scale-105 active:scale-95 transition-all text-center"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://audit.digitalorra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all text-center"
                >
                  <span>Get Free SEO Audit</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
