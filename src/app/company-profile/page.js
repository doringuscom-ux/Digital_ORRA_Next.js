"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { 
  Download, 
  FileText, 
  Building2, 
  Target, 
  Lightbulb, 
  Users, 
  Layers, 
  Code2, 
  PenTool, 
  Mail, 
  Search, 
  MessageSquare, 
  Tv, 
  Globe, 
  Share2, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Check,
  Eye
} from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Award,
    title: "Branding",
    desc: "From creating your business branding concepts to designing the branding elements, our team creates unique brands that make your business stand out from your competitors.",
    color: "from-pink-500/20 to-purple-500/10",
    border: "hover:border-pink-500/40",
    badge: "Brand Identity"
  },
  {
    icon: Lightbulb,
    title: "Logo Design",
    desc: "From conceptualizing your business branding to designing the branding elements, our team creates unique brands that make your business stand out from your competitors.",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "hover:border-cyan-500/40",
    badge: "Creative"
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Get a professional-looking, mobile responsive, and functional website that is designed to funnel business leads and drive sales for your business around the clock.",
    color: "from-blue-500/20 to-indigo-500/10",
    border: "hover:border-blue-500/40",
    badge: "Engineering"
  },
  {
    icon: PenTool,
    title: "Copy Writing",
    desc: "With our service, the creation of professional content for your business list no longer hassles. We handle newsletters, SEO website content, blog posts, and much more.",
    color: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    badge: "Content"
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Our turnkey email marketing solution gives your company access to all digital assets required to set up, launch, and manage email marketing campaigns.",
    color: "from-pink-500/20 to-rose-500/10",
    border: "hover:border-pink-500/40",
    badge: "Retention"
  },
  {
    icon: Zap,
    title: "Google Ads (PPC)",
    desc: "Our Google Ads service guarantees a steady stream of highly-targeted traffic to your websites, landing pages, and affiliate offers to acquire business leads and drive sales.",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "hover:border-yellow-500/40",
    badge: "Paid Search"
  },
  {
    icon: Search,
    title: "SEO (Search Engine Optimization)",
    desc: "Outrank your competitors in the search engine result pages with our SEO services that cover content creation, on-page optimization, and creation of high-authority backlinks.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-500/40",
    badge: "Organic Growth"
  },
  {
    icon: MessageSquare,
    title: "Bulk SMS Marketing",
    desc: "Our SMS marketing solution presents your business with a user-friendly platform for sending SMS marketing campaigns mobile numbers around the world.",
    color: "from-sky-500/20 to-cyan-500/10",
    border: "hover:border-sky-500/40",
    badge: "Direct Reach"
  },
  {
    icon: TrendingUp,
    title: "Media Planning",
    desc: "Get access to experts that helps your company handle all media-related tasks, from planning to execution. We also monitor results to achieve the best possible ROI.",
    color: "from-indigo-500/20 to-violet-500/10",
    border: "hover:border-indigo-500/40",
    badge: "Strategy"
  },
  {
    icon: Globe,
    title: "Websites & Portals",
    desc: "We offer professional web design services at affordable rates to help your business attract more visitors and keep them on your site.",
    color: "from-cyan-500/20 to-teal-500/10",
    border: "hover:border-cyan-500/40",
    badge: "Architecture"
  },
  {
    icon: Tv,
    title: "Signage & Billboards",
    desc: "We have in-house talents that create stunning digital billboards, banners, animated video, documentaries, and much more.",
    color: "from-pink-500/20 to-purple-500/10",
    border: "hover:border-pink-500/40",
    badge: "Motion & OOH"
  },
  {
    icon: Share2,
    title: "SMM (Social Media Marketing)",
    desc: "We help manage your corporate profile and post engaging content to build followership on social media platforms such as Facebook, Instagram, Snapchat, Twitter, and LinkedIn.",
    color: "from-purple-500/20 to-indigo-500/10",
    border: "hover:border-purple-500/40",
    badge: "Community"
  }
];

