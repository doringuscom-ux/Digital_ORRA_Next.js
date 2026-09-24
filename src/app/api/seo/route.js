import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Seo from "@/models/Seo";
import Service from "@/models/Service";
import LocationPage from "@/models/LocationPage";
import Blog from "@/models/Blog";
import { servicesData } from "@/data/servicesData";

import { defaultPagesSeo } from "@/data/defaultSeo";
export { defaultPagesSeo };

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
          } else {
            // Check if path is a Location Page (e.g. /website-designing-development-company-in-zirakpur)
            const loc = await LocationPage.findOne({ slug: srvSlug });
            if (loc) {
              pageSeo = await Seo.create({
                pagePath: path,
                pageName: `City: ${loc.city} - ${loc.title}`,
                pageSlug: `location/${loc.slug}`,
                metaTitle: loc.metaTitle || `${loc.title} | Digital ORRA`,
                metaDescription: loc.metaDescription || loc.heroSubheadline || `Premier digital services in ${loc.city}.`,
                metaKeywords: loc.metaKeywords || `${loc.city}, digital marketing, digital orra`,
                ogImage: loc.ogImage || "/DO JPG.jpeg",
                canonicalUrl: `https://digitalorra.com${path}`,
                robots: "index, follow"
              });
            }
          }
        }
      }
      return NextResponse.json(pageSeo || {});
    }

    // Otherwise fetch all static page SEO items
    let allSeo = await Seo.find().sort({ createdAt: 1 });

    // Build complete defaults including dynamic services & location pages
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

    // Append all location pages from MongoDB
    try {
      const locationPages = await LocationPage.find();
      locationPages.forEach((loc) => {
        const lPath = `/${loc.slug}`;
        if (!allDefaults.some((d) => d.pagePath === lPath)) {
          allDefaults.push({
            pagePath: lPath,
            pageName: `City: ${loc.city} - ${loc.title}`,
            pageSlug: `location/${loc.slug}`,
            metaTitle: loc.metaTitle || `${loc.title} | Digital ORRA`,
            metaDescription: loc.metaDescription || loc.heroSubheadline || `Premier digital services in ${loc.city}.`,
            metaKeywords: loc.metaKeywords || `${loc.city}, digital marketing, digital orra`,
            ogImage: loc.ogImage || "/DO JPG.jpeg",
            canonicalUrl: `https://digitalorra.com${lPath}`,
            robots: "index, follow"
          });
        }
      });
    } catch (e) {
      // Ignore
    }

    // Append all blog articles from MongoDB so 100% of sitemap is covered
    try {
      const allBlogs = await Blog.find({}, "title slug metaTitle metaDescription focusKeywords featuredImage canonicalUrl").lean();
      allBlogs.forEach((b) => {
        const bPath = `/${b.slug}`;
        if (!allDefaults.some((d) => d.pagePath === bPath)) {
          allDefaults.push({
            pagePath: bPath,
            pageName: b.title || `Article: ${b.slug}`,
            pageSlug: `blog/${b.slug}`,
            metaTitle: b.metaTitle || `${b.title} | Digital ORRA`,
            metaDescription: b.metaDescription || `Read ${b.title} on Digital ORRA Insights.`,
            metaKeywords: b.focusKeywords || "digital marketing blog, digital orra",
            ogImage: b.featuredImage || "/DO JPG.jpeg",
            canonicalUrl: b.canonicalUrl || `https://digitalorra.com${bPath}`,
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

    // If it's a city/location page, sync back into LocationPage model as well
    try {
      const locSlug = body.pagePath.replace(/^\//, "");
      await LocationPage.findOneAndUpdate(
        { slug: locSlug },
        {
          $set: {
            metaTitle: body.metaTitle,
            metaDescription: body.metaDescription,
            metaKeywords: body.metaKeywords,
            ogImage: body.ogImage
          }
        }
      );
    } catch (e) {
      // Ignore sync error
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update SEO settings", message: err.message },
      { status: 400 }
    );
  }
}
