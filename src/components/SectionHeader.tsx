import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  actionTo,
}: SectionHeaderProps) {
  return (
    <div className="mb-3.5 flex items-end justify-between">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[var(--gold-500)]" />

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-600)]">
            {eyebrow}
          </p>

          <h3 className="mt-0.5 text-[18px] font-extrabold tracking-tight text-[var(--maroon-700)] md:text-[20px] lg:text-[22px] font-['Yatra_One',cursive]">
            {title}
          </h3>
        </div>
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="kc-btn-shine group flex items-center gap-0.5 rounded-full bg-[linear-gradient(120deg,var(--maroon-800),var(--maroon-950))] px-3 py-1.5 text-[11px] font-bold text-[var(--gold-300)] no-underline shadow-[0_6px_16px_-6px_rgba(59,10,22,0.55)] transition-transform duration-200 hover:scale-105 active:scale-95 md:text-xs"
        >
          {actionLabel}

          <ChevronRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}