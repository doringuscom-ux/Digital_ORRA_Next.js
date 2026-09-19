import { Outfit } from "next/font/google";
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
  title: "DIGITAL ORRA | Architects of Digital Dominance",
  description: "Premium Digital Marketing Agency",
  openGraph: {
    title: "DIGITAL ORRA | Architects of Digital Dominance",
    description: "Premium Digital Marketing & Web Development Agency in Panchkula & Chandigarh Tricity",
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
    title: "DIGITAL ORRA | Architects of Digital Dominance",
    description: "Premium Digital Marketing & Web Development Agency in Panchkula & Chandigarh Tricity",
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
      </head>
      <body suppressHydrationWarning className={`${outfit.className} min-h-full flex flex-col font-sans`}>
        <GlobalImageSeoObserver />
        {children}
      </body>
    </html>
  );
}
