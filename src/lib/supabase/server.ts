import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server client bound to the request's cookies — for the /manage portal:
// server components, route handlers and server actions. Writes run as the
// signed-in user, so RLS (stephy_is_editor) is what actually authorizes them.
export async function createClient() {
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              store.set(name, value, options)
            );
          } catch {
            // called from a Server Component — middleware refreshes instead
          }
        },
      },
    }
  );
}
