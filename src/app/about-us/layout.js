import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/about-us");
}

export default function AboutLayout({ children }) {
  return children;
}
