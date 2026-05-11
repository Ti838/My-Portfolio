// REFINED
import { getAllAdminData } from "@/lib/admin-actions";
import ExperienceManager from "./ExperienceManager";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const data = await getAllAdminData();
  return <ExperienceManager initialExperiences={data.experiences} />;
}
