import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isEditor } from "@/lib/editors";
import { loadAdminData } from "./data";
import ManageShell from "./components/ManageShell";

export const dynamic = "force-dynamic";

export default async function ManagePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isEditor(user?.email)) redirect("/manage/login");

  const data = await loadAdminData();
  return <ManageShell data={data} email={user!.email!} />;
}
