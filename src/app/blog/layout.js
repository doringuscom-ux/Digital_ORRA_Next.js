import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/blog");
}

export default function BlogLayout({ children }) {
  return children;
}
