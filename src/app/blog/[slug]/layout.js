import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return await getSeoMetadata(`/blog/${slug}`);
}

export default function BlogDetailLayout({ children }) {
  return children;
}
