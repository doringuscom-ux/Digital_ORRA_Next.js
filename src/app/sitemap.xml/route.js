import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Service from "@/models/Service";
import LocationPage from "@/models/LocationPage";
import { servicesData } from "@/data/servicesData";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date) {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export async function GET() {
  const baseUrl = "https://digitalorra.com";

  // 1. Core Static Pages
  const staticPages = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/our-team`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/company-profile`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/testimonial`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/skill-development-workshop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/join-our-team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/scan-qr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // 2. Dynamic Service Pages
  let servicePages = [];
  try {
    await dbConnect();
    const dbServices = await Service.find().lean();
    const serviceList = dbServices && dbServices.length > 0 ? dbServices : servicesData;

    const seenServiceSlugs = new Set();
    serviceList.forEach((srv) => {
      const slug = srv.id || srv.slug;
      if (slug && !seenServiceSlugs.has(slug)) {
        seenServiceSlugs.add(slug);
        servicePages.push({
          url: `${baseUrl}/${slug}`,
          lastModified: srv.updatedAt ? new Date(srv.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    });
  } catch (err) {
    console.error("Error generating sitemap services:", err);
    servicesData.forEach((srv) => {
      servicePages.push({
        url: `${baseUrl}/${srv.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // 3. Dynamic Blog Articles
  let blogPages = [];
  try {
    await dbConnect();
    const blogs = await Blog.find({}, "slug updatedAt createdAt date").lean();
    blogs.forEach((b) => {
      if (b.slug) {
        blogPages.push({
          url: `${baseUrl}/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : (b.createdAt ? new Date(b.createdAt) : new Date()),
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    });
  } catch (err) {
    console.error("Error generating sitemap blogs:", err);
  }

  // 4. Dynamic Location Pages
  let locationPages = [];
  try {
    await dbConnect();
    const locs = await LocationPage.find({}, "slug updatedAt createdAt").lean();
    locs.forEach((l) => {
      if (l.slug) {
        locationPages.push({
          url: `${baseUrl}/${l.slug}`,
          lastModified: l.updatedAt ? new Date(l.updatedAt) : (l.createdAt ? new Date(l.createdAt) : new Date()),
          changeFrequency: "daily",
          priority: 0.9,
        });
      }
    });
  } catch (err) {
    console.error("Error generating sitemap locations:", err);
  }

  const allPages = [...staticPages, ...servicePages, ...blogPages, ...locationPages];

  const xmlEntries = allPages
    .map(
      (page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${formatDate(page.lastModified)}</lastmod>
    <changefreq>${page.changeFrequency || "weekly"}</changefreq>
    <priority>${page.priority !== undefined ? page.priority.toFixed(2) : "0.70"}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
