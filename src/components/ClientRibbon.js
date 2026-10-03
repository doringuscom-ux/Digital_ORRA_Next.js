'use client';
import React from 'react';

const partnerLogos = [
  { name: 'Nexa', src: '/LOGO/nexa.webp', scaleClass: 'scale-100 group-hover:scale-110' },
  { name: 'Shivjot', src: '/LOGO/shivjot.webp', scaleClass: 'scale-[1.3] sm:scale-[1.35] group-hover:scale-[1.4]' },
  { name: 'Morni Hilltop', src: '/LOGO/morni.webp', scaleClass: 'scale-105 group-hover:scale-115' },
  { name: 'PBT', src: '/LOGO/pbt.png', scaleClass: 'scale-105 group-hover:scale-115' },
  { name: 'Orra Prop', src: '/LOGO/orra prop.svg', scaleClass: 'scale-100 group-hover:scale-110' },
  { name: 'DST', src: '/LOGO/DST.webp', scaleClass: 'scale-90 group-hover:scale-100' },
  { name: 'HBN', src: '/LOGO/hbn.webp', scaleClass: 'scale-[1.65] sm:scale-[1.75] group-hover:scale-[1.85]' },
  { name: 'Dental Wire', src: '/LOGO/Denteal Wire.png', scaleClass: 'scale-[1.25] sm:scale-[1.3] group-hover:scale-[1.35]' },
  { name: 'TGL', src: '/LOGO/TGL.png', scaleClass: 'scale-[1.25] sm:scale-[1.3] group-hover:scale-[1.35]' },
  { name: 'Orchid Salon', src: '/LOGO/Orchid SAlon.png', scaleClass: 'scale-105 group-hover:scale-115' },
  { name: 'Radhya Hillscape', src: '/LOGO/radhya.png', scaleClass: 'scale-[1.25] sm:scale-[1.3] group-hover:scale-[1.35]' },
  { name: 'The Orchid Residency', src: '/LOGO/Orchid.png', scaleClass: 'scale-[1.25] sm:scale-[1.3] group-hover:scale-[1.35]' },
  { name: 'Hotel Score', src: '/LOGO/Hotel Score.png', scaleClass: 'scale-[1.15] sm:scale-[1.2] group-hover:scale-[1.25]' },
  { name: 'Art Addict Tattoo', src: '/LOGO/Art Addict Tattoo.png', scaleClass: 'scale-[1.25] sm:scale-[1.3] group-hover:scale-[1.35]' },
  { name: 'SK', src: '/LOGO/sk.webp', scaleClass: 'scale-110 group-hover:scale-120' },
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
      <div className="max-w-6xl mx-auto px-6 mb-7 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md mb-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            {subHeadline}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(255,51,153,0.3)]">
            Visionary Brands & Market Leaders
          </span>
        </h3>
      </div>

      {/* Ribbon Track Container */}
      <div className="relative flex overflow-hidden w-full group/marquee">
        {/* Left & Right Smooth Blur Fades */}
        <div className="absolute left-0 top-0 w-24 sm:w-44 h-full bg-gradient-to-r from-[#0A1028] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 sm:w-44 h-full bg-gradient-to-l from-[#0A1028] to-transparent z-10 pointer-events-none"></div>

        {/* Infinite Marquee Track (Pauses on hover over any card or the ribbon) */}
        <div 
          className="flex animate-marquee group-hover/marquee:[animation-play-state:paused] items-center gap-5 sm:gap-7 w-max py-3"
          style={{ animationDuration: '45s' }}
        >
          {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div
              key={index}
              className="w-[170px] sm:w-[200px] md:w-[220px] h-[78px] sm:h-[88px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.25)] flex-shrink-0 flex items-center justify-center p-3 sm:p-3.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white/20 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={partner.src}
                alt={`${partner.name} - Digital ORRA Partner`}
                className={`max-h-[85%] max-w-[88%] object-contain transition-transform duration-300 ${partner.scaleClass}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
