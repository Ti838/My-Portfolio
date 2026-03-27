import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      error: "This endpoint has been retired. Use /admin/download (TOTP unlock) to preview, edit, and download your resume/CV.",
    },
    { status: 410 }
  );
}
