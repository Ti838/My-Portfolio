// ─── Portfolio Data Types ───────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "planned";
}

export interface Skill {
  name: string;
  level: number; // 0–100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  type: "work" | "volunteer" | "competition";
  duration: string;
  description: string;
  tags?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  logoUrl: string;
  url?: string;
  details?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "competitive-programming" | "academic" | "singing" | "other";
  date: string;
  issuer?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  readingTime?: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  bioExtended?: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  logoImage: string;
  university?: string;
  studentId?: string;
  batch?: string;
  stats?: {
    certificates?: string;
    icpc_rank?: string;
    languages?: string;
    projects?: string;
  };
  admin_password?: string;
  announcement?: {
    text: string;
    link: string;
    active: boolean;
  };
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
