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
    <div
      key={`${type}-${service.id}-${index}`}
      onClick={() => setSelectedService(service)}
      className={`${type === 'slider' ? 'w-[320px] sm:w-[350px] flex-shrink-0' : ''} h-[380px] rounded-2xl bg-white/[0.02] border border-white/5 p-6 flex flex-col justify-between shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] cursor-pointer group relative overflow-hidden`}
    >
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 bg-white/5 border border-white/10 group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:text-white transition-all duration-300 shadow-sm">
            {getServiceIcon(service)}
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 tracking-wide group-hover:text-indigo-200 group-hover:border-indigo-500/30 transition-all duration-300">
            {service.tag}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 line-clamp-1 group-hover:text-indigo-300 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-300 text-base font-medium leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-200 transition-colors duration-300">
          {service.desc || service.shortDesc}
        </p>

        <div className="space-y-2 p-3.5 rounded-xl bg-black/20 border border-white/5">
          {service.features.slice(0, 2).map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-sm text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedService(service);
        }}
        className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-indigo-600 text-white text-base font-medium flex items-center justify-between border border-white/10 hover:border-indigo-500 transition-all duration-300"
      >
        <span>Explore Details</span>
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:translate-x-1 transition-all">
          <ArrowRight className="w-3 h-3 text-white" />
        </div>
      </button>
    </div>
  );

  return (
    <section className="relative w-full pt-16 pb-16 md:pt-36 lg:pt-44 md:pb-20 bg-[#050505] overflow-hidden border-t border-white/5" id="services">
      {/* Giant Background Watermark (Brighter & Balanced Position) */}
      <div className="absolute top-4 md:top-0 lg:top-2 left-0 w-full flex justify-center pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
        <span className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-widest whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.72] via-white/[0.45] to-white/[0.18]">
          WHAT WE DELIVER
        </span>
      </div>

      {/* Sleek Ambient Backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-2 md:mt-10 lg:mt-14">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white leading-tight tracking-tight">
              Tailored Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400">Growth Solutions</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setViewMode("marquee")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${viewMode === "marquee" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${viewMode === "grid" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
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
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => manualScroll('right')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all cursor-pointer"
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
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border cursor-pointer select-none ${isActive ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-gray-200"}`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${isActive ? "bg-indigo-500/20 text-indigo-200" : "bg-black/20 text-gray-500"}`}>
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
          className={`w-full overflow-x-auto hide-scrollbar relative py-4 ${isSliderActive ? "[mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]" : ""}`}
        >
          <div className={`px-6 ${isSliderActive ? "services-marquee-track" : "flex gap-5 justify-center w-full"}`}>
            {marqueeList.map((service, index) => (
              <ServiceCard key={`slider-${index}`} service={service} index={index} type="slider" />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard key={`grid-${index}`} service={service} index={index} type="grid" />
            ))}
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
