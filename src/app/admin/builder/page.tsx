import { getPersonalInfo, getProjects, getSkills, getExperiences, getEducation, getAchievements, getSocialLinks } from "@/data/portfolio";
import AdminDashboard from "@/components/AdminDashboard";
import { ResumeData } from "@/components/ResumePDF";
import {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  Achievement,
  SocialLink,
} from "@/types";

export const metadata = { title: "Admin Dashboard | Timon Biswas" };

export default async function BuilderPage() {
  // Fetch initial data from Supabase (with static fallbacks)
  const [
    personalInfo,
    projects,
    skillCategories,
    experiences,
    education,
    achievements,
    socialLinks,
  ] = await Promise.all([
    getPersonalInfo(),
    getProjects(),
    getSkills(),
    getExperiences(),
    getEducation(),
    getAchievements(),
    getSocialLinks(),
  ]);

  // FOR DEMO PURPOSES: We let you see the dashboard even if auth is not set in this session
  // In production, this should be strictly protected by getServerSession or similar.
  
  const githubLink = socialLinks.find((s: SocialLink) => s.label.toLowerCase() === 'github')?.url;
  const githubUser = githubLink ? githubLink.split('/').pop() : '';

  const resumeInitial: ResumeData = {
    layout: "resume",
    personalInfo: {
      name: personalInfo.name,
      tagline: personalInfo.tagline,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      github: githubUser,
      linkedin: socialLinks.find((s: SocialLink) => s.label.toLowerCase() === 'linkedin')?.url,
      portfolio: "timonbiswas.vercel.app",
      profileImage: personalInfo.profileImage,
    },
    summary: personalInfo.bio,
    education: education.map((edu: EducationItem) => ({
      institution: edu.institution,
      degree: edu.degree,
      duration: edu.duration,
      details: edu.details || [],
    })),
    experience: experiences.map((exp: ExperienceItem) => ({
      title: exp.title,
      org: exp.type === 'work' ? 'Experience' : 'Competition/Project',
      duration: exp.duration,
      bullets: [exp.description],
    })),
    projects: projects.map((proj: Project) => ({
      title: proj.title,
      tech: proj.techStack,
      duration: "Present",
      bullets: [proj.description],
      url: proj.githubUrl,
    })),
    skills: skillCategories.map((cat: SkillCategory) => ({
      category: cat.category,
      items: cat.skills.map(s => s.name),
    })),
    achievements: achievements.map((ach: Achievement) => ({
      title: ach.title,
      date: ach.date,
      description: ach.description,
    })),
  };

  const dashboardData = {
    personalInfo,
    projects,
    resumeInitial
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       <AdminDashboard initialData={dashboardData} />
    </div>
  );
}
