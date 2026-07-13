// The only accounts allowed into /manage. Mirrors the SQL stephy_is_editor()
// allow-list used by RLS — keep the two in sync.
export const EDITOR_EMAILS = [
  "stephylongueira@gmail.com",
  "epskein.es@gmail.com",
] as const;

export function isEditor(email?: string | null): boolean {
  return !!email && EDITOR_EMAILS.includes(email.toLowerCase() as (typeof EDITOR_EMAILS)[number]);
}
