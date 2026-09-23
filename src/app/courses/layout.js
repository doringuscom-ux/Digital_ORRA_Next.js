import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/courses");
}

export default function CoursesLayout({ children }) {
  return children;
}
