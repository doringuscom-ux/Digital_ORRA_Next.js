import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/company-profile");
}

export default function CompanyProfileLayout({ children }) {
  return children;
}
