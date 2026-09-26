"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const cities = ["Panchkula, India", "Chandigarh, India", "Mohali, India"];

export default function About({ 
  ptClass = "pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-40 lg:pt-44 md:pb-28", 
  id = "about",
  watermarkTop = "top-1 sm:top-2 md:top-2 lg:top-3",
  asH1 = false
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
    <section className={`relative w-full ${ptClass} bg-gradient-to-b from-[#0F1A3B] via-[#0A122B] to-[#070E22] overflow-hidden`} id={id}>
      
      {/* Ambient Lighting & Glows - Brighter & More Radiant */}
      <div style={{ pointerEvents: 'none' }} className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-[var(--color-primary-pink)]/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div style={{ pointerEvents: 'none' }} className="absolute bottom-5 right-0 w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div style={{ pointerEvents: 'none' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-indigo-500/15 rounded-full blur-[160px] pointer-events-none z-0"></div>
      
      {/* Subtle modern grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Elegant Balanced Background Watermark */}
      <div style={{ pointerEvents: 'none' }} className={`flex absolute ${watermarkTop} left-0 w-full justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]`}>
        <span style={{ pointerEvents: 'none' }} className="text-[7.5vw] sm:text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.80] via-white/[0.5] to-white/[0.2]">
          ABOUT DIGITAL ORRA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Single Premium Image */}
          <div className="lg:col-span-5 flex flex-col gap-6 mt-2 sm:mt-4 lg:mt-16">
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
            
            {asH1 ? (
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-white">
                  #1 Digital Marketing
                </span>{" "}
                <br className="hidden xs:inline" />
                <span className="inline-block text-white">
                  Company in India
                </span>
              </h1>
            ) : (
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-white">
                  #1 Digital Marketing
                </span>{" "}
                <br className="hidden xs:inline" />
                <span className="inline-block text-white">
                  Company in India
                </span>
              </h2>
            )}

            <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed font-light">
              <strong className="text-white font-semibold">Digital ORRA</strong> is a results-driven Digital Marketing Company in India, offering end-to-end digital solutions for brands and businesses. We specialize in digital marketing, Google Ads, Meta Ads, influencer marketing, graphic designing, website development and designing, CRM software, app development, and ERP solutions.
            </p>

            <p className="text-gray-200/90 text-base md:text-lg mb-8 leading-relaxed font-light">
              Our services also include corporate video editing and professional corporate video shoots to help brands communicate with impact. With a strategic, creative, and performance-focused approach, Digital ORRA helps businesses grow, scale, and stand out in the digital landscape.
            </p>

            {/* Premium Interactive Stats Grid - 1 line on mobile & desktop */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full">
              <Link 
                href="/about-us" 
                className="group border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.10] via-white/[0.05] to-white/[0.02] hover:border-[var(--color-primary-pink)] hover:shadow-[0_0_25px_rgba(234,0,122,0.45)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md text-center sm:text-left flex flex-col justify-center cursor-pointer shadow-lg"
                title="Learn More About Digital ORRA"
              >
                <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                  <h4 className="text-xl xs:text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-primary-pink)] group-hover:scale-105 transition-transform duration-300">
                    About
                  </h4>
                  <span className="text-[var(--color-primary-pink)] text-base sm:text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-200 uppercase tracking-tight sm:tracking-wider font-semibold leading-tight group-hover:text-pink-300 transition-colors">
                  Our Story & Vision
                </p>
              </Link>
              <div className="group border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.10] via-white/[0.05] to-white/[0.02] hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md text-center sm:text-left shadow-lg">
                <h4 className="text-xl xs:text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-accent-cyan)] mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform duration-300">12k+</h4>
                <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-tight sm:tracking-wider font-semibold leading-tight">Client Reviews</p>
              </div>
              <div className="group border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.10] via-white/[0.05] to-white/[0.02] hover:border-[var(--color-primary-pink)]/50 hover:shadow-[0_0_25px_rgba(234,0,122,0.35)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md text-center sm:text-left shadow-lg">
                <h4 className="text-xl xs:text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-primary-pink)] mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform duration-300">6M+</h4>
                <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-tight sm:tracking-wider font-semibold leading-tight">Leads Generated</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
