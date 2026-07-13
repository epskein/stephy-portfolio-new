"use client";

import { useState } from "react";
import type { AdminData } from "../data";
import { saveText } from "../actions";
import { useRun, SectionLead } from "./ui";

type Txt = AdminData["text"][number];

export default function TextEditor({
  page, text, setText, title,
}: { page: string; text: Txt[]; setText: (r: Txt[]) => void; title: string }) {
  const { run, pending } = useRun();
  const [edits, setEdits] = useState<Record<string, string>>({});

  const rows = text.filter((t) => t.page === page);
  const val = (r: Txt) => edits[r.id] ?? r.value;
  const dirty = rows.filter((r) => edits[r.id] !== undefined && edits[r.id] !== r.value);

  function save() {
    if (!dirty.length) return;
    run<Txt[]>(
      () => saveText(dirty.map((r) => ({ id: r.id, value: edits[r.id] }))),
      (allRows) => { setText(allRows); setEdits({}); }
    );
  }

  if (rows.length === 0) return null;

  return (
    <div className="mng-block">
      <SectionLead title={title}>Headings and copy for this page. Edits go live on save.</SectionLead>
      {rows.map((r) => (
        <div key={r.id} className="mng-field">
          <label className="mng-label">{r.label || r.slot}</label>
          {r.multiline ? (
            <textarea className="mng-input" value={val(r)} onChange={(e) => setEdits({ ...edits, [r.id]: e.target.value })} />
          ) : (
            <input className="mng-input" value={val(r)} onChange={(e) => setEdits({ ...edits, [r.id]: e.target.value })} />
          )}
        </div>
      ))}
      <button className="mng-btn mng-primary" disabled={pending || dirty.length === 0} onClick={save}>
        {pending ? "Saving…" : dirty.length ? `Save ${dirty.length} change${dirty.length > 1 ? "s" : ""} · live` : "No changes"}
      </button>
    </div>
  );
}
