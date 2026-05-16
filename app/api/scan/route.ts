import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "idle",
    message: "Scan API endpoint ready. No scans configured yet.",
  });
}

export async function POST() {
  return NextResponse.json({
    status: "pending",
    message: "Scan API endpoint ready. Scanner not yet implemented.",
  });
}
