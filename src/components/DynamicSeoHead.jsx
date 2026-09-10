"use client";

import { useEffect } from "react";

export default function DynamicSeoHead({ path, customTitle, customDesc, customKeywords }) {
  useEffect(() => {
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
            if (data.robots) {
              let metaRobots = document.querySelector('meta[name="robots"]');
              if (!metaRobots) {
                metaRobots = document.createElement("meta");
                metaRobots.name = "robots";
                document.head.appendChild(metaRobots);
              }
              metaRobots.content = data.robots;
            }

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
