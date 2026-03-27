import { createAdminClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createClient } from '@supabase/supabase-js';

export const getTechColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("java") && !t.includes("javascript")) return "bg-orange-100/80 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
  if (t.includes("dart") || t.includes("flutter")) return "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400";
  if (t.includes("javascript") || t.includes("js")) return "bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  if (t.includes("python")) return "bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
  if (t.includes("php")) return "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400";
  if (t.includes("react") || t.includes("next")) return "bg-sky-100/80 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400";
  if (t.includes("firebase") || t.includes("supabase") || t.includes("database") || t.includes("sql")) return "bg-amber-100/80 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
  if (t.includes("css") || t.includes("tailwind")) return "bg-fuchsia-100/80 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400";
  if (t.includes("html")) return "bg-rose-100/80 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400";
  if (t.includes("c++") || t.includes("c")) return "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400";
  if (t.includes("ai") || t.includes("machine learning")) return "bg-purple-100/80 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
  
  return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
};
import type {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  Achievement,
  SocialLink,
} from "@/types";

// ─── Static Fallbacks ─────────────────────────────────────────────────────────

const staticPersonalInfo = {
  name: "Timon Biswas",
  tagline: "CSE Student · AI & ML Enthusiast · Competitive Programmer · Vocalist",
  bio: "I am a student of the Computer Science and Engineering (CSE) department at Shanto-Mariam University of Creative Technology. I'm passionate about coding and software development. My goal is to specialize in Artificial Intelligence (AI) and create intelligent systems that can enhance human capabilities and solve real-world problems.",
  bioExtended:
    "I have a strong foundation in programming languages such as C, C++, and Java, and I am currently learning Android development and exploring AI and machine learning technologies. I believe in continuous learning and always aim to improve my skills. In addition to my academic pursuits, I am also involved in competitive programming on platforms like Codeforces.",
  location: "Dhaka, Bangladesh",
  email: "timonbiswas33@gmail.com",
  phone: "+8801779976858",
  profileImage: "/images/profile.jpg",
  logoImage: "/images/logo.png",
  university: "Shanto-Mariam University of Creative Technology",
  studentId: "241071015",
  batch: "34th",
  stats: {
    certificates: "4+",
    icpc_rank: "Honorable Mention",
    languages: "Java/C++/PHP",
    projects: "14+",
  },
  announcement: {
    text: "",
    link: "",
    active: false
  }
};

const staticSocialLinks: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/Ti838", icon: "FiGithub" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/timon-biswas-83493a328/", icon: "FiLinkedin" },
  { label: "Codeforces", url: "https://codeforces.com/profile/Timon15", icon: "FiCode" },
  { label: "WhatsApp", url: "https://wa.me/+8801779976858", icon: "FiMessageCircle" },
];

const staticProjects: Project[] = [
  {
    id: "philomedis-mobile",
    title: "Philomedis Mobile App",
    description: "A comprehensive medical management mobile application developed natively. Built to handle complex healthcare operations and patient records.",
    techStack: ["Java", "Android SDK", "Firebase"],
    featured: true,
    githubUrl: "https://github.com/Ti838/philomedisMobile-app",
    status: "in-progress"
  },
  {
    id: "speed-guard",
    title: "Speed Guard",
    description: "A mobile application focused on tracking and safety, built entirely with Dart and Flutter for a seamless cross-platform experience.",
    techStack: ["Dart", "Flutter"],
    featured: true,
    githubUrl: "https://github.com/Ti838/Speed-Guard",
    status: "completed"
  },
  {
    id: "hostel-management",
    title: "Hostel Management System",
    description: "A robust system for managing hostel operations, including resident tracking, allocations, and administrative tasks.",
    techStack: ["JavaScript", "Full-Stack"],
    featured: true,
    githubUrl: "https://github.com/Ti838/Hostel-Management",
    status: "completed"
  },
  {
    id: "bank-transaction",
    title: "Bank Transaction System",
    description: "A secure financial transaction simulation system with object-oriented architectures implemented in both PHP and Python.",
    techStack: ["Python", "PHP"],
    featured: true,
    githubUrl: "https://github.com/Ti838/Bank-Transaction-system---python-version",
    status: "completed"
  },
  {
    id: "subscribly",
    title: "Subscribly App",
    description: "A seamless subscription tracking and management platform offering deep insights into recurring costs and usage.",
    techStack: ["JavaScript", "HTML", "CSS"],
    featured: true,
    githubUrl: "https://github.com/Ti838/Subscribly",
    status: "completed"
  },
  {
    id: "jerry-ai",
    title: "Jerry AI Integration",
    description: "An interactive AI companion featuring real-time conversational intelligence with a clean web interface.",
    techStack: ["JavaScript", "Artificial Intelligence", "CSS"],
    featured: true,
    githubUrl: "https://github.com/Ti838/jerry",
    status: "completed"
  }
];

const staticSkillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: "FiCode",
    skills: [
      { name: "Java", level: 85 },
      { name: "C/C++", level: 90 },
      { name: "JavaScript/TS", level: 75 },
      { name: "PHP", level: 70 },
      { name: "Python", level: 60 },
      { name: "Dart", level: 55 },
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: "FiTool",
    skills: [
      { name: "Android SDK", level: 70 },
      { name: "Next.js", level: 65 },
      { name: "Flutter", level: 50 },
      { name: "Git & GitHub", level: 85 },
    ],
  },
  {
    category: "Competitive Programming",
    icon: "FiAward",
    skills: [
      { name: "Data Structures", level: 80 },
      { name: "Algorithms", level: 78 },
      { name: "Problem Solving", level: 82 },
      { name: "ICPC", level: 70 },
    ],
  },
  {
    category: "Creative Skills",
    icon: "FiMusic",
    skills: [
      { name: "Vocal Performance", level: 75 },
      { name: "Stage Presence", level: 70 },
    ],
  },
];

const staticExperiences: ExperienceItem[] = [
  {
    id: "jerry-ai",
    title: "AI Developer — Jerry AI Voice Assistant",
    type: "work",
    duration: "2026 – Present",
    description: "Built an advanced voice assistant equipped with Hugging Face free AI models and PC/Android automation capabilities. Key features include background listening with a wake word and a unified server process.",
    tags: ["Python", "Hugging Face API", "AI Agent"],
  },
  {
    id: "philomedis-web",
    title: "Full Stack Developer — Philomedis Web App",
    type: "work",
    duration: "2025 – Present",
    description: "Developed the core web infrastructure for Philomedis, a hospital management ecosystem. Implemented secure database schemas and responsive dashboard interfaces.",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
  },
  {
    id: "medical-app-dev",
    title: "Solo Developer — Philomedis Mobile App",
    type: "work",
    duration: "2026 – Present",
    description: "Developing a comprehensive medical management application designed to streamline hospital operations, including patient record management and appointment scheduling.",
    tags: ["Java", "Firebase", "Android Studio"],
  },
  {
    id: "task-management-dev",
    title: "Full Stack Developer — Task Management System",
    type: "work",
    duration: "2026",
    description: "Developed a modern task management application featuring a Next.js drag-and-drop board, secure user authentication, and real-time database updates.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: "competitive-programmer",
    title: "Competitive Programmer (ICPC)",
    type: "competition",
    duration: "2023 – Present",
    description: "Actively participating in competitive programming on platforms like Codeforces and LeetCode. Earned an Honorable Mention at the ICPC Asia Dhaka Preliminary 2024.",
    tags: ["Codeforces", "LeetCode", "ICPC", "C++"],
  },
];

const staticEducation: EducationItem[] = [
  {
    id: "smuct",
    institution: "Shanto-Mariam University of Creative Technology",
    degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
    duration: "2024 – Present",
    logoUrl: "/images/university-logo.png",
    url: "https://smuct.ac.bd/",
    details: ["Batch: 34th", "Student ID: 241071015"],
  },
  {
    id: "notre-dame",
    institution: "Notre Dame College, Mymensingh",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    duration: "Passed 2023",
    logoUrl: "/images/college-logo.png",
    url: "https://ndcm.edu.bd/",
  },
  {
    id: "osmanpur",
    institution: "Osmanpur High School",
    degree: "Secondary School Certificate (SSC)",
    field: "Science",
    duration: "Passed 2021",
    logoUrl: "/images/school-logo.jpg",
  },
];

