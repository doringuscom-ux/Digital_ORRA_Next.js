"use client";
import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2, Mail } from 'lucide-react';
import './ReviewsSection.css';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState('reading'); // 'reading', 'sliding-in', 'closed', 'opening', 'sliding-out'

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const dummyData = [
    { _id: 'd1', clientName: 'Sarah Jenkins', role: 'CEO', company: 'TechFlow', rating: 5, quote: "Digital ORRA transformed our online presence completely. Their strategic approach doubled our leads." },
    { _id: 'd2', clientName: 'Michael Chen', role: 'Founder', company: 'Elevate', rating: 5, quote: "The team's attention to detail is unmatched. They didn't just build a website; they built an experience." }
  ];

  const displayData = reviews.length >= 2 ? reviews : [...reviews, ...dummyData].slice(0, 3);

  // Envelope Animation State Machine
  useEffect(() => {
    if (displayData.length === 0 || loading) return;

    if (phase === 'reading') {
      const timer = setTimeout(() => setPhase('sliding-in'), 4000);
      return () => clearTimeout(timer);
    } else if (phase === 'sliding-in') {
      const timer = setTimeout(() => setPhase('closed'), 600); // Wait for card to slide down
      return () => clearTimeout(timer);
    } else if (phase === 'closed') {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % displayData.length);
        setPhase('opening');
      }, 500); // Envelope stays closed for a moment, change card data while hidden
      return () => clearTimeout(timer);
    } else if (phase === 'opening') {
      const timer = setTimeout(() => setPhase('sliding-out'), 500); // Wait for flap to open
      return () => clearTimeout(timer);
    } else if (phase === 'sliding-out') {
      const timer = setTimeout(() => setPhase('reading'), 600); // Wait for card to slide up
      return () => clearTimeout(timer);
    }
  }, [phase, displayData.length, loading]);

  const activeReview = displayData[activeIndex];

  return (
    <section className="reviews-section" id="reviews">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Massive Background Typography */}
      <div className="absolute top-8 sm:top-9 md:top-8 lg:top-8 left-0 w-full flex justify-center pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
        <span
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          className="text-[8vw] md:text-[8vw] font-black uppercase tracking-widest whitespace-nowrap select-none"
        >
          TESTIMONIALS
        </span>
      </div>

      <div className="rev-container relative z-10 pt-10 sm:pt-14 md:pt-16 lg:pt-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Left Column: Text & Stats */}
        <div className="lg:w-1/2 w-full text-left relative pr-4 lg:pr-10 mt-1 lg:mt-6">
          <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

          <h2 className="text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Client <br />
            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Success Stories</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed font-light">
            Don't just take our word for it. Hear what our partners have to say about the exponential growth and ROI we deliver. From skyrocketing search rankings to high-converting ad campaigns, we transform digital presence into measurable business success. See how brands like yours are dominating their markets with our tailored strategies.
          </p>

          <div className="hidden sm:flex flex-wrap gap-6 mt-4">
            <div className="px-8 py-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md hover:border-cyan-500/30 transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-all duration-500"></div>
              <h4 className="text-5xl font-black text-white mb-2 tracking-tighter relative z-10">98<span className="text-cyan-400 text-4xl">%</span></h4>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold relative z-10">Client Retention</p>
            </div>

            <div className="px-8 py-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md hover:border-pink-500/30 transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-pink-500/20 transition-all duration-500"></div>
              <h4 className="text-5xl font-black text-white mb-2 tracking-tighter relative z-10">1250<span className="text-pink-400 text-4xl">+</span></h4>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold relative z-10">Projects Delivered</p>
            </div>
          </div>
        </div>

        {/* Right Column: Envelope Animation */}
        <div className="lg:w-1/2 w-full mt-10 lg:mt-16">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-cyan-400" size={40} />
            </div>
          ) : (
            <div className="envelope-wrapper">

              {/* Envelope Back */}
              <div className="env-back"></div>

              {/* Envelope Flap */}
              <div className={`env-flap ${phase !== 'closed' ? 'open' : ''}`}></div>

              {/* Envelope Front */}
              <div className="env-front">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span className="text-cyan-300 text-xs font-bold tracking-[0.3em] drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">NEW MESSAGE</span>
                </div>
              </div>

              {/* Center Seal / Button with Auto Spin on Open & Close */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] transition-all duration-700 ease-in-out ${
                  phase === 'sliding-in' || phase === 'closed'
                    ? 'rotate-[360deg] scale-90'
                    : 'rotate-0 scale-100'
                }`}
              >
                <button
                  onClick={() => {
                    if (phase === 'reading') setPhase('sliding-in');
                    else if (phase === 'closed') setPhase('opening');
                  }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br p-[2px] transition-all duration-700 group cursor-pointer ${
                    phase === 'sliding-in' || phase === 'closed'
                      ? 'from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_25px_rgba(236,72,153,0.8)]'
                      : 'from-cyan-400 via-sky-400 to-pink-500 shadow-[0_0_35px_rgba(6,182,212,0.8)]'
                  } hover:scale-110`}
                  title={phase === 'reading' ? 'Click to close envelope' : 'Click to open envelope'}
                >
                  <div className="w-full h-full rounded-full bg-[#050B17] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
                    <Mail 
                      className={`transition-all duration-700 ${
                        phase === 'sliding-in' || phase === 'closed'
                          ? 'text-pink-400 rotate-180 scale-90'
                          : 'text-cyan-400 rotate-0 scale-100'
                      }`} 
                      size={24} 
                    />
                  </div>
                </button>
              </div>

              {/* The Review Card */}
              {activeReview && (
                <div
                  className={`env-card-container ${phase === 'reading' ? 'reading' :
                      phase === 'sliding-out' ? 'sliding-out' :
                        phase === 'sliding-in' ? 'sliding-in' : 'hidden-state'
                    }`}
                >
                  <div className="rev-envelope-card">
                    <div className="absolute -bottom-10 -right-10 text-white/[0.02] pointer-events-none rotate-12">
                      <Quote size={180} />
                    </div>

                    {/* Top Row: Stars & Author */}
                    <div className="flex justify-between items-center mb-6 sm:mb-8 relative z-10 gap-2">
                      <div className="flex gap-1 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < activeReview.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "text-gray-700"}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3 text-right flex-shrink-0">
                        <div className="text-right">
                          <p className="text-[10px] sm:text-[10.5px] text-cyan-400 font-bold tracking-[0.15em] uppercase mb-0.5 whitespace-nowrap">Words From</p>
                          <h4 className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">{activeReview.clientName}</h4>
                        </div>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.4)] flex-shrink-0">
                          {activeReview.clientName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <p className="rev-quote-text relative z-10">"{activeReview.quote}"</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
