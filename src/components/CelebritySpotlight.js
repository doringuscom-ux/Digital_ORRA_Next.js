'use client';
import React, { useState } from 'react';
import { Play, Star, ShieldCheck, Sparkles, ArrowLeft, Award, Trophy, Users, TrendingUp, Video } from 'lucide-react';

export default function CelebritySpotlight() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [flipDegree, setFlipDegree] = useState(0);

  const handlePlayClick = () => {
    if (isPlaying) return; // already playing
    setFlipDegree(1080); // 3 full flips
    
    // Switch to video exactly halfway through the flip
    setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  };

  const handleCloseClick = () => {
    if (!isPlaying) return;
    setFlipDegree(0); // flip back to 0
    
    // Switch to image exactly halfway through the flip
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  };

  return (
    <section className="relative w-full pt-14 pb-10 md:pt-24 lg:pt-28 md:pb-14 bg-gradient-to-b from-[#101B3D] via-[#0D1533] to-[#0A1028] overflow-hidden border-t border-white/10" id="spotlight">
      
      {/* Video Modal - (Kept logic but we use inline flip) */}
      
      {/* Epic Abstract Backgrounds - Smooth Radiant Glows Without Harsh Box Shadows */}
      
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[var(--color-primary-pink)]/25 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Elegant Balanced Background Watermark */}
      <div className="absolute top-3 sm:top-2 md:top-2 lg:top-3 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
        <span className="text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.80] via-white/[0.5] to-white/[0.2]">
          CELEBRITY SPOTLIGHT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-8 pt-0 sm:pt-4 md:pt-8">
          
          {/* Left Text Section (Hidden on mobile phones/tablets, visible on Desktop) */}
          <div className="hidden lg:block flex-1 max-w-2xl relative z-20 mt-4 lg:mt-6">
            {/* Pill Badge Removed */}

            <h2 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-3">
              <span className="block mb-2">Famous Movie Actor</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-pink)] via-pink-400 to-[#FF007A] drop-shadow-[0_0_30px_rgba(234,0,122,0.5)]">
                Rakesh Bedi Ji
              </span>
            </h2>

            <p className="hidden sm:block text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-wide mb-6 uppercase">
              Blessing Digital ORRA
            </p>

            {/* Glowing Quote Card (Visible on Desktop / Large screens here) */}
            <div className="hidden lg:block relative group mb-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-pink)] to-cyan-500 rounded-2xl blur opacity-35 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <blockquote className="relative text-gray-100 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-[var(--color-primary-pink)] pl-6 bg-[#131F46]/85 backdrop-blur-xl py-6 px-8 rounded-r-2xl shadow-2xl border-y border-r border-white/10">
                "Digital ORRA is revolutionizing the digital space with absolute brilliance. I am proud to associate with a team that delivers pure excellence and growth. Their creative vision and technical expertise are truly unmatched in the industry."
              </blockquote>
            </div>
          </div>

          {/* Right Image Section with Transparent PNG & Flip */}
          <div className="flex-1 w-full relative mt-0 sm:mt-4 lg:mt-8 flex justify-center lg:justify-end z-10">
            
            {/* Flipping Container */}
            <div 
              className="relative z-20 w-full max-w-[600px] transition-transform duration-[2000ms] ease-in-out flex justify-center items-center md:min-h-[350px]"
              style={{ transform: `perspective(1200px) rotateY(${flipDegree}deg)` }}
            >
              
              {!isPlaying ? (
                /* The transparent cutout and badges */
                <div className="relative w-[95%] max-w-[600px] animate-float">
                  
                  {/* Glowing Backlight behind Rakesh Ji */}
                  <div className="absolute inset-0 bg-[var(--color-primary-pink)]/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

                  <img 
                    src="/RAKESH.png" 
                    alt="Rakesh Bedi - Digital ORRA" 
                    className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20"
                  />
                </div>
              ) : (
                /* The Inline YouTube Iframe */
                <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-black border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative z-20">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/8NPyv5Am6Mo?autoplay=1&rel=0" 
                    title="Rakesh Bedi - Celebrity Spotlight at Digital ORRA" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
            </div>

            {/* Ultimate Floating "Play Video" Element (Outside Flipping Container) */}
            {!isPlaying && (
              <div 
                onClick={handlePlayClick}
                className={`absolute bottom-[8%] left-1/2 -translate-x-1/2 flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 pr-4 sm:pr-6 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer group hover:border-[var(--color-primary-pink)]/80 hover:bg-[#0A1128]/90 transition-all duration-300 z-30 whitespace-nowrap ${flipDegree > 0 ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[var(--color-primary-pink)] to-[#FF007A] flex items-center justify-center shadow-[0_0_30px_rgba(234,0,122,0.6)] group-hover:scale-110 transition-transform shrink-0">
                   <div className="absolute inset-0 rounded-full border border-white/40 animate-ping"></div>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" />
                </div>
                <div className="whitespace-nowrap">
                  <p className="text-gray-300 font-bold text-[9px] sm:text-[10px] md:text-xs leading-tight tracking-[0.2em] uppercase mb-0.5 whitespace-nowrap">Hear From</p>
                  <p className="text-white font-black text-base sm:text-lg md:text-xl leading-tight uppercase tracking-wider drop-shadow-md whitespace-nowrap">Rakesh Ji</p>
                </div>
              </div>
            )}

            {/* Cinematic Floor Pedestal */}
            {!isPlaying && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-[radial-gradient(ellipse_at_center,rgba(234,0,122,0.4)_0%,transparent_70%)] rounded-full z-10 pointer-events-none opacity-60"></div>
            )}
          </div>

        </div>

        {/* Glowing Quote Card (Displayed directly under Rakesh Ji's photo on Mobile / Tablet) */}
        <div className="block lg:hidden relative group mt-8 z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-pink)] to-cyan-500 rounded-2xl blur opacity-35 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <blockquote className="relative text-gray-100 text-sm sm:text-base font-medium leading-relaxed italic border-l-4 border-[var(--color-primary-pink)] pl-5 bg-[#131F46]/85 backdrop-blur-xl py-5 px-6 rounded-r-2xl shadow-2xl border-y border-r border-white/10">
            "Digital ORRA is revolutionizing the digital space with absolute brilliance. I am proud to associate with a team that delivers pure excellence and growth. Their creative vision and technical expertise are truly unmatched in the industry."
          </blockquote>
        </div>

        {/* 4 Premium Trust Cards Added to Bottom for massive authority (Hidden on mobile phones) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-3xl bg-[#131F46]/60 backdrop-blur-lg border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:bg-[#162450]/80 hover:border-[var(--color-primary-pink)]/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/15 to-transparent flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-[var(--color-primary-pink)]/25 transition-colors">
              <Trophy className="w-7 h-7 text-[var(--color-primary-pink)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-white font-black text-xl mb-1">Bollywood</h4>
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase">Celebrity Endorsed</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-3xl bg-[#131F46]/60 backdrop-blur-lg border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:bg-[#162450]/80 hover:border-cyan-500/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/15 to-transparent flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-cyan-500/25 transition-colors">
              <Users className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-white font-black text-xl mb-1">7000+</h4>
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase">Happy Clients</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-3xl bg-[#131F46]/60 backdrop-blur-lg border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:bg-[#162450]/80 hover:border-[var(--color-primary-pink)]/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/15 to-transparent flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-[var(--color-primary-pink)]/25 transition-colors">
              <TrendingUp className="w-7 h-7 text-[var(--color-primary-pink)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-white font-black text-xl mb-1">30x</h4>
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase">ROI Delivered</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-3xl bg-[#131F46]/60 backdrop-blur-lg border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:bg-[#162450]/80 hover:border-cyan-500/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/15 to-transparent flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-cyan-500/25 transition-colors">
              <Video className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h4 className="text-white font-black text-xl mb-1">No. 1</h4>
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase">Digital Agency</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
