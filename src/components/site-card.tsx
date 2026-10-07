"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Star } from "lucide-react";
import type { Site } from "@/lib/types";
import { normalizeAsset, cn } from "@/lib/utils";
import { addRecent } from "./recently-visited";
import { useFavorites } from "@/lib/favorites";

interface Props {
  site: Site;
  categoryId: string;
}

function statusColor(status?: Site["status"]) {
  switch (status) {
    case "down": return "var(--danger)";
    case "new": return "var(--success)";
    case "trusted": return "var(--accent)";
    default: return null;
  }
}

export function SiteCard({ site, categoryId }: Props) {
  const [imgError, setImgError] = useState(false);
  const { has, toggle, mounted } = useFavorites();
  const starred = mounted && has(site.url);
  const color = statusColor(site.status);
  const cardRef = useRef<HTMLAnchorElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function star(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle({ name: site.name, url: site.url, logo: site.logo, categoryId });
  }

  let host = "";
  try { host = new URL(site.url).hostname.replace(/^www\./, ""); } catch {}

  return (
    <a
      ref={cardRef}
      href={site.url}
      target="_blank"
      rel="noreferrer noopener"
      onPointerMove={onPointerMove}
      onClick={() => addRecent({ name: site.name, url: site.url, logo: site.logo, categoryId })}
      data-name={site.name.toLowerCase()}
      data-category={categoryId}
      data-tags={(site.tags ?? []).join(",").toLowerCase()}
      className={cn(
        "tbcpl-card group relative flex aspect-[5/3] flex-col items-center justify-center gap-1.5 overflow-hidden p-3",
        "transition-transform duration-200 will-change-transform hover:-translate-y-0.5 hover:tbcpl-glow",
        starred && "ring-1 ring-[var(--accent)]/40",
      )}
      title={site.name}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 28%, transparent), transparent 65%)",
        }}
      />
      {/* subtle animated border glow following cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 55%, transparent), transparent 40%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Status badge (top-left) */}
      {site.status && color && (
        <span
          className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider"
          style={{ background: "color-mix(in oklab, " + color + " 18%, transparent)", color, border: `1px solid ${color}` }}
        >
          {site.status === "down" && <span className="pulse-dot h-1 w-1 rounded-full" style={{ background: color }} />}
          {site.status}
        </span>
      )}

      {/* Star button (top-right, always visible) */}
      <button
        type="button"
        aria-label={starred ? "Unstar" : "Star"}
        aria-pressed={starred}
        onClick={star}
        className={cn(
          "absolute right-1.5 top-1.5 z-10 grid h-7 w-7 place-items-center rounded-md transition-all",
          starred
            ? "text-[var(--accent)] opacity-100"
            : "text-[var(--fg-muted)] opacity-60 hover:opacity-100 group-hover:opacity-100",
          "hover:bg-[var(--bg-elev)] hover:text-[var(--accent)]",
        )}
      >
        <Star size={14} fill={starred ? "currentColor" : "none"} strokeWidth={2} />
      </button>

      <div className="relative flex h-14 w-full items-center justify-center px-4">
        {imgError ? (
          <div className="line-clamp-2 text-center text-sm font-semibold">{site.name}</div>
        ) : (
          <Image
            src={normalizeAsset(site.logo)}
            alt={site.name}
            width={160}
            height={64}
            className="max-h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>

    </a>
  );
}