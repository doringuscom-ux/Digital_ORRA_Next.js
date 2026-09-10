const mongoose = require('../node_modules/mongoose');
const https = require('https');

const uri = "mongodb://doreactdigitalorra_db_user:gqAxLDJ57x5yOhTy@ac-tuopxmj-shard-00-00.deewppb.mongodb.net:27017,ac-tuopxmj-shard-00-01.deewppb.mongodb.net:27017,ac-tuopxmj-shard-00-02.deewppb.mongodb.net:27017/digitalorra?ssl=true&replicaSet=atlas-o1c0hq-shard-0&authSource=admin&appName=DigitalORRA";

const slugs = [
  "website-designing-development-company-in-zirakpur",
  "website-designing-development-company-in-peer-muchalla",
  "digital-marketing-company-in-panchkula",
  "digital-marketing-company-in-chandigarh",
  "digital-marketing-company-in-mohali",
  "digital-marketing-company-in-zirakpur",
  "digital-marketing-company-in-peer-muchalla",
  "seo-company-in-panchkula",
  "seo-company-in-chandigarh",
  "seo-company-in-mohali",
  "seo-company-in-zirakpur",
  "seo-company-in-peer-muchalla",
  "social-media-marketing-company-in-chandigarh",
  "social-media-marketing-company-in-mohali",
  "social-media-marketing-company-in-zirakpur",
  "social-media-marketing-company-in-peer-muchalla",
  "video-editing-company-in-panchkula",
  "video-editing-company-in-chandigarh",
  "video-editing-company-in-mohali",
  "video-editing-company-in-zirakpur",
  "video-editing-company-in-peer-muchalla"
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', (err) => resolve({ status: 500, error: err.message }));
  });
}

function stripTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

function extractMeta(html, nameOrProp) {
  const reg = new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${nameOrProp}["'][^>]*content=["']([^"']*)["']`, 'i');
  const m = html.match(reg);
  if (m) return m[1];
  const reg2 = new RegExp(`<meta\\s+content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProp}["']`, 'i');
  const m2 = html.match(reg2);
  return m2 ? m2[1] : '';
}

function detectCity(slug) {
  if (slug.includes('peer-muchalla') || slug.includes('peer-muchala')) return 'Peer Muchalla';
  if (slug.includes('zirakpur')) return 'Zirakpur';
  if (slug.includes('panchkula')) return 'Panchkula';
  if (slug.includes('chandigarh')) return 'Chandigarh';
  if (slug.includes('mohali')) return 'Mohali';
  return 'Panchkula';
}

