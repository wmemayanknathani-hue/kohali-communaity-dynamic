import { Link } from "react-router-dom";
import { Eye, Play, MapPin, Star } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
import type { Business } from "../data/business";
import { getYouTubeThumbnail, /*toTelHref, toWhatsAppHref*/ } from "../data/business";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const {
    id,
    name,
    nameMr,
    category,
    categoryMr,
    location,
    // mobile,
    // whatsapp,
    adType,
    posterUrl,
    youtubeUrl,
    rating,
    reviewCount,
  } = business;

  const mediaSrc =
    adType === "video" && youtubeUrl ? getYouTubeThumbnail(youtubeUrl) : posterUrl;

  const displayName = nameMr ?? name;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--paper)] shadow-[var(--shadow-maroon,0_2px_10px_-2px_rgba(59,10,22,0.15))] ring-1 ring-[var(--gold-500)]/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-gold,0_10px_24px_-6px_rgba(59,10,22,0.25))] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-gold,0_10px_24px_-6px_rgba(59,10,22,0.25))]">
      <Link
        to={`/business/${id}`}
        className="block rounded-t-2xl no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--maroon-800)]">
          {mediaSrc ? (
            <img
              src={mediaSrc}
              alt={displayName}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs font-semibold text-[var(--gold-300)]">
              {name}
            </div>
          )}

          {/* category chip — top-left, no overlap with play button */}
          <span className="absolute left-2 top-2 rounded-full border border-[var(--gold-500)]/25 bg-[var(--paper)]/95 px-2 py-0.5 text-[9px] font-bold text-[var(--maroon-800)] shadow-sm backdrop-blur-sm">
            {categoryMr ?? category}
          </span>

          {adType === "video" && (
            <>
              {/* light bottom-only fade so play icon is legible without darkening the whole thumbnail */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_100%)]" />
              <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Play size={15} className="text-[var(--maroon-800)]" strokeWidth={2} />
              </span>
            </>
          )}
        </div>

        <div className="px-3 pt-2.5">
          <div className="text-[14px] font-bold text-[var(--ink)]" title={displayName}>
            {displayName}
          </div>

          {typeof rating === "number" && (
            <div
              className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-[var(--gold-600)]"
              aria-label={`Rated ${rating.toFixed(1)} out of 5${reviewCount != null ? ` from ${reviewCount} reviews` : ""}`}
            >
              <Star size={11} fill="currentColor" strokeWidth={0} />
              <span className="text-[var(--ink)]">{rating.toFixed(1)}</span>
              {reviewCount != null && (
                <span className="font-medium text-[var(--text-muted)]">({reviewCount})</span>
              )}
            </div>
          )}

          <p className="mt-1 flex items-center gap-1 truncate text-[11px] font-medium text-[var(--text-muted)]">
            <MapPin size={11} className="shrink-0 text-[var(--gold-600)]" />
            {location}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-1.5 px-3 pb-3 pt-2.5">
        <a
          href={`/business/${id}`}
          aria-label={`${displayName}`}
          className="flex h-9 flex-1 items-center justify-center gap-1 rounded-full bg-[var(--maroon-800)] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--maroon-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] active:scale-95"
        >
          <Eye size={12} />
          <span className="text-[11px] font-bold">View Details</span>
        </a>

        {/* <a
          href={toWhatsAppHref(whatsapp ?? mobile)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${displayName} on WhatsApp`}
          className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-[#25D366] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb959] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] active:scale-95"
        >
          <FaWhatsapp size={12} />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a> */}
      </div>
    </div>
  );
}