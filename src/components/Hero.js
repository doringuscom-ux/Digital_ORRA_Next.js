"use client";
import React, { useState, useEffect } from 'react';
import Certified from './Certified';

export default function Hero() {
  const fullText = "Transforming Ideas into ";
  const gradientText = "Digital Reality.";
  const [typedText, setTypedText] = useState("Transforming Ideas into ");
  const [showGradient, setShowGradient] = useState(true);
  const [showSubtext, setShowSubtext] = useState(true);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#0A1128] overflow-hidden pt-36 md:pt-44 pb-4">

      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0A1128] pointer-events-none">
        {/* Animated Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary-pink)]/25 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" style={{ animationDelay: "4s" }}></div>

        {/* Cyber Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 absolute inset-0 z-20 scale-100"
        >
          <source src="/hero-bg.webm" type="video/webm" />
        </video>
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1128]/50 to-[#0A1128] z-30"></div>
      </div>

      {/* Hero Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center my-auto pt-6 pb-4 sm:pb-8 md:pb-12 md:mt-4">

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] mb-6 flex flex-col items-center justify-center">
          <span>
            {typedText}
          </span>
          {/* Gradient Text Reveal */}
          <span className="text-gradient drop-shadow-[0_0_25px_rgba(234,0,122,0.4)]">
            {gradientText}
          </span>
        </h1>

        {/* Subtext Reveal */}
        <p className="max-w-2xl mx-auto text-gray-200 text-base md:text-xl mb-8 leading-relaxed font-light">
          Expert SEO, Web Development & Creative Video Editing that scales your business to the next level.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30">
          <a 
            href="tel:+919990432321" 
            className="btn-glass py-3.5 px-8 text-base font-bold w-full sm:w-[220px] flex items-center justify-center gap-2.5 border border-[var(--color-primary-pink)]/40 hover:border-[var(--color-primary-pink)] hover:bg-[var(--color-primary-pink)]/20 transition-all shadow-[0_0_15px_rgba(234,0,122,0.2)]"
          >
            <svg className="w-5 h-5 text-[var(--color-primary-pink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span>Call Now</span>
          </a>
          
          <a 
            href="https://wa.me/919990432321" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-glass py-3.5 px-8 text-base font-bold w-full sm:w-[220px] flex items-center justify-center gap-2.5 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all shadow-[0_0_15px_rgba(37,211,102,0.2)]"
          >
            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.122.553 4.195 1.6 6.015L.302 24l6.096-1.599A11.967 11.967 0 0012.031 24c6.647 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm3.84 17.202c-.161.455-.935.882-1.353.948-.419.066-1.004.148-2.915-.644-2.311-.96-3.811-3.328-3.926-3.483-.116-.155-.938-1.252-.938-2.389 0-1.137.589-1.696.8-1.928.21-.231.458-.289.613-.289.155 0 .31.002.449.008.146.007.342-.058.535.409.199.482.684 1.674.746 1.799.062.124.103.27.026.425-.078.155-.116.252-.232.392-.116.139-.243.302-.349.406-.115.116-.237.243-.105.474.132.231.587.974 1.26 1.573.869.774 1.596 1.013 1.83 1.129.233.116.368.093.504-.062.136-.155.584-.683.74-.916.155-.233.31-.194.52-.116.21.078 1.328.628 1.555.741.228.113.38.169.435.263.055.094.055.545-.106 1.001z" />
            </svg>
            <span>WhatsApp Now</span>
          </a>
        </div>

      </div>

      {/* Certified Banner at bottom of Hero */}
      <div className="relative z-20 w-full mt-auto">
        <Certified />
      </div>
    </section>
  );
}
