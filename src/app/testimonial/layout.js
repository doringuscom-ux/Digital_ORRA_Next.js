import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/testimonial");
}

export default function TestimonialLayout({ children }) {
  return children;
}
