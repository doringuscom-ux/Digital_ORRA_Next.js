"use client";

import { useEffect } from "react";

/**
 * DynamicSeoHead component.
 * Note: Core SEO metadata (title, description, canonical, OG tags, Twitter cards)
 * is now pre-rendered directly on the server via Next.js Server-Side Metadata (generateMetadata)
 * for 0ms loading time and 100% Googlebot crawler indexing accuracy.
 *
 * This component is maintained for handling any client-side dynamic overrides (customTitle, customDesc).
 */
export default function DynamicSeoHead({ path, customTitle, customDesc, customKeywords }) {
  useEffect(() => {
    function setCanonicalAndOgUrl(forcedUrl) {
      try {
        let canonicalUrl = forcedUrl;
        if (!canonicalUrl && typeof window !== "undefined") {
          canonicalUrl = `${window.location.origin}${window.location.pathname}`;
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
    }
  }, [path, customTitle, customDesc]);

  return null;
}
