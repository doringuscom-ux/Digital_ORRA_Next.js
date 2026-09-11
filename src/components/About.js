"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const cities = ["Panchkula", "Chandigarh", "Mohali"];

export default function About({ 
  ptClass = "pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-36 lg:pt-40 md:pb-28", 
  id = "about",
  watermarkTop = "top-2 sm:top-6 md:-top-2 lg:-top-4"
}) {
  const [cityIndex, setCityIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentCity = cities[cityIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentCity.substring(0, currentText.length + 1));
        if (currentText === currentCity) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause when word is complete
        }
      } else {
        setCurrentText(currentCity.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCityIndex((prev) => (prev + 1) % cities.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, cityIndex]);

  return (
    <section className={`relative w-full ${ptClass} bg-[#0A1128] overflow-hidden`} id={id}>
      
      {/* Ambient Lighting & Glows */}
      <div style={{ pointerEvents: 'none' }} className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary-pink)]/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div style={{ pointerEvents: 'none' }} className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div style={{ pointerEvents: 'none' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Elegant Balanced Background Watermark (Brighter and more visible) */}
      <div style={{ pointerEvents: 'none' }} className={`flex absolute ${watermarkTop} left-0 w-full justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]`}>
        <span style={{ pointerEvents: 'none' }} className="text-[7.5vw] sm:text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.72] via-white/[0.45] to-white/[0.18]">
          ABOUT DIGITAL ORRA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Single Premium Image */}
          <div className="lg:col-span-5 flex flex-col gap-6 mt-6 sm:mt-6 lg:mt-16">
            <div className="w-full h-[450px] sm:h-[550px] relative">
              
              {/* Subtle Outer Neon Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-pink)]/30 to-cyan-500/20 rounded-[2.2rem] blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700"></div>

              {/* Single Large Glass Panel with Actual Image */}
              <div className="w-full h-full relative rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl group bg-[#0D183A]/80 backdrop-blur-xl">
                
                {/* Background Blurred Image (fills empty space) */}
                <Image 
                  src="/about-founder-team.webp" 
                  alt="Background Blur" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover blur-2xl opacity-30 scale-110"
                  priority
                />
                
                {/* Main Foreground Image (no cropping) */}
                <div className="absolute inset-0 z-10">
                  <Image 
                    src="/about-founder-team.webp" 
                    alt="Digital ORRA Team" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-[var(--color-primary-pink)]/10 z-20 pointer-events-none"></div>

              </div>
            </div>

          </div>

          {/* Right Column: Text & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center lg:pl-6 mt-0 lg:mt-16">
            
            {/* Pill Badge Removed */}
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.2] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-white">
                Digital Marketing
              </span> <br/>
              <span className="whitespace-nowrap">
                Company in <span className="text-white border-r-4 border-[var(--color-primary-pink)] pr-1 animate-pulse">{currentText || '\u00A0'}</span>
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed font-light">
              <strong className="text-white font-semibold">Digital ORRA</strong> is a results-driven Digital Marketing Company based out in Panchkula near Chandigarh, India, offering end-to-end digital solutions for brands and businesses. We specialize in digital marketing, Google Ads, Meta Ads, influencer marketing, graphic designing, website development and designing, CRM software, app development, and ERP solutions.
            </p>

            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
              Our services also include corporate video editing and professional corporate video shoots to help brands communicate with impact. With a strategic, creative, and performance-focused approach, Digital ORRA helps businesses grow, scale, and stand out in the digital landscape.
            </p>

            {/* Premium Interactive Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              <div className="group border border-white/10 rounded-2xl p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.01] hover:border-[var(--color-primary-pink)]/50 hover:shadow-[0_0_25px_rgba(234,0,122,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                <h4 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-primary-pink)] mb-1 group-hover:scale-105 transition-transform duration-300">+200</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Digital Experts</p>
              </div>
              <div className="group border border-white/10 rounded-2xl p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.01] hover:border-[var(--color-primary-pink)]/50 hover:shadow-[0_0_25px_rgba(234,0,122,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                <h4 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-accent-cyan)] mb-1 group-hover:scale-105 transition-transform duration-300">12k+</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Client Reviews</p>
              </div>
              <div className="group border border-white/10 rounded-2xl p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.01] hover:border-[var(--color-primary-pink)]/50 hover:shadow-[0_0_25px_rgba(234,0,122,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                <h4 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-primary-pink)] mb-1 group-hover:scale-105 transition-transform duration-300">6M+</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Leads Generated</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
