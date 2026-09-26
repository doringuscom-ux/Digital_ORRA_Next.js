"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  PhoneCall, 
  BookOpen,
  Tag
} from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);

          if (data) {
            const pageTitle = data.metaTitle || data.title || "Digital ORRA Blog";
            document.title = `${pageTitle} | Digital ORRA`;

            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement("meta");
              metaDesc.name = "description";
              document.head.appendChild(metaDesc);
            }
            metaDesc.content = data.metaDescription || data.excerpt || "";

            // Dynamic Canonical URL: Exactly matches the current page
            let currentCanonical = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : `https://digitalorra.com/blog/${slug}`;
            let canLink = document.querySelector('link[rel="canonical"]');
            if (!canLink) {
              canLink = document.createElement("link");
              canLink.setAttribute("rel", "canonical");
              document.head.appendChild(canLink);
            }
            canLink.setAttribute("href", currentCanonical);

            let ogUrl = document.querySelector('meta[property="og:url"]');
            if (!ogUrl) {
              ogUrl = document.createElement("meta");
              ogUrl.setAttribute("property", "og:url");
              document.head.appendChild(ogUrl);
            }
            ogUrl.content = currentCanonical;

            // Robots Meta Tag
            let metaRobots = document.querySelector('meta[name="robots"]');
            if (!metaRobots) {
              metaRobots = document.createElement("meta");
              metaRobots.name = "robots";
              document.head.appendChild(metaRobots);
            }
            metaRobots.content = "index, follow";
          }
        }

        // Fetch recent blogs for suggestions
        const allRes = await fetch('/api/blogs');
        if (allRes.ok) {
          const allData = await allRes.json();
          setRecentBlogs(allData.filter(b => b.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching blog detail:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070D1E] text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-36 text-center">
          <div className="h-8 w-64 bg-white/10 rounded-full mx-auto animate-pulse mb-6"></div>
          <div className="h-4 w-96 bg-white/5 rounded-full mx-auto animate-pulse"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#070D1E] text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-36 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-8">The requested article could not be found or has been moved.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070D1E] text-white selection:bg-pink-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse duration-1000"></div>
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] animate-pulse duration-700"></div>
      </div>

      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white font-semibold truncate">{blog.title}</span>
          </div>

          {/* Article Header */}
          <div className="mb-10">
            {/* Category & Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {blog.category === 'Uncategorized' ? 'Insights & Strategy' : blog.category}
              </span>
            </div>

            <h1 
              style={{
                color: blog.titleColor || "#ffffff",
                textAlign: blog.titleAlign || "left",
              }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6"
            >
              {blog.title}
            </h1>

            {/* Author, Date & Reading Time */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-mono pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-sans font-medium">
                <div className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{blog.author || 'Digital ORRA Team'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>{blog.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="relative w-full h-72 sm:h-[460px] rounded-3xl overflow-hidden mb-12 border border-white/15 shadow-2xl">
              <img 
                src={blog.image} 
                alt={blog.imageAlt || blog.title || "Featured Blog Image"} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content / HTML Body */}
          <article 
            style={{
              fontSize: blog.bodyFontSize === "large" ? "1.2rem" : blog.bodyFontSize === "small" ? "0.95rem" : "1.08rem",
              fontFamily: blog.fontFamily === "serif" ? "Georgia, serif" : blog.fontFamily === "mono" ? "monospace" : "inherit"
            }}
            className="prose prose-invert prose-lg max-w-none mb-16 text-gray-200 font-light leading-relaxed"
          >
            {blog.content ? (
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }} 
                className="space-y-6 [&>h1]:text-3xl sm:[&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-6 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#FF3399] [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-lg sm:[&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-cyan-300 [&>h4]:mt-6 [&>h4]:mb-2 [&>h5]:text-base sm:[&>h5]:text-lg [&>h5]:font-bold [&>h5]:text-amber-300 [&>h5]:mt-4 [&>h5]:mb-2 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2.5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2.5 [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF3399] [&>blockquote]:bg-[#0F1B4C]/40 [&>blockquote]:py-3 [&>blockquote]:px-6 [&>blockquote]:rounded-r-2xl [&>blockquote]:italic [&>blockquote]:text-white/90 [&>img]:rounded-2xl [&>img]:my-6 [&>img]:border [&>img]:border-white/15 [&>a]:text-[#2271b1] hover:[&>a]:text-[#135e96] [&>a]:underline [&>a]:decoration-[#2271b1] [&>a]:font-semibold [&>a]:underline-offset-2"
              />
            ) : (
              <p className="text-lg text-gray-200">
                {blog.excerpt}
              </p>
            )}
          </article>

          {/* Share & Consultation Bar */}
          <div className="rounded-3xl bg-gradient-to-r from-[#142042] via-[#0D152F] to-[#142042] border border-white/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 shadow-2xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Have Questions?</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Transform Your Digital Strategy Today</h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Talk with our senior strategists in Panchkula & Chandigarh.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/contact#form"
                className="btn-glow-pink px-6 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg"
              >
                Get Custom Strategy
              </Link>
            </div>
          </div>

          {/* Related / Recent Articles */}
          {recentBlogs.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">More Insights & Guides</h2>
                <Link href="/blog" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
                  <span>View All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recentBlogs.map((rec, rIdx) => (
                  <Link
                    key={rIdx}
                    href={`/blog/${rec.slug}`}
                    className="p-5 rounded-2xl bg-[#0C142B] border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">{rec.category}</span>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">{rec.title}</h3>
                      <p className="text-xs text-gray-300 line-clamp-2">{rec.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-300">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer hideCta={true} />
    </main>
  );
}
