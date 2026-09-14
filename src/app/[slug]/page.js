"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
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
  ArrowRight
} from 'lucide-react';
import './BlogDetailPage.css';

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
      setArticle(null);

      try {
        // 1. First priority: If matched statically in servicesData
        if (matchedStaticService) {
          if (isMounted) {
            setService(matchedStaticService);
            setLoading(false);
          }
          return;
        }

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

            const pageTitle = data.metaTitle || data.title || "Digital ORRA Blog";
            document.title = `${pageTitle} | Digital ORRA`;

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
  const title = article.title;
  const category = (article.category === 'Uncategorized' ? 'Insights & Strategy' : article.category?.replace(/&amp;/g, '&')) || 'Digital Marketing';
  const author = article.author || 'Digital ORRA Team';
  const date = article.date || 'June 29, 2026';
  const readTime = article.readTime || '5 Min Read';
  const image = article.image;
  const excerpt = article.excerpt;
  const content = article.content;

  return (
    <div className="blog-detail-wrapper flex flex-col justify-between">
      {/* Global Navbar */}
      <Navbar />

      <div>
        {/* Main Content Area with generous top margin below fixed Navbar */}
        <div className="blog-detail-container blog-content-grid pt-40 sm:pt-48 md:pt-52">

          {/* Main Article Content */}
          <article className="blog-article-main">

            {/* Meta Row */}
            <div className="blog-detail-meta-top">
              <span className="blog-cat-badge">{category}</span>
              <span className="blog-meta-item"><Calendar size={14} /> {date}</span>
              <span className="blog-meta-item"><Clock size={14} /> {readTime}</span>
              <span className="blog-meta-item"><User size={14} /> {author}</span>
            </div>

            {/* Title matched to content width */}
            <h1 className="blog-detail-title">{title}</h1>

            {/* Featured Image */}
            {image && (
              <div className="blog-featured-img-box">
                <img src={image} alt={title} className="blog-featured-img" />
              </div>
            )}

            {/* Intro Excerpt Paragraph */}
            {excerpt && (
              <p className="blog-detail-subtitle mb-8 text-[#CBD5E1] text-[1.08rem] leading-[1.75]">
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
                      <span className="recent-post-date">{post.date || 'Recent'}</span>
                      <h5 className="recent-post-title">{post.title}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Lead Consultation Box Widget */}
            <div className="sidebar-widget consultation-widget">
              <h3>Book Free Consultation</h3>
              <p>Speak directly with our performance growth specialist for a 1-on-1 strategy audit.</p>
              <Link href="/contact#form" className="sidebar-btn pink-gradient">
                <span>Book Audit Call</span> <ArrowRight size={14} />
              </Link>
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
