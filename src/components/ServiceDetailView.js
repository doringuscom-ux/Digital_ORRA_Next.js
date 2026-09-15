"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import DynamicSeoHead from './DynamicSeoHead';
import { servicesData } from '../data/servicesData';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Share2, 
  TrendingUp, 
  Video, 
  Target, 
  Megaphone, 
  Search, 
  Bot, 
  Zap, 
  Cpu, 
  MousePointer, 
  MessageSquare, 
  Users2, 
  Award, 
  Palette, 
  Database, 
  Smartphone,
  PhoneCall
} from 'lucide-react';

const iconMap = {
  'Share2': Share2,
  'TrendingUp': TrendingUp,
  'Video': Video,
  'Target': Target,
  'Globe': Globe,
  'Megaphone': Megaphone,
  'Search': Search,
  'Bot': Bot,
  'Zap': Zap,
  'Cpu': Cpu,
  'MousePointer': MousePointer,
  'MessageSquare': MessageSquare,
  'Users': Users2,
  'Award': Award,
  'Palette': Palette,
  'Database': Database,
  'Smartphone': Smartphone
};

export default function ServiceDetailView({ initialService, slug }) {
  const [service, setService] = useState(initialService);
  const [openFaq, setOpenFaq] = useState(0);

  React.useEffect(() => {
    async function fetchDetail() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setService(data);
          }
        }
      } catch (err) {
        console.log('Using local fallback for service detail');
      }
    }
    fetchDetail();
  }, [slug]);

  const activeService = service || servicesData.find((s) => s.id === slug) || servicesData[0];
  const IconComponent = iconMap[activeService.iconName] || Globe;
  const otherServices = servicesData.filter((s) => s.id !== activeService.id).slice(0, 3);
  const currentService = activeService;

  return (
    <main className="min-h-screen bg-[#070D1E] text-white selection:bg-pink-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      <DynamicSeoHead path={`/${slug}`} />
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse duration-1000"></div>
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-cyan-300 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white font-semibold truncate">{currentService.title}</span>
          </div>

          {/* Hero Banner Section - Ultra Premium Agency Style */}
          <div className="relative mb-20">
            {/* Ambient Multi-layer Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[350px] bg-gradient-to-r from-cyan-500/15 via-pink-500/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Title, Badges, Lead, Actions */}
              <div className="w-full">
                {/* Category & Tag Pills */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-cyan-300 font-bold backdrop-blur-md">
                    {currentService.category}
                  </span>
                  {currentService.tag && (
                    <span className="text-xs font-mono font-bold text-pink-400 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 backdrop-blur-md">
                      #{currentService.tag}
                    </span>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
                  {currentService.title}
                </h1>

                {/* Lead Description */}
                <p className="text-base sm:text-lg text-gray-200/90 font-light leading-relaxed mb-8">
                  {currentService.fullDesc || currentService.desc}
                </p>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact#form"
                    className="btn-glow-pink px-8 py-3.5 text-sm sm:text-base font-extrabold rounded-full inline-flex items-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-105 transition-all"
                  >
                    <span>Free Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/919990432321?text=Hi%20Digital%20ORRA,%20I%20am%20interested%20in%20your%20${encodeURIComponent(currentService.title)}%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-sm sm:text-base font-semibold transition-all hover:border-cyan-400/40 hover:scale-105 backdrop-blur-md"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Talk on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Showcase Image + Mini Stats directly below image */}
              <div className="w-full max-w-lg lg:max-w-none mx-auto flex flex-col gap-3">
                {currentService.image ? (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#111C3D]/90 to-[#0A122A]/90 p-2 shadow-2xl group">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] max-h-[300px] sm:max-h-[320px] rounded-xl overflow-hidden bg-black/40">
                      <img
                        src={currentService.image}
                        alt={currentService.imageAlt || currentService.title || "Digital ORRA Service Showcase"}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A122A]/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                ) : null}

                {/* Mini Benchmark Stats directly below image */}
                {currentService.stats && currentService.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {currentService.stats.map((st, sidx) => (
                      <div
                        key={sidx}
                        className="p-2 sm:p-2.5 rounded-xl bg-[#080E21]/90 border border-white/10 hover:border-cyan-400/40 transition-all text-center flex flex-col justify-center items-center shadow-lg"
                      >
                        <div className="text-base sm:text-xl font-black text-white font-mono tracking-tight leading-tight">
                          {st.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-gray-300/90 font-medium leading-tight mt-0.5 line-clamp-2">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Key Capabilities / Bullet Features */}
          {currentService.features && currentService.features.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-6 w-1 rounded-full bg-cyan-400"></div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Core Focus & Scope
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentService.features.map((feature, fIdx) => (
                  <div 
                    key={fIdx}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#101A38] to-[#091126] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex items-start gap-3.5 shadow-md group hover:-translate-y-1"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[15px] text-gray-100 font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Deliverables */}
          {currentService.deliverables && currentService.deliverables.length > 0 && (
            <div className="mb-20">
              <div className="mb-10 pb-6 border-b border-white/10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                  What We <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Deliver</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-300/80 w-full leading-relaxed font-normal">
                  Everything we produce is engineered for high conversion, authoritative branding, and long-term business scale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentService.deliverables.map((del, dIdx) => (
                  <div 
                    key={dIdx} 
                    className="relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111C3D] via-[#0A132C] to-[#070D1E] border border-white/15 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 font-mono font-bold text-sm flex items-center justify-center shadow-md">
                        {String(dIdx + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {del.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-gray-300 leading-relaxed pl-14 font-light">
                      {del.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Spotlight / Deep-Dive Framework Section */}
          {currentService.spotlightContent && (
            <div className="mb-20">
              <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101A3A]/90 via-[#0A122A]/95 to-[#060B1C] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col ${currentService.spotlightImagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-14 overflow-hidden relative group`}>
                {/* Ambient Glow behind box */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />

                {/* Content Side */}
                <div className="flex-1 space-y-4 relative z-10 w-full">
                  {currentService.spotlightBadge && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
                      {currentService.spotlightBadge}
                    </div>
                  )}

                  {currentService.spotlightTitle && (
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
                      {currentService.spotlightTitle}
                    </h2>
                  )}

                  <div 
                    className="service-spotlight-content text-gray-300 leading-relaxed text-[15px] sm:text-base space-y-4 font-normal"
                    dangerouslySetInnerHTML={{ __html: currentService.spotlightContent }}
                  />
                </div>

                {/* Image Side */}
                {currentService.spotlightImage && (
                  <div className="w-full lg:w-[46%] flex-shrink-0 relative z-10">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#080E24] shadow-2xl group/img p-2">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                        <img 
                          src={currentService.spotlightImage} 
                          alt={currentService.spotlightImageAlt || currentService.spotlightTitle || "Service Spotlight"} 
                          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060B1C]/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Strategic Process Roadmap */}
          {currentService.process && currentService.process.length > 0 && (
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Proven Playbook</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-1.5 tracking-tight">Our 4-Step Strategic Engine</h2>
                <p className="text-sm text-gray-300/80 mt-2">How we execute and optimize this capability to deliver maximum return on investment.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentService.process.map((step, pIdx) => (
                  <div 
                    key={pIdx}
                    className="relative p-7 rounded-3xl bg-gradient-to-b from-[#0F1836] to-[#080E22] border border-white/15 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
                  >
                    <div>
                      <div className="text-4xl font-black text-cyan-400/40 font-mono mb-4 group-hover:text-cyan-400 transition-colors">
                        {step.step || String(pIdx + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2.5">{step.title}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {currentService.faqs && currentService.faqs.length > 0 && (
            <div className="mb-20 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {currentService.faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div 
                      key={fIdx}
                      className="rounded-2xl bg-[#0D1630] border border-white/15 overflow-hidden transition-all shadow-md"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : fIdx)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-lg hover:text-cyan-300 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-0 text-[15px] sm:text-[15.5px] text-gray-200 leading-relaxed border-t border-white/10 font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Services - Links directly to /:slug */}
          {otherServices.length > 0 && (
            <div className="mb-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Recommended Synergy</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">Explore Related Capabilities</h2>
                </div>
                <Link 
                  href="/services" 
                  className="text-xs font-mono text-cyan-300 hover:text-white px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 inline-flex items-center gap-2 transition-all self-start sm:self-auto"
                >
                  <span>Browse Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((other, oIdx) => {
                  const OtherIcon = iconMap[other.iconName] || Globe;
                  return (
                    <Link
                      key={oIdx}
                      href={`/${other.id}`}
                      className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#111A38]/95 via-[#0A1128]/95 to-[#060B1A] border border-white/15 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(6,182,212,0.15)] cursor-pointer"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-[var(--color-primary-pink)] transition-all duration-500"></div>

                      <div>
                        {/* Header: Icon + Category Badge */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:text-white transition-all duration-300 shadow-md flex-shrink-0">
                            <OtherIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-mono font-semibold tracking-wide px-3 py-1 rounded-full bg-white/10 border border-white/15 text-gray-200">
                            {other.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5 leading-snug">
                          {other.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[14px] text-gray-200/90 leading-relaxed font-light mb-6">
                          {other.shortDesc}
                        </p>
                      </div>

                      {/* Footer Action */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[13px] font-bold text-cyan-300 group-hover:text-pink-400 transition-colors">
                        <span>View Deliverables & Process</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Call to Action Bar */}
          <div className="rounded-3xl bg-gradient-to-r from-[#142042] via-[#0D152F] to-[#142042] border border-white/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Ready to Scale?</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Accelerate Your Growth with {currentService.title}</h3>
              <p className="text-sm text-gray-300 mt-1">Talk with our senior strategists and get a custom execution roadmap.</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact#form"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:opacity-90 shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-105"
              >
                Schedule Strategy Call
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
