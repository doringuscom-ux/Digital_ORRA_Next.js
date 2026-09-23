import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/locations");
}

export default function LocationsLayout({ children }) {
  return children;
}
