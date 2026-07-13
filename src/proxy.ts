import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the Supabase auth session cookie on every request so the /manage
// portal stays signed in. Public pages read content with a separate cookieless
// client, so this only matters for the authenticated portal.
// (Next 16 renamed the `middleware` convention to `proxy`.)
export async function proxy(req: NextRequest) {
  const res = NextResponse.next({ request: req });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) =>
          list.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  );
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
