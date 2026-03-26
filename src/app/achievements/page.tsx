import type { Metadata } from "next";
import { getAchievements } from "@/data/portfolio";
import AchievementsClient from "@/components/AchievementsClient";
import EditableSection from "@/components/admin/EditableSection";
import AdminModalsRenderer from "@/components/admin/AdminModalsRenderer";

export const metadata: Metadata = { title: "Achievements" };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
      <AdminModalsRenderer achievements={achievements} />
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-10">
          <span className="tag-pill mb-3">Recognition</span>
          <h1 className="section-title">Achievements</h1>
        </div>
        
        <EditableSection eventKey="achievements" label="Certificates">
          <AchievementsClient achievements={achievements} />
        </EditableSection>
      </div>
    </div>
  );
}
