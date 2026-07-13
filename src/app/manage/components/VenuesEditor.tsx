"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { AdminData } from "../data";
import { uploadVenues, updateVenue, deleteVenue, reorderVenues } from "../actions";
import { useRun, Reorderable, Dropzone, ConfirmDelete, SectionLead } from "./ui";

type Venue = AdminData["venues"][number];

export default function VenuesEditor({ venues, setVenues }: { venues: Venue[]; setVenues: (r: Venue[]) => void }) {
  const { run, pending } = useRun();
  const [uploading, setUploading] = useState(false);
  const [names, setNames] = useState<Record<string, string>>({});
  // Clear the uploading label once the action settles, success or failure.
  useEffect(() => { if (!pending) setUploading(false); }, [pending]);

  function upload(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith("image/") || f.name.endsWith(".svg"));
    if (!imgs.length) return;
    const fd = new FormData();
    imgs.forEach((f) => fd.append("files", f));
    setUploading(true);
    run<Venue[]>(() => uploadVenues(fd), (rows) => { setVenues(rows); setUploading(false); }, `${imgs.length} logo${imgs.length > 1 ? "s" : ""} added`);
  }

  return (
    <div className="mng-block">
      <SectionLead title="Featured venues">Venue logos shown on the Venues page (displayed in greyscale on the site).</SectionLead>

      <Dropzone disabled={pending} onFiles={upload} accept="image/*,.svg"
        label={<span><b>Click or drop logo images</b> · PNG with transparent background works best</span>} />
      {uploading && <div className="mng-uploading">Uploading…</div>}

      <Reorderable items={venues} onReorder={(ids) => run<Venue[]>(() => reorderVenues(ids), setVenues, "Order saved · live")}
        className="mng-venues" itemClassName="mng-venue">
        {(v, c) => {
          const name = names[v.id] ?? v.name;
          const dirty = name !== v.name;
          return (
            <>
              <div className="mng-logo"><Image src={v.url} alt={v.name} fill sizes="150px" unoptimized /></div>
              <div className="mng-venue-foot">
                <span className="mng-grip" {...c.handleProps}>⠿</span>
                <input className="mng-input" value={name} onChange={(e) => setNames({ ...names, [v.id]: e.target.value })} placeholder="Venue name" />
              </div>
              <div className="mng-venue-foot">
                {dirty && <button className="mng-btn mng-primary mng-sm" disabled={pending} onClick={() => run<Venue[]>(() => updateVenue(v.id, name.trim()), (rows) => { setVenues(rows); setNames((n) => { const c2 = { ...n }; delete c2[v.id]; return c2; }); }, "Name saved")}>Save</button>}
                <div style={{ flex: 1 }} />
                <ConfirmDelete disabled={pending} onConfirm={() => run<Venue[]>(() => deleteVenue(v.id, v.logo_path), setVenues, "Logo deleted")} />
              </div>
            </>
          );
        }}
      </Reorderable>
    </div>
  );
}
