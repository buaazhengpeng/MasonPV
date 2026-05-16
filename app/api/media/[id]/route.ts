import { NextResponse } from "next/server";

type MediaDetailRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: MediaDetailRouteContext) {
  const { id } = await context.params;

  return NextResponse.json({
    id,
    message: "Media detail API scaffold is ready.",
  });
}
