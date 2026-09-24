import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalImageSeoObserver from "../components/GlobalImageSeoObserver";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
  title: "Digital ORRA | Top Digital Marketing & Growth Agency",
  description: "Scale your revenue with Digital ORRA. Expert performance marketing, paid ads, viral social media management, brand development, and web solutions in Panchkula & Chandigarh.",
  openGraph: {
    title: "Digital ORRA | Top Digital Marketing & Growth Agency",
    description: "Scale your revenue with Digital ORRA. Expert performance marketing, paid ads, viral social media management, brand development, and web solutions.",
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
    title: "Digital ORRA | Top Digital Marketing & Growth Agency",
    description: "Scale your revenue with Digital ORRA. Expert performance marketing, paid ads, viral social media management, brand development, and web solutions.",
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
  "description": "Premium Digital Marketing & Web Development Agency in Panchkula & Chandigarh Tricity",
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

export default function RootLayout({ children }) {
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

              gtag('config', 'AW-11104822865');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${outfit.className} min-h-full flex flex-col font-sans`}>
        <GlobalImageSeoObserver />
        {children}
      </body>
    </html>
  );
}
