// REFINED
import { getAllAdminData } from "@/lib/admin-actions";
import ProjectsManager from "./ProjectsManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const data = await getAllAdminData();
  return <ProjectsManager initialProjects={data.projects} />;
}
