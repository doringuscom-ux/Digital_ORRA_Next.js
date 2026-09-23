import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/skill-development-workshop");
}

export default function WorkshopLayout({ children }) {
  return children;
}