export default function CompanyProfilePage() {
  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/company-profile" />
      {/* Global Navigation */}
      <Navbar />

      {/* Ambient Radial Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[8%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[170px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[8%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[170px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[190px]"></div>
      </div>

      {/* Edge-to-Edge Watermark Section */}
      <section className="relative w-full pt-32 pb-4 md:pt-40 md:pb-8 overflow-hidden">
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            COMPANY PROFILE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 md:pt-48">
          
          {/* Ultra-Luxury Executive Hero Section */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0C1530] via-[#091024] to-[#060B18] border border-white/15 p-8 sm:p-12 lg:p-16 mb-20 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] group">
            
            {/* Ambient Lighting & Neon Beams */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none"></div>
            
            {/* Top Accent Neon Line with shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6007A] via-cyan-400 to-transparent opacity-90"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
              
              {/* Left Column: Brand Pedigree & Narrative */}
              <div className="lg:col-span-7 flex flex-col gap-7">
                
                {/* Status & Credential Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,51,153,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                    Verified Agency Dossier
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-medium backdrop-blur-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    ISO & Global Standards
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">
                    Edition 2025-2026
                  </span>
                </div>

                {/* Hero Title */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                    DIGITAL ORRA <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 drop-shadow-[0_0_35px_rgba(255,51,153,0.35)]">
                      Corporate Profile
                    </span>
                  </h1>
                  <p className="text-cyan-300/90 font-mono text-sm tracking-wide">
                    // Strategic Brand Building • Performance Marketing • Global Academy
                  </p>
                </div>

                {/* Narrative description */}
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Digital ORRA</strong> stands at the forefront of digital dominance. We empower fast-growing enterprises, visionary founders, and corporate leaders with end-to-end creative marketing, search dominance, and digital talent development. Our official profile outlines our credentials, capabilities, infrastructure, and portfolio blueprints.
                </p>

                {/* 3 Value Proposition Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {[
                    "Complete Agency & Academy Ecosystem",
                    "500+ Certified Industry Specialists",
                    "Full-Funnel Growth & ROI Frameworks",
                    "Enterprise National & Overseas Delivery"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                      <div className="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0 text-pink-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Download Actions: National & International */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  {/* National Profile (Digital-Orra-Company-Profile.pdf) */}
                  <a
                    href="/Digital-Orra-Company-Profile.pdf"
                    download="Digital-Orra-National-Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow-pink px-7 py-4 rounded-full text-sm font-black flex items-center gap-3 shadow-[0_0_35px_rgba(255,51,153,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
                  >
                    <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform text-white" />
                    <span>National Profile</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-mono tracking-wider">PDF</span>
                  </a>

                  {/* International Profile (Company.pdf) */}
                  <a
                    href="/Company.pdf"
                    download="Digital-Orra-International-Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 rounded-full text-sm font-black flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group/int"
                  >
                    <Globe className="w-4 h-4 text-cyan-200 group-hover/int:rotate-45 transition-transform" />
                    <span>International Profile</span>
                    <span className="px-2 py-0.5 rounded-full bg-black/25 text-[10px] uppercase font-mono tracking-wider">PDF</span>
                  </a>
                </div>

                {/* Mini Stats Bar */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
                    <div className="text-xs text-slate-300 font-medium uppercase font-mono tracking-wide mt-1">Trained Specialists</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-pink-400">12+</div>
                    <div className="text-xs text-slate-300 font-medium uppercase font-mono tracking-wide mt-1">Core Disciplines</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400">100%</div>
                    <div className="text-xs text-slate-300 font-medium uppercase font-mono tracking-wide mt-1">Verified Portfolio</div>
                  </div>
                </div>

              </div>

              {/* Right Column: 3D Visual Dossier Magazine Showcase */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  
                  {/* Outer Glow Halo */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Dossier Mockup Card */}
                  <div className="relative rounded-2xl bg-[#091128]/95 border border-white/20 p-7 sm:p-8 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    
                    {/* Top Bar with Status Tag */}
                    <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        Official Doc
                      </span>
                    </div>

                    {/* PDF Visual Card Cover */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#0E1A3D] via-[#10142A] to-[#1A0A20] border border-white/15 p-6 flex flex-col justify-between shadow-inner group/cover">
                      {/* Ambient Cover Watermark */}
                      <div className="absolute -right-8 -bottom-8 text-white/[0.04] font-black text-8xl select-none pointer-events-none">
                        ORRA
                      </div>

                      {/* Header on Cover */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(255,51,153,0.4)]">
                          DO
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                          Digital ORRA
                        </span>
                      </div>

                      {/* Cover Title */}
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-pink-400 mb-1">
                          Agency Capability Deck
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          Corporate & Academy Profile
                        </h3>
                        <p className="text-[11px] text-gray-300 mt-1 font-light">
                          Full spectrum blueprints & market solutions
                        </p>
                      </div>

                      {/* Cover Footer Line */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-3 border-t border-white/10">
                        <span>Panchkula, India</span>
                        <span className="text-white font-semibold">2025-26 Edition</span>
                      </div>
                    </div>

                    {/* Document Meta Row */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-[10px] font-mono text-gray-400 uppercase">Document Type</div>
                        <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-pink-400" />
                          Corporate PDF
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-[10px] font-mono text-gray-400 uppercase">Access</div>
                        <div className="text-xs font-bold text-cyan-300 mt-0.5 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          Full National Deck
                        </div>
                      </div>
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="flex gap-3">
                      <a
                        href="/Digital-Orra-Company-Profile.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        Open in Browser
                      </a>

                      <a
                        href="/Digital-Orra-Company-Profile.pdf"
                        download="Digital-Orra-Company-Profile.pdf"
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:brightness-110 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,51,153,0.35)]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Now
                      </a>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3 Pillar Strategic Grid: Introduction, Who We Are, What We Believe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
            
            {/* 1. Introduction */}
            <div className="rounded-3xl bg-[#0C142B]/90 border border-white/15 hover:border-cyan-400/40 p-8 flex flex-col transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Introduction</h3>
              <p className="text-slate-200 text-[15px] sm:text-base leading-[1.7] font-normal mb-5">
                As a marketing agency, we utilize our resources of creativity in the specialization of ultimate branding, marketing strategies, planning and implementation, digital marketing and social media as well as designing and events creation and management.
              </p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <span className="text-sm text-slate-300 italic font-normal">
                  “The world today is cluttered with advertising agencies trying to impress you and win you as a client.”
                </span>
              </div>
            </div>

            {/* 2. Who We Are? */}
            <div className="rounded-3xl bg-[#0C142B]/90 border border-white/15 hover:border-pink-500/40 p-8 flex flex-col transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Who we are?</h3>
              <p className="text-slate-200 text-[15px] sm:text-base leading-[1.7] font-normal mb-5">
                <strong className="text-white font-semibold">DIGITAL ORRA</strong> ranks top among the professional Marketing companies in India. We offer a comprehensive suite of services designed to cater the marketing needs of businesses. Our mission is to help companies increase their bottom line by maximizing ROI derivable from their marketing efforts.
              </p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-pink-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Top-Ranked Performance Hub
              </div>
            </div>

            {/* 3. What We Believe? */}
            <div className="rounded-3xl bg-[#0C142B]/90 border border-white/15 hover:border-purple-500/40 p-8 flex flex-col transition-all duration-300 group shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">What We Believe?</h3>
              <p className="text-slate-200 text-[15px] sm:text-base leading-[1.7] font-normal mb-5">
                We believe in the power of ideas to drive innovative brand results. Our ideas are born out of powerful research-driven insight, and deep local understanding, resulting in unparalleled outcomes. Our practice is to develop brand strategies that allow you to capitalize on your unique market presence, while ensuring that your brand promise is increasingly represented.
              </p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-purple-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Lasting Consumer Loyalty
              </div>
            </div>

          </div>

          {/* Section: What We Do */}
          <div className="mb-14">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Full Spectrum Solutions
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">Do & Deliver</span>
              </h2>
              <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed">
                From high-impact branding and web engineering to performance marketing and organic search dominance, we build scalable growth engines for ambitious brands.
              </p>
            </div>

            {/* 12 Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAPABILITIES.map((item, idx) => (
                <div 
                  key={idx}
                  className={`rounded-2xl bg-[#0A1128]/90 border border-white/10 ${item.border} p-6 sm:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm sm:text-[15px] text-slate-200 leading-[1.65] font-normal mb-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner: Direct PDF Download */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500/20 via-[#0C142B] to-cyan-500/20 border border-pink-500/30 p-6 sm:p-8 lg:p-10 mb-6 relative overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-400 mb-1.5 inline-block">
                Take Us With You
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2.5">
                Download Company’s Profile
              </h3>
              <p className="text-[15px] sm:text-base text-slate-200 font-normal leading-relaxed">
                Save our complete agency capability dossier directly to your device for offline review, presentations, or procurement evaluation. Choose between our National or International edition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full md:w-auto">
              {/* National Profile */}
              <a
                href="/Digital-Orra-Company-Profile.pdf"
                download="Digital-Orra-National-Profile.pdf"
                className="btn-glow-pink w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>National Profile (PDF)</span>
              </a>

              {/* International Profile */}
              <a
                href="/Company.pdf"
                download="Digital-Orra-International-Profile.pdf"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                <Globe className="w-4 h-4 text-cyan-200" />
                <span>International Profile (PDF)</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
