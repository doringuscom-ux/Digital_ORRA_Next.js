import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return await getSeoMetadata(`/${slug}`);
}

export default function UniversalSlugLayout({ children }) {
  return children;
}
