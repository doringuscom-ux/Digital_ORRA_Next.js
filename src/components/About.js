"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function About({ 
  ptClass = "pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-40 lg:pt-44 md:pb-28", 
  id = "about",
  watermarkTop = "top-1 sm:top-2 md:top-2 lg:top-3",
  asH1 = false,
  showVideo = false
}) {
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);

  // Play the reel only while it is on screen (saves bandwidth & battery)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
        <span style={{ pointerEvents: 'none' }} className="text-[length:calc(7.5vw/var(--z))] sm:text-[length:calc(6.5vw/var(--z))] md:text-[length:calc(7vw/var(--z))] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.80] via-white/[0.5] to-white/[0.2]">
          ABOUT DIGITAL ORRA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: team photo (home) or phone reel (about page) */}
          {!showVideo ? (
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
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-[var(--color-primary-pink)]/10 z-20 pointer-events-none"></div>

              </div>
            </div>

          </div>
          ) : (
          <div className="lg:col-span-5 mt-2 sm:mt-4 lg:mt-16">
            {/* Phone mockup, centred in the column */}
            <div className="flex justify-center h-[520px] sm:h-[580px] lg:h-[620px]">
                <div className="group relative h-full aspect-[9/16] max-w-full">

                  {/* Soft ground shadow */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-10 w-[80%] rounded-[50%] bg-black/60 blur-2xl"></span>

                  {/* Side buttons: action, volume up/down, power */}
                  <span className="absolute -left-[4px] top-[16%] h-[5%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#7d838f] via-[#e9ebef] to-[#b4b9c3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"></span>
                  <span className="absolute -left-[4px] top-[25%] h-[9%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#7d838f] via-[#e9ebef] to-[#b4b9c3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"></span>
                  <span className="absolute -left-[4px] top-[36%] h-[9%] w-[4px] rounded-l-sm bg-gradient-to-r from-[#7d838f] via-[#e9ebef] to-[#b4b9c3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"></span>
                  <span className="absolute -right-[4px] top-[27%] h-[13%] w-[4px] rounded-r-sm bg-gradient-to-l from-[#7d838f] via-[#e9ebef] to-[#b4b9c3] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"></span>

                  {/* Body: polished titanium frame with light reflections */}
                  <div className="relative h-full w-full rounded-[2.5rem] p-[6px] bg-[linear-gradient(135deg,#f7f8fa_0%,#a9aeb8_18%,#eef0f3_35%,#8a909b_55%,#dfe2e7_75%,#9da2ac_100%)] shadow-[0_35px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.35)]">

                    {/* Antenna bands */}
                    <span className="absolute left-0 top-[9%] h-[3px] w-[6px] bg-[#6b717c]/70"></span>
                    <span className="absolute right-0 top-[9%] h-[3px] w-[6px] bg-[#6b717c]/70"></span>
                    <span className="absolute left-0 bottom-[9%] h-[3px] w-[6px] bg-[#6b717c]/70"></span>
                    <span className="absolute right-0 bottom-[9%] h-[3px] w-[6px] bg-[#6b717c]/70"></span>

                    {/* Screen: thin glass border, reel fills edge to edge */}
                    <div className="relative h-full w-full rounded-[2.1rem] overflow-hidden bg-[#0F1A3B] ring-[2px] ring-[#111318]">

                      {/* Dynamic island with front camera */}
                      <span className="absolute z-20 left-1/2 -translate-x-1/2 top-2.5 h-[24px] w-[30%] rounded-full bg-black flex items-center justify-end pr-2.5">
                        <span className="h-[9px] w-[9px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#4a5a8a_0%,#151b2e_55%,#05060a_100%)] ring-1 ring-white/10"></span>
                      </span>

                      {/* Glass reflection */}
                      <span className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_28%,transparent_42%)] transition-opacity duration-700 group-hover:opacity-60"></span>

                      <div className="absolute inset-0">
                        <video
                          ref={videoRef}
                          src="/about-reel.mp4"
                          poster="/about-reel-poster.webp"
                          muted={muted}
                          loop
                          playsInline
                          preload="none"
                          aria-label="Digital ORRA team reel"
                          className="w-full h-full object-cover"
                        />

                        {/* Reel UI: bottom shade so overlay text stays readable */}
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%] bg-gradient-to-t from-black/75 via-black/30 to-transparent"></span>

                        {/* Reel UI: right-side action column */}
                        <div className="absolute z-20 right-2.5 bottom-[13%] flex flex-col items-center gap-4 text-white">
                          <button
                            type="button"
                            onClick={() => setLiked((l) => !l)}
                            aria-label={liked ? "Unlike" : "Like"}
                            className="transition-transform duration-200 active:scale-125 drop-shadow-md"
                          >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill={liked ? "#ff3040" : "none"} stroke={liked ? "#ff3040" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                          </button>
                          <span className="drop-shadow-md" aria-hidden="true">
                            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>
                          </span>
                          <span className="drop-shadow-md" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </span>
                          <button
                            type="button"
                            onClick={() => setMuted((m) => !m)}
                            aria-label={muted ? "Unmute video" : "Mute video"}
                            className="h-8 w-8 rounded-full bg-black/40 hover:bg-[var(--color-primary-pink)] border border-white/25 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
                          >
                            {muted ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                            )}
                          </button>
                        </div>

                        {/* Reel UI: account + caption */}
                        <div className="absolute z-20 left-3 right-14 bottom-[6%] text-white">
                          <div className="flex items-center gap-2">
                            <span className="relative h-7 w-7 shrink-0 rounded-full bg-white ring-2 ring-[var(--color-primary-pink)] overflow-hidden">
                              <Image src="/logo.webp" alt="" fill sizes="28px" className="object-contain p-[2px]" />
                            </span>
                            <span className="text-[12px] font-semibold drop-shadow">digitalorra</span>
                            <a
                              href="https://www.instagram.com/digitalorra/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-1 rounded-md border border-white/70 px-2 py-[1px] text-[11px] font-semibold hover:bg-white hover:text-black transition-colors"
                            >
                              Follow
                            </a>
                          </div>
                          <p className="mt-1.5 text-[11px] leading-snug text-white/90 drop-shadow line-clamp-1">
                            Meet the team behind Digital ORRA ✨
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                            Original audio · Digital ORRA
                          </p>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <span className="absolute z-20 bottom-2 left-1/2 -translate-x-1/2 h-[4px] w-[34%] rounded-full bg-white/85"></span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          )}

          {/* Right Column: Text & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center lg:pl-6 mt-0 lg:mt-16">
            
            {/* Pill Badge Removed */}
            
            {asH1 ? (
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-pink-300">
                  #1 Digital Marketing
                </span>{" "}
                <br className="hidden xs:inline" />
                <span className="inline-block text-white">
                  Company in India
                </span>
              </h1>
            ) : (
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-pink-300">
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
