"use server";

import { createAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { verifyTOTP } from "@/lib/totp";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

const TOTP_COOKIE = "totp_session";
const TOTP_VALUE = "verified";

// ─── Session Management ──────────────────────────────────────────────────────

/**
 * STEP 1: Request Email OTP.
 */
export async function sendEmailOTPAction(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient();
    if (!supabase) return { success: false, error: "Database not configured." };

    // 1. Verify if email is authorized
    const { data: personalInfo } = await supabase.from("personal_info").select("email").eq("id", 1).single();
    if (!personalInfo || personalInfo.email !== email) {
      return { success: false, error: "Unauthorized email address." };
    }

    if (!resend) return { success: false, error: "Email service (Resend) not configured." };

    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins

    // 3. Save to Supabase auth_otps
    const { error: dbError } = await supabase.from("auth_otps").insert({
      email,
      otp_code: otp,
      expires_at: expiresAt,
    });

    if (dbError) throw dbError;

    // 4. Send Email via Resend
    await resend.emails.send({
      from: "Admin Auth <onboarding@resend.dev>",
      to: email,
      subject: "Your Admin Login Code",
      text: `Your dynamic login code is: ${otp}\nThis code expires in 10 minutes.`,
    });

    return { success: true };
  } catch (error) {
    console.error("Email OTP Error:", error);
    return { success: false, error: "Failed to send login code." };
  }
}

/**
 * STEP 2: Verify Email OTP & Authenticator combined.
 */
export async function loginAdminAction(email: string, emailOTP: string, totpToken: string): Promise<{ success: boolean; error?: string; nextStep?: "done" }> {
  try {
    const supabase = createAdminClient();
    if (!supabase) return { success: false, error: "Database not configured." };

    // 1. Verify Email OTP from Supabase
    const { data: otpRecord, error: otpError } = await supabase
      .from("auth_otps")
      .select("*")
      .eq("email", email)
      .eq("otp_code", emailOTP)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (otpError || !otpRecord) {
      return { success: false, error: "Invalid or expired email code." };
    }

    // 2. Verify TOTP (Two-Factor Authentication)
    const validTOTP = verifyTOTP(totpToken);
    if (!validTOTP) {
      return { success: false, error: "Invalid Authenticator code." };
    }

    // 3. Cleanup: Delete used OTP
    await supabase.from("auth_otps").delete().eq("id", otpRecord.id);

    // 4. Set server-side session cookie (HTTP-only, secure)
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true, nextStep: "done" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Server error during authentication." };
  }
}

export async function logoutAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function checkAdminAuth(): Promise<{ isAdmin: boolean }> {
  const cookieStore = await cookies();
  return { isAdmin: cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE };
}

async function requireAdmin(): Promise<void> {
  const { isAdmin } = await checkAdminAuth();
  if (!isAdmin) throw new Error("Unauthorized: admin session required.");
}

export async function verifyTotpAndStartSession(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!token || typeof token !== "string" || !/^\d{6}$/.test(token)) {
      return { success: false, error: "Enter a valid 6-digit code." };
    }
    const validToken = verifyTOTP(token);
    if (!validToken) return { success: false, error: "Invalid or expired 2FA code. Try again." };

    const cookieStore = await cookies();
    cookieStore.set(TOTP_COOKIE, TOTP_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });

    return { success: true };
  } catch {
    return { success: false, error: "Server error during verification." };
  }
}

export async function checkTotpSession(): Promise<{ verified: boolean }> {
  const cookieStore = await cookies();
  return { verified: cookieStore.get(TOTP_COOKIE)?.value === TOTP_VALUE };
}


