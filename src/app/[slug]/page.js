import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServiceDetailView from '../../components/ServiceDetailView';
import LocationPageView from '../../components/LocationPageView';
import BlogConsultationForm from '../../components/BlogConsultationForm';
import BlogShareAndViews from '../../components/BlogShareAndViews';
import { servicesData } from '../../data/servicesData';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import Service from '@/models/Service';
import LocationPage from '@/models/LocationPage';
import { cleanBlogFields, decodeHtmlEntities } from '../../lib/decodeHtmlEntities';
import {
  ArrowLeft,
  Clock,
  ArrowRight,
  Home,
  ChevronRight
} from 'lucide-react';
import './BlogDetailPage.css';

// Legacy routes redirection map
const REDIRECTS = {
  'core-mambers': '/our-team',
  'core-members': '/our-team',
  'it-company': '/company-profile',
  'academy': '/courses',
  'testimonials': '/testimonial',
  'web-designing-and-development-courses': '/courses',
  'software-testing-course': '/courses',
  'digital-marketing-academic-course': '/courses',
  'graphic-designing-course': '/courses',
  'video-editing-courses': '/courses',
  'animation-course': '/courses'
};

async function resolveSlugData(slug) {
  if (!slug) return null;

  // 1. Static Service Check
  const staticSrv = servicesData.find((s) => s.id === slug);
  if (staticSrv) {
    return { type: 'service', data: staticSrv };
  }

  // 2. Query MongoDB Collections
  try {
    await dbConnect();

    // Check Location Page
    const loc = await LocationPage.findOne({ slug }).lean();
    if (loc && loc.title) {
      return { type: 'location', data: JSON.parse(JSON.stringify(loc)) };
    }

    // Check Dynamic Service
    const dbSrv = await Service.findOne({ id: slug }).lean();
    if (dbSrv && (dbSrv.title || dbSrv.id)) {
      return { type: 'service', data: JSON.parse(JSON.stringify(dbSrv)) };
    }

    // Check Blog
    let blog = await Blog.findOne({ slug }).lean();
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug).lean();
    }
    if (!blog) {
      const escaped = slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      blog = await Blog.findOne({
        $or: [
          { slug: { $regex: new RegExp(`^${escaped}$`, 'i') } },
          { title: { $regex: new RegExp(`^${escaped.replace(/-/g, ' ')}$`, 'i') } }
        ]
      }).lean();
    }

    if (blog) {
      const cleaned = cleanBlogFields(blog);
      // Fetch recent blogs for sidebar
      const allBlogsRaw = await Blog.find({ slug: { $ne: cleaned.slug } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug image createdAt')
        .lean();

      // Fetch prev and next blogs
      const [prevBlogRaw, nextBlogRaw] = await Promise.all([
        Blog.findOne({ createdAt: { $lt: blog.createdAt || new Date() } })
          .sort({ createdAt: -1 })
          .select('title slug')
          .lean(),
        Blog.findOne({ createdAt: { $gt: blog.createdAt || new Date() } })
          .sort({ createdAt: 1 })
          .select('title slug')
          .lean()
      ]);

      return {
        type: 'blog',
        data: JSON.parse(JSON.stringify(cleaned)),
        recentArticles: JSON.parse(JSON.stringify(allBlogsRaw || [])),
        prevArticle: prevBlogRaw ? JSON.parse(JSON.stringify(prevBlogRaw)) : null,
        nextArticle: nextBlogRaw ? JSON.parse(JSON.stringify(nextBlogRaw)) : null
      };
    }
  } catch (err) {
    console.error("Error resolving slug on server:", err);
  }

  return null;
}

export default async function UniversalSlugPage({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  const slug = typeof rawSlug === 'string' ? decodeURIComponent(rawSlug) : Array.isArray(rawSlug) ? decodeURIComponent(rawSlug[0]) : '';

  // Handle redirects instantly on server
  if (REDIRECTS[slug]) {
    redirect(REDIRECTS[slug]);
  }

  const resolved = await resolveSlugData(slug);

  // 1. Service Detail View
  if (resolved?.type === 'service') {
    return <ServiceDetailView initialService={resolved.data} slug={slug} />;
  }

  // 2. Location Page View
  if (resolved?.type === 'location') {
    return <LocationPageView page={resolved.data} slug={slug} />;
  }

  // 3. 404 if not found
  if (!resolved || resolved.type !== 'blog' || !resolved.data) {
    return (
      <div className="blog-detail-wrapper flex flex-col justify-between min-h-screen">
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

  const article = resolved.data;
  const { recentArticles, prevArticle, nextArticle } = resolved;

  const title = decodeHtmlEntities(article.title || '');
  const rawCat = decodeHtmlEntities(article.category || '');
  const category = (rawCat === 'Uncategorized' ? 'Insights & Strategy' : rawCat) || 'Digital Marketing';
  const author = article.author || 'Digital ORRA Team';
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

      {/* Premium Luxury Hero Section */}
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.3] tracking-tight mb-7">
                {title}
              </h1>

              {/* Author, Views and Share Button (Interactive Client Component) */}
              <BlogShareAndViews title={title} author={author} />
            </div>

            {/* Right Column: Featured Image */}
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

      {/* Main Content Area (Article Body + Sidebar) */}
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
              /* Render Dynamic Admin Content - Pre-rendered instantly by Server for Googlebot */
              <div className="blog-dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
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

            {/* Quick Lead Consultation Box Widget - Client Form */}
            <BlogConsultationForm articleTitle={title} slug={slug} />

            {/* Recent Articles Widget */}
            {recentArticles && recentArticles.length > 0 && (
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
            )}

            {/* Categories Widget */}
            <div className="sidebar-widget categories-widget">
              <h3>Categories</h3>
              <ul className="sidebar-cat-list">
                {['Digital Marketing', 'Graphics & Design', 'SEO', 'Social Media', 'Web Designing'].map(cat => (
                  <li key={cat}>
                    <Link href="/blog" className="flex items-center justify-between w-full">
                      <span>{cat}</span>
                      <ArrowRight size={13} />
                    </Link>
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

            {/* Boost Banner Widget */}
            <div className="sidebar-widget !p-0 overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
              <Link href="/contact#form" className="block group w-full">
                <img
                  src="/BOOST.png"
                  alt="Boost Your Business With Digital ORRA"
                  className="w-full aspect-square object-contain block rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                />
              </Link>
            </div>

          </aside>

        </div>
      </div>

      {/* Global Footer */}
      <Footer hideCta={true} />
    </div>
  );
}