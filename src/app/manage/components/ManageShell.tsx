"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { AdminData } from "../data";
import { ManageCtx } from "./ui";
import ShowsEditor from "./ShowsEditor";
import CarouselEditor from "./CarouselEditor";
import GalleryEditor from "./GalleryEditor";
import MusicEditor from "./MusicEditor";
import SocialsEditor from "./SocialsEditor";
import VenuesEditor from "./VenuesEditor";
import AboutEditor from "./AboutEditor";
import TextEditor from "./TextEditor";

type Tab = { key: string; label: string; path: string; count?: number };

export default function ManageShell({ data, email }: { data: AdminData; email: string }) {
  const [shows, setShows] = useState(data.shows);
  const [gallery, setGallery] = useState(data.gallery);
  const [music, setMusic] = useState(data.music);
  const [socials, setSocials] = useState(data.socials);
  const [venues, setVenues] = useState(data.venues);
  const [about, setAbout] = useState(data.about);
  const [text, setText] = useState(data.text);

  const [active, setActive] = useState("home");
  const [nonce, setNonce] = useState(0);
  const [toast, setToast] = useState<{ msg: string; err: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((msg: string, err = false) => {
    setToast({ msg, err });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);
  const reloadPreview = useCallback(() => setNonce((n) => n + 1), []);
  const ctx = useMemo(() => ({ notify, reloadPreview }), [notify, reloadPreview]);

  const tabs: Tab[] = [
    { key: "home", label: "Home", path: "/" },
    { key: "about", label: "About", path: "/about" },
    { key: "gallery", label: "Gallery", path: "/gallery", count: gallery.length },
    { key: "music", label: "Music", path: "/music", count: music.length },
    { key: "venues", label: "Venues", path: "/venues", count: venues.length },
    { key: "contact", label: "Contact", path: "/contact" },
  ];
  const activeTab = tabs.find((t) => t.key === active)!;
  const previewSrc = `${activeTab.path}${activeTab.path.includes("?") ? "&" : "?"}mng=${nonce}`;

  return (
    <ManageCtx.Provider value={ctx}>
      {/* top bar */}
      <div className="mng-top">
        <div className="mng-brand"><span className="mng-dot" />STEPHY · <span className="mng-metal">MANAGE</span></div>
        <span className="mng-chip live"><span className="mng-dot" />Live on save</span>
        <div className="mng-spacer" />
        <span className="mng-acct">{email}</span>
        <a className="mng-btn mng-ghost mng-sm" href={activeTab.path} target="_blank" rel="noreferrer">View live ↗</a>
        <form action="/manage/signout" method="post"><button className="mng-btn mng-ghost mng-sm" type="submit">Sign out</button></form>
      </div>

      {/* page tabs */}
      <div className="mng-tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.key} role="tab" aria-selected={active === t.key}
            className={active === t.key ? "sel" : ""} onClick={() => setActive(t.key)}>
            {t.label}{typeof t.count === "number" && <span className="mng-count">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* split: editor | live preview */}
      <div className="mng-split">
        <div className="mng-editor">
          {active === "home" && (
            <>
              <CarouselEditor gallery={gallery} setGallery={setGallery} />
              <ShowsEditor shows={shows} setShows={setShows} />
              <TextEditor page="home" text={text} setText={setText} title="Home page text" />
            </>
          )}
          {active === "about" && <AboutEditor about={about} setAbout={setAbout} />}
          {active === "gallery" && (
            <>
              <GalleryEditor gallery={gallery} setGallery={setGallery} />
              <TextEditor page="gallery" text={text} setText={setText} title="Gallery page text" />
            </>
          )}
          {active === "music" && (
            <>
              <MusicEditor music={music} setMusic={setMusic} />
              <TextEditor page="music" text={text} setText={setText} title="Music page text" />
            </>
          )}
          {active === "venues" && (
            <>
              <VenuesEditor venues={venues} setVenues={setVenues} />
              <TextEditor page="venues" text={text} setText={setText} title="Venues page text" />
            </>
          )}
          {active === "contact" && (
            <>
              <SocialsEditor socials={socials} setSocials={setSocials} />
              <TextEditor page="contact" text={text} setText={setText} title="Contact page text" />
              <TextEditor page="global" text={text} setText={setText} title="Global (email & footer)" />
            </>
          )}
        </div>

        <div className="mng-preview">
          <div className="mng-preview-bar">
            <span className="mng-preview-url">stephylongueira.com{activeTab.path}</span>
            <button className="mng-btn mng-ghost mng-sm" onClick={reloadPreview}>Refresh</button>
          </div>
          <iframe key={active} src={previewSrc} title="Live preview" />
        </div>
      </div>

      {toast && (
        <div className={`mng-toast show${toast.err ? " err" : ""}`}>
          <span className="mng-dot" />{toast.msg}
        </div>
      )}
    </ManageCtx.Provider>
  );
}
