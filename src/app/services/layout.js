import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/services");
}

export default function ServicesLayout({ children }) {
  return children;
}
