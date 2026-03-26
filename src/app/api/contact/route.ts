import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { client: null, error: "Supabase environment variables are not configured." };
  }

  try {
    new URL(supabaseUrl);
  } catch {
    return { client: null, error: "Invalid NEXT_PUBLIC_SUPABASE_URL." };
  }

  return { client: createClient(supabaseUrl, supabaseKey), error: null };
}

export async function POST(req: Request) {
  try {
    const { client: supabase, error: clientError } = getSupabaseClient();
    if (!supabase) {
      console.error("Contact API configuration error:", clientError);
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
