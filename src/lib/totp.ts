// TOTP helper – Google Authenticator compatible
// Uses the `speakeasy` library (RFC 6238 / HOTP RFC 4226)

import speakeasy from "speakeasy";
import QRCode from "qrcode";

/**
 * Verify a 6-digit TOTP token against the secret stored in env.
 */
export function verifyTOTP(token: string): boolean {
  const secret = process.env.TOTP_SECRET;
  if (!secret) return false;

  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1, // allow 1 step (30s) clock drift
  });
}

/**
 * Generate a new TOTP secret (run once during setup, save to env).
 * Returns { base32, otpauth_url }
 */
export function generateTOTPSecret(accountName = "Timon Portfolio") {
  return speakeasy.generateSecret({
    name: accountName,
    length: 20,
  });
}

/**
 * Generate a QR code data URL for scanning into Google Authenticator.
 */
export async function generateQRCode(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl);
}
