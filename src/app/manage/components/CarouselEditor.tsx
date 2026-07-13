"use client";

import { useState } from "react";
import Image from "next/image";
import type { AdminData } from "../data";
import { updateGallery, reorderGallery } from "../actions";
import { useRun, Reorderable, SectionLead } from "./ui";

type Img = AdminData["gallery"][number];

export default function CarouselEditor({ gallery, setGallery }: { gallery: Img[]; setGallery: (r: Img[]) => void }) {
  const { run, pending } = useRun();
  const [adding, setAdding] = useState(false);

  const featured = gallery.filter((g) => g.featured_on_home);
  const rest = gallery.filter((g) => !g.featured_on_home);

  // Reorder only the featured set; keep the rest after them (gallery page order
  // is randomised on the site, so this never affects it).
  function reorderFeatured(ids: string[]) {
    const full = [...ids, ...rest.map((r) => r.id)];
    run<Img[]>(() => reorderGallery(full), setGallery, "Carousel order saved · live");
  }
  function toggle(id: string, on: boolean) {
    run<Img[]>(() => updateGallery(id, { featured_on_home: on }), setGallery, on ? "Added to carousel" : "Removed from carousel");
  }

  return (
    <div className="mng-block">
      <SectionLead title="Home carousel">The photo strip on the homepage. Drag to reorder; use the ✕ to remove.</SectionLead>

      {featured.length === 0 ? (
        <div className="mng-empty">No photos in the carousel yet — add some below.</div>
      ) : (
        <Reorderable items={featured} onReorder={reorderFeatured} className="mng-grid" itemClassName="mng-tile">
          {(img, c) => (
            <>
              <Image src={img.url} alt="" fill sizes="120px" style={{ objectFit: "cover" }} unoptimized />
              <span className="mng-tile-grip" {...c.handleProps} title="Drag to reorder">⠿</span>
              <button className="mng-star on" title="Remove from carousel" disabled={pending} onClick={() => toggle(img.id, false)}>✕</button>
            </>
          )}
        </Reorderable>
      )}

      <div className="mng-divider" />
      <button className="mng-btn mng-ghost mng-sm" onClick={() => setAdding((a) => !a)}>
        {adding ? "Done adding" : `+ Add photos to carousel (${rest.length} available)`}
      </button>
      {adding && (
        rest.length === 0
          ? <div className="mng-note" style={{ marginTop: 10 }}>All photos are already in the carousel. Upload more in the Gallery tab.</div>
          : <div className="mng-grid" style={{ marginTop: 12 }}>
              {rest.map((img) => (
                <button key={img.id} className="mng-tile" style={{ cursor: "pointer", padding: 0, border: "1px solid var(--line)" }}
                  disabled={pending} onClick={() => toggle(img.id, true)} title="Add to carousel">
                  <Image src={img.url} alt="" fill sizes="120px" style={{ objectFit: "cover" }} unoptimized />
                  <span className="mng-star">☆</span>
                </button>
              ))}
            </div>
      )}
    </div>
  );
}
