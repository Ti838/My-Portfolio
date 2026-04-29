import type { Metadata } from "next";
import { getAchievements } from "@/data/portfolio";
import AchievementsClient from "@/components/AchievementsClient";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title: "Achievements" };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <ScrollReveal direction="left" className="mb-20">
          <span className="tag-pill mb-4">The Recognition</span>
          <h1 className="section-title">Achievements</h1>
        </ScrollReveal>
        
        <EditableSection eventKey="achievements" label="Certificates">
          <AchievementsClient achievements={achievements} />
        </EditableSection>
      </div>
    </div>
  );
}
