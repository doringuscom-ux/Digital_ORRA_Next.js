import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/join-our-team");
}

export default function JoinOurTeamLayout({ children }) {
  return children;
}
