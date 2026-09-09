"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Maximize2
} from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setGallery(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Distinct category tabs
  const categories = [
    { id: 'all', label: 'All Photos' },
    ...Array.from(new Set(gallery.map(g => g.category).filter(Boolean))).map(cat => ({
      id: cat,
      label: cat
    }))
  ];

  const filteredItems = gallery.filter(item => {
    return activeTab === 'all' || item.category === activeTab;
  });

  const openLightbox = (item, index) => {
    setSelectedPhoto(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(nextIdx);
    setSelectedPhoto(filteredItems[nextIdx]);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    const prevIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(prevIdx);
    setSelectedPhoto(filteredItems[prevIdx]);
  };

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/gallery" />
      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[12%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Watermark */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
          <span style={{ pointerEvents: 'none' }} className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.48] via-white/[0.28] to-white/[0.08]">
            LIFE AT ORRA
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-44">
          

          {/* Category Filter Tabs: Clean, Open in a Single Row */}
          <div className="relative z-20 mb-12 w-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-2 w-full max-w-5xl">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeTab === cat.id 
                      ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_20px_rgba(255,51,153,0.45)]' 
                      : 'text-gray-300 hover:text-white bg-[#0B132B]/90 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-8 px-1 font-mono">
            <span>Showing <strong className="text-white">{filteredItems.length}</strong> moments captured</span>
            <span className="text-cyan-300/90 font-sans hidden sm:inline-block">Click any photo to view in high-resolution full screen →</span>
          </div>

          {/* Gallery Masonry/Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-72 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse"></div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No photos in this category</h3>
              <button
                onClick={() => setActiveTab("all")}
                className="mt-3 px-5 py-2 text-xs font-bold rounded-full btn-glow-pink"
              >
                View All Photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  onClick={() => openLightbox(item, idx)}
                  className="group relative rounded-2xl overflow-hidden bg-[#0A1128] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer aspect-[4/3]"
                >
                  <img 
                    src={item.image} 
                    alt={item.category || 'Digital ORRA Moment'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/90 via-[#070D1E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="self-end">
                      <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4 text-cyan-300" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-pink-500 text-white inline-block mb-1">
                        {item.category}
                      </span>
                      {item.title && (
                        <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">
                          {item.title}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 transition-all animate-fadeIn"
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button 
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-pink-600 border border-white/20 flex items-center justify-center text-white transition-all shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-pink-600 border border-white/20 flex items-center justify-center text-white transition-all shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center bg-[#070D1E]"
          >
            <img 
              src={selectedPhoto.image} 
              alt={selectedPhoto.category || 'Digital ORRA'} 
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-t-2xl"
            />
            <div className="w-full p-4 bg-[#0A1128] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                {selectedPhoto.category}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {selectedIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
