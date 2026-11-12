"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// How long to wait for the new page's <title> before sending the page view anyway
const TITLE_WAIT_MS = 1500;

/**
 * Sends a GA4 page_view on in-site navigations, but only after Next.js has
 * updated document.title — so reports show the correct page title.
 * The first page view is sent by gtag('config') in the root layout.
 * Requires GA → Data stream → Enhanced measurement →
 * "Page changes based on browser history events" to be OFF (else double counts).
 */
export default function GaPageViewTracker({ measurementId }) {
  const pathname = usePathname();
  const lastTracked = useRef({ path: pathname, title: "" });

  useEffect(() => {
    if (!lastTracked.current.title) lastTracked.current.title = document.title;
    if (pathname === lastTracked.current.path) return; // first load / same page

    const prevTitle = lastTracked.current.title;
    lastTracked.current.path = pathname;

    let sent = false;
    let observer;
    let timer;

    const send = () => {
      if (sent) return;
      sent = true;
      observer?.disconnect();
      clearTimeout(timer);
      lastTracked.current.title = document.title;

      if (pathname.startsWith("/admin")) return;
      if (!window.__gaConfigured || typeof window.gtag !== "function") return;

      window.gtag("event", "page_view", {
        send_to: measurementId,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
      });
    };

    if (document.title && document.title !== prevTitle) {
      send();
    } else {
      observer = new MutationObserver(() => {
        if (document.title && document.title !== prevTitle) send();
      });
      observer.observe(document.head, { childList: true, subtree: true, characterData: true });
      timer = setTimeout(send, TITLE_WAIT_MS);
    }

    return () => {
      observer?.disconnect();
      clearTimeout(timer);
    };
  }, [pathname, measurementId]);

  return null;
}
