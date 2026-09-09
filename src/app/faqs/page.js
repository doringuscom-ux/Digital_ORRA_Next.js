"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Zap,
  TrendingUp,
  Target,
  Layers,
  PhoneCall
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Digital Marketing",
    items: [
      {
        question: "How can you categorize Digital marketing?",
        answer: "We can categorize digital marketing such as search Engine Optimization, Pay-per-Click, Social Media Marketing, Content Marketing,Email Marketing, Mobile Marketing, Marketing Analytics and Affiliate Marketing ."
      },
      {
        question: "Explain Digital marketing?",
        answer: "Digital marketing is the component of marketing that uses the Internet and online based digital technologies such as desktop computers, mobile phones and other digital media and platforms to promote products and services."
      },
      {
        question: "What are the different types of Digital Marketing?",
        answer: "Search Engine Optimization, Pay-per-Click, Social Media Marketing, Content Marketing, Email Marketing, Mobile Marketing, Marketing Analytics and Affiliate Marketing ."
      }
    ]
  },
  {
    category: "SEO & Web Traffic",
    items: [
      {
        question: "What are the most effective ways to increase traffic to your website?",
        answer: "Make sure your content is relevant to your topic. Because irrelevant content is difficult to rank."
      },
      {
        question: "Explain keywords in Digital marketing? How important is it for SEO?",
        answer: "Keywords matter to Google and SEO professionals for several reasons, but here are two big ones. Keywords give us clues to who people are and what they want, allowing us to better meet their needs."
      },
      {
        question: "What are the different types of SEO?",
        answer: "Black-Hat SEO , Gray-Hat SEO, Technical SEO,White hat SEO"
      }
    ]
  },
  {
    category: "Strategy & Performance",
    items: [
      {
        question: "Why choose Digital ORRA for your business growth?",
        answer: "Digital ORRA engineers high-impact digital presence with tailored performance marketing, bespoke web development, and algorithmic SEO designed to maximize ROI and outperform the competition."
      },
      {
        question: "How do I get started with Digital ORRA?",
        answer: "You can schedule a strategic proposal through our Contact page or call our team directly to discuss your business goals, target audience, and tailored marketing blueprint."
      }
    ]
  }
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState("0-0"); // First item open by default

  const toggleAccordion = (id) => {
    setOpenIndex(prev => prev === id ? null : id);
  };

  // Filter items based on search and category
  const filteredCategories = FAQ_DATA.map(group => {
    if (activeCategory !== "all" && group.category !== activeCategory) {
      return null;
    }
    const filteredItems = group.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    });
    if (filteredItems.length === 0) return null;
    return { ...group, items: filteredItems };
  }).filter(Boolean);

  const categoriesList = [
    { id: "all", label: "All Questions" },
    ...FAQ_DATA.map(g => ({ id: g.category, label: g.category }))
  ];

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/faqs" />
      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Edge-to-Edge Watermark */}
      <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          <span style={{ pointerEvents: 'none' }} className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.22] via-white/[0.10] to-transparent">
            FAQS & ANSWERS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 md:pt-48">
          
          {/* Top Hero Banner with Enhanced Interactive Elements & Floating Metrics */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0C142B] via-[#0F1A3B] to-[#0A1024] border border-white/15 p-8 sm:p-12 md:p-14 mb-14 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
            {/* Top edge neon gradient hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-pink-500 opacity-70"></div>
            
            {/* Ambient internal glow orbs */}
            <div className="absolute -right-20 -top-20 w-[420px] h-[420px] bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-[380px] h-[380px] bg-pink-500/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
              
              {/* Left Column: Heading, metrics, intro & enhanced search */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Top badges row */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,51,153,0.2)]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Knowledge & Help Center
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    Instant Answers
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                  Frequently Asked <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                    Questions & Solutions
                  </span>
                </h1>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  Everything you need to know about SEO rankings, performance media buying, algorithmic strategies, and growing with <span className="text-white font-semibold">Digital ORRA</span>.
                </p>



                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 max-w-lg">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">100%</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">Clarified Answers</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-cyan-400">24/7</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">Direct Access</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-pink-400">Panchkula</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">Expert Team</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Vector Composition with Floating Pill Badges */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                
                {/* Floating Micro Feature Badges */}
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#070D1E]/90 border border-cyan-400/30 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] absolute -top-4 left-4 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                  <span className="text-xs font-semibold text-white">SEO & PPC Experts</span>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#070D1E]/90 border border-pink-500/30 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] absolute -bottom-3 right-4 z-20 animate-bounce" style={{ animationDuration: '5s' }}>
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span className="text-xs font-semibold text-white">Tailored Guidance</span>
                </div>

                {/* Illustration Frame */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                  
                  {/* Subtle Multi-layer Neon Aura */}
                  <div className="absolute inset-4 bg-gradient-to-tr from-cyan-500/25 via-blue-600/15 to-pink-500/25 rounded-full blur-3xl animate-pulse duration-1000"></div>
                  
                  {/* Outer Orbit Light Track */}
                  <div className="absolute inset-2 rounded-full border border-cyan-400/25 scale-95 animate-spin" style={{ animationDuration: '30s' }}></div>
                  <div className="absolute inset-8 rounded-full border border-pink-500/20 scale-90"></div>

                  <Image 
                    src="/faq-transparent.png" 
                    alt="Digital ORRA FAQ Illustration" 
                    width={360} 
                    height={360}
                    className="object-contain drop-shadow-[0_20px_45px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform duration-500 relative z-10 filter brightness-105"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-8">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeCategory === cat.id 
                    ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_15px_rgba(255,51,153,0.4)]' 
                    : 'text-gray-300 hover:text-white bg-[#0C142B]/90 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion FAQ Container */}
          <div className="space-y-10 mb-20">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16 bg-[#0C142B]/40 rounded-2xl border border-white/10">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-white mb-1">No matching questions found</h3>
                <p className="text-sm text-gray-400">Try searching for different keywords or clear your search.</p>
              </div>
            ) : (
              filteredCategories.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  {/* Category Subheading */}
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#E6007A]"></div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      {group.category}
                    </h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent"></div>
                  </div>

                  {/* Accordion Items in Category */}
                  <div className="space-y-3.5">
                    {group.items.map((faq, itemIdx) => {
                      const id = `${gIdx}-${itemIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div 
                          key={itemIdx}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen 
                              ? 'bg-[#0E1733] border-pink-500/50 shadow-[0_0_20px_rgba(234,0,122,0.15)]' 
                              : 'bg-[#0A1126]/80 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <button
                            onClick={() => toggleAccordion(id)}
                            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 select-none focus:outline-none"
                          >
                            <span className="text-base sm:text-lg font-semibold text-white leading-snug">
                              {faq.question}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 bg-pink-500 text-white' : 'bg-white/5 text-gray-400'
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5">
                              <p className="font-light">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Still Have Questions Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500/15 via-[#0C142B] to-cyan-500/15 border border-pink-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Still have questions?</h3>
              <p className="text-sm text-gray-300 max-w-lg">
                Can't find the answer you're looking for? Speak directly with our digital growth advisors in Panchkula & Chandigarh.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link 
                href="/contact" 
                className="btn-glow-pink px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Contact Support
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
