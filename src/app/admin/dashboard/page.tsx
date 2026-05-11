// REFINED
import { getAllAdminData, getInboxMessages } from "@/lib/admin-actions";
import AdminDashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [data, messages] = await Promise.all([
    getAllAdminData(),
    getInboxMessages().catch(() => []),
  ]);

  return (
    <AdminDashboardClient
      projectCount={data.projects?.length ?? 0}
      skillCount={data.skills?.length ?? 0}
      messageCount={messages.length}
      experienceCount={data.experiences?.length ?? 0}
      recentMessages={messages.slice(0, 5)}
    />
  );
}
