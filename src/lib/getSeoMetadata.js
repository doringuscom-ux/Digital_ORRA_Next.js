import dbConnect from "@/lib/dbConnect";
import Seo from "@/models/Seo";
import Service from "@/models/Service";
import LocationPage from "@/models/LocationPage";
import Blog from "@/models/Blog";
import { servicesData } from "@/data/servicesData";
import { defaultPagesSeo } from "@/data/defaultSeo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalorra.com";

/**
 * Server-Side SEO Metadata generator for Next.js App Router.
 * Resolves metadata directly from MongoDB (custom SEO set in /admin/seo)
 * with instant fallback to static defaultPagesSeo.
 *
 * @param {string} path - E.g. "/" or "/about-us" or "/services"
 * @param {object} [customOverrides] - Optional manual overrides
 * @returns {Promise<import('next').Metadata>}
 */
export async function getSeoMetadata(path = "/", customOverrides = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanSlug = normalizedPath.replace(/^\//, "").replace(/^(services|blog)\//, "");

  // 1. Instant fallback from static defaults
  let matchedData = defaultPagesSeo.find((p) => p.pagePath === normalizedPath) || null;

  // If path is a service from static servicesData
  if (!matchedData && cleanSlug) {
    const staticSrv = servicesData.find((s) => s.id === cleanSlug);
    if (staticSrv) {
      matchedData = {
        pagePath: normalizedPath,
        pageName: `Service: ${staticSrv.title}`,
        metaTitle: `${staticSrv.title} Services | Digital ORRA`,
        metaDescription: staticSrv.shortDesc || staticSrv.desc || `Top-rated ${staticSrv.title} services by Digital ORRA.`,
        metaKeywords: `${staticSrv.title}, ${staticSrv.category || ""}, digital marketing`,
        ogImage: "/DO JPG.jpeg",
        canonicalUrl: `${SITE_URL}${normalizedPath}`,
        robots: "index, follow"
      };
    }
  }

  // 2. Query MongoDB for custom overrides (from Admin Panel)
  try {
    await dbConnect();

    // Check custom SEO table first
    const dbSeo = await Seo.findOne({ pagePath: normalizedPath }).lean();
    if (dbSeo && dbSeo.metaTitle) {
      matchedData = {
        ...matchedData,
        ...dbSeo
      };
    } else if (!matchedData && cleanSlug) {
      // Check LocationPage collection
      const loc = await LocationPage.findOne({ slug: cleanSlug }).lean();
      if (loc) {
        matchedData = {
          pagePath: normalizedPath,
          pageName: `City: ${loc.city} - ${loc.title}`,
          metaTitle: loc.metaTitle || `${loc.title} | Digital ORRA`,
          metaDescription: loc.metaDescription || loc.heroSubheadline || `Premier digital services in ${loc.city}.`,
          metaKeywords: loc.metaKeywords || `${loc.city}, digital marketing, digital orra`,
          ogImage: loc.ogImage || "/DO JPG.jpeg",
          canonicalUrl: `${SITE_URL}${normalizedPath}`,
          robots: "index, follow"
        };
      } else {
        // Check dynamic Service collection
        const dbSrv = await Service.findOne({ id: cleanSlug }).lean();
        if (dbSrv) {
          matchedData = {
            pagePath: normalizedPath,
            pageName: `Service: ${dbSrv.title}`,
            metaTitle: `${dbSrv.title} Services | Digital ORRA`,
            metaDescription: dbSrv.shortDesc || dbSrv.desc || `Professional ${dbSrv.title} services by Digital ORRA.`,
            metaKeywords: `${dbSrv.title}, digital marketing`,
            ogImage: "/DO JPG.jpeg",
            canonicalUrl: `${SITE_URL}${normalizedPath}`,
            robots: "index, follow"
          };
        } else {
          // Check dynamic Blog collection
          const blog = await Blog.findOne({ slug: cleanSlug }).lean();
          if (blog) {
            matchedData = {
              pagePath: normalizedPath,
              pageName: blog.title || "Blog Post",
              metaTitle: blog.metaTitle || (blog.title ? `${blog.title} | Digital ORRA` : "Digital ORRA Blog"),
              metaDescription: blog.metaDescription || blog.excerpt || "Read the latest digital marketing insights from Digital ORRA.",
              metaKeywords: blog.metaKeywords || "digital marketing blog, tips, insights",
              ogImage: blog.image || "/DO JPG.jpeg",
              canonicalUrl: `${SITE_URL}${normalizedPath}`,
              robots: "index, follow"
            };
          }
        }
      }
    }
  } catch (err) {
    // If DB is unreachable or timing out, gracefully continue with matchedData or defaults
    console.error("[getSeoMetadata] Error fetching custom SEO:", err.message || err);
  }

  // 3. Fallback defaults if still completely empty
  const title = customOverrides.title || matchedData?.metaTitle || "Digital ORRA | Top Digital Marketing & Growth Agency";
  const description = customOverrides.description || matchedData?.metaDescription || "Scale your revenue with Digital ORRA. Expert performance marketing, paid ads, SEO, and web solutions.";
  const canonical = customOverrides.canonical || matchedData?.canonicalUrl || `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const ogImg = customOverrides.ogImage || matchedData?.ogImage || "/DO JPG.jpeg";
  const keywords = customOverrides.keywords || matchedData?.metaKeywords || "";
  const robots = customOverrides.robots || matchedData?.robots || "index, follow";

  const ogImageUrl = ogImg.startsWith("http") ? ogImg : `${SITE_URL}${ogImg.startsWith("/") ? "" : "/"}${ogImg}`;

  return {
    title,
    description,
    keywords: keywords ? (typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : keywords) : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Digital ORRA",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: !robots.includes("noindex"),
      follow: !robots.includes("nofollow"),
      googleBot: {
        index: !robots.includes("noindex"),
        follow: !robots.includes("nofollow"),
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
