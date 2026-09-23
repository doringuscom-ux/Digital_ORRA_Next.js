import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/portfolio");
}

export default function PortfolioLayout({ children }) {
  return children;
}
