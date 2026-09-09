import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Service from "@/models/Service";
import { servicesData } from "@/data/servicesData";

export default async function sitemap() {
  const baseUrl = "https://digitalorra.com";

  // 1. Core Static Pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company-profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/join-our-team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Dynamic Service Pages (at root URL /:slug)
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
    // Fallback to static servicesData
    servicesData.forEach((srv) => {
      servicePages.push({
        url: `${baseUrl}/${srv.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // 3. Dynamic Blog Articles (at root URL /:slug)
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

  return [...staticPages, ...servicePages, ...blogPages];
}
