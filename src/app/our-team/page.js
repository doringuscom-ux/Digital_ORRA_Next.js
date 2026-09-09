"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { ArrowRight } from "lucide-react";

export default function OurTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamPhotos() {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            // Sort strictly by admin assigned order
            const sorted = data
              .filter((m) => m.isActive !== false)
              .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
            setTeam(sorted);
          }
        }
      } catch (err) {
        console.error("Failed to load team photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamPhotos();
  }, []);

  return (
    <main className="min-h-screen bg-[#070D1E] text-white selection:bg-pink-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      <DynamicSeoHead path="/our-team" />
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[170px]"></div>
      </div>

      {/* Main Header with Giant Watermark */}
      <section className="relative w-full pt-24 pb-12 sm:pt-28 md:pt-36 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark (Properly below the floating Navbar) */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-18 sm:top-20 md:top-20 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <span style={{ pointerEvents: 'none' }} className="text-[12.5vw] sm:text-[9.5vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.48] via-white/[0.28] to-white/[0.08]">
            OUR TEAM
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-24 md:pt-36 lg:pt-44">

          {/* Clean Team Photo Grid (Exact Order Set by Admin) */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl bg-white/5 animate-pulse border border-white/10" />
              ))}
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-1">No Team Photos Found</h3>
              <p className="text-xs text-gray-400">Photos uploaded in Admin Panel will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div
                  key={member._id || idx}
                  className="group relative rounded-3xl bg-gradient-to-b from-[#111C3D]/95 via-[#0B132B]/95 to-[#060C1D] border border-white/15 hover:border-cyan-400/60 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)]"
                >
                  {/* Top Laser Accent */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-[var(--color-primary-pink)] transition-all duration-500"></div>

                  {/* Clean High-Resolution Photo */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#050B18]">
                    <img
                      src={member.image}
                      alt={member.name || `Team Member ${idx + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Gradient Vignette */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent pointer-events-none"></div>

                    {/* Clean Name overlay if admin entered a name */}
                    {member.name && (
                      <div className="absolute bottom-4 left-5 right-5 z-10">
                        <h3 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                          {member.name}
                        </h3>
                        {member.role && (
                          <p className="text-xs font-semibold text-cyan-400 mt-0.5">
                            {member.role}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Simple Clean Bottom CTA */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#142042] via-[#0D152F] to-[#142042] border border-white/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Want to Work With Our Team?
              </h3>
              <p className="text-sm text-gray-300 mt-1 font-light">
                Connect with our strategists and developers for your next growth milestone.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact#form"
                className="btn-glow-pink px-7 py-3.5 text-sm font-bold rounded-full inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer hideCta={true} />
    </main>
  );
}
