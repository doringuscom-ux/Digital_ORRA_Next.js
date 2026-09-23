import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/privacy-policy");
}

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
