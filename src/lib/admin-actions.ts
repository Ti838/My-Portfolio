"use server";

import { createAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyTOTP } from "@/lib/totp";

export async function getAllAdminData() {
  const supabase = createAdminClient();
  
  // Try to get from localStorage (simulated via service-client side if it was real, 
  // but here we just return a "base" state that they can edit).
  // Note: For a true "builder" experience without DB, we'd need a client-side store.
  // I will enhance the client components to handle the "Supabase not configured" state.
  
  if (!supabase) {
    const cookieStore = cookies();
    const draft = cookieStore.get("portfolio_draft")?.value;
    const draftData = draft ? JSON.parse(draft) : null;

    return {
      personalInfo: draftData?.personalInfo || {
        id: 1,
        name: "Timon Biswas", tagline: "CSE Student & AI Enthusiast", bio: "Testing the admin panel", 
        bioExtended: "Testing extended bio", location: "Dhaka, Bangladesh", email: "test@example.com", 
        phone: "+8801779976858", profileImage: "/images/profile.jpg", logoImage: "/images/logo.png", university: "SMUCT", 
        studentId: "241071015", batch: "34th", stats: {
          certificates: "4+", icpc_rank: "Honorable Mention", languages: "Java/C++/PHP", projects: "14+"
        },
        announcement: { text: "Open to exciting opportunities!", link: "", active: true }
      },
      projects: draftData?.projects || [{ id: "1", title: "Philomedis Mobile App", description: "Medical management system.", techStack: ["Java", "Firebase"], githubUrl: "", liveUrl: "", featured: true, status: "in-progress" }],
      achievements: draftData?.achievements || [{ id: "1", title: "ICPC 2024", description: "Honorable Mention", imageUrl: "", category: "Award", date: "2024-11-01", issuer: "ICPC", sort_order: 1 }],
      experiences: draftData?.experiences || [],
      education: draftData?.education || []
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
    projects: projectsRes.data || [],
    achievements: achievementsRes.data || [],
    experiences: experiencesRes.data || [],
    education: educationRes.data || [],
    skills: skillsRes.data || [],
    skillCategories: categoriesRes.data || [],
    socialLinks: socialRes.data || []
  };
}

export async function updatePersonalInfo(data: any) {
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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

export async function verifyAdminCredentials(password: string, token: string) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Supabase not configured");

  // 1. Check Password
  const { data, error } = await supabase
    .from("personal_info")
    .select("admin_password")
    .eq("id", 1)
    .single();

  if (error || !data) throw new Error("Could not verify credentials");

  if (data.admin_password !== password) {
    return { success: false, error: "Incorrect admin password." };
  }

  // 2. Check TOTP
  const validToken = verifyTOTP(token);
  if (!validToken) {
    return { success: false, error: "Invalid 2FA code." };
  }

  return { success: true };
}

export async function updateProject(id: string, data: any) {
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
    const existing = cookieStore.get("portfolio_draft")?.value;
    const draftData = existing ? JSON.parse(existing) : { personalInfo: {}, projects: [], achievements: [] };
    
    const idx = draftData.projects.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      draftData.projects[idx] = { ...draftData.projects[idx], ...data, tech_stack: data.techStack, github_url: data.githubUrl, live_url: data.liveUrl };
    } else {
      draftData.projects.push({ ...data, id, tech_stack: data.techStack, github_url: data.githubUrl, live_url: data.liveUrl });
    }
    
    cookieStore.set("portfolio_draft", JSON.stringify(draftData), { maxAge: 60 * 60 * 24 });
    return { success: true };
  }
}

export async function createProject(data: any) {
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
      featured: data.featured,
      status: data.status,
    }]);

  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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
  const supabase = createAdminClient();
  if (!supabase) {
    const cookieStore = cookies();
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

// ─── Skills ─────────────────────────────────────────────────────────────────

export async function createSkill(data: any) {
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


