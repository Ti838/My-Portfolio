import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from("messages")
      .insert({
        name,
        email,
        subject: subject || "No Subject",
        message,
        status: "unread",
      });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" }, { status: 200 });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
