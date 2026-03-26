import { NextRequest, NextResponse } from "next/server";
import { verifyTOTP } from "@/lib/totp";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string" || !/^\d{6}$/.test(token)) {
      return NextResponse.json({ error: "Enter a valid 6-digit code." }, { status: 400 });
    }

    // Verify TOTP against Google Authenticator secret
    const valid = verifyTOTP(token);
    if (!valid) {
      return NextResponse.json({ error: "Invalid or expired code. Try again." }, { status: 401 });
    }

    // Generate a 60-second signed URL from Supabase Storage
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase connection not configured." }, { status: 500 });
    }
    const storagePath = process.env.RESUME_STORAGE_PATH ?? "resume/timon-biswas-cv.pdf";
    const [bucket, ...rest] = storagePath.split("/");
    const filePath = rest.join("/");

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 60); // URL expires in 60 seconds

    if (error || !data?.signedUrl) {
      console.error("Storage error:", error);
      return NextResponse.json({ error: "Could not generate download link. Check Supabase Storage setup." }, { status: 500 });
    }

    return NextResponse.json({ url: data.signedUrl }, { status: 200 });
  } catch (err) {
    console.error("Resume API error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
