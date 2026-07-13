"use client";

import { useState } from "react";
import type { AdminData } from "../data";
import { saveSocial, deleteSocial, reorderSocials } from "../actions";
import { useRun, Reorderable, Select, ConfirmDelete, SectionLead } from "./ui";

type Social = AdminData["socials"][number];
const PLATFORMS = ["Instagram", "TikTok", "Spotify", "SoundCloud", "Apple Music", "YouTube"].map((p) => ({ value: p, label: p }));
const blank = { id: "", platform: "Instagram", url: "", handle: "" };

export default function SocialsEditor({ socials, setSocials }: { socials: Social[]; setSocials: (r: Social[]) => void }) {
  const { run, pending } = useRun();
  const [form, setForm] = useState(blank);
  const editing = !!form.id;

  function submit() {
    if (!form.url.trim()) return;
    run<Social[]>(
      () => saveSocial({ id: form.id || undefined, platform: form.platform, url: form.url.trim(), handle: form.handle.trim() || null }),
      (rows) => { setSocials(rows); setForm(blank); }
    );
  }

  return (
    <div className="mng-block">
      <SectionLead title="Socials & links">Links in the footer and on the Contact page.</SectionLead>

      <div className="mng-block" style={{ background: "var(--panel-3)" }}>
        <div className="mng-block-h"><span className="mng-t">{editing ? "Edit link" : "Add a link"}</span>
          {editing && <button className="mng-btn mng-ghost mng-sm" onClick={() => setForm(blank)}>Cancel</button>}
        </div>
        <div className="mng-field"><label className="mng-label">Platform</label>
          <Select value={form.platform} onChange={(v) => setForm({ ...form, platform: v })} options={PLATFORMS} ariaLabel="Platform" />
        </div>
        <div className="mng-field"><label className="mng-label">Profile URL</label>
          <input className="mng-input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://instagram.com/…" />
        </div>
        <div className="mng-field"><label className="mng-label">Handle / display name (optional)</label>
          <input className="mng-input" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="@stephylongueira" />
        </div>
        <button className="mng-btn mng-primary" disabled={pending || !form.url.trim()} onClick={submit}>{editing ? "Save changes" : "Add link"}</button>
      </div>

      <Reorderable items={socials} onReorder={(ids) => run<Social[]>(() => reorderSocials(ids), setSocials, "Order saved · live")} className="mng-list" itemClassName="mng-item">
        {(s, c) => (
          <>
            <span className="mng-grip" {...c.handleProps}>⠿</span>
            <div className="mng-grow">
              <div className="mng-title">{s.platform}{s.handle ? ` · ${s.handle}` : ""}</div>
              <div className="mng-meta">{s.url}</div>
            </div>
            <button className="mng-btn mng-ghost mng-sm" onClick={() => setForm({ id: s.id, platform: s.platform, url: s.url, handle: s.handle || "" })}>Edit</button>
            <ConfirmDelete disabled={pending} onConfirm={() => run<Social[]>(() => deleteSocial(s.id), setSocials, "Link deleted")} />
          </>
        )}
      </Reorderable>
    </div>
  );
}
