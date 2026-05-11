// REFINED
import { checkAdminAuth } from "@/lib/admin-actions";
import { redirect } from "next/navigation";
import AdminLayoutClient from "@/components/admin/AdminLayout";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = await checkAdminAuth();
  if (!isAdmin) redirect("/admin");

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