function formatTitleFromSlug(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collection = db.collection('locationpages');

  console.log(`Starting automated scrape & import for ${slugs.length} pages...`);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const url = `https://digitalorra.com/${slug}/`;
    const city = detectCity(slug);
    console.log(`[${i+1}/${slugs.length}] Fetching ${url}...`);

    let metaTitle = '';
    let metaDesc = '';
    let h1 = '';
    let paragraphs = [];
    let headings = [];

    const { status, html } = await fetchHtml(url);

    if (status === 200 && html) {
      metaTitle = extractMeta(html, 'og:title') || '';
      if (!metaTitle) {
        const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
        if (titleMatch) metaTitle = titleMatch[1];
      }
      metaDesc = extractMeta(html, 'description') || extractMeta(html, 'og:description') || '';

      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) h1 = stripTags(h1Match[1]);

      const hMatches = [...html.matchAll(/<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi)];
      headings = hMatches
        .map(m => stripTags(m[2]))
        .filter(t => t.length > 5 && !t.toLowerCase().includes('useful links') && !t.toLowerCase().includes('about us') && !t.toLowerCase().includes('service') && !t.toLowerCase().includes('office address'));

      const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      paragraphs = pMatches
        .map(m => stripTags(m[1]))
        .filter(p => p.length > 35 && !p.toLowerCase().includes('all rights reserved') && !p.toLowerCase().includes('scooter') && !p.toLowerCase().includes('copyright'));
    }

    const title = h1 || (metaTitle ? metaTitle.split('|')[0].trim() : '') || formatTitleFromSlug(slug);
    const heroSubheadline = paragraphs[0] || `Digital ORRA stands as your primary digital marketing and technology company in ${city}, delivering innovative, scalable, and high-impact digital solutions for ambitious brands.`;
    const whyLocalTitle = headings[0] || `Why Every Business in ${city} Needs a Dominant Digital Presence`;
    const whyLocalContent = paragraphs[1] || paragraphs[0] || `In the rapidly evolving commercial hub of ${city}, digital transformation is the single biggest catalyst for customer acquisition, brand authority, and sustainable revenue growth.`;

    let whyChooseReasons = [];
    if (headings.length > 2) {
      for (let j = 1; j < Math.min(headings.length, 6); j++) {
        whyChooseReasons.push({
          title: headings[j],
          desc: paragraphs[j+1] || `Tailored execution engineered to give your brand an unfair advantage in ${city}.`,
          iconName: "CheckCircle2"
        });
      }
    }
    if (whyChooseReasons.length < 3) {
      whyChooseReasons = [
        { title: `Proven Local Track Record in ${city}`, desc: `Years of hands-on expertise scaling leading businesses across ${city} and the Tricity region.`, iconName: "CheckCircle2" },
        { title: "Cutting-Edge Performance Stack", desc: "Fast, modern architecture built for maximum conversion rates, speed, and 99.9% uptime SLA.", iconName: "CheckCircle2" },
        { title: "Dedicated Growth Strategists", desc: "Transparent milestones, dedicated account management, and real-time ROI tracking.", iconName: "CheckCircle2" },
        { title: "Targeted Multi-Channel Funnels", desc: "Precision campaigns designed to acquire high-value customers across search and social channels.", iconName: "CheckCircle2" },
        { title: "24/7 Strategic & Technical Support", desc: "Continuous optimization, technical security, and proactive growth guidance.", iconName: "CheckCircle2" }
      ];
    }

    const processSteps = [
      { step: "PHASE 01", title: "Discovery & Market Research", desc: `In-depth analysis of your target demographic in ${city}, competitors, and commercial growth goals.` },
      { step: "PHASE 02", title: "Strategy & Wireframe Approval", desc: "Developing bespoke conversion architecture, interactive prototypes, and strategic roadmaps." },
      { step: "PHASE 03", title: "High-Performance Execution", desc: "Crafting modern solutions with clean code, responsive design, and enterprise-grade speed." },
      { step: "PHASE 04", title: "Quality Assurance & Scaling", desc: "Comprehensive testing, high-impact deployment, and ongoing optimization for maximum ROI." }
    ];

    const localAdvantageContent = `At Digital ORRA, we take pride in offering ${city} businesses global-standard digital solutions backed by responsive regional presence. From startups and healthcare institutions to retail and corporations, we build digital infrastructure that drives revenue.`;

    const doc = {
      title: title,
      slug: slug,
      city: city,
      heroBadge: `Premier Solutions in ${city}`,
      heroHeadline: title,
      heroSubheadline: heroSubheadline,
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      whyLocalTitle: whyLocalTitle,
      whyLocalContent: whyLocalContent,
      whyLocalImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      whyChooseTitle: `Why Choose Digital ORRA as Your Partner in ${city}?`,
      whyChooseReasons: whyChooseReasons,
      servicesTitle: `Our Comprehensive Services in ${city}`,
      servicesSubtitle: `Tailored digital services engineered to dominate your niche across ${city}.`,
      servicesList: [],
      processTitle: "Our Process: From Concept to Completion",
      processSubtitle: "Transparent execution from initial discovery to live production deployment.",
      processSteps: processSteps,
      localAdvantageTitle: `Regional Presence, Global Standards in ${city}`,
      localAdvantageContent: localAdvantageContent,
      localAdvantageImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      ctaTitle: "Your Digital Journey Starts Here",
      ctaSubtitle: `Don't let an outdated digital presence hold your business back. Partner with Digital ORRA in ${city} today.`,
      metaTitle: metaTitle || `${title} | Digital ORRA`,
      metaDescription: metaDesc || heroSubheadline.slice(0, 160),
      metaKeywords: `${slug.replace(/-/g, ' ')}, ${city.toLowerCase()} digital marketing, digital orra`,
      isPublished: true,
      updatedAt: new Date(),
      createdAt: new Date()
    };

    await collection.updateOne(
      { slug: slug },
      { $set: doc },
      { upsert: true }
    );

    console.log(` Created/Updated: /${slug} (${city})`);
  }

  console.log("SUCCESS: All 21 location landing pages scraped and imported into MongoDB!");
  await mongoose.disconnect();
}

run().catch(console.error);
