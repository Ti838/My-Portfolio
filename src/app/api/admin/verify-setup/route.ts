import { NextRequest, NextResponse } from "next/server";
import { checkTOTP } from "@/lib/totp";

export async function POST(req: NextRequest) {
  try {
    const { token, secret, setupKey } = await req.json();

    // Guard: require the setup key to prevent unauthorized verification attempts
    if (setupKey !== process.env.TOTP_SETUP_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!token || !secret) {
      return NextResponse.json({ error: "Missing token or secret" }, { status: 400 });
    }

    const isValid = checkTOTP(token, secret);
    
    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid code. Please try again." });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
