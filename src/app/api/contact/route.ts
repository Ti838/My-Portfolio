import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      console.error("Contact API configuration error: createAdminClient returned null.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const { name, email, subject: msgSubject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from("messages")
      .insert({
        name,
        email,
        subject: msgSubject || "No Subject",
        message,
        status: "unread",
      });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
    }

    // Send Email Notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL || email, // Default to sender if no target set
          subject: `New Message: ${msgSubject || "General Inquiry"}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Note: We don't return an error to the user if the record was saved in DB
      }
    }

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" }, { status: 200 });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
