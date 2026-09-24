import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/sitemap");
}

export default function SitemapLayout({ children }) {
  return children;
}
