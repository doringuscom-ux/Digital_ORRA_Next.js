"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Globe, Search, Share2, Target, Video, MessageSquare, Smartphone, Users, Award, Megaphone,
  TrendingUp, Zap, Bot, Cpu, MousePointer, Palette, Database, ArrowRight, CheckCircle2, X,
  Sparkles, LayoutGrid, Play, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  'Share2': <Share2 className="w-4 h-4" />,
  'TrendingUp': <TrendingUp className="w-4 h-4" />,
  'Video': <Video className="w-4 h-4" />,
  'Target': <Target className="w-4 h-4" />,
  'Globe': <Globe className="w-4 h-4" />,
  'Megaphone': <Megaphone className="w-4 h-4" />,
  'Search': <Search className="w-4 h-4" />,
  'Bot': <Bot className="w-4 h-4" />,
  'Zap': <Zap className="w-4 h-4" />,
  'Cpu': <Cpu className="w-4 h-4" />,
  'MousePointer': <MousePointer className="w-4 h-4" />,
  'MessageSquare': <MessageSquare className="w-4 h-4" />,
  'Users': <Users className="w-4 h-4" />,
  'Award': <Award className="w-4 h-4" />,
  'Palette': <Palette className="w-4 h-4" />,
  'Database': <Database className="w-4 h-4" />,
  'Smartphone': <Smartphone className="w-4 h-4" />
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [viewMode, setViewMode] = useState("marquee");
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "Social & Brand", label: "Social & Brand" },
    { id: "Performance", label: "Performance & Ads" },
    { id: "Search & AI", label: "Search & AI" },
    { id: "Development", label: "Web & Software" },
    { id: "Virtual & Immersive", label: "360° Tours" },
  ];

  const getServiceIcon = (service) => {
    if (service.iconName && iconMap[service.iconName]) {
      return iconMap[service.iconName];
    }
    return <Globe className="w-4 h-4" />;
  };

  const getCount = (catId) => {
    if (catId === "all") return servicesData.length;
    return servicesData.filter(s => s.category === catId).length;
  };

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  const isSliderActive = filteredServices.length > 3;

  const marqueeList = (() => {
    if (!filteredServices || filteredServices.length === 0) return [];
    if (!isSliderActive) return filteredServices;
    const minItems = 18;
    const repeatCount = Math.max(2, Math.ceil(minItems / filteredServices.length));
    let list = [];
    for (let i = 0; i < repeatCount; i++) {
      list = list.concat(filteredServices);
    }
    return list;
  })();

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const manualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const ServiceCard = ({ service, index, type }) => (
    <Link
      href={`/${service.id}`}
      key={`${type}-${service.id}-${index}`}
      className={`${type === 'slider' ? 'w-[320px] sm:w-[350px] flex-shrink-0' : ''} h-[380px] rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] border border-white/20 hover:border-white/40 p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(255,255,255,0.08)] cursor-pointer group relative overflow-hidden block`}
    >
      {/* Top subtle white gloss shine */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      
      {/* Ambient hover light */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-400/25 transition-all duration-500"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-300 bg-white/10 border border-white/20 group-hover:bg-white group-hover:border-white group-hover:text-slate-900 transition-all duration-300 shadow-md">
            {getServiceIcon(service)}
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-gray-200 tracking-wide group-hover:text-white group-hover:border-white/30 transition-all duration-300">
            {service.tag}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-300 text-sm sm:text-[15px] font-normal leading-relaxed line-clamp-2 mb-4 group-hover:text-white transition-colors duration-300">
          {service.desc || service.shortDesc}
        </p>

        <div className="space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          {service.features.slice(0, 2).map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="truncate font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full py-2.5 px-4 rounded-xl bg-white/10 group-hover:bg-white text-white group-hover:text-slate-900 text-sm font-bold flex items-center justify-between border border-white/15 group-hover:border-white transition-all duration-300 shadow-sm mt-2">
        <span>Explore Details</span>
        <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-slate-900/15 group-hover:translate-x-1 transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );

  return (
    <section className="relative w-full pt-16 pb-16 md:pt-40 lg:pt-44 md:pb-20 bg-gradient-to-b from-[#0D1533] via-[#0F1B3E] to-[#0A1128] overflow-hidden border-t border-white/10" id="services">
      {/* Giant Background Watermark (Decreased Top Gap, Increased Bottom Gap) */}
      <div className="absolute top-3 sm:top-2 md:top-3 lg:top-4 left-0 w-full flex justify-center pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
        <span 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.55) 55%, rgba(255, 255, 255, 0.2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-widest whitespace-nowrap select-none"
        >
          WHAT WE DELIVER
        </span>
      </div>

      {/* Luminous Ambient Background Glows - Center & Both Sides Soft White Touch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-white/[0.12] via-cyan-500/[0.12] to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
      
      {/* Left Side White Light Accent */}
      <div className="absolute top-1/3 -left-20 w-[450px] h-[550px] bg-gradient-to-r from-white/[0.15] via-cyan-400/[0.12] to-transparent rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Right Side White Light Accent */}
      <div className="absolute top-1/3 -right-20 w-[450px] h-[550px] bg-gradient-to-l from-white/[0.15] via-purple-400/[0.12] to-transparent rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Subtle White Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-2 md:mt-10 lg:mt-14">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white leading-tight tracking-tight">
              Tailored Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400">Growth Solutions</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center p-1 rounded-xl bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("marquee")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${viewMode === "marquee" ? "bg-white text-slate-900 shadow-md" : "text-gray-300 hover:text-white"}`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${viewMode === "grid" ? "bg-white text-slate-900 shadow-md" : "text-gray-300 hover:text-white"}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {(viewMode === "marquee" && isSliderActive) && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => manualScroll('left')}
                  aria-label="Previous services"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => manualScroll('right')}
                  aria-label="Next services"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-4 mb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = getCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 border cursor-pointer select-none ${
                  isActive 
                    ? "bg-white text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]" 
                    : "bg-white/[0.06] text-gray-200 border-white/10 hover:bg-white/[0.12] hover:border-white/25 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${isActive ? "bg-slate-900/10 text-slate-900" : "bg-white/10 text-gray-300"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "marquee" ? (
        <div
          ref={scrollContainerRef}
          className={`w-full overflow-x-auto hide-scrollbar relative py-4 ${isSliderActive ? "[mask-image:linear-gradient(to_right,rgba(0,0,0,0.3)_0%,black_3%,black_97%,rgba(0,0,0,0.3)_100%)]" : ""}`}
        >
          <div className={`px-6 ${isSliderActive ? "services-marquee-track" : "flex gap-5 justify-center w-full"}`}>
            {marqueeList.map((service, index) => (
              <ServiceCard key={`slider-${index}`} service={service} index={index} type="slider" />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.slice(0, 4).map((service, index) => (
              <ServiceCard key={`grid-${index}`} service={service} index={index} type="grid" />
            ))}
          </div>

          {/* View All Services Button */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-[var(--color-primary-pink)] to-purple-600 text-white font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(255,0,122,0.35)] hover:shadow-[0_15px_35px_rgba(255,0,122,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>View All Services</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>
      )}

      {selectedService && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto transition-opacity"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left my-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6 pr-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                {getServiceIcon(selectedService)}
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 mb-1 inline-block">
                  {selectedService.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base font-medium leading-relaxed mb-8">
              {selectedService.fullDesc || selectedService.desc}
            </p>

            {selectedService.stats && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {selectedService.stats.map((st, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <div className="text-xl font-bold text-indigo-400">
                      {st.value}
                    </div>
                    <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-1">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedService.deliverables && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Key Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-sm font-medium text-gray-200 flex items-center gap-2 mb-1">
                        <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span>{deliv.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium pl-5 leading-relaxed">
                        {deliv.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                Features Included
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5 text-sm font-medium text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500/70 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all text-center cursor-pointer"
              >
                Close
              </button>
              <Link
                href="#proposal"
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all text-center cursor-pointer shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
