import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "idle",
    message: "Scan status API scaffold is ready.",
  });
}

export async function POST() {
  return NextResponse.json(
    {
      status: "not_implemented",
      message: "Media scanning will be implemented in the next milestone.",
    },
    { status: 501 },
  );
}
