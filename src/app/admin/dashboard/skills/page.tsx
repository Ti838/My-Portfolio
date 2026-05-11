// REFINED
import { getAllAdminData } from "@/lib/admin-actions";
import SkillsManager from "./SkillsManager";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const data = await getAllAdminData();
  return <SkillsManager initialSkills={data.skills} initialCategories={data.skillCategories} />;
}
