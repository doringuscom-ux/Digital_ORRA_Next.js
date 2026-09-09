import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Seo from "@/models/Seo";
import Service from "@/models/Service";
import { servicesData } from "@/data/servicesData";

// Default pre-populated static pages with rich SEO metadata
export const defaultPagesSeo = [
  {
    pagePath: "/",
    pageName: "Home Page",
    metaTitle: "Digital ORRA | Top Digital Marketing & Growth Agency",
    metaDescription: "Scale your revenue with Digital ORRA. Expert performance marketing, paid ads, viral social media management, brand development, and web solutions.",
    metaKeywords: "digital marketing agency, performance marketing, social media marketing, SEO agency, PPC, Digital ORRA",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com",
    robots: "index, follow"
  },
  {
    pagePath: "/about-us",
    pageName: "About Us",
    metaTitle: "About Digital ORRA | Architects of Modern Digital Growth",
    metaDescription: "Learn how Digital ORRA transforms businesses through creative disruption, data-backed media buying, and cutting-edge digital craftsmanship.",
    metaKeywords: "about digital orra, digital agency team, marketing experts, brand vision",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/about-us",
    robots: "index, follow"
  },
  {
    pagePath: "/our-team",
    pageName: "Our Team & Leadership",
    metaTitle: "Meet Our Team | Digital ORRA Leadership & Specialists",
    metaDescription: "Meet the growth strategists, media buyers, creative designers, and developers behind Digital ORRA's award-winning campaigns.",
    metaKeywords: "digital orra team, marketing leadership, creative directors, developers",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/our-team",
    robots: "index, follow"
  },
  {
    pagePath: "/services",
    pageName: "Services (Main Catalog)",
    metaTitle: "Our Services | Performance Marketing, SEO, Ads & Branding",
    metaDescription: "Explore our full suite of premium digital growth services: Google & Meta Ads, Social Media Handling, Technical SEO, Video Production, and Web Tech.",
    metaKeywords: "digital marketing services, performance media, SEO services, social media management",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/services",
    robots: "index, follow"
  },
  {
    pagePath: "/courses",
    pageName: "Academy Courses",
    metaTitle: "Digital Marketing & Tech Courses | Digital ORRA Academy",
    metaDescription: "Master high-income digital marketing skills with live practical agency internships, certification, and 100% placement support at Digital ORRA.",
    metaKeywords: "digital marketing course, SEO course, performance marketing certification, practical internship",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/courses",
    robots: "index, follow"
  },
  {
    pagePath: "/company-profile",
    pageName: "Company Profile",
    metaTitle: "Company Profile & Credentials | Digital ORRA",
    metaDescription: "Discover Digital ORRA's official corporate profile, client case studies, executive team leadership, capabilities, and award-winning campaigns.",
    metaKeywords: "digital orra profile, agency credentials, corporate deck, digital marketing milestones",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/company-profile",
    robots: "index, follow"
  },
  {
    pagePath: "/gallery",
    pageName: "Media Gallery",
    metaTitle: "Life at Digital ORRA | Agency Media & Culture Gallery",
    metaDescription: "Step inside Digital ORRA agency life. Explore high-energy team events, production shoots, celebration moments, and workshop highlights.",
    metaKeywords: "digital orra gallery, agency culture, work life, team photos",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/gallery",
    robots: "index, follow"
  },
  {
    pagePath: "/join-our-team",
    pageName: "Careers & Join Our Team",
    metaTitle: "Careers at Digital ORRA | Open Roles & Opportunities",
    metaDescription: "Join high-impact creators, marketers, and developers. Explore current job openings, immediate hiring roles, and fast-track career benefits.",
    metaKeywords: "digital marketing jobs, agency careers, media buyer jobs, graphic designer jobs",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/join-our-team",
    robots: "index, follow"
  },
  {
    pagePath: "/blog",
    pageName: "Blogs & Insights",
    metaTitle: "Digital Marketing Insights & Industry News | Digital ORRA Blog",
    metaDescription: "Actionable growth strategies, algorithm updates, ROAS tactics, and design trends curated by Digital ORRA's in-house specialists.",
    metaKeywords: "digital marketing blog, SEO tips, marketing case studies, social media trends",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/blog",
    robots: "index, follow"
  },
  {
    pagePath: "/contact",
    pageName: "Contact Us",
    metaTitle: "Contact Digital ORRA | Get a Free Strategic Growth Proposal",
    metaDescription: "Ready to scale your brand? Connect with Digital ORRA for custom agency proposals, consultation, and partnership opportunities.",
    metaKeywords: "contact digital orra, hire digital marketing agency, marketing quote",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/contact",
    robots: "index, follow"
  },
  {
    pagePath: "/faqs",
    pageName: "Frequently Asked Questions",
    metaTitle: "Frequently Asked Questions (FAQs) | Digital ORRA",
    metaDescription: "Find answers to all queries regarding our marketing packages, timeline deliverables, billing structure, contracts, and onboarding process.",
    metaKeywords: "digital orra faqs, digital marketing questions, agency deliverables",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/faqs",
    robots: "index, follow"
  },
  {
    pagePath: "/privacy-policy",
    pageName: "Privacy & Refund Policy",
    metaTitle: "Privacy & Refund Policy | Digital ORRA",
    metaDescription: "Read Digital ORRA's official Privacy and Refund policy, project delivery scope, and terms of service.",
    metaKeywords: "privacy policy, refund policy, terms of service, digital orra",
    ogImage: "/DO JPG.jpeg",
    canonicalUrl: "https://digitalorra.com/privacy-policy",
    robots: "index, follow"
  }
];

