"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import About from '../../components/About';
import Footer from '../../components/Footer';
import Certified from '../../components/Certified';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import {
  ArrowRight,
  Megaphone,
  Code2,
  Video,
  Users2,
  Layers,
  Cpu,
  Target,
  TrendingUp,
  Eye,
  ShieldCheck,
  Sparkles,
  Rocket,
  HeartHandshake,
  MessageCircle,
  Search
} from 'lucide-react';

const SERVICES = [
  {
    number: "01",
    icon: Megaphone,
    title: "Google & Meta Ads",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788850117/Meta.gif",
    desc: "Targeted paid advertising engineered for maximum ROAS, hyper-precise audience retargeting, and scalable client acquisition.",
    tags: ["High ROAS", "Omnichannel Ads"],
    color: "from-pink-500/20 to-purple-500/10",
    borderGlow: "group-hover:border-pink-500/40",
    iconColor: "text-pink-400",
    badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20"
  },
  {
    number: "02",
    icon: Code2,
    title: "Web & App Development",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788851637/Web_App_Development.gif",
    desc: "Lightning-fast custom websites, native mobile applications, and enterprise CRM & ERP solutions built with modern technology.",
    tags: ["Next.js & React", "Custom ERP/CRM"],
    color: "from-cyan-500/20 to-blue-500/10",
    borderGlow: "group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
  },
  {
    number: "03",
    icon: Video,
    title: "Corporate Video Shoots",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788854712/Corporate_Video_Shoots.gif",
    desc: "Professional on-site video shoots, 4K brand commercials, and high-impact corporate editing designed to command market authority.",
    tags: ["Cinema 4K", "Post-Production"],
    color: "from-purple-500/20 to-pink-500/10",
    borderGlow: "group-hover:border-purple-500/40",
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20"
  },
  {
    number: "04",
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1789025357/search-engine-optimization.gif",
    desc: "Dominate search engine rankings, drive targeted organic traffic, and secure top positions on Google with cutting-edge SEO strategies.",
    tags: ["Top Google Rank", "Organic Traffic"],
    color: "from-pink-500/20 to-cyan-500/10",
    borderGlow: "group-hover:border-pink-500/40",
    iconColor: "text-pink-400",
    badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20"
  },
  {
    number: "05",
    icon: Layers,
    title: "Graphic Design & Branding",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788850574/Graphic_Design_Branding.gif",
    desc: "Distinctive brand identities, social media creatives, visual style guides, and high-converting UI/UX user experiences.",
    tags: ["Brand Identity", "Conversion UI/UX"],
    color: "from-cyan-500/20 to-indigo-500/10",
    borderGlow: "group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
  },
  {
    number: "06",
    icon: Cpu,
    title: "End-to-End Digital Solutions",
    gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788851715/End-to-End_Digital_Solutions.gif",
    desc: "Full-funnel digital transformation combining advanced marketing automation, conversion optimization, and strategic scaling.",
    tags: ["Full Funnel", "Automation"],
    color: "from-emerald-500/20 to-cyan-500/10",
    borderGlow: "group-hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
  }
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#0A1128] text-white flex flex-col relative selection:bg-[#FF3399]/40 selection:text-white">
      <DynamicSeoHead path="/about-us" />
      {/* Global Navigation */}
      <Navbar />

      {/* Main Hero: Exact Aesthetic About Section with Watermark, Image Frame & Typing Effect */}
      <About
        asH1={true}
        ptClass="pt-28 sm:pt-36 pb-10 md:pt-52 md:pb-16"
        watermarkTop="top-20 sm:top-24 md:top-24"
        id="about-us-hero"
      />

      {/* Global Certifications Marquee */}
      <div className="relative z-10 w-full overflow-hidden">
        <Certified ptClass="pt-4 pb-2" />
      </div>

      {/* Section: Our Core Expertise with Full-Width Watermark like About Section */}
      <section className="relative w-full pt-28 pb-4 md:pt-40 md:pb-8 overflow-hidden">
        {/* Giant Edge-to-Edge Background Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-4 sm:top-5 md:top-5 lg:top-6 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            OUR CORE EXPERTISE
          </span>
        </div>

        {/* Ambient Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--color-primary-pink)]/5 blur-[140px] pointer-events-none z-0"></div>

        {/* Content Container with max-w-7xl matching About Section */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 sm:pt-20 md:pt-28">
          <h2 className="sr-only">Our Core Expertise &amp; Digital Solutions</h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {SERVICES.map((serv, idx) => {
              const Icon = serv.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-3xl border border-white/10 ${serv.borderGlow} hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0D1530]/90 via-[#091024]/90 to-[#060B1A]/95 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(255,51,153,0.18)] p-6 sm:p-7`}
                >
                  {/* Top Edge Gradient Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[var(--color-primary-pink)] transition-all duration-700"></div>

                  {/* Ambient Hover Spotlight Glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${serv.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  <div>
                    {/* Card Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/25 transition-all duration-300 shadow-md">
                        <Icon className={`w-6 h-6 ${serv.iconColor}`} />
                      </div>
                      <span className="text-xs font-mono font-bold text-white/30 group-hover:text-white/70 transition-colors">
                        {serv.number}
                      </span>
                    </div>

                    {/* Service Title */}
                    <div className="flex items-center gap-3 mb-2.5">
                      {serv.gif && (
                        <img 
                          src={serv.gif} 
                          alt={serv.title} 
                          className="w-9 h-9 object-contain flex-shrink-0"
                        />
                      )}
                      <h3 className="text-xl font-black text-white group-hover:text-[var(--color-primary-pink)] transition-colors duration-300 leading-snug">
                        {serv.title}
                      </h3>
                    </div>

                    {/* Service Description */}
                    <p className="text-[13.5px] sm:text-sm text-gray-300/90 leading-relaxed font-light mb-6">
                      {serv.desc}
                    </p>
                  </div>

                  {/* Bottom Tags Strip */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                    {serv.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full border ${serv.badgeColor} backdrop-blur-md shadow-sm group-hover:scale-105 transition-transform duration-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Strategic Mission, Vision & Values with Giant Watermark Header */}
      <section className="relative w-full pt-28 pb-14 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Background Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-4 sm:top-5 md:top-5 lg:top-6 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[6.5vw] md:text-[7vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            OUR CORE VALUES
          </span>
        </div>

        {/* Ambient Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-primary-cyan)]/5 blur-[140px] pointer-events-none z-0"></div>

        {/* Content Container: Pill List on Left + Glowing Venn Diagram on Right */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 sm:pt-20 md:pt-28">
          <h2 className="sr-only">Our Strategic Mission, Vision &amp; Core Values</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: 3 Sleek Pill Strips (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5">

              {/* Pill 1: Our Mission */}
              <div className="group relative rounded-2xl bg-gradient-to-r from-[#140C22]/90 via-[#0A1128]/95 to-[#080E20]/90 border border-white/10 hover:border-pink-500/50 p-5 sm:p-6 transition-all duration-300 hover:translate-x-2 shadow-lg flex items-start gap-4 sm:gap-5 backdrop-blur-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(255,51,153,0.15)]">
                {/* Left Edge Laser Glow */}
                <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-pink-400 to-pink-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                {/* Subtle Hover Spotlight */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>

                <div className="w-13 h-13 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_25px_rgba(255,51,153,0.4)] transition-all duration-300">
                  <Rocket className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-pink-300 transition-all">
                      Our Mission
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 font-bold">
                      01 • PURPOSE
                    </span>
                  </div>
                  <p className="text-[13.5px] sm:text-sm text-gray-300/90 leading-relaxed font-light">
                    To deliver <span className="text-white font-medium">creative, customized</span>, and effective digital strategies that help brands <span className="text-pink-300 font-semibold underline decoration-pink-500/40 decoration-1 underline-offset-4">grow online</span>.
                  </p>
                </div>
              </div>

              {/* Pill 2: Our Vision */}
              <div className="group relative rounded-2xl bg-gradient-to-r from-[#08182B]/90 via-[#0A1128]/95 to-[#080E20]/90 border border-white/10 hover:border-cyan-500/50 p-5 sm:p-6 transition-all duration-300 hover:translate-x-2 shadow-lg flex items-start gap-4 sm:gap-5 backdrop-blur-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]">
                {/* Left Edge Laser Glow */}
                <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-cyan-400 to-blue-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                {/* Subtle Hover Spotlight */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>

                <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <Eye className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
                      Our Vision
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold">
                      02 • DIRECTION
                    </span>
                  </div>
                  <p className="text-[13.5px] sm:text-sm text-gray-300/90 leading-relaxed font-light">
                    To empower businesses with <span className="text-white font-medium">innovative</span> and <span className="text-cyan-300 font-semibold underline decoration-cyan-500/40 decoration-1 underline-offset-4">result-driven</span> digital marketing solutions.
                  </p>
                </div>
              </div>

              {/* Pill 3: Our Values */}
              <div className="group relative rounded-2xl bg-gradient-to-r from-[#061D1A]/90 via-[#0A1128]/95 to-[#080E20]/90 border border-white/10 hover:border-emerald-500/50 p-5 sm:p-6 transition-all duration-300 hover:translate-x-2 shadow-lg flex items-start gap-4 sm:gap-5 backdrop-blur-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]">
                {/* Left Edge Laser Glow */}
                <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-emerald-400 to-teal-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                {/* Subtle Hover Spotlight */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>

                <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300">
                  <HeartHandshake className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-emerald-300 transition-all">
                      Our Values
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">
                      03 • INTEGRITY
                    </span>
                  </div>
                  <p className="text-[13.5px] sm:text-sm text-gray-300/90 leading-relaxed font-light">
                    To deliver excellence with <span className="text-emerald-300 font-semibold underline decoration-emerald-500/40 decoration-1 underline-offset-4">integrity, innovation</span>, and a commitment to customer success.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interlocking Triple Venn Diagram (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0">
              <div className="relative w-[320px] h-[310px] sm:w-[350px] sm:h-[340px]">

                {/* Circle 1: MISSION (Top-Left - Cyan/Navy) */}
                <div className="absolute top-0 left-2 sm:left-4 w-44 h-44 sm:w-48 sm:h-48 rounded-full border-[7px] border-cyan-500 bg-[#07192D]/70 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(6,182,212,0.25)] group hover:scale-105 transition-transform duration-300 z-10">
                  <Rocket className="w-7 h-7 text-cyan-400 mb-1" />
                  <span className="text-[12px] sm:text-[13px] font-black tracking-widest text-cyan-300 uppercase font-mono">
                    MISSION
                  </span>
                </div>

                {/* Circle 2: VISION (Top-Right - Orange/Pink Glow) */}
                <div className="absolute top-0 right-2 sm:right-4 w-44 h-44 sm:w-48 sm:h-48 rounded-full border-[7px] border-[var(--color-primary-pink)] bg-[#1A0A24]/70 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(255,51,153,0.25)] group hover:scale-105 transition-transform duration-300 z-10">
                  <Eye className="w-7 h-7 text-[var(--color-primary-pink)] mb-1" />
                  <span className="text-[12px] sm:text-[13px] font-black tracking-widest text-pink-300 uppercase font-mono">
                    VISION
                  </span>
                </div>

                {/* Circle 3: VALUES (Bottom-Center - Lime/Emerald) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-48 sm:h-48 rounded-full border-[7px] border-emerald-400 bg-[#051C1A]/70 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(52,211,153,0.25)] group hover:scale-105 transition-transform duration-300 z-20">
                  <HeartHandshake className="w-7 h-7 text-emerald-400 mb-1" />
                  <span className="text-[12px] sm:text-[13px] font-black tracking-widest text-emerald-300 uppercase font-mono">
                    VALUES
                  </span>
                </div>

                {/* Center Core Glow where all 3 intersect */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 blur-md pointer-events-none z-30"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Action CTA: Compact Sleek Glass Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-r from-[#120B24]/90 via-[#0A1128]/95 to-[#06182B]/90 backdrop-blur-xl px-6 py-6 sm:px-8 sm:py-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group hover:border-white/20 transition-all duration-500">
          
          {/* Top Laser Accent */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-primary-pink)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Left Text Block */}
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-1">
              Ready to Build With <span className="text-gradient">Digital ORRA?</span>
            </h3>
            <p className="text-gray-300/85 text-xs sm:text-[13.5px] font-light">
              Connect with our core team in Panchkula & Chandigarh to discuss your project.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <Link
              href="/contact#form"
              className="btn-glow-pink px-5 py-2.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
            >
              <span>Get Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            
            <a
              href="https://wa.me/919896384224"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-bold hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* Global Footer (CTA hidden since page has its own) */}
      <Footer hideCta={true} />
    </main>
  );
}
