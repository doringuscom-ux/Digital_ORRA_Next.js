"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';

export default function TestimonialPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setReviews(data);
          }
        }
      } catch (err) {
        console.error("Error loading reviews from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  // Format dynamic reviews strictly from MongoDB
  const formattedReviews = useMemo(() => {
    const avatarGradients = [
      "from-cyan-500 to-blue-600",
      "from-pink-500 to-rose-600",
      "from-purple-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-fuchsia-500 to-pink-600"
    ];

    return reviews.map((r, idx) => {
      const name = r.clientName || "Client";
      const words = name.trim().split(/\s+/);
      const initials = words.length > 1 
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

      return {
        _id: r._id,
        clientName: name,
        role: r.role || "",
        company: r.company || "",
        location: r.location || "",
        rating: r.rating || 5,
        project: r.project || "",
        quote: r.quote || "",
        avatarBg: avatarGradients[idx % avatarGradients.length],
        initials
      };
    });
  }, [reviews]);

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/testimonial" />
      
      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Background Radial Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[12%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Exact Same Watermark Pattern as Other Pages */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            TESTIMONIALS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-36">

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className="rounded-3xl bg-[#111A38]/40 border border-white/10 p-6 sm:p-7 flex flex-col justify-between animate-pulse h-72"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-4 w-24 bg-white/10 rounded-full" />
                    </div>
                    <div className="space-y-2.5 mb-6">
                      <div className="h-3.5 bg-white/10 rounded w-full" />
                      <div className="h-3.5 bg-white/10 rounded w-5/6" />
                      <div className="h-3.5 bg-white/10 rounded w-4/6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 bg-white/10 rounded w-1/2" />
                      <div className="h-2.5 bg-white/10 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : formattedReviews.length === 0 ? (
            /* Elegant Empty State */
            <div className="rounded-3xl bg-gradient-to-b from-[#111A38]/60 to-[#0A1128]/80 border border-white/15 p-12 text-center max-w-2xl mx-auto mb-20 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <Quote className="w-8 h-8 rotate-180" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Reviews Published Yet</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Client reviews and success stories from our ongoing campaigns will appear here as soon as published in the database.
              </p>
              <Link
                href="/contact"
                className="btn-glow-pink inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
              >
                Become Our Next Success Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Actual Testimonial Cards Grid Strictly from MongoDB */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
              {formattedReviews.map((item, idx) => (
                <div 
                  key={item._id || idx}
                  className="group relative rounded-3xl bg-gradient-to-b from-[#111A38]/95 via-[#0A1128]/98 to-[#060B1A] border border-white/15 hover:border-cyan-400/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)]"
                >
                  {/* Top Subtle Glow Line */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-[#FF66B2] transition-all duration-500"></div>

                  <div>
                    {/* Top Bar: 5 Gold Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(item.rating || 5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <div className="text-cyan-400/25 mb-3 group-hover:text-cyan-400/50 transition-colors">
                      <Quote className="w-7 h-7 rotate-180" />
                    </div>

                    {/* Actual Review Quote */}
                    <p className="text-slate-200 text-[15px] sm:text-[15.5px] leading-[1.7] font-normal mb-5">
                      "{item.quote}"
                    </p>

                    {/* Project / Scope Tag */}
                    {item.project && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                        <span className="font-medium text-slate-200">{item.project}</span>
                      </div>
                    )}
                  </div>

                  {/* Client Profile Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarBg || 'from-cyan-500 to-blue-600'} flex items-center justify-center text-white font-black text-xs shadow-md flex-shrink-0 border border-white/20`}>
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-bold text-[14px] group-hover:text-cyan-300 transition-colors truncate">
                          {item.clientName}
                        </h4>
                        {(item.role || item.company) && (
                          <p className="text-xs text-slate-300 truncate font-medium">
                            {item.role ? `${item.role}, ` : ""}<span className="text-slate-200 font-semibold">{item.company}</span>
                          </p>
                        )}
                        {item.location && (
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                            <span>{item.location}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0 ml-2" title="100% Verified Review">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Bottom Conversion Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 via-[#0C142B] to-cyan-500/15 border border-pink-500/30 p-8 sm:p-10 mb-14 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-400 mb-2 inline-block">
                Start Your Growth Journey
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Ready to Experience Measurable Results?
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
                Connect with our strategic team today and let’s engineer your brand's digital dominance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="btn-glow-pink w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
