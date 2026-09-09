"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A1128] flex items-center justify-center text-gray-400">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-[#FF3399] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Redirecting to Admin Portal...</span>
      </div>
    </div>
  );
}
