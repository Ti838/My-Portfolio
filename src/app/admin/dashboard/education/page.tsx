// REFINED
import { getAllAdminData } from "@/lib/admin-actions";
import EducationManager from "./EducationManager";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const data = await getAllAdminData();
  return <EducationManager initialEducation={data.education} />;
}
