"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Sparkles,
  ArrowRight,
  MessageCircleQuestion,
  CheckCircle2
} from "lucide-react";

// Default agency FAQs for instant display and fallback
const DEFAULT_FAQS = [
  {
    _id: "default-1",
    question: "What digital services does Digital ORRA provide?",
    answer: "Digital ORRA provides end-to-end digital growth services including custom Web Development, Performance Marketing (Google & Meta Ads), SEO & Local Search Optimization, Branding & Graphic Design, Social Media Management, and 360° Virtual Tours.",
    category: "Services & Tech",
    order: 0,
    isActive: true,
  },
  {
    _id: "default-2",
    question: "How long does it typically take to design and launch a website?",
    answer: "For standard business websites, our timeline is typically 7 to 14 business days. For advanced web applications, custom eCommerce portals, or multi-location platforms, it usually ranges between 3 to 6 weeks, structured with transparent milestone sprints.",
    category: "Pricing & Timeline",
    order: 1,
    isActive: true,
  },
  {
    _id: "default-3",
    question: "How do you ensure measurable ROI on digital marketing campaigns?",
    answer: "We deploy data-driven conversion rate optimization (CRO), continuous A/B creative testing, deep Google Analytics 4 tracking, and audience retargeting funnels. We provide transparent bi-weekly & monthly performance dashboards showing exact ROAS, cost per lead (CPL), and revenue attribution.",
    category: "Digital Marketing",
    order: 2,
    isActive: true,
  },
  {
    _id: "default-4",
    question: "Can I manage and update my website content after delivery?",
    answer: "Absolutely! We build modern, intuitive admin panels and CMS dashboards where you can effortlessly add blogs, update services, manage reviews, edit page copy, and upload media without touching a single line of code.",
    category: "Services & Tech",
    order: 3,
    isActive: true,
  },
  {
    _id: "default-5",
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, every project includes complimentary post-launch support. We also provide ongoing monthly retainer packages covering 24/7 security monitoring, server health audits, SEO updates, and feature enhancements.",
    category: "General",
    order: 4,
    isActive: true,
  },
  {
    _id: "default-6",
    question: "How do we get started with Digital ORRA?",
    answer: "You can book a free consultation call or request a free digital audit via our website. Our team will review your business goals, analyze your competitors, and provide an actionable roadmap within 24 hours.",
    category: "General",
    order: 5,
    isActive: true,
  }
];

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch("/api/faqs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFaqs(data);
          } else {
            setFaqs(DEFAULT_FAQS);
          }
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch (err) {
        setFaqs(DEFAULT_FAQS);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const displayFaqs = faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data (JSON-LD) for Google SEO Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: displayFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative w-full pt-20 pb-16 md:pt-28 md:pb-24 bg-linear-to-b from-[#0E1A3C] via-[#112048] to-[#0D1838] border-t border-white/10 shadow-[inset_0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden" id="faq">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient Lighting & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-primary-pink/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-125 h-100 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[44px_44px] pointer-events-none z-0" />

      {/* Background Watermark */}
      <div className="absolute top-2 sm:top-4 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 mask-[linear-gradient(to_bottom,black_85%,transparent_100%)]">
        <span className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-widest whitespace-nowrap select-none text-transparent bg-clip-text bg-linear-to-b from-white/80 via-white/45 to-white/18">
          FAQ
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-8 sm:pt-14 md:pt-16">
        {/* Accordion Container */}
        <div className="space-y-3.5 sm:space-y-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq._id || idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#11234f]/95 border-cyan-400/50 shadow-[0_0_35px_rgba(34,211,238,0.18)] ring-1 ring-cyan-400/30"
                    : "bg-[#0c1838]/85 border-white/15 hover:border-white/30 hover:bg-[#0f1e46]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-linear-to-br from-[#FF007A] to-primary-pink text-white shadow-[0_0_15px_rgba(255,0,122,0.4)]"
                          : "bg-white/5 border border-white/10 text-gray-400"
                      }`}
                    >
                      <MessageCircleQuestion className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>

                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-white" : "text-gray-200 hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-cyan-400/15 border-cyan-400/40 text-cyan-300"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-white/5 animate-fadeIn">
                    <div className="pt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal whitespace-pre-line flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <div className="flex-1">{faq.answer}</div>
                    </div>

                    {faq.category && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                          Topic: {faq.category}
                        </span>
                        <span className="text-[11px] font-mono text-gray-500">
                          Digital ORRA Verified
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#0e1d42] via-[#132757] to-[#0e1d42] border border-white/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Still Have More Questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Speak directly with our senior digital strategists. We will clarify your queries and outline the ideal plan for your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <a
                href="tel:+916280458005"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/8 border border-white/20 text-white font-bold text-sm hover:bg-white/15 hover:border-white/40 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Call +91 62804 58005</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#FF007A] to-primary-pink text-white font-bold text-sm shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
