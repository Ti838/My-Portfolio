import { NextRequest, NextResponse } from "next/server";

import { verifyTotpAndStartSession } from "@/lib/admin-actions";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const result = await verifyTotpAndStartSession(token);
    if (!result.success) {
      return NextResponse.json({ error: result.error ?? "Verification failed" }, { status: 401 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
