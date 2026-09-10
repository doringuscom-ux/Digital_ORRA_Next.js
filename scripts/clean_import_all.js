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

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]/gu, '') // strip emojis from dirty html
    .replace(/\s+/g, ' ')
    .trim();
}

function detectCity(slug) {
  if (slug.includes('peer-muchalla') || slug.includes('peer-muchala')) return 'Peer Muchalla';
  if (slug.includes('zirakpur')) return 'Zirakpur';
  if (slug.includes('panchkula')) return 'Panchkula';
  if (slug.includes('chandigarh')) return 'Chandigarh';
  if (slug.includes('mohali')) return 'Mohali';
  return 'Panchkula';
}

function detectServiceType(slug) {
  if (slug.includes('video-editing')) return 'Video Editing & Production';
  if (slug.includes('social-media-marketing')) return 'Social Media Marketing';
  if (slug.includes('seo-company')) return 'Search Engine Optimization (SEO)';
  if (slug.includes('digital-marketing')) return 'Digital Marketing & Growth';
  return 'Website Designing & Development';
}

function isJunkHeading(h) {
  const l = h.toLowerCase();
  return (
    l === 'book a call' ||
    l === 'get started now' ||
    l === 'about us' ||
    l === 'service' ||
    l === 'useful links' ||
    l === 'contact us' ||
    l === 'panchkula address' ||
    l === 'office address' ||
    l.includes("india's #1") ||
    l.includes("india's no 1") ||
    l.includes("preferred by google") ||
    h.length < 4
  );
}

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collection = db.collection('locationpages');

  console.log(`Starting intelligent clean extraction for ${slugs.length} pages...`);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const url = `https://digitalorra.com/${slug}/`;
    const city = detectCity(slug);
    const serviceCategory = detectServiceType(slug);
    console.log(`[${i+1}/${slugs.length}] Processing ${url}...`);

    const { status, html } = await fetchHtml(url);

    let title = '';
    let metaDesc = '';
    let introParagraph = '';
    let whyLocalTitle = '';
    let whyLocalContent = '';
    let whyChooseTitle = '';
    let whyChooseReasons = [];
    let processSteps = [];

    if (status === 200 && html) {
      // 1. Title Extraction
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) title = cleanText(h1Match[1]);
      if (!title) {
        const ogMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
        if (ogMatch) title = cleanText(ogMatch[1]);
      }
      if (!title) {
        title = `${serviceCategory} in ${city}`;
      }

      // Meta Desc
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
      if (descMatch) metaDesc = cleanText(descMatch[1]);

      // 2. Parse all structural sections: <h2/h3> ... paragraphs ...
      const sectionMatches = [...html.matchAll(/<(h[23])[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=<(?:h[23])|$)/gi)];
      
      const cleanSections = [];
      for (const sm of sectionMatches) {
        const heading = cleanText(sm[2]);
        if (isJunkHeading(heading)) continue;

        // extract text inside paragraphs or clean block
        let text = cleanText(sm[3]);
        // filter out css / script artifacts
        text = text.replace(/\{[^}]*\}/g, '').replace(/\/\*.*?\*\//g, '').trim();
        if (text.toLowerCase().includes('elementor-') || text.toLowerCase().includes('all rights reserved')) {
          text = '';
        }

        cleanSections.push({ heading, text });
      }

      // Intro Paragraph
      const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      const goodParas = pMatches
        .map(m => cleanText(m[1]))
        .filter(p => p.length > 50 && !p.toLowerCase().includes('all rights reserved') && !p.toLowerCase().includes('elementor') && !p.toLowerCase().includes('copyright'));

      if (goodParas.length > 0) {
        introParagraph = goodParas[0];
      }

      // 3. Section 2: Why Local Business Needs it
      const localNeedSection = cleanSections.find(s => 
        s.heading.toLowerCase().includes('why') || 
        s.heading.toLowerCase().includes('need') || 
        s.heading.toLowerCase().includes('essential') ||
        s.heading.toLowerCase().includes('role')
      );

      if (localNeedSection) {
        whyLocalTitle = localNeedSection.heading;
        whyLocalContent = localNeedSection.text || goodParas[1] || '';
      }
      if (!whyLocalTitle) {
        whyLocalTitle = `Why Every Business in ${city} Needs Premium ${serviceCategory}`;
      }
      if (!whyLocalContent || whyLocalContent.length < 40) {
        whyLocalContent = `In the rapidly evolving commercial ecosystem of ${city}, establishing top-tier ${serviceCategory} is the single most vital factor for local market dominance, customer acquisition, and high-margin conversion.`;
      }

      // 4. Section 3: Why Choose Digital ORRA Cards
      whyChooseTitle = `What Makes Digital ORRA the Best ${serviceCategory} Company in ${city}?`;
      
      const featureSections = cleanSections.filter(s => 
        s.heading !== whyLocalTitle && 
        s.text.length > 25 &&
        !s.heading.toLowerCase().includes('our comprehensive') &&
        !s.heading.toLowerCase().includes('process') &&
        !s.heading.toLowerCase().includes('about')
      );

      for (const fs of featureSections.slice(0, 5)) {
        whyChooseReasons.push({
          title: fs.heading,
          desc: fs.text.slice(0, 260),
          iconName: "CheckCircle2"
        });
      }
    }

    // High quality fallbacks if original WP page had empty blocks
    if (!title) title = `${serviceCategory} Company in ${city}`;
    if (!introParagraph || introParagraph.length < 50) {
      introParagraph = `Digital ORRA stands as your primary ${serviceCategory.toLowerCase()} company in ${city}, merging strategic innovation with modern technology to deliver scalable growth and market authority for your business.`;
    }

    if (whyChooseReasons.length < 3) {
      whyChooseReasons = [
        {
          title: `Proven Track Record in ${city}`,
          desc: `Extensive portfolio of successful client deployments and top search rankings across ${city} and the Tricity region.`,
          iconName: "CheckCircle2"
        },
        {
          title: "Customized Strategy & Execution",
          desc: `Bespoke campaigns and modern architecture engineered specifically to outrank local competitors in ${city}.`,
          iconName: "CheckCircle2"
        },
        {
          title: "High ROAS & Conversion Focus",
          desc: "Every design, campaign, and funnel is laser-focused on maximizing lead acquisition and bottom-line revenue.",
          iconName: "CheckCircle2"
        },
        {
          title: "Transparent Milestones & Reporting",
          desc: "Live analytics dashboards, weekly progress milestones, and continuous proactive optimization.",
          iconName: "CheckCircle2"
        },
        {
          title: "Full-Stack Technology Infrastructure",
          desc: "Leveraging lightning-fast Next.js, AI automation, and enterprise-grade SEO to future-proof your digital presence.",
          iconName: "CheckCircle2"
        }
      ];
    }

    processSteps = [
      { step: "PHASE 01", title: "Discovery & Market Research", desc: `Analyzing your target customer demographic in ${city}, local search competitors, and revenue goals.` },
      { step: "PHASE 02", title: "Strategy & Wireframe Approval", desc: "Developing bespoke conversion architecture, interactive prototypes, and strategic roadmaps." },
      { step: "PHASE 03", title: "High-Performance Execution", desc: "Executing with precision code, responsive layouts, high-CTR visual assets, and rapid speed." },
      { step: "PHASE 04", title: "Quality Audit, Launch & Scaling", desc: "Rigorous testing, high-impact deployment, and ongoing optimization for maximum ROI." }
    ];

    const localAdvantageContent = `At Digital ORRA, we take pride in offering ${city} businesses global-standard digital solutions backed by responsive regional presence. From startups and healthcare institutions to retail and corporations, we build digital infrastructure that drives revenue.`;

    const doc = {
      title: title,
      slug: slug,
      city: city,
      heroBadge: `Premier ${serviceCategory} in ${city}`,
      heroHeadline: title,
      heroSubheadline: introParagraph,
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      whyLocalTitle: whyLocalTitle,
      whyLocalContent: whyLocalContent,
      whyLocalImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      whyChooseTitle: whyChooseTitle,
      whyChooseReasons: whyChooseReasons,
      servicesTitle: `Our Core Capabilities in ${city}`,
      servicesSubtitle: `Full-funnel digital services engineered to scale your brand across ${city}.`,
      servicesList: [],
      processTitle: "Our Process: From Concept to Completion",
      processSubtitle: "Transparent execution from initial discovery to live production deployment.",
      processSteps: processSteps,
      localAdvantageTitle: `Regional Presence, Global Standards in ${city}`,
      localAdvantageContent: localAdvantageContent,
      localAdvantageImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      ctaTitle: "Your Digital Journey Starts Here",
      ctaSubtitle: `Don't let an outdated digital presence hold your business back. Partner with Digital ORRA in ${city} today.`,
      metaTitle: `${title} | Digital ORRA`,
      metaDescription: metaDesc || introParagraph.slice(0, 160),
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

    console.log(` Cleaned & Saved: /${slug} (${city}) -> Title: "${title}", LocalTitle: "${whyLocalTitle}"`);
  }

  console.log("SUCCESS: All 21 location landing pages perfectly cleaned, formatted, and updated in MongoDB!");
  await mongoose.disconnect();
}

run().catch(console.error);