// GET /api/seo?path=/about-us OR GET all
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    // If specific path requested
    if (path) {
      let pageSeo = await Seo.findOne({ pagePath: path });
      if (!pageSeo) {
        // Find in default list and insert
        const defaultMatch = defaultPagesSeo.find((p) => p.pagePath === path);
        if (defaultMatch) {
          pageSeo = await Seo.create(defaultMatch);
        } else {
          // Check if path is a root service (e.g. /social-media-handling)
          const srvSlug = path.replace(/^\//, "");
          const srv = (await Service.findOne({ id: srvSlug })) || servicesData.find((s) => s.id === srvSlug);
          if (srv) {
            pageSeo = await Seo.create({
              pagePath: path,
              pageName: `Service: ${srv.title}`,
              metaTitle: `${srv.title} Services | Digital ORRA`,
              metaDescription: srv.shortDesc || srv.desc || `Top-rated ${srv.title} services by Digital ORRA.`,
              metaKeywords: `${srv.title}, ${srv.category}, digital marketing`,
              ogImage: "/DO JPG.jpeg",
              canonicalUrl: `https://digitalorra.com${path}`,
              robots: "index, follow"
            });
          }
        }
      }
      return NextResponse.json(pageSeo || {});
    }

    // Otherwise fetch all static page SEO items
    let allSeo = await Seo.find().sort({ createdAt: 1 });

    // Build complete defaults including dynamic services
    let allDefaults = [...defaultPagesSeo];
    try {
      const dbServices = await Service.find();
      const serviceList = dbServices && dbServices.length > 0 ? dbServices : servicesData;
      serviceList.forEach((srv) => {
        const sPath = `/${srv.id}`;
        if (!allDefaults.some((d) => d.pagePath === sPath)) {
          allDefaults.push({
            pagePath: sPath,
            pageName: `Service: ${srv.title}`,
            metaTitle: `${srv.title} Services | Digital ORRA`,
            metaDescription: srv.shortDesc || srv.desc || `Professional ${srv.title} services designed to drive exponential revenue.`,
            metaKeywords: `${srv.title}, ${srv.category}, performance agency`,
            ogImage: "/DO JPG.jpeg",
            canonicalUrl: `https://digitalorra.com${sPath}`,
            robots: "index, follow"
          });
        }
      });
    } catch (e) {
      // Ignore
    }

    // Auto-seed missing pages
    const existingPaths = new Set(
      allSeo.map((p) => p.pagePath || (p.pageSlug === 'home' ? '/' : '/' + p.pageSlug))
    );
    const missingDefaults = allDefaults.filter((p) => !existingPaths.has(p.pagePath));
    if (missingDefaults.length > 0) {
      for (const item of missingDefaults) {
        const slug = item.pagePath === '/' ? 'home' : item.pagePath.replace(/^\//, '');
        const exists = await Seo.findOne({ $or: [{ pagePath: item.pagePath }, { pageSlug: slug }] });
        if (!exists) {
          const newDoc = new Seo({ ...item, pageSlug: slug });
          await newDoc.save();
        }
      }
      allSeo = await Seo.find().sort({ createdAt: 1 });
    }

    // Normalize and deduplicate all records so pagePath is unique and guaranteed
    const seenPaths = new Set();
    const uniqueNormalized = [];

    for (const item of allSeo) {
      const obj = item.toObject ? item.toObject() : { ...item };
      if (!obj.pagePath && obj.pageSlug) {
        obj.pagePath = obj.pageSlug === 'home' ? '/' : '/' + obj.pageSlug.replace(/^blog\//, '');
      }
      if (!obj.metaKeywords && obj.focusKeywords) {
        obj.metaKeywords = obj.focusKeywords;
      }
      
      const normalizedPath = obj.pagePath || (obj.pageSlug === 'home' ? '/' : '/' + obj.pageSlug);
      obj.pagePath = normalizedPath;

      if (!seenPaths.has(normalizedPath)) {
        seenPaths.add(normalizedPath);
        uniqueNormalized.push(obj);
      }
    }

    return NextResponse.json(uniqueNormalized);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch SEO settings", message: err.message },
      { status: 500 }
    );
  }
}

// POST or PUT /api/seo - Update or create page SEO
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.pagePath) {
      return NextResponse.json({ error: "pagePath is required" }, { status: 400 });
    }

    const updated = await Seo.findOneAndUpdate(
      { pagePath: body.pagePath },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update SEO settings", message: err.message },
      { status: 400 }
    );
  }
}
