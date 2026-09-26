"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import {
  ArrowRight,
  Megaphone,
  Code2,
  Video,
  Users2,
  Layers,
  Cpu,
  Target,
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  Globe,
  Share2,
  Database,
  Smartphone,
  MessageCircle,
  Zap,
  Bot,
  MousePointer,
  MessageSquare,
  Award,
  Palette,
  X,
  Check,
  SearchCheck,
  BarChart3
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';

const iconMap = {
  'Share2': Share2,
  'TrendingUp': TrendingUp,
  'Video': Video,
  'Target': Target,
  'Globe': Globe,
  'Megaphone': Megaphone,
  'Search': Search,
  'Bot': Bot,
  'Zap': Zap,
  'Cpu': Cpu,
  'MousePointer': MousePointer,
  'MessageSquare': MessageSquare,
  'Users': Users2,
  'Award': Award,
  'Palette': Palette,
  'Database': Database,
  'Smartphone': Smartphone
};

const CATEGORIES = [
  { id: "all", label: "All Capabilities" },
  { id: "Performance", label: "Performance & Ads" },
  { id: "Development", label: "Web & Software" },
  { id: "Social & Brand", label: "Social & Video" },
  { id: "Search & AI", label: "Search & AI Automation" },
  { id: "Virtual & Immersive", label: "360° Virtual Tours" },
];

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState(servicesData);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch (err) {
        console.log('Using fallback servicesData:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const filteredCatalog = services.filter(service => {
    const matchesCat = activeCat === "all" || service.category === activeCat;
    const matchesSearch = searchQuery.trim() === "" ||
      (service.title && service.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (service.shortDesc && service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (service.desc && service.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (service.tag && service.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#101B3D] via-[#0D1533] to-[#0A1028] text-white flex flex-col relative selection:bg-[#FF3399]/40 selection:text-white">
      <DynamicSeoHead path="/services" />
      {/* Global Navbar */}
      <Navbar />

      {/* Main Services Catalog Section with Edge-to-Edge Watermark */}
      <section className="relative w-full pt-34 pb-8 md:pt-40 md:pb-10 overflow-hidden">
        {/* Giant Edge-to-Edge Background Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-25 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <h1
            style={{
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.55) 55%, rgba(255, 255, 255, 0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            OUR SERVICES
          </h1>
        </div>

        {/* Ambient Radiant Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-500/20 blur-[160px] pointer-events-none z-0"></div>
        <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] bg-cyan-500/20 blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-pink-500/15 blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-7 sm:pt-10 md:pt-44">
          <h2 className="sr-only">Explore Comprehensive Digital Marketing, Development & Performance Solutions</h2>

          {/* Controls Bar: Search Bar + Filter Tabs */}
          <div className="relative z-20 mb-4 p-2.5 rounded-2xl md:rounded-full bg-[#121E45]/80 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center justify-between gap-3">

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search capabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.08] border border-white/15 rounded-full pl-11 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.14] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className="flex flex-nowrap items-center justify-start md:justify-center gap-1.5 w-full md:w-auto overflow-x-auto py-1 scrollbar-none [-webkit-overflow-scrolling:touch]">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-300 ${activeCat === cat.id
                    ? 'bg-gradient-to-r from-[#FF66B2] via-pink-400 to-[#FF85C0] text-white shadow-[0_0_18px_rgba(255,102,178,0.45)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* Results Count & Quick Tip - Modern, Clean & Highly Readable */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-[14.5px] text-gray-200 mb-6 px-1 font-sans font-medium">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Showing</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-extrabold text-xs sm:text-sm">
                {filteredCatalog.length}
              </span>
              <span className="text-white font-semibold">Capabilities</span>
            </div>
            <span className="text-cyan-300 font-semibold tracking-wide hidden sm:inline-flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <span>Click any capability for dedicated process & custom pricing</span>
              <span className="text-cyan-400 font-bold">→</span>
            </span>
          </div>

          {/* Catalog Grid: Designed for Effortless Readability & Balanced Height */}
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <SearchCheck className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No matching services found</h3>
              <p className="text-xs text-gray-400 mb-4">Try searching with a different keyword or reset filters.</p>
              <button
                onClick={() => { setActiveCat("all"); setSearchQuery(""); }}
                className="btn-glow-pink px-5 py-2 text-xs font-bold rounded-full"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filteredCatalog
                .filter(s => s && (s.id || s.title))
                .map((service, sIdx) => {
                  const IconComponent = iconMap[service.iconName] || Globe;
                  const serviceSlug = service.id || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                  return (
                    <Link
                      key={service.id || service._id || sIdx}
                      href={`/${serviceSlug}`}
                      className="group relative rounded-3xl bg-gradient-to-b from-[#14224d]/90 via-[#0F1A3B]/95 to-[#0B142F] border border-white/20 hover:border-cyan-400/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.25)] cursor-pointer min-h-[290px] backdrop-blur-md"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-[var(--color-primary-pink)] transition-all duration-500"></div>

                      <div>
                        {/* Header Row: Icon + Category Badge + Tag */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-500/25 group-hover:text-white transition-all duration-300 shadow-md flex-shrink-0">
                            <IconComponent className="w-6 h-6" />
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <span className="text-[12px] font-medium tracking-wide px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white shadow-sm">
                              {service.category}
                            </span>
                            {service.tag && (
                              <span className="text-[12px] font-semibold text-pink-300 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30">
                                #{service.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Main Title - Pure Solid White, High Contrast & Razor Sharp */}
                        <h3 className="text-xl sm:text-[22px] font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
                          {service.title}
                        </h3>

                        {/* Key Features / Bullet points */}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-2.5 pt-3 border-t border-white/10 mb-5">
                            {service.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2.5 text-[13.5px] text-gray-200 font-medium leading-tight">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-4 border-t border-white/15 flex items-center justify-between mt-auto">
                        <span className="text-[14px] font-bold text-cyan-300 group-hover:text-pink-400 inline-flex items-center gap-2 transition-colors">
                          <span>Explore Full Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                        <span className="text-xs font-mono text-gray-400 font-bold">
                          {String(sIdx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}

        </div>
      </section>

      {/* Detail Slideover / Modal for Deep Dive (No clutter, easy reading) */}
      {selectedService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1229] border border-white/20 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                {selectedService.category}
              </span>
              {selectedService.tag && (
                <span className="text-xs font-mono font-bold text-pink-400">
                  #{selectedService.tag}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {selectedService.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light mb-6">
              {selectedService.fullDesc || selectedService.desc}
            </p>

            {/* Performance Stats if available */}
            {selectedService.stats && selectedService.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                {selectedService.stats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-lg sm:text-xl font-black text-cyan-300 font-mono">{st.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Deliverables */}
            {selectedService.deliverables && (
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-mono mb-3">
                  What You Receive (Deliverables)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 pl-5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10">
              <Link
                href="/contact#form"
                onClick={() => setSelectedService(null)}
                className="btn-glow-pink flex-1 py-3 text-center text-sm font-bold rounded-xl"
              >
                Get Quotation for this Service
              </Link>
              <a
                href={`https://wa.me/916280458005?text=Hi%20Digital%20ORRA,%20I%20am%20interested%20in%20${encodeURIComponent(selectedService.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold hover:bg-emerald-500/20 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Direct Action CTA: Image Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 w-full">
        <Link href="/contact" className="block relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 hover:border-pink-500/60 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(255,51,153,0.25)] hover:scale-[1.01] group">
          <img
            src="https://res.cloudinary.com/fykd8cyh/image/upload/v1789207193/93133ff7-fcbc-41d1-bea7-6155ed5a47ca.png"
            alt="Need a Custom Solution for Your Business? - Contact Digital ORRA"
            title="Need a Custom Solution for Your Business? - Contact Digital ORRA"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
