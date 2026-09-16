"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GlobalImageSeoObserver:
 * Automatically monitors all <img> elements across the entire website in real-time.
 * If any image lacks an alt tag or title attribute, it dynamically sets meaningful,
 * SEO-optimized values based on headings, parent text, src filename, or page title.
 */
export default function GlobalImageSeoObserver() {
  const pathname = usePathname();

  useEffect(() => {
    function cleanNameFromSrc(src) {
      if (!src) return "Digital ORRA";
      try {
        const urlPart = src.split("?")[0];
        const filename = urlPart.split("/").pop() || "";
        const cleanName = decodeURIComponent(filename)
          .replace(/\.[^/.]+$/, "") // strip extension
          .replace(/[-_]+/g, " ") // replace - and _ with space
          .trim();
        if (cleanName && cleanName.length > 2 && !cleanName.match(/^[0-9a-f]{8,}$/i)) {
          return cleanName
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        }
      } catch (e) {}
      return "Digital ORRA";
    }

    function enrichImages() {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.getAttribute("src") || img.src || "";
        if (!src) return;

        // 1. Determine fallback descriptive text
        let contextualText = "";

        // Check nearest headings or captions
        const cardOrSection = img.closest("article, section, figure, .group, a, div");
        if (cardOrSection) {
          const heading = cardOrSection.querySelector("h1, h2, h3, h4, h5, h6");
          if (heading && heading.textContent) {
            contextualText = heading.textContent.trim();
          }
        }

        if (!contextualText) {
          contextualText = cleanNameFromSrc(src);
        }

        // 2. Ensure ALT tag exists
        const currentAlt = img.getAttribute("alt");
        if (!currentAlt || currentAlt.trim() === "") {
          const newAlt = contextualText.includes("Digital ORRA")
            ? contextualText
            : `${contextualText} - Digital ORRA`;
          img.setAttribute("alt", newAlt);
        }

        // 3. Ensure TITLE tag exists
        const currentTitle = img.getAttribute("title");
        if (!currentTitle || currentTitle.trim() === "" || currentTitle === "/") {
          const finalAlt = img.getAttribute("alt") || contextualText;
          const newTitle = finalAlt.includes("Digital ORRA")
            ? finalAlt
            : `${finalAlt} | Digital ORRA`;
          img.setAttribute("title", newTitle);
        }
      });
    }

    // Run immediately on route change & after DOM settles
    enrichImages();
    const timeoutId = setTimeout(enrichImages, 800);
    const timeoutId2 = setTimeout(enrichImages, 2500);

    // MutationObserver to catch lazy-loaded / asynchronously fetched images
    const observer = new MutationObserver((mutations) => {
      let hasNewImg = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          hasNewImg = true;
          break;
        }
      }
      if (hasNewImg) {
        enrichImages();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
