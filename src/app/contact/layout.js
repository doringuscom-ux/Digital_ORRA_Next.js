import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/contact");
}

export default function ContactLayout({ children }) {
  return children;
}
