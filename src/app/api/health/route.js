import { NextResponse } from "next/server";

// Keep-alive heartbeat runner
let heartbeatActive = false;

function initHeartbeat() {
  if (heartbeatActive) return;
  heartbeatActive = true;

  const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

  setInterval(async () => {
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.RENDER_EXTERNAL_URL ||
        "https://digitalorra.com/";

      const target = `${siteUrl.replace(/\/$/, "")}/api/health`;
      console.log(`[Heartbeat] Pinging server at: ${target}`);

      const res = await fetch(target, { cache: "no-store" });
      console.log(`[Heartbeat] Response Status: ${res.status}`);
    } catch (err) {
      console.error("[Heartbeat] Error during self-ping:", err.message);
    }
  }, INTERVAL_MS);

  console.log("[Heartbeat] Self-ping scheduled for every 10 minutes.");
}

// Initialize on server start/first request
initHeartbeat();

export async function GET() {
  initHeartbeat();
  return NextResponse.json(
    {
      status: "alive",
      timestamp: new Date().toISOString(),
      message: "Render keep-alive ping successful!",
    },
    { status: 200 }
  );
}
