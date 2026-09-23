import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/our-team");
}

export default function OurTeamLayout({ children }) {
  return children;
}
