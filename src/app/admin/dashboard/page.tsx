import { checkAdminAuth } from "@/lib/admin-actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardRedirect() {
  const { isAdmin } = await checkAdminAuth();
  if (!isAdmin) redirect("/admin");
  redirect("/");
}
