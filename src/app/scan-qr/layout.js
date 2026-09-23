import { getSeoMetadata } from "@/lib/getSeoMetadata";

export async function generateMetadata() {
  return await getSeoMetadata("/scan-qr");
}

export default function ScanQrLayout({ children }) {
  return children;
}
