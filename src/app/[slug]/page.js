"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServiceDetailView from '../../components/ServiceDetailView';
import LocationPageView from '../../components/LocationPageView';
import { servicesData } from '../../data/servicesData';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Share2,
  Eye,
  Home,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import './BlogDetailPage.css';
import { decodeHtmlEntities } from '../../lib/decodeHtmlEntities';

export default function UniversalSlugPage() {
  const router = useRouter();
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === 'string' ? decodeURIComponent(rawSlug) : Array.isArray(rawSlug) ? decodeURIComponent(rawSlug[0]) : '';

  // Check immediately if slug matches any service in static servicesData
  const matchedStaticService = useMemo(() => {
    if (!slug) return null;
    return servicesData.find((s) => s.id === slug) || null;
  }, [slug]);

  const [service, setService] = useState(matchedStaticService);
  const [locationPage, setLocationPage] = useState(null);
  const [article, setArticle] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewsCount, setViewsCount] = useState(185);

  // Form states for Book Free Consultation widget
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in Name, Email and Description.');
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: `Consultation from Blog: ${article?.title || slug}`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(true);
        setFormData({ fullName: '', phone: '', email: '', message: '' });
      } else {
        setFormError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormError('Network error. Please try again later.');
    } finally {
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    // Generate a natural-looking random view count on every visit/refresh (e.g. 150 to 980)
    const randomViews = Math.floor(Math.random() * (980 - 150 + 1)) + 150;
    setViewsCount(randomViews);
  }, [slug]);

  // Sync service state when slug changes
  useEffect(() => {
    setService(matchedStaticService);
  }, [matchedStaticService]);

  useEffect(() => {
    let isMounted = true;

    async function resolveSlug() {
      if (!slug) return;
      if (slug === 'core-mambers' || slug === 'core-members') {
        router.replace('/our-team');
        return;
      }
      if (slug === 'it-company') {
        router.replace('/company-profile');
        return;
      }
      if (slug === 'academy') {
        router.replace('/courses');
        return;
      }
      if (slug === 'testimonials') {
        router.replace('/testimonial');
        return;
      }
      const legacyCourseSlugs = [
        'web-designing-and-development-courses',
        'software-testing-course',
        'digital-marketing-academic-course',
        'graphic-designing-course',
        'video-editing-courses',
        'animation-course'
      ];
      if (legacyCourseSlugs.includes(slug)) {
        router.replace('/courses');
        return;
      }
      setLoading(true);
      setService(matchedStaticService);
      setLocationPage(null);
      if (matchedStaticService) {
        setLoading(false);
        return;
      }

      try {
        // Fetch candidate endpoints concurrently to eliminate waterfall latency
        const [locRes, blogRes, srvRes] = await Promise.all([
          fetch(`/api/locations/${slug}`).catch(() => null),
          fetch(`/api/blogs/${slug}`).catch(() => null),
          fetch(`/api/services/${slug}`).catch(() => null),
        ]);

        // 1. Check Location Page
        if (locRes && locRes.ok) {
          const locData = await locRes.json();
          if (locData && locData.title && isMounted) {
            setLocationPage(locData);
            setLoading(false);
            return;
          }
        }

        // 2. Check Service
        if (srvRes && srvRes.ok) {
          const srvData = await srvRes.json();
          if (srvData && (srvData.title || srvData.id) && isMounted) {
            setService(srvData);
            setLoading(false);
            return;
          }
        }

        // 3. Check Blog
        if (blogRes && blogRes.ok) {
          const data = await blogRes.json();
          if (isMounted && data && (data.title || data.slug)) {
            setArticle(data);

            const pageTitle = data.metaTitle ? data.metaTitle : (data.title ? `${data.title} | Digital ORRA` : "Digital ORRA Blog");
            document.title = pageTitle;

            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement("meta");
              metaDesc.name = "description";
              document.head.appendChild(metaDesc);
            }
            metaDesc.content = data.metaDescription || data.excerpt || "";

            if (data.metaKeywords) {
              let metaKw = document.querySelector('meta[name="keywords"]');
              if (!metaKw) {
                metaKw = document.createElement("meta");
                metaKw.name = "keywords";
                document.head.appendChild(metaKw);
              }
              metaKw.content = data.metaKeywords;
            }

            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
              ogTitle = document.createElement("meta");
              ogTitle.setAttribute("property", "og:title");
              document.head.appendChild(ogTitle);
            }
            ogTitle.content = pageTitle;

            let ogDesc = document.querySelector('meta[property="og:description"]');
            if (!ogDesc) {
              ogDesc = document.createElement("meta");
              ogDesc.setAttribute("property", "og:description");
              document.head.appendChild(ogDesc);
            }
            ogDesc.content = data.metaDescription || data.excerpt || "";

            if (data.image) {
              let ogImg = document.querySelector('meta[property="og:image"]');
              if (!ogImg) {
                ogImg = document.createElement("meta");
                ogImg.setAttribute("property", "og:image");
                document.head.appendChild(ogImg);
              }
              ogImg.content = data.image;
            }

            // Set dynamic canonical URL to currently open URL
            let currentCanonical = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : `https://digitalorra.com/${slug}`;
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

            // Lazy fetch recent blogs in background without blocking
            fetch('/api/blogs')
              .then(r => r.ok ? r.json() : [])
              .then(allData => {
                if (isMounted && Array.isArray(allData)) {
                  setAllBlogs(allData);
                }
              })
              .catch(() => {});
          }
        }
      } catch (err) {
        console.error('Failed to resolve slug:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    resolveSlug();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [slug, matchedStaticService]);

  // Dynamic Recent Articles (strictly 5 articles)
  const recentArticles = useMemo(() => {
    const others = allBlogs.filter(b => b.slug !== slug);
    return others.slice(0, 5);
  }, [slug, allBlogs]);

  // Find previous and next articles
  const { prevArticle, nextArticle } = useMemo(() => {
    const currentIndex = allBlogs.findIndex(b => b.slug === slug);
    if (currentIndex === -1) return { prevArticle: null, nextArticle: null };
    const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : allBlogs[allBlogs.length - 1];
    const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : allBlogs[0];
    return { prevArticle: prev, nextArticle: next };
  }, [slug, allBlogs]);

  if (loading) {
    return (
      <div className="blog-detail-wrapper flex flex-col justify-between">
        <Navbar />
        <div className="blog-detail-container py-44 text-center">
          <div className="h-8 w-64 bg-white/10 rounded-full mx-auto animate-pulse mb-6"></div>
          <div className="h-4 w-96 bg-white/5 rounded-full mx-auto animate-pulse"></div>
        </div>
        <Footer hideCta={true} />
      </div>
    );
  }

  // 1. Render Service Detail View if matched
  if (service) {
    return <ServiceDetailView initialService={service} slug={slug} />;
  }

  // 2. Render Location Page View if matched
  if (locationPage) {
    return <LocationPageView page={locationPage} slug={slug} />;
  }

  // 3. Render Not Found if neither service nor location nor article
  if (!article) {
    return (
      <div className="blog-detail-wrapper flex flex-col justify-between">
        <Navbar />
        <div className="blog-detail-container py-44 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">Page Not Found</h1>
          <p className="text-gray-300 mb-8">The requested page or article could not be found or has been moved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
            >
              <ArrowLeft size={16} /> Explore Services
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
            >
              Read Blogs
            </Link>
          </div>
        </div>
        <Footer hideCta={true} />
      </div>
    );
  }

  // 3. Render Article Content
  const title = decodeHtmlEntities(article.title || '');
  const rawCat = decodeHtmlEntities(article.category || '');
  const category = (rawCat === 'Uncategorized' ? 'Insights & Strategy' : rawCat) || 'Digital Marketing';
  const author = article.author || 'Digital ORRA Team';
  const date = article.date || 'June 29, 2026';
  const readTime = article.readTime || '5 Min Read';
  const image = article.image;
  const excerpt = decodeHtmlEntities(article.excerpt || '');
  const content = decodeHtmlEntities(article.content || '');

  // Schema.org Structured Data for Google Rich Snippets & Fast Indexing
  const blogArticleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt || title,
    "image": image ? [image] : ["https://digitalorra.com/DO%20JPG.jpeg"],
    "author": {
      "@type": "Organization",
      "name": author || "Digital ORRA",
      "url": "https://digitalorra.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital ORRA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://digitalorra.com/DO%20JPG.jpeg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://digitalorra.com/${slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://digitalorra.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://digitalorra.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://digitalorra.com/${slug}`
      }
    ]
  };

  return (
    <div className="blog-detail-wrapper flex flex-col justify-between">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Global Navbar */}
      <Navbar lightTheme={false} />

      {/* Premium Luxury Hero Section - Exact Design as Requested */}
      <section className="relative w-full bg-gradient-to-b from-[#060B19] via-[#0A1128] to-[#040816] text-white pt-36 sm:pt-44 pb-16 sm:pb-20 overflow-hidden border-b border-white/10">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-5 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -top-10 left-10 w-80 h-80 bg-pink-500/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Breadcrumb + Category Badge + Title + Meta + Share */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-gray-400 mb-5">
                <Link href="/" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
                  <Home size={13} className="text-gray-400" />
                  <span>Home</span>
                </Link>
                <ChevronRight size={13} className="text-gray-500 flex-shrink-0" />
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
                <ChevronRight size={13} className="text-gray-500 flex-shrink-0" />
                <span className="text-white font-medium truncate max-w-[200px] sm:max-w-[320px]">
                  {title}
                </span>
              </nav>

              {/* Category Pill */}
              <div className="mb-5">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#4F46E5]/30 border border-[#6366F1]/50 text-[#818CF8] text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                  {category}
                </span>
              </div>

              {/* Giant Bold Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-white leading-[1.25] tracking-tight mb-7">
                {title}
              </h1>

              {/* Author, Views and Share Button */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                <div className="space-y-1">
                  <div className="font-semibold text-white">
                    By <span className="text-gray-200">{author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
                    <span className="flex items-center gap-1.5">
                      <Eye size={13} className="text-gray-400" />
                      {viewsCount.toLocaleString()} Views
                    </span>
                  </div>
                </div>

                {/* Actions: Google Preferences Source & Share Button */}
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.google.com/preferences/source?q=digitalorra.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm hover:scale-105"
                    title="Follow Digital ORRA on Google"
                    aria-label="Google Preferences Source"
                  >
                    <Image
                      src="/Logo_google.png"
                      alt="Google"
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="hidden sm:inline-block">Google Source</span>
                  </a>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title, url: window.location.href }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Article link copied to clipboard!");
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-white text-black hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
                    title="Share this article"
                    aria-label="Share article"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image with Smooth Rounded Corners */}
            {image && (
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#050B1B]/90 flex items-center justify-center p-2 group">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-700 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Main White Content Area (Article Body + Sidebar) */}
      <div className="bg-white">
        <div className="blog-detail-container blog-content-grid !pt-10 sm:!pt-14">

          {/* Main Article Content */}
          <article className="blog-article-main">

            {/* Intro Excerpt Paragraph */}
            {excerpt && (
              <p className="blog-detail-subtitle mb-8 text-[1.12rem] leading-[1.8] font-medium text-[#334155] border-l-4 border-pink-500 pl-4 bg-pink-50/50 py-3 rounded-r-xl">
                {excerpt}
              </p>
            )}

            {content ? (
              /* Render Dynamic Admin Content */
              <div className="blog-dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              /* Clean Excerpt & Dynamic Paragraph Fallback */
              <div className="blog-dynamic-content">
                <p className="blog-p">{excerpt}</p>
              </div>
            )}

            {/* CTA Box */}
            <div className="blog-cta-box">
              <h3>Need Help Structuring Your Digital Marketing Strategy?</h3>
              <p>Our media buying specialists at Digital ORRA audit your unit economics and map out a custom ROAS growth blueprint for your business.</p>
              <Link href="/contact#form" className="blog-cta-btn">
                <span>GET FREE MARKETING AUDIT</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="blog-nav-footer">
              {prevArticle && (
                <Link href={`/${prevArticle.slug}`} className="blog-nav-prev">
                  <ArrowLeft size={16} />
                  <div>
                    <span className="nav-label">Previous Post</span>
                    <span className="nav-title">{prevArticle.title}</span>
                  </div>
                </Link>
              )}

              {nextArticle && (
                <Link href={`/${nextArticle.slug}`} className="blog-nav-next">
                  <div>
                    <span className="nav-label">Next Post</span>
                    <span className="nav-title">{nextArticle.title}</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>

          </article>

          {/* Sidebar Widgets */}
          <aside className="blog-sidebar">

            {/* Quick Lead Consultation Box Widget - Placed at Top */}
            <div className="sidebar-widget consultation-widget">
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
                <h3 className="!text-[1.18rem] !font-black !text-slate-900 tracking-tight !mb-0 !pb-0 !border-0 flex items-center gap-2">
                  <span>Book Free Consultation</span>
                </h3>
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-500 font-normal mb-5">
                Speak directly with our performance growth specialist for a 1-on-1 strategy audit.
              </p>

              {formSuccess ? (
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-2.5 animate-fade-in shadow-sm">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-emerald-900 text-sm">Thank You!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                    Your request has been received. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSuccess(false)}
                    className="text-xs text-pink-600 font-bold hover:underline pt-1 inline-block"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-600 mb-1.5">
                      Full Name <span className="text-pink-500 font-semibold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-600 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Gmail / Email Input */}
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-600 mb-1.5">
                      Email / Gmail <span className="text-pink-500 font-semibold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Description / Message Input */}
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-600 mb-1.5">
                      Description / Requirement <span className="text-pink-500 font-semibold">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your project or consultation requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all resize-none shadow-xs"
                      />
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF007A] via-[#EA007A] to-[#D00068] text-white text-[13px] font-black tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,0,122,0.32)] hover:shadow-[0_10px_25px_rgba(255,0,122,0.48)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
                  >
                    {formSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Recent Articles Widget */}
            <div className="sidebar-widget recent-widget">
              <h3>Recent Articles</h3>
              <div className="recent-posts-list">
                {recentArticles.map(post => (
                  <Link key={post._id || post.slug} href={`/${post.slug}`} className="recent-post-item">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="recent-post-img" />
                    ) : (
                      <div className="recent-post-img bg-white/5 flex items-center justify-center text-cyan-400">
                        <Clock size={16} />
                      </div>
                    )}
                    <div className="recent-post-info">
                      <h5 className="recent-post-title">{post.title}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget categories-widget">
              <h3>Categories</h3>
              <ul className="sidebar-cat-list">
                {['Digital Marketing', 'Graphics & Design', 'SEO', 'Social Media', 'Web Designing'].map(cat => (
                  <li key={cat} onClick={() => router.push('/blog')}>
                    <span>{cat}</span>
                    <ArrowRight size={13} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Topics Tag Widget */}
            <div className="sidebar-widget tags-widget">
              <h3>Popular Topics</h3>
              <div className="sidebar-tags">
                <span className="stag">Performance Marketing</span>
                <span className="stag">Meta Ads</span>
                <span className="stag">Google PPC</span>
                <span className="stag">SEO 2026</span>
                <span className="stag">Web Development</span>
                <span className="stag">ROAS Scaling</span>
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </div>
  );
}
