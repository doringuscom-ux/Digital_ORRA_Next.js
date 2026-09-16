"use client";

import { useEffect } from "react";

export default function DynamicSeoHead({ path, customTitle, customDesc, customKeywords }) {
  useEffect(() => {
    function setCanonicalAndOgUrl(forcedUrl) {
      try {
        let canonicalUrl = forcedUrl;
        if (!canonicalUrl) {
          if (typeof window !== "undefined") {
            canonicalUrl = `${window.location.origin}${window.location.pathname}`;
          } else if (path) {
            canonicalUrl = `https://digitalorra.com${path === "/" ? "" : path}`;
          }
        }
        if (canonicalUrl) {
          let canLink = document.querySelector('link[rel="canonical"]');
          if (!canLink) {
            canLink = document.createElement("link");
            canLink.setAttribute("rel", "canonical");
            document.head.appendChild(canLink);
          }
          canLink.setAttribute("href", canonicalUrl);

          let ogUrl = document.querySelector('meta[property="og:url"]');
          if (!ogUrl) {
            ogUrl = document.createElement("meta");
            ogUrl.setAttribute("property", "og:url");
            document.head.appendChild(ogUrl);
          }
          ogUrl.content = canonicalUrl;
        }
      } catch (e) {}
    }

    function setRobotsTag(robotsVal) {
      try {
        const val = robotsVal || "index, follow";
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
          metaRobots = document.createElement("meta");
          metaRobots.name = "robots";
          document.head.appendChild(metaRobots);
        }
        metaRobots.content = val;
      } catch (e) {}
    }

    if (customTitle) {
      document.title = customTitle;
      if (customDesc) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.name = "description";
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = customDesc;
      }
      setCanonicalAndOgUrl();
      setRobotsTag();
      return;
    }

    if (!path) return;

    async function applySeo() {
      try {
        const res = await fetch(`/api/seo?path=${encodeURIComponent(path)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.metaTitle) {
            // Update document title
            document.title = data.metaTitle;

            // Update or create meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement("meta");
              metaDesc.name = "description";
              document.head.appendChild(metaDesc);
            }
            metaDesc.content = data.metaDescription || "";

            // Update or create meta keywords
            if (data.metaKeywords) {
              let metaKw = document.querySelector('meta[name="keywords"]');
              if (!metaKw) {
                metaKw = document.createElement("meta");
                metaKw.name = "keywords";
                document.head.appendChild(metaKw);
              }
              metaKw.content = data.metaKeywords;
            }

            // Update robots
            setRobotsTag(data.robots);

            // OpenGraph Title & Description
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
              ogTitle = document.createElement("meta");
              ogTitle.setAttribute("property", "og:title");
              document.head.appendChild(ogTitle);
            }
            ogTitle.content = data.metaTitle;

            let ogDesc = document.querySelector('meta[property="og:description"]');
            if (!ogDesc) {
              ogDesc = document.createElement("meta");
              ogDesc.setAttribute("property", "og:description");
              document.head.appendChild(ogDesc);
            }
            ogDesc.content = data.metaDescription || "";

            // OpenGraph Image
            if (data.ogImage) {
              let ogImg = document.querySelector('meta[property="og:image"]');
              if (!ogImg) {
                ogImg = document.createElement("meta");
                ogImg.setAttribute("property", "og:image");
                document.head.appendChild(ogImg);
              }
              ogImg.content = data.ogImage;
            }

            // Dynamic Canonical URL: Always points to currently open page URL
            setCanonicalAndOgUrl(data.canonicalUrl);

            // Schema.org Structured Data Injection
            try {
              let existingScript = document.querySelector('script[data-seo-schema="dynamic"]');
              if (existingScript) {
                existingScript.remove();
              }
              const script = document.createElement("script");
              script.type = "application/ld+json";
              script.setAttribute("data-seo-schema", "dynamic");

              if (data.structuredData && data.structuredData.trim()) {
                script.textContent = data.structuredData.trim();
              } else {
                // Default Rich Organization & LocalBusiness Schema
                const defaultSchema = {
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "name": "Digital ORRA",
                  "url": "https://digitalorra.com",
                  "logo": "https://digitalorra.com/DO%20JPG.jpeg",
                  "image": "https://digitalorra.com/DO%20JPG.jpeg",
                  "description": data.metaDescription || "Leading Digital Marketing Agency providing SEO, Web Design, and Ads.",
                  "telephone": "+91 90564 33303",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Panchkula",
                    "addressRegion": "Haryana",
                    "addressCountry": "IN"
                  },
                  "sameAs": [
                    "https://www.instagram.com/digitalorra",
                    "https://www.facebook.com/digitalorra"
                  ]
                };
                script.textContent = JSON.stringify(defaultSchema);
              }
              document.head.appendChild(script);
            } catch (schemaErr) {}
          }
        }
      } catch (err) {
        // Silent catch in case of offline or local network drop
      }
    }

    applySeo();
  }, [path]);

  return null;
}
