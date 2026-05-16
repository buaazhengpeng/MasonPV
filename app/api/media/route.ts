import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [],
    message: "Media list API scaffold is ready.",
  });
}
