"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminData } from "../data";
import { saveAbout } from "../actions";
import { useRun, Dropzone, SectionLead } from "./ui";

type About = AdminData["about"];
type Stat = { value: string; label: string };
type Milestone = { year: string; title: string; description: string };

export default function AboutEditor({ about, setAbout }: { about: About; setAbout: (r: About) => void }) {
  const { run, pending } = useRun();
  const [bio, setBio] = useState<string[]>((about.bio as string[]) ?? []);
  const [stats, setStats] = useState<Stat[]>((about.stats as Stat[]) ?? []);
  const [journey, setJourney] = useState<Milestone[]>((about.journey as Milestone[]) ?? []);
  const [style, setStyle] = useState<string>(about.style_description || "");
  const [genres, setGenres] = useState<string[]>((about.genres as string[]) ?? []);
  const [genreDraft, setGenreDraft] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(about.profileUrl);

  function pickProfile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setProfile(f);
    setPreview(URL.createObjectURL(f));
  }
  function addGenre() {
    const g = genreDraft.trim();
    if (g && !genres.includes(g)) setGenres([...genres, g]);
    setGenreDraft("");
  }
  function save() {
    const fd = new FormData();
    fd.append("bio", JSON.stringify(bio.map((b) => b.trim()).filter(Boolean)));
    fd.append("stats", JSON.stringify(stats.filter((s) => s.value || s.label)));
    fd.append("journey", JSON.stringify(journey.filter((j) => j.year || j.title || j.description)));
    fd.append("genres", JSON.stringify(genres));
    fd.append("style_description", style);
    if (profile) fd.append("profile", profile);
    run<About>(() => saveAbout(fd), (rows) => { setAbout(rows); setProfile(null); });
  }

  return (
    <div className="mng-block">
      <SectionLead title="About page">Everything on the About page. Hit “Save About page” when you’re done.</SectionLead>

      {/* profile photo */}
      <div className="mng-block" style={{ background: "var(--panel-2)" }}>
        <div className="mng-block-h"><span className="mng-t">Profile photo</span></div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 96, height: 128, borderRadius: 12, overflow: "hidden", background: "var(--panel-3)", position: "relative", flex: "none" }}>
            {preview && <Image src={preview} alt="" fill sizes="96px" style={{ objectFit: "cover" }} unoptimized />}
          </div>
          <div style={{ flex: 1 }}>
            <Dropzone disabled={pending} onFiles={pickProfile}
              label={profile ? <span><b>{profile.name}</b> — save to apply</span> : <span><b>Click or drop</b> a new portrait</span>} />
          </div>
        </div>
      </div>

      {/* bio */}
      <div className="mng-block" style={{ background: "var(--panel-2)" }}>
        <div className="mng-block-h"><span className="mng-t">Biography</span><button className="mng-btn mng-ghost mng-sm" onClick={() => setBio([...bio, ""])}>+ Paragraph</button></div>
        {bio.length === 0 && <div className="mng-empty">No biography yet.</div>}
        {bio.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <textarea className="mng-input" value={p} onChange={(e) => setBio(bio.map((b, j) => (j === i ? e.target.value : b)))} placeholder={`Paragraph ${i + 1}`} />
            <button className="mng-iconbtn" title="Remove" onClick={() => setBio(bio.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>

      {/* stats */}
      <div className="mng-block" style={{ background: "var(--panel-2)" }}>
        <div className="mng-block-h"><span className="mng-t">Stats</span><button className="mng-btn mng-ghost mng-sm" onClick={() => setStats([...stats, { value: "", label: "" }])}>+ Stat</button></div>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input className="mng-input" style={{ maxWidth: 110 }} value={s.value} onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} placeholder="100+" />
            <input className="mng-input" value={s.label} onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} placeholder="Shows" />
            <button className="mng-iconbtn" title="Remove" onClick={() => setStats(stats.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>

      {/* journey */}
      <div className="mng-block" style={{ background: "var(--panel-2)" }}>
        <div className="mng-block-h"><span className="mng-t">The journey</span><button className="mng-btn mng-ghost mng-sm" onClick={() => setJourney([...journey, { year: "", title: "", description: "" }])}>+ Milestone</button></div>
        {journey.map((m, i) => (
          <div key={i} className="mng-block" style={{ background: "var(--panel-3)", marginBottom: 8 }}>
            <div className="mng-row2" style={{ gridTemplateColumns: "110px 1fr auto", alignItems: "start" }}>
              <input className="mng-input mng-mono" value={m.year} onChange={(e) => setJourney(journey.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))} placeholder="2021" />
              <input className="mng-input" value={m.title} onChange={(e) => setJourney(journey.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} placeholder="Title" />
              <button className="mng-iconbtn" title="Remove" onClick={() => setJourney(journey.filter((_, j) => j !== i))}>✕</button>
            </div>
            <textarea className="mng-input" style={{ marginTop: 8 }} value={m.description} onChange={(e) => setJourney(journey.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} placeholder="What happened" />
          </div>
        ))}
      </div>

      {/* style + genres */}
      <div className="mng-block" style={{ background: "var(--panel-2)" }}>
        <div className="mng-block-h"><span className="mng-t">Musical style</span></div>
        <textarea className="mng-input" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Describe her sound…" style={{ minHeight: 90 }} />
        <label className="mng-label" style={{ marginTop: 12 }}>Genres</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="mng-input" value={genreDraft} onChange={(e) => setGenreDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGenre(); } }} placeholder="Type a genre, press Enter" />
          <button className="mng-btn mng-ghost mng-sm" onClick={addGenre}>Add</button>
        </div>
        <div className="mng-tags">
          {genres.map((g) => (
            <span key={g} className="mng-tag">{g}<button onClick={() => setGenres(genres.filter((x) => x !== g))} aria-label={`Remove ${g}`}>✕</button></span>
          ))}
        </div>
      </div>

      <button className="mng-btn mng-primary" disabled={pending} onClick={save} style={{ width: "100%", justifyContent: "center", padding: 12 }}>
        {pending ? "Saving…" : "Save About page · publish live"}
      </button>
    </div>
  );
}
