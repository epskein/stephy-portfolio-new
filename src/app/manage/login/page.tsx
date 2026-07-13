"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isEditor } from "@/lib/editors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const clean = email.trim().toLowerCase();

    // Only send links to allow-listed editors — this avoids creating stray
    // accounts in the shared project. The confirmation copy stays neutral
    // either way so it never reveals who is on the list.
    if (isEditor(clean)) {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: clean,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?next=/manage`,
          // Both editors are pre-created; never create a new account from a
          // login attempt (defence in depth alongside the allow-list + RLS).
          shouldCreateUser: false,
        },
      });
      if (error) {
        setLoading(false);
        setError("Something went wrong sending the link. Try again in a moment.");
        return;
      }
    }
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="mng-login">
      <div className="mng-login-card">
        <div className="mng-login-brand">
          STEPHY · <span className="mng-metal">MANAGE</span>
        </div>

        {sent ? (
          <div className="mng-login-sent">
            <div className="mng-login-title">Check your email</div>
            <p>
              If <b>{email.trim().toLowerCase()}</b> is an authorized editor, a sign-in link
              is on its way. Open it on this device to continue.
            </p>
            <button className="mng-btn mng-ghost" onClick={() => { setSent(false); setEmail(""); }}>
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mng-login-form">
            <div className="mng-login-title">Sign in</div>
            <p className="mng-login-sub">Enter your email — we&apos;ll send a one-time sign-in link. No password.</p>
            <label className="mng-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mng-input"
            />
            {error && <div className="mng-login-error">{error}</div>}
            <button className="mng-btn mng-primary" disabled={loading} type="submit">
              {loading ? "Sending…" : "Email me a link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
