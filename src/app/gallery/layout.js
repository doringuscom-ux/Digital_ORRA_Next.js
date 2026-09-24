import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/gallery");
}

export default function GalleryLayout({ children }) {
  return children;
}
