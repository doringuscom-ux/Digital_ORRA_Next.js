import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalImageSeoObserver from "../components/GlobalImageSeoObserver";
import { getSiteSettings } from "../lib/getSiteSettings";
import GaPageViewTracker from "../components/GaPageViewTracker";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const SITE_TITLE = "Digital ORRA – Digital Marketing Company in India";
const SITE_DESCRIPTION = "Digital ORRA is a leading digital marketing company in India offering SEO, Google Ads, Meta Ads, social media marketing, website development, graphic designing, video production, branding, CRM solutions and AI-powered digital growth services to help businesses increase visibility, generate leads and grow online.";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://digitalorra.com"),
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://digitalorra.com",
    siteName: "Digital ORRA",
    images: [
      {
        url: "/DO JPG.jpeg",
        width: 1200,
        height: 630,
        alt: "Digital ORRA Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/DO JPG.jpeg"],
  },
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "gs2DVScH_akuk5X8gCMvYW4cSiS-R7MP7uYoFVCBg04",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital ORRA",
  "url": "https://digitalorra.com",
  "logo": "https://digitalorra.com/DO%20JPG.jpeg",
  "image": "https://digitalorra.com/DO%20JPG.jpeg",
  "description": SITE_DESCRIPTION,
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

// Re-generate static pages at most once an hour so admin-managed settings (GA ID, SEO)
// self-heal if the DB was unreachable during a build. Admin saves still apply instantly.
export const revalidate = 3600;

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

// GA4 ID saved in Admin → Google Analytics (falls back to env var)
async function getGaMeasurementId() {
  const settings = await getSiteSettings();
  const id = settings.gaEnabled
    ? settings.gaMeasurementId
    : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  return GA_ID_PATTERN.test(id) ? id : "";
}

export default async function RootLayout({ children }) {
  const gaMeasurementId = await getGaMeasurementId();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="gs2DVScH_akuk5X8gCMvYW4cSiS-R7MP7uYoFVCBg04" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11104822865"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-11104822865');${gaMeasurementId ? `
              if (!location.pathname.startsWith('/admin')) {
                gtag('config', '${gaMeasurementId}');
                window.__gaConfigured = true;
              }` : ""}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${outfit.className} min-h-full flex flex-col font-sans`}>
        <GlobalImageSeoObserver />
        {gaMeasurementId && <GaPageViewTracker measurementId={gaMeasurementId} />}
        {children}
      </body>
    </html>
  );
}
