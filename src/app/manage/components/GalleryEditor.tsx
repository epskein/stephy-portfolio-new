"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { AdminData } from "../data";
import { uploadGallery, updateGallery, deleteGallery, reorderGallery } from "../actions";
import { useRun, Reorderable, Dropzone, ConfirmDelete, Select, SectionLead } from "./ui";

type Img = AdminData["gallery"][number];

export default function GalleryEditor({ gallery, setGallery }: { gallery: Img[]; setGallery: (r: Img[]) => void }) {
  const { run, pending } = useRun();
  const [cat, setCat] = useState("live");
  const [uploading, setUploading] = useState(false);
  // Clear the uploading label once the action settles, success or failure.
  useEffect(() => { if (!pending) setUploading(false); }, [pending]);

  function upload(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    const fd = new FormData();
    fd.append("category", cat);
    imgs.forEach((f) => fd.append("files", f));
    setUploading(true);
    run<Img[]>(() => uploadGallery(fd), (rows) => { setGallery(rows); setUploading(false); }, `${imgs.length} photo${imgs.length > 1 ? "s" : ""} added`);
  }

  return (
    <div className="mng-block">
      <SectionLead title="Gallery photos">Every photo on the gallery page. Star a photo to also show it in the home carousel.</SectionLead>

      <div className="mng-row2" style={{ gridTemplateColumns: "160px 1fr", alignItems: "end", marginBottom: 12 }}>
        <div className="mng-field" style={{ margin: 0 }}>
          <label className="mng-label">Upload as</label>
          <Select value={cat} onChange={setCat} ariaLabel="Category for new uploads"
            options={[{ value: "live", label: "Live" }, { value: "portraits", label: "Portraits" }]} />
        </div>
        <Dropzone disabled={pending} onFiles={upload}
          label={<span><b>Click or drop photos</b> to upload · added as <b>{cat}</b></span>} />
      </div>
      {uploading && <div className="mng-uploading">Uploading &amp; processing…</div>}

      <Reorderable items={gallery} onReorder={(ids) => run<Img[]>(() => reorderGallery(ids), setGallery, "Order saved · live")}
        className="mng-grid" itemClassName="mng-tile">
        {(img, c) => (
          <>
            <Image src={img.url} alt="" fill sizes="120px" style={{ objectFit: "cover" }} unoptimized />
            <span className="mng-tile-grip" {...c.handleProps} title="Drag to reorder">⠿</span>
            <button className={`mng-star${img.featured_on_home ? " on" : ""}`} title={img.featured_on_home ? "In home carousel" : "Add to home carousel"}
              onClick={() => run<Img[]>(() => updateGallery(img.id, { featured_on_home: !img.featured_on_home }), setGallery, img.featured_on_home ? "Removed from carousel" : "Added to carousel")}>
              {img.featured_on_home ? "★" : "☆"}
            </button>
            <span className="mng-cat">{img.category}</span>
            <div className="mng-tile-actions">
              <button className="mng-tilebtn" onClick={() => run<Img[]>(() => updateGallery(img.id, { category: img.category === "live" ? "portraits" : "live" }), setGallery, "Category updated")}>
                {img.category === "live" ? "→ Portraits" : "→ Live"}
              </button>
              <ConfirmDelete className="mng-tilebtn del" disabled={pending} onConfirm={() => run<Img[]>(() => deleteGallery(img.id, img.storage_path), setGallery, "Photo deleted")} />
            </div>
          </>
        )}
      </Reorderable>
    </div>
  );
}
