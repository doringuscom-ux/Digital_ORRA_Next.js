import React from 'react';
import Image from 'next/image';

const logos = [
  '/CERTIFIED/google-partner.webp',
  '/CERTIFIED/meta-business-partner.webp',
  '/CERTIFIED/ISOO.webp',
  '/CERTIFIED/GEM.webp',
  '/CERTIFIED/JJ.webp',
];

export default function Certified({ ptClass = "pt-0 pb-3 sm:pt-6 sm:pb-4 md:pt-10 md:pb-6" }) {
  return (
    <section className={`w-full ${ptClass} bg-gradient-to-t from-[#0A1128] to-transparent relative overflow-hidden z-30`}>
      {/* Gradient Fades for Left and Right Edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0A1128] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0A1128] to-transparent z-10 pointer-events-none"></div>
      
      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-[var(--color-primary-pink)]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 mb-3.5 md:mb-4 relative z-20 flex flex-col items-center text-center">
        {/* Option 2: High-Authority Bold Headline */}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Trusted & Certified by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-cyan-400">Industry Giants</span>
        </h3>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Infinite Marquee Track */}
        <div className="flex animate-marquee items-center gap-6 sm:gap-8 md:gap-10 w-max">
          {/* Tripling the array so it loops perfectly without jumping */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              className="w-[140px] md:w-[180px] h-[60px] md:h-[76px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex-shrink-0 flex items-center justify-center p-3.5 opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,51,153,0.35)] border border-white/30 transition-all duration-300 cursor-pointer"
            >
              <Image 
                src={logo} 
                alt={`Certified Logo ${index}`} 
                width={140} 
                height={70} 
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
