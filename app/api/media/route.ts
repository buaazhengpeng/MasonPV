import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [],
    total: 0,
    message: "Media API endpoint ready. No media indexed yet.",
  });
}
