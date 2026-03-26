import { NextRequest, NextResponse } from "next/server";
import { generateTOTPSecret, generateQRCode } from "@/lib/totp";

// This route is ONLY for initial setup. Remove or protect it after first use.
export async function GET(req: NextRequest) {
  // Simple guard: require a setup key in query param
  const setupKey = req.nextUrl.searchParams.get("key");
  if (setupKey !== process.env.TOTP_SETUP_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = generateTOTPSecret("Timon Biswas Portfolio");
  const qr = await generateQRCode(secret.otpauth_url ?? "");

  return NextResponse.json({
    base32: secret.base32,
    otpauth_url: secret.otpauth_url,
    qr_code_data_url: qr,
    instructions: [
      "1. Copy the base32 value below.",
      "2. Add it to your .env.local as TOTP_SECRET=<base32>",
      "3. Open Google Authenticator → Add account → Scan the QR code above OR enter the base32 manually.",
      "4. Delete or disable this endpoint in production!",
    ],
  });
}
