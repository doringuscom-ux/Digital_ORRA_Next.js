"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Certified from './Certified';

export default function Hero() {
  const words = [
    "Digital Reality.",
    "Brand Dominance.",
    "Business Growth.",
    "Viral Impact."
  ];
  const prefix = "Transforming Ideas into ";

  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetWord.length) {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        } else {
          // Pause at full word before backspacing
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end bg-[#0A1128] overflow-hidden pt-44 md:pt-56 pb-8 sm:pb-2">

      {/* Background Video Layer: On mobile height is 70vh with deep fade so no hard edge or line appears, on desktop full height */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] sm:h-full w-full z-0 overflow-hidden bg-[#0A1128] pointer-events-none">
        {/* Animated Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary-pink)]/25 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" style={{ animationDelay: "4s" }}></div>

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          suppressHydrationWarning
          className="w-full h-full object-cover sm:object-cover  absolute inset-0 z-20 scale-100"
        >
          <source src="/hero-bg.webm" type="video/webm" />
        </video>
        {/* Video Overlays removed for full original clarity */}
      </div>

      {/* Hero Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center mt-auto pt-0 pb-0 -translate-y-5 sm:translate-y-0">

        {/* 1. Headline */}
        <h1 suppressHydrationWarning className="text-2xl sm:text-3xl md:text-5xl lg:text-[50px] font-black text-white tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-2.5 max-w-5xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] translate-y-[2px]">
          <span className="text-white whitespace-nowrap">
            {prefix}
          </span>
          <span className="inline-flex items-center">
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(234,0,122,0.6)]">
              {currentText || words[0]}
            </span>
            {/* Blinking Cyber Cursor */}
            <span className="inline-block w-[3px] md:w-[4px] h-[1em] bg-pink-500 ml-1 animate-pulse rounded-full" />
          </span>
        </h1>

        {/* 2. CTA Action Buttons (Single Row / 1 Line on Mobile & Desktop) */}
        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 relative z-30 mt-3.5 md:mt-4 w-full max-w-2xl mx-auto px-1 sm:px-0">
          <a
            href="tel:+919896384224"
            className="btn-glass py-2 sm:py-3 px-2 sm:px-7 text-[11px] sm:text-base font-bold flex-1 sm:flex-initial sm:w-[190px] flex items-center justify-center gap-1 sm:gap-2.5 border border-[var(--color-primary-pink)]/40 hover:border-[var(--color-primary-pink)] hover:bg-[var(--color-primary-pink)]/20 transition-all shadow-[0_0_15px_rgba(234,0,122,0.2)] whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[var(--color-primary-pink)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span>Call Now</span>
          </a>

          <a
            href="https://wa.me/919896384224"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass py-2 sm:py-3 px-2 sm:px-7 text-[11px] sm:text-base font-bold flex-1 sm:flex-initial sm:w-[190px] flex items-center justify-center gap-1 sm:gap-2.5 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all shadow-[0_0_15px_rgba(37,211,102,0.2)] whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.122.553 4.195 1.6 6.015L.302 24l6.096-1.599A11.967 11.967 0 0012.031 24c6.647 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm3.84 17.202c-.161.455-.935.882-1.353.948-.419.066-1.004.148-2.915-.644-2.311-.96-3.811-3.328-3.926-3.483-.116-.155-.938-1.252-.938-2.389 0-1.137.589-1.696.8-1.928.21-.231.458-.289.613-.289.155 0 .31.002.449.008.146.007.342-.058.535.409.199.482.684 1.674.746 1.799.062.124.103.27.026.425-.078.155-.116.252-.232.392-.116.139-.243.302-.349.406-.115.116-.237.243-.105.474.132.231.587.974 1.26 1.573.869.774 1.596 1.013 1.83 1.129.233.116.368.093.504-.062.136-.155.584-.683.74-.916.155-.233.31-.194.52-.116.21.078 1.328.628 1.555.741.228.113.38.169.435.263.055.094.055.545-.106 1.001z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <Link
            href="/company-profile"
            className="btn-glass py-2 sm:py-3 px-2 sm:px-7 text-[11px] sm:text-base font-bold flex-1 sm:flex-initial sm:w-[210px] flex items-center justify-center gap-1 sm:gap-2.5 border border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/20 text-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] group whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Profile</span>
          </Link>
        </div>

      </div>

      {/* 3 & 4. Certified Banner at bottom of Hero (Equal Gap) */}
      <div className="relative z-20 w-full mt-3.5 md:mt-4">
        <Certified ptClass="pt-0 pb-3 sm:pb-4 md:pb-5" />
      </div>
    </section>
  );
}
