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
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/courses" />
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[12%] left-[15%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[35%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header / Hero Section */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
          <span style={{ pointerEvents: 'none' }} className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.48] via-white/[0.28] to-white/[0.08]">
            ACADEMY COURSES
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-44">
          
          {/* Category Filter Tabs: Clean, Centered & Open */}
          <div className="relative z-20 mb-8 w-full flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 py-2 px-2 w-full max-w-5xl">
              {dynamicCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeCat === cat.id 
                      ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_20px_rgba(255,51,153,0.45)]' 
                      : 'text-gray-300 hover:text-white bg-[#0B132B]/90 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-6 px-1 font-mono">
            <span>Showing <strong className="text-white">{filteredCourses.length}</strong> master programs</span>
            <span className="text-cyan-300/90 font-sans hidden sm:inline-block">Click any program to view full curriculum & syllabus →</span>
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
                  className="group relative rounded-3xl bg-gradient-to-b from-[#111A38]/95 via-[#0A1128]/98 to-[#060B1A] border border-white/15 hover:border-cyan-400/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)] cursor-pointer min-h-[440px]"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-[var(--color-primary-pink)] transition-all duration-500"></div>

                  <div>
                    {/* Header Row: Category Badge + Flagship Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="text-[12px] font-medium tracking-wide px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white shadow-sm">
                        {course.category}
                      </span>
                      {course.badge && (
                        <span className="text-[11px] font-mono font-bold text-pink-300 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl sm:text-[22px] font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
                      {course.title}
                    </h3>

                    {/* Clean Subtitle / Description */}
                    <p className="text-[15px] text-gray-200 leading-[1.6] font-normal mb-5 line-clamp-2">
                      {course.subtitle || course.shortDesc || course.description}
                    </p>

                    {/* Sleek Course Meta: Duration & Fee */}
                    <div className="flex items-center justify-between py-3 border-y border-white/10 mb-5 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-200 font-medium">
                        <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{course.duration || 'Flexible'}</span>
                      </div>
                      
                      {course.price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-emerald-400">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">{course.originalPrice}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-cyan-300 font-medium">Free Counseling</span>
                      )}
                    </div>

                    {/* Clean Key Topics / Syllabus (Max 3, clean spacing) */}
                    {(course.syllabus || course.highlights) && (
                      <div className="space-y-2.5 mb-6">
                        {(course.syllabus || course.highlights).slice(0, 3).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-[13.5px] text-gray-200 font-medium leading-tight">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug truncate">{typeof hl === 'string' ? hl : hl.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between mt-auto">
                    <span className="text-[14px] font-bold text-cyan-300 group-hover:text-pink-400 inline-flex items-center gap-2 transition-colors">
                      <span>View Syllabus & Apply</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-bold">
                      {String(cIdx + 1).padStart(2, '0')}
                    </span>
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
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                {selectedCourse.category}
              </span>
              <span className="text-xs font-mono text-gray-400">
                Level: {selectedCourse.level}
              </span>
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
                href={`https://wa.me/919990432321?text=Hi%20Digital%20ORRA,%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(selectedCourse.title)}%20course.`}
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

      {/* Bottom CTA Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <div className="relative rounded-3xl border border-white/15 overflow-hidden bg-gradient-to-r from-[#120B24]/95 via-[#0A1128]/95 to-[#06182B]/95 backdrop-blur-xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Confused Which Program to Choose?</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Get Free 1-on-1 Career Counseling
            </h3>
            <p className="text-sm text-gray-300 mt-1 font-light max-w-xl">
              Our senior marketing directors and tech leads will evaluate your profile and recommend the ideal high-growth learning path.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 flex-shrink-0">
            <Link
              href="/contact#form"
              className="btn-glow-pink px-7 py-3 text-sm font-bold rounded-full shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
            >
              Book Free Counseling
            </Link>
            <a
              href="https://wa.me/919990432321?text=Hi%20Digital%20ORRA,%20I%20need%20career%20guidance%20for%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-bold transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
