'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const AWARDS = [
  {
    id: 1,
    src: '/awards/award-run-for-fun.jpg',
    alt: 'Digital Media Partner Award - Run For Fun 2024',
    badge: 'MEDIA PARTNER',
    title: 'Digital Media Partner 2024'
  },
  {
    id: 2,
    src: '/awards/award-handball-sarsa.jpg',
    alt: 'Award of Honour - Handball Khel Nursery Sarsa',
    badge: 'HONOUR AWARD',
    title: 'Award of Honour (Sarsa)'
  },
  {
    id: 3,
    src: '/awards/award-digital-partner.jpg',
    alt: 'Best Digital Partner Trophy - Signage Creation 2022',
    badge: 'ANNUAL TROPHY',
    title: 'Best Digital Partner 2022'
  },
  {
    id: 4,
    src: '/awards/award-hkmv-jind.jpg',
    alt: 'Award of Honour 2024-25 - H.K.M.V. Jind',
    badge: 'PRESTIGE SHIELD',
    title: 'Award of Honour (H.K.M.V. Jind)'
  }
];

export default function AwardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = AWARDS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden border-t border-b border-white/10 bg-gradient-to-b from-[#0A1028] via-[#080E24] to-[#0A1028]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[var(--color-primary-pink)]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              RECOGNITIONS &amp; HONOURS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Milestones of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(255,51,153,0.3)]">
              Excellence &amp; Trust
            </span>
          </h2>
        </div>

        {/* 3D Coverflow Card Showcase Container */}
        <div className="relative w-full h-[470px] sm:h-[530px] md:h-[580px] flex items-center justify-center select-none">

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Award"
            className="absolute left-2 sm:left-6 md:left-12 lg:left-24 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_25px_rgba(0,0,0,0.6)] cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Award"
            className="absolute right-2 sm:right-6 md:right-12 lg:right-24 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_25px_rgba(0,0,0,0.6)] cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Track */}
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {AWARDS.map((award, index) => {
              // Calculate circular offset relative to currentIndex
              const diff = (index - currentIndex + total) % total;

                  let positionClass = '';
              let isCenter = false;

              if (diff === 0) {
                // Active Center Card: Premium 3D Standout
                isCenter = true;
                positionClass = 'z-20 scale-100 opacity-100 translate-x-0 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.25)] border-cyan-400/50 ring-1 ring-cyan-400/30';
              } else if (diff === 1) {
                // Right Card: 3D perspective angle
                positionClass = 'z-10 scale-[0.82] opacity-45 sm:opacity-55 translate-x-[55%] sm:translate-x-[68%] md:translate-x-[75%] [transform:rotateY(-12deg)] cursor-pointer hover:opacity-85 border-white/10';
              } else if (diff === total - 1) {
                // Left Card: 3D perspective angle
                positionClass = 'z-10 scale-[0.82] opacity-45 sm:opacity-55 -translate-x-[55%] sm:-translate-x-[68%] md:-translate-x-[75%] [transform:rotateY(12deg)] cursor-pointer hover:opacity-85 border-white/10';
              } else {
                // Hidden Cards behind
                positionClass = 'z-0 scale-[0.7] opacity-0 pointer-events-none translate-x-0';
              }

              return (
                <div
                  key={award.id}
                  onClick={() => {
                    if (diff === 1) nextSlide();
                    if (diff === total - 1) prevSlide();
                  }}
                  className={`group absolute w-[290px] sm:w-[350px] md:w-[390px] h-[440px] sm:h-[490px] md:h-[530px] rounded-3xl overflow-hidden border bg-gradient-to-b from-[#0F1B3E] via-[#091026] to-[#050816] flex flex-col transition-all duration-700 ease-out backdrop-blur-xl ${positionClass}`}
                >
                  {/* Glowing Top Laser Line for Center Card */}
                  {isCenter && (
                    <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 animate-pulse"></div>
                  )}

                  {/* Main Award Image Container with Luxury Golden & Cyan Ambient Pedestal */}
                  <div className="relative flex-1 w-full bg-gradient-to-b from-[#080E24] via-[#040714] to-[#02040A] overflow-hidden flex items-center justify-center p-5">
                    
                    {/* Radial Stage Lighting / Spotlight */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.18)_0%,rgba(234,179,8,0.08)_45%,transparent_70%)] pointer-events-none"></div>

                    {/* Stage Pedestal Platform at the bottom */}
                    <div className="absolute bottom-3 w-48 h-6 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rounded-full blur-md pointer-events-none"></div>

                    {/* Trophy Image with dynamic lift on center/hover */}
                    <img
                      src={award.src}
                      alt={award.alt}
                      className={`w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ${isCenter ? 'group-hover:scale-105' : ''}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {AWARDS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-8 h-2 bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.7)]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
