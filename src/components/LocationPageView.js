"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DynamicSeoHead from "./DynamicSeoHead";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Star,
  Zap,
  Globe,
  Smartphone,
  Search,
  Code,
  Layers,
  Palette,
  Clock,
  Compass,
  Layout,
  CheckCircle,
  PhoneCall,
  Mail,
  Send,
  Building2,
  Users,
  Award,
  TrendingUp,
  Cpu,
  MonitorCheck,
  Check,
  Megaphone,
  Code2,
  Video,
  Users2
} from "lucide-react";

export default function LocationPageView({ page, slug }) {
  if (!page) return null;

  const city = page.city || "Panchkula";

  // Visual Fallback Images for high aesthetic presentation
  const defaultHeroImg = page.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
  const defaultMarketImg = page.whyLocalImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80";
  const defaultAdvantageImg = page.localAdvantageImage || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80";

  // Service images map
  const serviceImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", // Corporate
    "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80", // Ecommerce
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", // Custom apps
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80", // WordPress
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80", // Landing Page
    "https://images.unsplash.com/photo-1581291518655-9523b932edcf?auto=format&fit=crop&w=600&q=80", // Redesign
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", // Support
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80", // SEO
  ];

  return (
    <div className="min-h-screen bg-[#050914] text-white selection:bg-[#FF3399] selection:text-white font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Custom Dynamic SEO */}
      <DynamicSeoHead 
        path={`/${slug}`} 
        customTitle={page.metaTitle || page.title}
        customDesc={page.metaDescription}
      />
      
      <Navbar />

      {/* Cyberpunk & Neon Background Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[5%] w-[650px] h-[650px] bg-[#FF3399]/15 rounded-full blur-[170px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <main className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. HERO SECTION (2-Column Grid with Real Visual Mockup) */}
          <section className="relative pb-10 sm:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 text-left space-y-6">
                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-[0_0_25px_rgba(255,51,153,0.2)]">
                  <span className="flex h-2 w-2 rounded-full bg-[#FF3399] animate-ping" />
                  <MapPin className="w-4 h-4 text-[#FF3399]" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide text-white">
                    {page.heroBadge || `Premier Digital Solutions in ${city}`}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                  {page.heroHeadline || page.title}
                </h1>

                {/* Subheadline / Intro */}
                {page.heroSubheadline && (
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal max-w-2xl">
                    {page.heroSubheadline}
                  </p>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white font-bold text-base shadow-[0_0_30px_rgba(255,0,122,0.4)] hover:shadow-[0_0_45px_rgba(255,0,122,0.65)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Get Started Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+916280458005"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold text-base hover:bg-white/[0.15] hover:border-white/40 backdrop-blur-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                    <span>Talk to Consultant</span>
                  </a>
                </div>
              </div>

              {/* Right Visual Glass Showcase & Metrics Below It */}
              <div className="lg:col-span-5 relative space-y-4">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative Glowing Backdrop */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#FF3399] to-cyan-400 opacity-30 blur-2xl group-hover:opacity-60 transition duration-1000 animate-tilt"></div>
                  
                  {/* Glass Frame */}
                  <div className="relative rounded-3xl bg-[#091122] border border-white/20 p-4 shadow-2xl backdrop-blur-xl overflow-hidden">
                    {/* Top Browser Bar */}
                    <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-gray-300 font-mono truncate max-w-[180px]">
                        digitalorra.com/{city.toLowerCase()}
                      </div>
                    </div>

                    {/* Featured Visual Image */}
                    <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden group">
                      <img 
                        src={defaultHeroImg} 
                        alt={page.heroHeadline || page.title || `Web Solutions & Digital Growth in ${city}`}
                        title={page.heroSubheadline ? `${page.heroHeadline || page.title} - ${page.heroSubheadline.slice(0, 100)}` : (page.heroHeadline || page.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091122]/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Metrics Placed Cleanly Underneath the Image */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#091122] border border-white/15 backdrop-blur-md shadow-lg">
                  <div className="text-center sm:text-left p-1">
                    <div className="text-xl sm:text-2xl font-black text-cyan-400">500+</div>
                    <div className="text-[11px] sm:text-xs text-gray-300 font-medium">Websites Delivered</div>
                  </div>
                  <div className="text-center sm:text-left p-1 border-x border-white/15">
                    <div className="text-xl sm:text-2xl font-black text-[#FF3399]">99.8%</div>
                    <div className="text-[11px] sm:text-xs text-gray-300 font-medium">Uptime & Speed SLA</div>
                  </div>
                  <div className="text-center sm:text-left p-1">
                    <div className="text-xl sm:text-2xl font-black text-amber-400">Tricity</div>
                    <div className="text-[11px] sm:text-xs text-gray-300 font-medium">SCO 19, Sec 11</div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 2. SECTION: WHY EVERY LOCAL BUSINESS NEEDS DIGITAL IDENTITY */}
          {page.whyLocalContent && (
            <section className="mb-12 sm:mb-16 relative">
              {/* Top Section Heading (Outside the box) - only render if heading is provided */}
              {page.whyLocalSuperTitle && page.whyLocalSuperTitle.trim() !== "" && (
                <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 relative z-10">
                  {/* Ambient glow behind heading */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

                  {/* Grand Section Title */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6">
                    <div className="hidden sm:block h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-cyan-400/60" />
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white text-center">
                      {page.whyLocalSuperTitle}
                    </h3>
                    <div className="hidden sm:block h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-cyan-400/60" />
                  </div>
                </div>
              )}

              {/* Outer ambient aura */}
              <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-cyan-500/20 via-pink-500/10 to-indigo-500/20 blur-2xl opacity-50 pointer-events-none" />
              
              <div className="relative rounded-[32px] p-7 sm:p-9 md:p-11 bg-[#0b1329] border border-cyan-500/30 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                {/* Internal accent glow circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FF3399]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                  
                  {/* Left Content inside the card */}
                  <div className={`lg:col-span-7 space-y-4 ${page.whyLocalImagePosition === "left" ? "lg:order-2" : ""}`}>
                    {page.whyLocalTitle && (
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.25]">
                        {page.whyLocalTitle}
                      </h2>
                    )}

                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal whitespace-pre-line">
                      {page.whyLocalContent}
                    </p>
                  </div>

                  {/* Right/Left Image Showcase */}
                  <div className={`lg:col-span-5 relative ${page.whyLocalImagePosition === "left" ? "lg:order-1" : ""}`}>
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-[#FF3399] opacity-30 blur-xl group-hover:opacity-50 transition duration-700" />
                      
                      <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#070e1f]">
                        <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                          <img 
                            src={defaultMarketImg} 
                            alt={page.whyLocalTitle || page.whyLocalSuperTitle || `Business Growth in ${city}`} 
                            title={page.whyLocalSuperTitle ? `${page.whyLocalSuperTitle} - ${page.whyLocalTitle || page.whyLocalContent?.slice(0, 100) || city}` : (page.whyLocalTitle || `Digital Growth in ${city}`)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f]/40 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* DYNAMIC ADDITIONAL CARD SECTIONS (Rendered if user added extra sections in admin) */}
          {Array.isArray(page.customSections) && page.customSections.map((sec, idx) => {
            if (!sec.title && !sec.content) return null;
            const isLeftImage = sec.imagePosition === "left";
            return (
              <section key={idx} className="mb-12 sm:mb-16 relative">
                {/* Optional Super Title (Outside Box) - Only if text provided, 0 space if empty */}
                {sec.superTitle && sec.superTitle.trim() !== "" && (
                  <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 relative z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                      <div className="hidden sm:block h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-cyan-400/60" />
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white text-center">
                        {sec.superTitle}
                      </h3>
                      <div className="hidden sm:block h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-cyan-400/60" />
                    </div>
                  </div>
                )}

                {/* Ambient glow wrapper */}
                <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-indigo-500/20 blur-2xl opacity-50 pointer-events-none" />

                <div className="relative rounded-[32px] p-7 sm:p-9 md:p-11 bg-[#0b1329] border border-cyan-500/30 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  {/* Internal ambient glow */}
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FF3399]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                    {/* Content Column */}
                    <div className={`lg:col-span-7 space-y-4 ${isLeftImage ? "lg:order-2" : ""}`}>
                      {sec.title && (
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.25]">
                          {sec.title}
                        </h2>
                      )}
                      {sec.content && (
                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal whitespace-pre-line">
                          {sec.content}
                        </p>
                      )}
                    </div>

                    {/* Image Column */}
                    {sec.image && (
                      <div className={`lg:col-span-5 relative ${isLeftImage ? "lg:order-1" : ""}`}>
                        <div className="relative group">
                          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-400 opacity-30 blur-xl group-hover:opacity-50 transition duration-700" />
                          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#070e1f]">
                            <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                              <img 
                                src={sec.image} 
                                alt={sec.title || sec.superTitle || `Showcase in ${city}`} 
                                title={sec.superTitle ? `${sec.superTitle} - ${sec.title || sec.content?.slice(0, 100) || ''}` : (sec.title || sec.content?.slice(0, 100) || `Services in ${city}`)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f]/40 via-transparent to-transparent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}

          {/* 3. SECTION: WHY CHOOSE DIGITAL ORRA */}
          {page.whyChooseReasons && page.whyChooseReasons.length > 0 && (
            <section className="mb-12 sm:mb-16">
              <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-10 px-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2.5">
                  {page.whyChooseTitle || `Why Choose Digital ORRA as Your Partner in ${city}?`}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
                  We bridge the gap between creative visual elegance and high-speed web infrastructure for businesses across {city}.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
                {page.whyChooseReasons.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative rounded-2xl p-6 sm:p-7 bg-[#0b1329] border border-white/20 hover:border-[#FF3399]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(255,51,153,0.2)] flex flex-col justify-between overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/15 to-transparent pointer-events-none" />
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center mb-4 group-hover:border-[#FF3399]/60 group-hover:scale-110 transition-all">
                        <CheckCircle2 className="w-5 h-5 text-[#FF3399]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-[15px] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. SECTION: OUR CORE SERVICES & CAPABILITIES (GIF Bento Showcase - No Watermark) */}
          <section className="mb-12 sm:mb-16 relative">
            {/* Section Header */}
            <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12 px-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[#FF3399] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Comprehensive Capabilities
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2.5">
                Our Core Services in {city}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
                End-to-end digital excellence engineered to scale your brand across {city} and beyond.
              </p>
            </div>

            {/* 6 Services Cards Grid with Live Animated GIFs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {[
                {
                  number: "01",
                  icon: Megaphone,
                  title: "Google & Meta Ads",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788850117/Meta.gif",
                  desc: "Targeted paid advertising engineered for maximum ROAS, hyper-precise audience retargeting, and scalable client acquisition.",
                  tags: ["High ROAS", "Omnichannel Ads"],
                  badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20",
                  iconColor: "text-pink-400"
                },
                {
                  number: "02",
                  icon: Code2,
                  title: "Web & App Development",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788851637/Web_App_Development.gif",
                  desc: "Lightning-fast custom websites, native mobile applications, and enterprise CRM & ERP solutions built with modern technology.",
                  tags: ["Next.js & React", "Custom ERP/CRM"],
                  badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                  iconColor: "text-cyan-400"
                },
                {
                  number: "03",
                  icon: Video,
                  title: "Corporate Video Shoots",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788854712/Corporate_Video_Shoots.gif",
                  desc: "Professional on-site video shoots, 4K brand commercials, and high-impact corporate editing designed to command market authority.",
                  tags: ["Cinema 4K", "Post-Production"],
                  badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
                  iconColor: "text-purple-400"
                },
                {
                  number: "04",
                  icon: Search,
                  title: "Search Engine Optimization (SEO)",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1789025357/search-engine-optimization.gif",
                  desc: "Dominate search engine rankings, drive targeted organic traffic, and secure top positions on Google with cutting-edge SEO strategies.",
                  tags: ["Top Google Rank", "Organic Traffic"],
                  badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20",
                  iconColor: "text-pink-400"
                },
                {
                  number: "05",
                  icon: Layers,
                  title: "Graphic Design & Branding",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788850574/Graphic_Design_Branding.gif",
                  desc: "Distinctive brand identities, social media creatives, visual style guides, and high-converting UI/UX user experiences.",
                  tags: ["Brand Identity", "Conversion UI/UX"],
                  badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                  iconColor: "text-cyan-400"
                },
                {
                  number: "06",
                  icon: Cpu,
                  title: "End-to-End Digital Solutions",
                  gif: "https://res.cloudinary.com/fykd8cyh/image/upload/v1788851715/End-to-End_Digital_Solutions.gif",
                  desc: "Full-funnel digital transformation combining advanced marketing automation, conversion optimization, and strategic scaling.",
                  tags: ["Full Funnel", "Automation"],
                  badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
                  iconColor: "text-emerald-400"
                }
              ].map((serv, idx) => {
                const Icon = serv.icon;
                return (
                  <div
                    key={idx}
                    className="group relative rounded-3xl border border-white/15 hover:border-pink-500/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden bg-[#0b1329] shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(255,51,153,0.18)] p-6 sm:p-7"
                  >
                    {/* Top Edge Accent Line */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#FF3399] transition-all duration-700"></div>

                    <div>
                      {/* Media Showcase with Number Badge */}
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#040814] shadow-inner group-hover:border-white/25 transition-all">
                        <img
                          src={serv.gif}
                          alt={serv.title}
                          title={`${serv.title} - ${serv.desc ? serv.desc.slice(0, 100) : 'Digital ORRA'}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Number Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1128]/90 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                          <span className="text-[11px] font-black tracking-wider text-cyan-300 font-mono">
                            {serv.number}
                          </span>
                        </div>

                        {/* Top Right Action Arrow */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#FF3399] group-hover:border-[#FF3399] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-lg">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center ${serv.iconColor} group-hover:scale-110 transition-all flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                          {serv.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-200 leading-relaxed font-normal mb-5">
                        {serv.desc}
                      </p>
                    </div>

                    {/* Bottom Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {serv.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full border ${serv.badgeColor} backdrop-blur-md`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. SECTION: DEVELOPMENT PROCESS (Interactive Connected Roadmap Flow) */}
          {page.processSteps && page.processSteps.length > 0 && (
            <section className="mb-12 sm:mb-16 relative">
              <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12 px-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2.5">
                  {page.processTitle || "The Digital ORRA Development Process"}
                </h2>
                {(page.processSubtitle !== undefined ? page.processSubtitle : "Transparent milestones, real-time staging previews, and zero guesswork from discovery to deployment.") && (
                  <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
                    {page.processSubtitle !== undefined ? page.processSubtitle : "Transparent milestones, real-time staging previews, and zero guesswork from discovery to deployment."}
                  </p>
                )}
              </div>

              {/* Connected Roadmap Timeline Layout */}
              <div className="relative">
                {/* Horizontal glowing connector line across top on lg screens */}
                <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-gradient-to-r from-cyan-500/30 via-purple-500/50 to-[#FF3399]/40 pointer-events-none z-0" />

                <div className="flex flex-wrap justify-center gap-6 relative z-10">
                  {page.processSteps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const totalSteps = page.processSteps.length;
                    // Smart balanced grid width:
                    // If total is 2 or 4 cards -> exactly 2 per row (2x2)
                    // If total is 3, 5, or 6 -> 3 per row (3 on top, remaining centered)
                    const widthClass = (totalSteps === 4 || totalSteps === 2)
                      ? "w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-16px)] max-w-lg"
                      : "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";

                    return (
                      <div
                        key={idx}
                        className={`${widthClass} relative rounded-2xl p-6 bg-[#0b1329] border border-purple-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group overflow-hidden flex flex-col justify-between`}
                      >
                        {/* Ambient corner glow */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/15 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-colors" />

                        <div>
                          {/* Top Milestone Header with Step Circle */}
                          <div className="flex items-center gap-3.5 mb-5">
                            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] group-hover:from-cyan-400 group-hover:to-blue-600 transition-all">
                              <div className="w-full h-full rounded-full bg-[#080d1e] flex items-center justify-center">
                                <span className="text-sm font-black text-white font-mono">
                                  0{stepNum}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <span className="text-[11px] font-mono tracking-widest text-[#FF3399] uppercase font-bold block">
                                {step.step || `Milestone 0${stepNum}`}
                              </span>
                              <span className="text-xs text-gray-300 font-medium">Sprint Stage</span>
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="text-lg font-extrabold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-[15px] text-gray-200 leading-relaxed font-normal">
                            {step.desc}
                          </p>
                        </div>

                        {/* Bottom progression bar */}
                        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
                          <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            Verified Output
                          </span>
                          <span className="text-gray-300 font-bold group-hover:text-white">
                            Phase {stepNum} of {totalSteps}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* 7. SECTION: LOCAL PRESENCE & GLOBAL STANDARDS (2-Column Banner) */}
          {page.localAdvantageContent && (
            <section className="mb-0">
              <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0b1329] border border-white/20 overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      Regional Authority
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2.5">
                      {page.localAdvantageTitle || "Local Presence, Global Standards"}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal mb-4">
                      {page.localAdvantageContent}
                    </p>
                    <div className="flex flex-col gap-1 text-xs font-mono text-cyan-300 font-semibold">
                      <span>📍 Office: SCO 19, Sector 11, Panchkula, Haryana 134109</span>
                      <span className="text-gray-400 font-normal">Offices: Panchkula | Chandigarh | Mohali | Solan | Zirakpur | Delhi | Canada | USA</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="rounded-2xl overflow-hidden border border-white/15 shadow-xl h-52 sm:h-60">
                      <img 
                        src={defaultAdvantageImg} 
                        alt={page.localAdvantageTitle || `Digital ORRA Regional Office in ${city}`} 
                        title={page.localAdvantageContent ? `${page.localAdvantageTitle || 'Digital ORRA'} - ${page.localAdvantageContent.slice(0, 100)}` : (page.localAdvantageTitle || `Offices in ${city}`)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
