"use client";

import React, { useState, useEffect } from "react";
import HeroEditorModal from "./modals/HeroEditorModal";
import BioEditorModal from "./modals/BioEditorModal";
import ProjectsEditorModal from "./modals/ProjectsEditorModal";
import AnnouncementEditorModal from "./modals/AnnouncementEditorModal";
import AchievementsEditorModal from "./modals/AchievementsEditorModal";
import ExperienceEditorModal from "./modals/ExperienceEditorModal";
import EducationEditorModal from "./modals/EducationEditorModal";
import SkillsEditorModal from "./modals/SkillsEditorModal";
import SocialLinksEditorModal from "./modals/SocialLinksEditorModal";
import { useAdmin } from "./AdminProvider";

export default function AdminModalsRenderer({ 
  personalInfo, 
  projects, 
  achievements, 
  experiences, 
  education,
  skills,
  skillCategories,
  socialLinks
}: { 
  personalInfo?: any, 
  projects?: any[], 
  achievements?: any[],
  experiences?: any[],
  education?: any[],
  skills?: any[],
  skillCategories?: any[],
  socialLinks?: any[]
}) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (!isAdmin) return;
    const handleOpen = (e: CustomEvent) => setActiveModal(e.detail);
    document.addEventListener("open-admin-editor" as any, handleOpen);
    return () => document.removeEventListener("open-admin-editor" as any, handleOpen);
  }, [isAdmin]);

  if (!isAdmin || !activeModal) return null;

  return (
    <>
      {(activeModal === "hero" || activeModal === "stats") && <HeroEditorModal initialData={personalInfo} onClose={() => setActiveModal(null)} />}
      {activeModal === "bio" && <BioEditorModal initialData={personalInfo} onClose={() => setActiveModal(null)} />}
      {activeModal === "projects" && <ProjectsEditorModal initialProjects={projects || ([] as any[])} onClose={() => setActiveModal(null)} />}
      {activeModal === "announcement" && <AnnouncementEditorModal initialData={personalInfo} onClose={() => setActiveModal(null)} />}
      {activeModal === "achievements" && <AchievementsEditorModal initialAchievements={achievements || ([] as any[])} onClose={() => setActiveModal(null)} />}
      {activeModal === "experience" && <ExperienceEditorModal initialExperiences={experiences || ([] as any[])} onClose={() => setActiveModal(null)} />}
      {activeModal === "education" && <EducationEditorModal initialEducation={education || ([] as any[])} onClose={() => setActiveModal(null)} />}
      {activeModal === "skills" && <SkillsEditorModal skills={skills || []} categories={skillCategories || []} onClose={() => setActiveModal(null)} />}
      {activeModal === "social" && <SocialLinksEditorModal socialLinks={socialLinks || []} onClose={() => setActiveModal(null)} />}
    </>
  );
}
