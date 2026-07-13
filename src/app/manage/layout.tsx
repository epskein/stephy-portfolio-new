import type { Metadata } from "next";
import "./manage.css";

export const metadata: Metadata = {
  title: "Manage · Stephy Longueira",
  robots: { index: false, follow: false },
};

// Chrome-only layout (no public nav/footer). Auth is enforced per-page so the
// /manage/login route stays reachable when signed out.
export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mng-root">{children}</div>;
}