export async function getAllAdminData() {
  const supabase = createAdminClient();
  
  // Try to get from localStorage (simulated via service-client side if it was real, 
  // but here we just return a "base" state that they can edit).
  // Note: For a true "builder" experience without DB, we'd need a client-side store.
  // I will enhance the client components to handle the "Supabase not configured" state.
  
  if (!supabase) {
    // If Supabase is not configured, we return an empty or minimal state.
    // This prevents the admin dashboard from being completely empty while setting up.
    return {
      personalInfo: { name: "New User", tagline: "Configure your Supabase", bio: "", location: "", email: "" },
      projects: [],
      achievements: [],
      experiences: [],
      education: []
    };
  }
  
    const [personalInfoRes, projectsRes, achievementsRes, experiencesRes, educationRes, skillsRes, categoriesRes, socialRes] = await Promise.all([
    supabase.from("personal_info").select("*").single(),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("achievements").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("social_links").select("*").order("sort_order")
  ]);

  return {
    personalInfo: personalInfoRes.data ? { ...personalInfoRes.data, bioExtended: personalInfoRes.data.bio_extended, profileImage: personalInfoRes.data.profile_image, logoImage: personalInfoRes.data.logo_image, studentId: personalInfoRes.data.student_id, stats: personalInfoRes.data.stats } : null,
    projects: (projectsRes.data || []).map((p: any) => ({
      ...p,
      techStack: p.tech_stack ?? [],
      githubUrl: p.github_url ?? "",
      liveUrl: p.live_url ?? "",
    })),
    achievements: achievementsRes.data || [],
    experiences: experiencesRes.data || [],
    education: educationRes.data || [],
    skills: skillsRes.data || [],
    skillCategories: categoriesRes.data || [],
    socialLinks: socialRes.data || []
  };
}

export async function updatePersonalInfo(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [] };
    draftData.personalInfo = { ...draftData.personalInfo, ...data };
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 }); // 24h
    return { success: true };
  }

  const { error } = await supabase
    .from("personal_info")
    .update({
      name: data.name,
      tagline: data.tagline,
      bio: data.bio,
      bio_extended: data.bioExtended,
      location: data.location,
      email: data.email,
      phone: data.phone,
      profile_image: data.profileImage,
      logo_image: data.logoImage,
      university: data.university,
      student_id: data.studentId,
      batch: data.batch,
      stats: data.stats, // Added stats
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/about");
  return { success: true };
}

// Removed redundant verifyAdminCredentials (consolidated into loginAdminAction)

export async function updateProject(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [] };
    
    const idx = draftData.projects.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      draftData.projects[idx] = {
        ...draftData.projects[idx],
        ...data,
        tech_stack: data.techStack,
        github_url: data.githubUrl,
        live_url: data.liveUrl,
        image_url: data.imageUrl,
      };
    } else {
      draftData.projects.push({
        ...data,
        id,
        tech_stack: data.techStack,
        github_url: data.githubUrl,
        live_url: data.liveUrl,
        image_url: data.imageUrl,
      });
    }
    
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title: data.title,
      description: data.description,
      tech_stack: data.techStack,
      github_url: data.githubUrl,
      live_url: data.liveUrl,
      image_url: data.imageUrl,
      featured: data.featured,
      status: data.status,
      sort_order: data.sort_order
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function createProject(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("projects")
    .insert([{
      title: data.title,
      slug: data.title.toLowerCase().replace(/ /g, "-"),
      description: data.description,
      tech_stack: data.techStack,
      github_url: data.githubUrl,
      live_url: data.liveUrl,
      image_url: data.imageUrl,
      featured: data.featured,
      status: data.status,
    }]);

  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function getInboxMessages() {
  const supabase = createAdminClient();
  if (!supabase) {
    return [
      { id: "1", name: "John Doe", email: "john@example.com", subject: "Test Message", message: "This is a test message to show the UI without Supabase.", created_at: new Date().toISOString() }
    ];
  }
  
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");
  
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  return { success: true };
}

export async function createAchievement(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const newId = Math.random().toString(36).substring(7);
    draftData.achievements.push({ ...data, id: newId });
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("achievements")
    .insert([{
      title: data.title,
      description: data.description,
      image_url: data.imageUrl,
      category: data.category,
      date: data.date,
      issuer: data.issuer,
      sort_order: data.sort_order || 99
    }]);
    
  if (error) throw error;
  revalidatePath("/achievements");
  revalidatePath("/");
  return { success: true };
}

export async function updateAchievement(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const idx = draftData.achievements.findIndex((a: any) => a.id === id);
    if (idx >= 0) draftData.achievements[idx] = { ...draftData.achievements[idx], ...data };
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("achievements")
    .update({
      title: data.title,
      description: data.description,
      image_url: data.imageUrl,
      category: data.category,
      date: data.date,
      issuer: data.issuer,
      sort_order: data.sort_order
    })
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/achievements");
  revalidatePath("/");
  return { success: true };
}

export async function deleteAchievement(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    if (existing) {
      const draftData = JSON.parse(existing);
      draftData.achievements = draftData.achievements.filter((a: any) => a.id !== id);
      cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    }
    return { success: true };
  }
  
  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/achievements");
  revalidatePath("/");
  return { success: true };
}

