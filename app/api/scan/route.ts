import { NextResponse } from "next/server";
import { getLatestScanJob } from "@/lib/db";
import { scanMediaRoots } from "@/lib/media/scanner";

export async function GET() {
  return NextResponse.json({
    latestJob: getLatestScanJob(),
  });
}

export async function POST() {
  try {
    const summary = await scanMediaRoots();
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Media scan failed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
