import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      console.error("Contact API configuration error: createAdminClient returned null.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

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
