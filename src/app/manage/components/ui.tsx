"use client";

import {
  createContext, useContext, useState, useRef, useEffect,
  useTransition, type ReactNode,
} from "react";

/* ------------------------------------------------------------ context ---- */
export type ActionResult = { ok: true; rows?: unknown } | { ok: false; error: string };

type Ctx = { notify: (msg: string, isError?: boolean) => void; reloadPreview: () => void };
export const ManageCtx = createContext<Ctx>({ notify: () => {}, reloadPreview: () => {} });
export const useManage = () => useContext(ManageCtx);

// Runs a server action with pending state; on success updates local state,
// reloads the preview and toasts. On failure toasts the error.
export function useRun() {
  const { notify, reloadPreview } = useManage();
  const [pending, start] = useTransition();
  function run<T>(
    fn: () => Promise<ActionResult>,
    onOk?: (rows: T) => void,
    okMsg = "Saved · live on site"
  ) {
    start(async () => {
      let res: ActionResult;
      try { res = await fn(); }
      catch (e) { notify((e as Error).message || "Something went wrong", true); return; }
      if (res.ok) { onOk?.(res.rows as T); reloadPreview(); notify(okMsg); }
      else notify(res.error || "Something went wrong", true);
    });
  }
  return { run, pending };
}

/* ----------------------------------------------------------- SectionLead -- */
export function SectionLead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mng-sectionlead">
      <h2 className="mng-disp">{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

/* -------------------------------------------------------------- Select ---- */
export function Select({
  value, onChange, options, ariaLabel,
}: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const current = options.find((o) => o.value === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" aria-label={ariaLabel} className="mng-input" style={{ textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setOpen((o) => !o)}>
        <span>{current?.label ?? "Select…"}</span>
        <span style={{ color: "var(--muted-2)", fontSize: 10 }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", zIndex: 30, top: "calc(100% + 4px)", left: 0, right: 0, background: "var(--panel-3)", border: "1px solid var(--line)", borderRadius: 9, padding: 4, maxHeight: 220, overflowY: "auto", boxShadow: "0 20px 40px -20px #000" }}>
          {options.map((o) => (
            <button key={o.value} type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", background: o.value === value ? "var(--panel)" : "transparent", border: 0, color: "var(--text)", fontFamily: "inherit", fontSize: 12.5, padding: "8px 10px", borderRadius: 7, cursor: "pointer" }}>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ FlagPicker -- */
export const FLAGS = ["🇿🇦","🇦🇺","🇬🇧","🇺🇸","🇩🇪","🇳🇱","🇪🇸","🇫🇷","🇵🇹","🇮🇹","🇬🇷","🇭🇷","🇦🇪","🇹🇭","🇮🇩","🇲🇽","🇧🇷"];
export function FlagPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mng-flag-select" role="group" aria-label="Country flag">
      {FLAGS.map((f) => (
        <button key={f} type="button" className={value === f ? "sel" : ""} onClick={() => onChange(f)} aria-pressed={value === f}>{f}</button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- DateField -- */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function DateField({
  value, onChange, allowClear,
}: { value: string | null; onChange: (v: string | null) => void; allowClear?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = value ? new Date(`${value}T00:00:00`) : new Date();
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const first = new Date(view.y, view.m, 1);
  const startDow = first.getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startDow).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const label = value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Pick a date";
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" className="mng-input" style={{ textAlign: "left", cursor: "pointer", color: value ? "var(--text)" : "var(--muted-2)" }}
        onClick={() => {
          // Open the calendar on the selected date's month (e.g. when editing).
          if (!open && value) { const d = new Date(`${value}T00:00:00`); setView({ y: d.getFullYear(), m: d.getMonth() }); }
          setOpen((o) => !o);
        }}>{label}</button>
      {open && (
        <div style={{ position: "absolute", zIndex: 30, top: "calc(100% + 4px)", left: 0, background: "var(--panel-3)", border: "1px solid var(--line)", borderRadius: 11, padding: 12, width: 250, boxShadow: "0 20px 40px -20px #000" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
            <button type="button" className="mng-iconbtn" onClick={() => setView((v) => { const m = v.m - 1; return m < 0 ? { y: v.y - 1, m: 11 } : { ...v, m }; })}>‹</button>
            <span className="mng-disp" style={{ fontSize: 11 }}>{MONTHS[view.m]} {view.y}</span>
            <button type="button" className="mng-iconbtn" onClick={() => setView((v) => { const m = v.m + 1; return m > 11 ? { y: v.y + 1, m: 0 } : { ...v, m }; })}>›</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, fontSize: 8, color: "var(--muted-2)", textAlign: "center", marginBottom: 3 }}>
            {["S","M","T","W","T","F","S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {cells.map((c, i) => c === null ? <span key={i} /> : (
              <button key={i} type="button"
                onClick={() => { onChange(ymd(new Date(view.y, view.m, c))); setOpen(false); }}
                style={{ appearance: "none", border: 0, borderRadius: 6, padding: "6px 0", fontSize: 11, cursor: "pointer",
                  background: value === ymd(new Date(view.y, view.m, c)) ? "var(--text)" : "transparent",
                  color: value === ymd(new Date(view.y, view.m, c)) ? "#0a0a0a" : "var(--text)", fontFamily: "inherit" }}>
                {c}
              </button>
            ))}
          </div>
          {allowClear && value && (
            <button type="button" className="mng-btn mng-ghost mng-sm" style={{ width: "100%", justifyContent: "center", marginTop: 9 }} onClick={() => { onChange(null); setOpen(false); }}>Clear date</button>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ Reorderable -- */
export function Reorderable<T extends { id: string }>({
  items, onReorder, className, itemClassName, children,
}: {
  items: T[]; onReorder: (ids: string[]) => void;
  className?: string; itemClassName?: string;
  children: (item: T, c: { handleProps: Record<string, unknown>; moveUp: () => void; moveDown: () => void; isFirst: boolean; isLast: boolean }) => ReactNode;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const move = (id: string, dir: -1 | 1) => {
    const i = items.findIndex((x) => x.id === id); const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items];[arr[i], arr[j]] = [arr[j], arr[i]];
    onReorder(arr.map((x) => x.id));
  };
  const drop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return; }
    const from = items.findIndex((x) => x.id === dragId);
    const to = items.findIndex((x) => x.id === targetId);
    const arr = [...items]; const [m] = arr.splice(from, 1); arr.splice(to, 0, m);
    onReorder(arr.map((x) => x.id)); setDragId(null); setOverId(null);
  };
  return (
    <div className={className}>
      {items.map((item, idx) => {
        const handleProps = {
          draggable: true,
          onDragStart: (e: React.DragEvent) => {
            setDragId(item.id);
            e.dataTransfer.effectAllowed = "move";
            // Firefox won't start a drag session unless drag data is set.
            e.dataTransfer.setData("text/plain", item.id);
          },
          onDragEnd: () => { setDragId(null); setOverId(null); },
        };
        const state = `${dragId === item.id ? " drag" : ""}${overId === item.id && dragId && dragId !== item.id ? " over" : ""}`;
        return (
          <div key={item.id} className={`${itemClassName || ""}${state}`}
            onDragOver={(e) => { e.preventDefault(); if (overId !== item.id) setOverId(item.id); }}
            onDrop={() => drop(item.id)}>
            {children(item, { handleProps, moveUp: () => move(item.id, -1), moveDown: () => move(item.id, 1), isFirst: idx === 0, isLast: idx === items.length - 1 })}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- Dropzone -- */
export function Dropzone({ onFiles, label, accept = "image/*", disabled }: {
  onFiles: (files: File[]) => void; label: ReactNode; accept?: string; disabled?: boolean;
}) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`mng-drop${over ? " over" : ""}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); if (!disabled) onFiles(Array.from(e.dataTransfer.files)); }}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click(); }}
    >
      {label}
      <input ref={inputRef} type="file" accept={accept} multiple hidden
        onChange={(e) => { if (e.target.files) onFiles(Array.from(e.target.files)); e.target.value = ""; }} />
    </div>
  );
}

/* ---------------------------------------------------------- ConfirmDelete -- */
export function ConfirmDelete({ onConfirm, disabled, className = "mng-btn mng-danger mng-sm" }: {
  onConfirm: () => void; disabled?: boolean; className?: string;
}) {
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 3000); return () => clearTimeout(t); }, [armed]);
  return (
    <button type="button" className={className} disabled={disabled}
      onClick={() => (armed ? onConfirm() : setArmed(true))}>
      {armed ? "Confirm?" : "Delete"}
    </button>
  );
}
