import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "DIGITAL ORRA | Architects of Digital Dominance",
  description: "Premium Digital Marketing Agency",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`${outfit.className} min-h-full flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}