const staticAchievements: Achievement[] = [
  {
    id: "icpc-2024",
    title: "ICPC Asia Dhaka Preliminary 2024",
    description:
      "Honorable Mention in the Online Preliminary Contest, 03 October – 09 November 2024, awarded by ICPC Executive Director William B. Poucher, Ph.D.",
    imageUrl: "/images/cert-icpc.png",
    category: "competitive-programming",
    date: "November 2024",
    issuer: "ICPC Foundation",
  },
  {
    id: "green-skills",
    title: "Green Skills for Future Employability",
    description:
      "Successfully completed on 6th March 2025, instructed by Joya Chowdhury, Education Specialist, The World Bank.",
    imageUrl: "/images/cert-green-skills.png",
    category: "academic",
    date: "March 2025",
    issuer: "FutureNation / UNDP",
  },
  {
    id: "sdg-primer",
    title: "The SDG Primer",
    description:
      "Completed on 14th October 2024, instructed by A. Z. M. Saleh, Monitoring & Evaluation Analyst, UNDP Bangladesh.",
    imageUrl: "/images/cert-sdg.png",
    category: "academic",
    date: "October 2024",
    issuer: "FutureNation / UNDP Bangladesh",
  },
  {
    id: "british-council",
    title: "English Online Self-Study: Daily Life (Level A2)",
    description:
      "Completed a 36-hour course on 24th February 2025, offered by the British Council.",
    imageUrl: "/images/cert-british-council.png",
    category: "academic",
    date: "February 2025",
    issuer: "British Council",
  },
];

// ─── Supabase Fetchers ────────────────────────────────────────────────────────

export async function getPersonalInfo() {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      const cookieStore = await cookies();
      const draft = cookieStore.get("portfolio_draft")?.value;
      if (draft) {
        const data = JSON.parse(draft).personalInfo;
        if (data && Object.keys(data).length > 0) return { ...staticPersonalInfo, ...data };
      }
      return staticPersonalInfo;
    }
    const { data, error } = await supabase.from("personal_info").select("*").single();
    if (error || !data) return staticPersonalInfo;
    return {
      ...data,
      bioExtended: data.bio_extended,
      profileImage: data.profile_image,
      logoImage: data.logo_image,
      studentId: data.student_id,
      stats: data.stats,
    };
  } catch {
    return staticPersonalInfo;
  }
}

export async function getSocialLinks() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticSocialLinks;
    const { data, error } = await supabase.from("social_links").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticSocialLinks;
    return data;
  } catch {
    return staticSocialLinks;
  }
}

export async function getProjects() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticProjects;
    const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticProjects;
    return data.map(p => ({
      ...p,
      techStack: p.tech_stack,
      imageUrl: p.image_url,
      githubUrl: p.github_url,
      liveUrl: p.live_url,
    }));
  } catch {
    return staticProjects;
  }
}

export async function getSkills() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticSkillCategories;
    const { data: categories, error: catError } = await supabase.from("skill_categories").select("*").order("sort_order", { ascending: true });
    if (catError || !categories) return staticSkillCategories;
    
    const { data: skills, error: skillError } = await supabase.from("skills").select("*").order("sort_order", { ascending: true });
    if (skillError || !skills) return staticSkillCategories;

    return categories.map(cat => ({
      ...cat,
      skills: skills.filter(s => s.category_id === cat.id)
    }));
  } catch {
    return staticSkillCategories;
  }
}

export async function getExperiences() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticExperiences;
    const { data, error } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticExperiences;
    return data;
  } catch {
    return staticExperiences;
  }
}

export async function getEducation() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticEducation;
    const { data, error } = await supabase.from("education").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticEducation;
    return data.map(e => ({
      ...e,
      logoUrl: e.logo_url,
    }));
  } catch {
    return staticEducation;
  }
}

export async function getAchievements() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return staticAchievements;
    const { data, error } = await supabase.from("achievements").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return staticAchievements;
    return data.map(a => ({
      ...a,
      imageUrl: a.image_url,
    }));
  } catch {
    return staticAchievements;
  }
}

// ─── Social Links ─────────────────────────────────────────────────────────────
// End of file
