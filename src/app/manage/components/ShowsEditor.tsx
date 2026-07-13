"use client";

import { useState } from "react";
import type { AdminData } from "../data";
import { saveShow, deleteShow } from "../actions";
import { useRun, DateField, FlagPicker, ConfirmDelete, SectionLead } from "./ui";

type Show = AdminData["shows"][number];
const blank = { id: "", venue: "", start_date: "", end_date: null as string | null, location: "", flag: "🇿🇦" };

function fmt(d: string) {
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ShowsEditor({ shows, setShows }: { shows: Show[]; setShows: (r: Show[]) => void }) {
  const { run, pending } = useRun();
  const [form, setForm] = useState(blank);
  const editing = !!form.id;

  function submit() {
    if (!form.venue.trim() || !form.start_date) return;
    run<Show[]>(
      () => saveShow({ id: form.id || undefined, venue: form.venue.trim(), start_date: form.start_date, end_date: form.end_date, location: form.location.trim(), flag: form.flag }),
      (rows) => { setShows(rows); setForm(blank); }
    );
  }

  return (
    <div className="mng-block">
      <SectionLead title="Upcoming shows">Add gigs and festivals. They sort by date automatically on the site.</SectionLead>

      {/* add / edit form */}
      <div className="mng-block" style={{ background: "var(--panel-3)" }}>
        <div className="mng-block-h"><span className="mng-t">{editing ? "Edit show" : "Add a show"}</span>
          {editing && <button className="mng-btn mng-ghost mng-sm" onClick={() => setForm(blank)}>Cancel</button>}
        </div>
        <div className="mng-field">
          <label className="mng-label">Venue / event name</label>
          <input className="mng-input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g. Lost City" />
        </div>
        <div className="mng-row2">
          <div className="mng-field"><label className="mng-label">Start date</label><DateField value={form.start_date || null} onChange={(v) => setForm({ ...form, start_date: v || "" })} /></div>
          <div className="mng-field"><label className="mng-label">End date (optional)</label><DateField value={form.end_date} onChange={(v) => setForm({ ...form, end_date: v })} allowClear /></div>
        </div>
        <div className="mng-field">
          <label className="mng-label">Location</label>
          <input className="mng-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. POD Karoo (WC, RSA)" />
        </div>
        <div className="mng-field"><label className="mng-label">Country flag</label><FlagPicker value={form.flag} onChange={(v) => setForm({ ...form, flag: v })} /></div>
        <button className="mng-btn mng-primary" disabled={pending || !form.venue.trim() || !form.start_date} onClick={submit}>
          {editing ? "Save changes" : "Add show"}
        </button>
      </div>

      {/* list */}
      <div className="mng-list" style={{ marginTop: 14 }}>
        {shows.length === 0 && <div className="mng-empty">No shows yet.</div>}
        {shows.map((s) => (
          <div key={s.id} className="mng-item">
            <span className="mng-title" style={{ fontFamily: "var(--mono)", fontWeight: 700, minWidth: 96, flex: "none", fontSize: 11 }}>
              {fmt(s.start_date)}{s.end_date ? ` – ${fmt(s.end_date)}` : ""}
            </span>
            <div className="mng-grow">
              <div className="mng-title">{s.flag} {s.venue}</div>
              <div className="mng-meta">{s.location}</div>
            </div>
            <button className="mng-btn mng-ghost mng-sm" onClick={() => setForm({ id: s.id, venue: s.venue, start_date: s.start_date, end_date: s.end_date, location: s.location, flag: s.flag })}>Edit</button>
            <ConfirmDelete disabled={pending} onConfirm={() => run<Show[]>(() => deleteShow(s.id), setShows)} />
          </div>
        ))}
      </div>
    </div>
  );
}
