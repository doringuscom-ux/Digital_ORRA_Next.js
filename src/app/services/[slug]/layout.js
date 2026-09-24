import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return await getSeoMetadata(`/services/${slug}`);
}

export default function ServiceDetailLayout({ children }) {
  return children;
}
