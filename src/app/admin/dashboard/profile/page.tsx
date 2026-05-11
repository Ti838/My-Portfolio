// REFINED
import { getAllAdminData } from "@/lib/admin-actions";
import ProfileEditor from "./ProfileEditor";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const data = await getAllAdminData();
  return <ProfileEditor initialData={data.personalInfo} />;
}
