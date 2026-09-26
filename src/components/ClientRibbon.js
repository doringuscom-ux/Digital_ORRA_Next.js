'use client';
import React from 'react';

const partnerLogos = [
  { name: 'Nexa', src: '/LOGO/nexa.webp', scaleClass: 'scale-105 group-hover:scale-115' },
  { name: 'Shiv Kumar', src: '/LOGO/shiv Kumar.webp', scaleClass: 'scale-110 group-hover:scale-120' },
  { name: 'PBT', src: '/LOGO/pbt.png', scaleClass: 'scale-110 group-hover:scale-120' },
  { name: 'Orra Prop', src: '/LOGO/orra prop.svg', scaleClass: 'scale-100 group-hover:scale-110' },
  { name: 'DST', src: '/LOGO/DST.webp', scaleClass: 'scale-125 group-hover:scale-135 filter brightness-110' },
  { name: 'HBN', src: '/LOGO/hbn.webp', scaleClass: 'scale-110 group-hover:scale-120' },
  { name: 'SK', src: '/LOGO/sk.webp', scaleClass: 'scale-115 group-hover:scale-125' },
];

export default function ClientRibbon({ 
  headline = "Trusted by Fast-Growing Brands & Industry Leaders",
  subHeadline = "OUR PARTNERS & CLIENTS"
}) {
  return (
    <section className="relative w-full py-10 sm:py-12 bg-gradient-to-b from-[#0A1028] via-[#0E1738] to-[#0A1128] overflow-hidden border-t border-b border-white/10 z-20">
      
      {/* Background Ambient Glow & Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-32 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none z-0"></div>

      {/* Header text */}
      <div className="max-w-6xl mx-auto px-6 mb-7 relative z-10 text-center">
        <p className="text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-[0.25em] text-cyan-400 mb-1.5 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
          {subHeadline}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-cyan-400">Visionary Brands & Market Leaders</span>
        </h3>
      </div>

      {/* Ribbon Track Container */}
      <div className="relative flex overflow-hidden w-full group/marquee">
        {/* Left & Right Smooth Blur Fades */}
        <div className="absolute left-0 top-0 w-24 sm:w-44 h-full bg-gradient-to-r from-[#0A1028] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 sm:w-44 h-full bg-gradient-to-l from-[#0A1028] to-transparent z-10 pointer-events-none"></div>

        {/* Infinite Marquee Track (Pauses on hover over any card or the ribbon) */}
        <div className="flex animate-marquee group-hover/marquee:[animation-play-state:paused] items-center gap-5 sm:gap-7 w-max py-3">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div 
              key={index} 
              className="w-[170px] sm:w-[200px] md:w-[220px] h-[78px] sm:h-[88px] bg-slate-800/85 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.4)] flex-shrink-0 flex items-center justify-center p-2.5 sm:p-3 hover:scale-105 hover:bg-slate-700/95 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] border border-white/15 transition-all duration-300 cursor-pointer group backdrop-blur-md"
            >
              <img 
                src={partner.src} 
                alt={`${partner.name} - Digital ORRA Partner`} 
                className={`max-h-[90%] max-w-[92%] object-contain transition-transform duration-300 ${partner.scaleClass}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
