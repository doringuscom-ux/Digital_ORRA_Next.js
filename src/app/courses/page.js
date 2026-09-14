"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { coursesData, courseCategories } from '../../data/coursesData';
import { 
  ArrowRight, 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Award, 
  GraduationCap, 
  Users, 
  Star, 
  BookOpen, 
  Layers, 
  PhoneCall,
  SearchCheck,
  ChevronRight,
  ShieldCheck,
  Zap,
  Laptop
} from 'lucide-react';

export default function CoursesPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState(coursesData);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCourses(data);
          }
        }
      } catch (err) {
        console.log('Using fallback coursesData:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const dynamicCategories = [
    { id: 'all', label: 'All Programs' },
    ...Array.from(new Set(courses.map(c => c.category).filter(Boolean))).map(cat => ({
      id: cat,
      label: cat
    }))
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCat = activeCat === "all" || course.category === activeCat;
    const matchesSearch = searchQuery.trim() === "" || 
      (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.shortDesc && course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.subtitle && course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0B132B] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/courses" />
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Ambient Background Glows - Balanced Luxury Depth */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[8%] left-[10%] w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[30%] right-[8%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header / Hero Section */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <h1 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            ACADEMY COURSES
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-44">
          <h2 className="sr-only">Professional Digital Marketing & Tech Certification Programs</h2>
          
          {/* Category Filter Tabs: Clean, Centered & Strictly 1 Single Line */}
          <div className="relative z-20 mb-8 w-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-1 w-full max-w-6xl overflow-x-auto no-scrollbar flex-nowrap">
              {dynamicCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[12.5px] font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeCat === cat.id 
                      ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_18px_rgba(255,51,153,0.45)]' 
                      : 'text-white/90 hover:text-white bg-[#1A2850] hover:bg-white/15 border border-white/15 hover:border-cyan-400/50 shadow-sm'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count & Hint Bar - Modern, Clean & Highly Readable */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-[14.5px] text-gray-200 mb-6 px-1 font-sans font-medium">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Showing</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-extrabold text-xs sm:text-sm">
                {filteredCourses.length}
              </span>
              <span className="text-white font-semibold">Master Programs</span>
            </div>
            <span className="text-cyan-300 font-semibold tracking-wide hidden sm:inline-flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <span>Click any program to view full curriculum & syllabus</span>
              <span className="text-cyan-400 font-bold">→</span>
            </span>
          </div>

          {/* Course Grid: Clean, Modern, High-Converting */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <SearchCheck className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No matching programs found</h3>
              <p className="text-xs text-gray-400 mb-4">Try searching with a different keyword or reset filters.</p>
              <button
                onClick={() => { setActiveCat("all"); setSearchQuery(""); }}
                className="btn-glow-pink px-5 py-2 text-xs font-bold rounded-full"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filteredCourses.map((course, cIdx) => (
                <div
                  key={course.id || cIdx}
                  onClick={() => setSelectedCourse(course)}
                  className="group relative rounded-3xl bg-gradient-to-b from-[#141E3C] via-[#0E172F] to-[#091024] border border-white/20 hover:border-cyan-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.7),0_0_35px_rgba(6,182,212,0.25)] cursor-pointer min-h-[330px] overflow-hidden"
                >
                  {/* Subtle Top Gradient Accent */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-[var(--color-primary-pink)] opacity-80 group-hover:opacity-100 transition-opacity"></div>

                  <div>
                    {/* Top Row: Live Dot + Admissions Open Badge */}
                    <div className="flex items-center justify-start mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D253D] border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-300">
                          Admissions Open
                        </span>
                      </div>
                    </div>

                    {/* Course Title - Bright Crisp White */}
                    <h3 className="text-[22px] sm:text-[24px] font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-tight tracking-tight">
                      {course.title}
                    </h3>

                    {/* Description - High-Contrast Pure Light Gray for Effortless Reading */}
                    <p className="text-[15px] sm:text-[15.5px] text-gray-200 leading-relaxed font-normal mb-5 line-clamp-2">
                      {course.subtitle || course.shortDesc || course.description}
                    </p>

                    {/* 2-Line Meta: Duration on Line 1, Price on Line 2 */}
                    <div className="flex flex-col gap-2.5 pt-1">
                      {/* Line 1: Duration */}
                      <div className="flex items-center gap-2 text-sm text-gray-200">
                        <Clock className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                        <span className="text-xs text-gray-400 font-medium">Duration:</span>
                        <span className="font-semibold text-white text-xs sm:text-[13px]">{course.duration || 'Flexible'}</span>
                      </div>

                      {/* Line 2: Price / Fee - Prominent & Highly Visible */}
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <span className="text-[13px] font-bold text-gray-300">Fee:</span>
                        {course.price ? (
                          <div className="flex items-baseline gap-2.5">
                            <span className="text-[20px] sm:text-[22px] font-black text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] tracking-tight">
                              {course.price}
                            </span>
                            {course.originalPrice && (
                              <span className="text-[14px] text-gray-300 font-semibold line-through decoration-rose-500 decoration-[2.5px]">
                                {course.originalPrice}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-cyan-300 font-extrabold text-sm sm:text-base">Free Counseling</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-[14.5px] font-bold text-cyan-300 group-hover:text-white transition-colors">
                    <span className="tracking-wide">Explore Full Syllabus</span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-cyan-500 border border-white/15 group-hover:border-cyan-400 text-cyan-300 group-hover:text-black flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Curriculum Modal Deep Dive */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1229] border border-white/20 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2038] border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-300">
                  ADMISSIONS OPEN
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider bg-white/10 text-cyan-200 px-2 py-0.5 rounded-full border border-white/15">
                  2026 Batch
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              {selectedCourse.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light mb-6">
              {selectedCourse.description || selectedCourse.fullDesc || selectedCourse.shortDesc || selectedCourse.subtitle}
            </p>

            {/* Course Meta Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 text-center">
              <div>
                <div className="text-[11px] font-mono text-gray-400 uppercase">Duration</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedCourse.duration || 'Flexible'}</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-gray-400 uppercase">Fee / Price</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedCourse.price || 'Free Consultation'}</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-gray-400 uppercase">Rating</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">★ {selectedCourse.rating || '4.9'} / 5.0</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-gray-400 uppercase">Placement</div>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">{selectedCourse.placementAssistance ? 'Assistance Included' : '100% Support'}</div>
              </div>
            </div>

            {/* Syllabus Breakdown from MongoDB or Local modules */}
            {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum & Syllabus Modules</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCourse.syllabus.map((item, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200 font-medium">{typeof item === 'string' ? item : item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus Modules Breakdown if available */}
            {selectedCourse.modules && selectedCourse.modules.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum & Module Breakdown</span>
                </h3>

                <div className="space-y-4">
                  {selectedCourse.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-sm sm:text-base font-bold text-white mb-3 text-cyan-300">
                        {mod.title}
                      </h4>
                      <ul className="space-y-2">
                        {mod.topics && mod.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program Highlights */}
            {selectedCourse.highlights && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-white mb-3">Program Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCourse.highlights.map((hl, hidx) => (
                    <div key={hidx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/10">
              <Link
                href="/contact#form"
                onClick={() => setSelectedCourse(null)}
                className="btn-glow-pink w-full sm:flex-1 py-3 text-center text-sm font-bold rounded-full"
              >
                Enroll / Inquire for this Batch
              </Link>
              
              <a
                href={`https://wa.me/919896384224?text=Hi%20Digital%20ORRA,%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(selectedCourse.title)}%20course.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to Academic Counselor</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Direct Action CTA: Image Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 w-full">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 hover:border-pink-500/60 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(255,51,153,0.25)] hover:scale-[1.01] group">
          <img
            src="https://res.cloudinary.com/fykd8cyh/image/upload/v1789209458/courses.png"
            alt="Confused Which Program to Choose? Get Free 1-on-1 Career Counseling - Digital ORRA"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
          {/* Interactive Click Areas */}
          <Link
            href="/contact#form"
            aria-label="Book Free Counseling"
            className="absolute inset-y-0 left-0 w-[83%] z-10 cursor-pointer"
          />
          <a
            href="https://wa.me/919896384224?text=Hi%20Digital%20ORRA,%20I%20need%20career%20guidance%20for%20courses."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us"
            className="absolute inset-y-0 right-0 w-[17%] z-10 cursor-pointer"
          />
        </div>
      </div>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
