"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // Filter bar: show left/right arrows only when tabs are hidden on that side
  const tabsRef = useRef(null);
  const [tabArrows, setTabArrows] = useState({ left: false, right: false });

  const updateTabArrows = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setTabArrows(prev => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, []);

  const scrollTabs = (dir) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.6, 160), behavior: 'smooth' });
  };

  // Re-check when categories load or the bar is resized (rotation, window resize, TV zoom)
  useEffect(() => {
    updateTabArrows();
    const el = tabsRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(updateTabArrows);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [gallery, updateTabArrows]);

  // Keep the selected tab fully visible
  useEffect(() => {
    const el = tabsRef.current;
    const btn = el?.querySelector(`[data-tab="${CSS.escape(activeTab)}"]`);
    if (!el || !btn) return;
    const pad = 48; // room for the arrow overlay
    const bl = btn.offsetLeft, br = bl + btn.offsetWidth;
    if (bl - pad < el.scrollLeft) el.scrollTo({ left: bl - pad, behavior: 'smooth' });
    else if (br + pad > el.scrollLeft + el.clientWidth) el.scrollTo({ left: br + pad - el.clientWidth, behavior: 'smooth' });
  }, [activeTab]);

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
    <main className="min-h-screen bg-gradient-to-b from-[#101B3D] via-[#0D1533] to-[#0A1028] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/gallery" />
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[8%] left-[10%] w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[30%] right-[8%] w-[650px] h-[650px] bg-pink-500/15 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[750px] h-[750px] bg-indigo-500/20 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Watermark */}
      <section className="relative w-full pt-34 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Crisp Tech Grid Lining */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0"></div>

        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-25 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <h1
            style={{
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.55) 55%, rgba(255, 255, 255, 0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            className="text-[length:calc(8vw/var(--z))] md:text-[length:calc(8.5vw/var(--z))] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            LIFE AT DO
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-7 sm:pt-10 md:pt-44">
          <h2 className="sr-only">Digital ORRA Culture, Highlights & Creative Production Gallery</h2>


          {/* Category Filter Tabs: single scrollable row with arrow buttons */}
          <div className="relative z-20 mb-8 sm:mb-12 w-full flex items-center justify-center">
            <div className="relative w-full max-w-5xl rounded-full bg-[#121E45]/80 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.3)] overflow-hidden">
              <div
                ref={tabsRef}
                onScroll={updateTabArrows}
                className="overflow-x-auto no-scrollbar scroll-smooth p-2 [-webkit-overflow-scrolling:touch]"
              >
                {/* w-max + mx-auto: centred when the tabs fit, starts at the left edge when they overflow (never clipped) */}
                <div className="flex w-max mx-auto items-center gap-2 sm:gap-2.5">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      data-tab={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${activeTab === cat.id
                          ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_20px_rgba(255,51,153,0.45)]'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Left scroll arrow + fade (only when there are hidden tabs on the left) */}
              <div className={`absolute inset-y-0 left-0 flex items-center pl-1.5 pr-8 bg-gradient-to-r from-[#121E45] via-[#121E45]/90 to-transparent transition-opacity duration-300 ${tabArrows.left ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button
                  type="button"
                  aria-label="Scroll categories left"
                  onClick={() => scrollTabs(-1)}
                  tabIndex={tabArrows.left ? 0 : -1}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-[var(--color-primary-pink)] hover:border-transparent transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Right scroll arrow + fade (only when there are hidden tabs on the right) */}
              <div className={`absolute inset-y-0 right-0 flex items-center pr-1.5 pl-8 bg-gradient-to-l from-[#121E45] via-[#121E45]/90 to-transparent transition-opacity duration-300 ${tabArrows.right ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button
                  type="button"
                  aria-label="Scroll categories right"
                  onClick={() => scrollTabs(1)}
                  tabIndex={tabArrows.right ? 0 : -1}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-[var(--color-primary-pink)] hover:border-transparent transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
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
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#14224d]/90 to-[#0B142F] border border-white/20 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.25)] cursor-pointer aspect-[4/3] backdrop-blur-md"
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
            className="relative max-w-5xl max-h-[calc(85vh/var(--z))] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center bg-[#070D1E]"
          >
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.category || 'Digital ORRA'}
              className="max-h-[calc(75vh/var(--z))] w-auto max-w-full object-contain rounded-t-2xl"
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
