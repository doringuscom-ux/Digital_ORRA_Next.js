// Comprehensive HTML Entities decoder helper for titles, excerpts, meta descriptions, categories, etc.
const HTML_ENTITIES_MAP = {
  '&#8217;': "'",
  '&#8216;': "'",
  '&#8220;': '"',
  '&#8221;': '"',
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8230;': '…',
  '&#038;': '&',
  '&#38;': '&',
  '&#39;': "'",
  '&#34;': '"',
  '&rsquo;': "'",
  '&lsquo;': "'",
  '&rdquo;': '"',
  '&ldquo;': '"',
  '&ndash;': '–',
  '&mdash;': '—',
  '&hellip;': '…',
  '&amp;': '&',
  '&nbsp;': ' ',
  '&quot;': '"',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
};

export function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str || '';
  
  let decoded = str;

  // Replace named & decimal numeric entities
  Object.keys(HTML_ENTITIES_MAP).forEach((entity) => {
    if (decoded.includes(entity)) {
      decoded = decoded.split(entity).join(HTML_ENTITIES_MAP[entity]);
    }
  });

  // Handle generic &#xxxx; decimal numbers
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10));
    } catch {
      return match;
    }
  });

  // Handle generic &#xXXXX; hex numbers
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch {
      return match;
    }
  });

  return decoded;
}

export function cleanBlogFields(blog) {
  if (!blog || typeof blog !== 'object') return blog;

  const cleaned = { ...blog };
  if (cleaned.title) cleaned.title = decodeHtmlEntities(cleaned.title);
  if (cleaned.excerpt) cleaned.excerpt = decodeHtmlEntities(cleaned.excerpt);
  if (cleaned.category) cleaned.category = decodeHtmlEntities(cleaned.category);
  if (cleaned.metaTitle) cleaned.metaTitle = decodeHtmlEntities(cleaned.metaTitle);
  if (cleaned.metaDescription) cleaned.metaDescription = decodeHtmlEntities(cleaned.metaDescription);
  if (cleaned.content) cleaned.content = decodeHtmlEntities(cleaned.content);

  return cleaned;
}
