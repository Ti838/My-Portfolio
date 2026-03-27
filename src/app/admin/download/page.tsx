import { getAchievements, getEducation, getExperiences, getPersonalInfo, getProjects, getSkills, getSocialLinks } from "@/data/portfolio";
import type { ResumeData } from "@/components/ResumePDF";
import { checkTotpSession } from "@/lib/admin-actions";
import ResumeDownloadBuilderClient from "./resume-download-builder-client";

export const dynamic = "force-dynamic";

export default async function ResumeDownloadPage() {
  const [{ verified }, personalInfo, projects, skillCategories, experiences, education, achievements, socialLinks] = await Promise.all([
    checkTotpSession(),
    getPersonalInfo(),
    getProjects(),
    getSkills(),
    getExperiences(),
    getEducation(),
    getAchievements(),
    getSocialLinks(),
  ]);

  const githubLink = socialLinks.find((s: any) => String(s.label).toLowerCase() === "github")?.url;
  const githubUser = githubLink ? String(githubLink).split("/").pop() : "";
  const linkedin = socialLinks.find((s: any) => String(s.label).toLowerCase() === "linkedin")?.url;

  const resumeInitial: ResumeData = {
    layout: "resume",
    personalInfo: {
      name: personalInfo.name,
      tagline: personalInfo.tagline,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      github: githubUser,
      linkedin,
      portfolio: "timonbiswas.vercel.app",
      profileImage: personalInfo.profileImage,
    },
    summary: personalInfo.bio,
    education: education.map((edu: any) => ({
      institution: edu.institution,
      degree: edu.degree,
      duration: edu.duration,
      details: edu.details || [],
    })),
    experience: experiences.map((exp: any) => ({
      title: exp.title,
      org: exp.type === "work" ? "Experience" : "Competition/Project",
      duration: exp.duration,
      bullets: [exp.description],
    })),
    projects: projects.map((proj: any) => ({
      title: proj.title,
      tech: proj.techStack,
      duration: "Present",
      bullets: [proj.description],
      url: proj.githubUrl,
    })),
    skills: skillCategories.map((cat: any) => ({
      category: cat.category,
      items: cat.skills.map((s: any) => s.name),
    })),
    achievements: achievements.map((a: any) => ({
      title: a.title,
      date: a.date,
      description: a.description,
    })),
  };

  return <ResumeDownloadBuilderClient initialResumeData={resumeInitial} initiallyVerified={verified} />;
}