// ─── Experience ─────────────────────────────────────────────────────────────

export async function createExperience(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const newId = Math.random().toString(36).substring(7);
    draftData.experiences.push({ ...data, id: newId });
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("experiences")
    .insert([{
      title: data.title,
      type: data.type,
      duration: data.duration,
      description: data.description,
      tags: data.tags,
      sort_order: data.sort_order || 99
    }]);
    
  if (error) throw error;
  revalidatePath("/experience");
  revalidatePath("/");
  return { success: true };
}

export async function updateExperience(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const idx = draftData.experiences.findIndex((e: any) => e.id === id);
    if (idx >= 0) draftData.experiences[idx] = { ...draftData.experiences[idx], ...data };
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("experiences")
    .update({
      title: data.title,
      type: data.type,
      duration: data.duration,
      description: data.description,
      tags: data.tags,
      sort_order: data.sort_order
    })
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/experience");
  revalidatePath("/");
  return { success: true };
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    if (existing) {
      const draftData = JSON.parse(existing);
      draftData.experiences = draftData.experiences.filter((e: any) => e.id !== id);
      cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    }
    return { success: true };
  }
  
  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/experience");
  revalidatePath("/");
  return { success: true };
}

// ─── Education ──────────────────────────────────────────────────────────────

export async function createEducation(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const newId = Math.random().toString(36).substring(7);
    draftData.education.push({ ...data, id: newId, logo_url: data.logoUrl });
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("education")
    .insert([{
      institution: data.institution,
      degree: data.degree,
      field: data.field,
      duration: data.duration,
      logo_url: data.logoUrl,
      url: data.url,
      details: data.details,
      sort_order: data.sort_order || 99
    }]);
    
  if (error) throw error;
  revalidatePath("/education");
  revalidatePath("/");
  return { success: true };
}

export async function updateEducation(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [], experiences: [], education: [] };
    const idx = draftData.education.findIndex((e: any) => e.id === id);
    if (idx >= 0) draftData.education[idx] = { ...draftData.education[idx], ...data, logo_url: data.logoUrl };
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
  
  const { error } = await supabase
    .from("education")
    .update({
      institution: data.institution,
      degree: data.degree,
      field: data.field,
      duration: data.duration,
      logo_url: data.logoUrl,
      url: data.url,
      details: data.details,
      sort_order: data.sort_order
    })
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/education");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    if (existing) {
      const draftData = JSON.parse(existing);
      draftData.education = draftData.education.filter((e: any) => e.id !== id);
      cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    }
    return { success: true };
  }
  
  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/education");
  revalidatePath("/");
  return { success: true };
}

// ─── Storage (Images/Assets) ───────────────────────────────────────────────

export async function uploadAdminAsset(params: {
  bucket?: string;
  folder?: string;
  filename: string;
  contentType: string;
  bytesBase64: string;
}): Promise<{ publicUrl: string }> {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");

  const bucket = params.bucket ?? "portfolio";
  const folder = (params.folder ?? "assets").replace(/^\/+|\/+$/g, "");
  const safeName = params.filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const bytes = Buffer.from(params.bytesBase64, "base64");
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, bytes, {
    contentType: params.contentType,
    upsert: true,
    cacheControl: "3600",
  });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) throw new Error("Failed to get public URL");
  return { publicUrl: data.publicUrl };
}

// ─── Skills ─────────────────────────────────────────────────────────────────

export async function createSkill(data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured for Skills management yet");
  
  const { error } = await supabase
    .from("skills")
    .insert([{
      name: data.name,
      level: data.level,
      category_id: data.category_id,
      sort_order: data.sort_order || 99
    }]);
    
  if (error) throw error;
  revalidatePath("/skills");
  revalidatePath("/");
  return { success: true };
}

export async function updateSkill(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");
  
  const { error } = await supabase
    .from("skills")
    .update({
      name: data.name,
      level: data.level,
      category_id: data.category_id,
      sort_order: data.sort_order
    })
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/skills");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");
  
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/skills");
  revalidatePath("/");
  return { success: true };
}

// ─── Social Links ───────────────────────────────────────────────────────────

export async function updateSocialLink(id: string, data: any) {
  await requireAdmin();
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");
  
  const { error } = await supabase
    .from("social_links")
    .update({
      label: data.label,
      url: data.url,
      icon: data.icon,
      sort_order: data.sort_order
    })
    .eq("id", id);
    
  if (error) throw error;
  revalidatePath("/");
  return { success: true };
}
