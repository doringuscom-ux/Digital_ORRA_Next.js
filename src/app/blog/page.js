"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import {
  Search,
  X,
  ArrowRight,
  Calendar,
  Clock,
  User,
  BookOpen,
  SearchCheck,
  TrendingUp,
  Tag,
  Home,
  ChevronRight
} from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            // Sort by published date (latest first)
            const sorted = [...data].sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0;
              const dateB = b.date ? new Date(b.date).getTime() : 0;
              if (dateA !== dateB) return dateB - dateA;
              const createdA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const createdB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return createdB - createdA;
            });
            setBlogs(sorted);
          }
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Extract unique categories
  const formatCategoryLabel = (cat) => {
    if (!cat || cat === 'Uncategorized') return 'Insights & Strategy';
    return cat.replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
  };

  const categories = [
    { id: 'all', label: 'All Articles' },
    ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).map(cat => ({
      id: cat,
      label: formatCategoryLabel(cat)
    }))
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCat = activeCat === 'all' || blog.category === activeCat;
    const matchesSearch = searchQuery.trim() === '' ||
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#101B3D] via-[#0D1533] to-[#0A1028] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/blog" />
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[8%] left-[10%] w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[30%] right-[8%] w-[650px] h-[650px] bg-pink-500/15 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[750px] h-[750px] bg-indigo-500/20 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Edge-to-Edge Watermark */}
      <section className="relative w-full pt-34 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Crisp Tech Grid Lining */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0"></div>

        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-25 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <h1
            style={{
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.55) 55%, rgba(255, 255, 255, 0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            BLOGS
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-7 sm:pt-10 md:pt-44">
          <h2 className="sr-only">Latest Digital Marketing Insights, Trends & Case Studies</h2>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              <Home size={13} className="text-gray-400" />
              <span>Home</span>
            </Link>
            <ChevronRight size={13} className="text-gray-500" />
            <span className="text-white font-medium">Blog</span>
          </nav>

          {/* Top Category Filter Bar (Clean, Open & Full-Width in a Single Row) */}
          <div className="relative z-20 mb-8 w-full flex items-center justify-center">
            <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none no-scrollbar flex-nowrap p-2 rounded-2xl md:rounded-full bg-[#121E45]/80 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.3)] w-full max-w-7xl [-webkit-overflow-scrolling:touch]">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${activeCat === cat.id
                      ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_20px_rgba(255,51,153,0.45)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-8 px-1 font-mono">
            <span>Showing <strong className="text-white">{filteredBlogs.length}</strong> expert articles</span>
            <span className="text-cyan-300/90 font-sans hidden sm:inline-block">Read actionable digital marketing, tech & AI blueprints →</span>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse"></div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <SearchCheck className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
              <button
                onClick={() => setActiveCat("all")}
                className="mt-3 px-5 py-2 text-xs font-bold rounded-full btn-glow-pink"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filteredBlogs.map((blog, bIdx) => (
                <Link
                  key={blog._id || blog.slug || bIdx}
                  href={`/${blog.slug}`}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#14224d]/90 to-[#0B142F] border border-white/20 hover:border-cyan-400/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.25)] cursor-pointer backdrop-blur-md"
                >
                  <div className="p-4 pb-0">
                    {/* Image Container with Inset & Rounded Corners (NO CATEGORY BADGE) */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0A1128]/90 border border-white/10 flex items-center justify-center p-1.5">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B1536] to-[#060B1A]">
                          <BookOpen className="w-10 h-10 text-cyan-400/40" />
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="pt-4 pb-2">
                      {/* Meta: Read Time */}
                      <div className="flex items-center gap-3 text-xs text-gray-300 mb-2 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{blog.readTime || '5 Min Read'}</span>
                        </div>
                      </div>

                      {/* Blog Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Footer: Author on Left, Read More on Right */}
                  <div className="p-4 pt-3 mt-auto border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate max-w-[140px]">{blog.author || 'Digital ORRA Team'}</span>
                      </div>
                      <span className="font-semibold text-pink-400 group-hover:text-pink-300 inline-flex items-center gap-1 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
