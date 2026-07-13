"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminData } from "../data";
import { saveRelease, deleteRelease, reorderMusic } from "../actions";
import { useRun, Reorderable, Dropzone, Select, ConfirmDelete, SectionLead } from "./ui";

type Rel = AdminData["music"][number];
const TYPES = ["Single", "EP", "Album", "Remix", "Mix"].map((t) => ({ value: t, label: t }));
const blank = { id: "", title: "", release_type: "Single", year: "", link: "" };

export default function MusicEditor({ music, setMusic }: { music: Rel[]; setMusic: (r: Rel[]) => void }) {
  const { run, pending } = useRun();
  const [form, setForm] = useState(blank);
  const [cover, setCover] = useState<File | null>(null);
  const editing = !!form.id;

  function submit() {
    if (!form.title.trim()) return;
    const fd = new FormData();
    if (form.id) fd.append("id", form.id);
    fd.append("title", form.title.trim());
    fd.append("release_type", form.release_type);
    fd.append("year", form.year.trim());
    fd.append("link", form.link.trim());
    if (cover) fd.append("cover", cover);
    run<Rel[]>(() => saveRelease(fd), (rows) => { setMusic(rows); setForm(blank); setCover(null); });
  }

  return (
    <div className="mng-block">
      <SectionLead title="Music releases">Singles, EPs, remixes and mixes shown on the Music page.</SectionLead>

      <div className="mng-block" style={{ background: "var(--panel-3)" }}>
        <div className="mng-block-h"><span className="mng-t">{editing ? "Edit release" : "Add a release"}</span>
          {editing && <button className="mng-btn mng-ghost mng-sm" onClick={() => { setForm(blank); setCover(null); }}>Cancel</button>}
        </div>
        <div className="mng-field"><label className="mng-label">Title</label>
          <input className="mng-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Release title" />
        </div>
        <div className="mng-row2">
          <div className="mng-field"><label className="mng-label">Type</label>
            <Select value={form.release_type} onChange={(v) => setForm({ ...form, release_type: v })} options={TYPES} ariaLabel="Release type" />
          </div>
          <div className="mng-field"><label className="mng-label">Year</label>
            <input className="mng-input mng-mono" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2026" />
          </div>
        </div>
        <div className="mng-field"><label className="mng-label">Listen link</label>
          <input className="mng-input" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Spotify / SoundCloud / YouTube…" />
        </div>
        <div className="mng-field"><label className="mng-label">Cover art{editing ? " (leave to keep current)" : ""}</label>
          <Dropzone accept="image/*" disabled={pending} onFiles={(f) => setCover(f[0] || null)}
            label={cover ? <span><b>{cover.name}</b> selected</span> : <span><b>Click or drop</b> a square cover image</span>} />
        </div>
        <button className="mng-btn mng-primary" disabled={pending || !form.title.trim()} onClick={submit}>{editing ? "Save changes" : "Add release"}</button>
      </div>

      <Reorderable items={music} onReorder={(ids) => run<Rel[]>(() => reorderMusic(ids), setMusic, "Order saved · live")} className="mng-list" itemClassName="mng-item">
        {(r, c) => (
          <>
            <span className="mng-grip" {...c.handleProps}>⠿</span>
            <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flex: "none", background: "var(--panel-3)", position: "relative" }}>
              {r.coverUrl && <Image src={r.coverUrl} alt="" fill sizes="40px" style={{ objectFit: "cover" }} unoptimized />}
            </div>
            <div className="mng-grow">
              <div className="mng-title">{r.title}</div>
              <div className="mng-meta">{[r.release_type, r.year].filter(Boolean).join(" · ")}</div>
            </div>
            <button className="mng-btn mng-ghost mng-sm" onClick={() => { setForm({ id: r.id, title: r.title, release_type: r.release_type, year: r.year || "", link: r.link || "" }); setCover(null); }}>Edit</button>
            <ConfirmDelete disabled={pending} onConfirm={() => run<Rel[]>(() => deleteRelease(r.id, r.cover_path), setMusic, "Release deleted")} />
          </>
        )}
      </Reorderable>
    </div>
  );
}
