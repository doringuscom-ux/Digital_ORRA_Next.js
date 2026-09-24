import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/faqs");
}

export default function FaqsLayout({ children }) {
  return children;
}
