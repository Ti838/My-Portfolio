// REFINED
import { getInboxMessages } from "@/lib/admin-actions";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getInboxMessages().catch(() => []);
  return <MessagesClient initialMessages={messages} />;
}
