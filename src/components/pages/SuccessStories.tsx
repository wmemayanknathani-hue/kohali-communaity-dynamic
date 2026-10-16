import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, Calendar, MapPin, Award } from "lucide-react";
import { getSuccessStories, getInitial } from "../../data/success-stories";
import type { SuccessStory } from "../../data/success-stories";
import SectionHeader from "../SectionHeader";

/* Edit these if you want different wording / language */
const LABELS = {
  eyebrow: "प्रेरणादायी कहाण्या",
  title: "यशोगाथा",
  all: "सर्व",
  read: "वाचा",
  others: "इतर यशोगाथा",
  empty: "या विभागात अजून यशोगाथा नाहीत",
  showAll: "सर्व यशोगाथा पहा",
  back: "मागे जा",
};

const hasOrg = (org?: string) =>
  !!org && org.trim() !== "" && org.trim().toLowerCase() !== "na";

/* ---------- Fade/slide in when the item scrolls into view ---------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function SuccessStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>(LABELS.all);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getSuccessStories();
        if (!cancelled) setStories(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(
    () => [LABELS.all, ...Array.from(new Set(stories.map((s) => s.tag)))],
    [stories]
  );

  const filtered = useMemo(
    () =>
      active === LABELS.all ? stories : stories.filter((s) => s.tag === active),
    [stories, active]
  );

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-6">
      {/* Top bar */}
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-4 pt-3 sm:px-6 md:max-w-3xl md:gap-4 md:px-8 md:pt-5 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        <SectionHeader eyebrow={LABELS.eyebrow} title={LABELS.title} />
        <button
          onClick={() => navigate("/home")}
          aria-label={LABELS.back}
          className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border border-[var(--gold-400)] bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]"
        >
          <ChevronLeft
            className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        {/* Category chips */}
        {!loading && tags.length > 2 && (
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            {tags.map((t) => {
              const on = t === active;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-semibold normal-case tracking-normal transition-colors duration-200 ${
                    on
                      ? "border-[var(--maroon-800)] bg-[var(--maroon-800)] text-[var(--gold-300)]"
                      : "border-[var(--gold-300)] bg-[var(--paper)] text-[var(--maroon-800)] active:bg-[var(--gold-100)]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="animate-pulse">
            <div className="aspect-[4/5] w-full rounded-3xl bg-[var(--gold-100)] sm:aspect-[16/9]" />
            <div className="mt-5 space-y-3">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="flex gap-3 rounded-2xl border border-[var(--gold-100)] bg-[var(--paper)] p-3"
                >
                  <div className="h-[104px] w-[104px] shrink-0 rounded-xl bg-[var(--gold-100)]" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-1/3 rounded bg-[var(--gold-100)]" />
                    <div className="h-4 w-4/5 rounded bg-[var(--gold-100)]" />
                    <div className="h-3 w-2/3 rounded bg-[var(--gold-100)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--gold-300)] bg-[var(--paper)] px-6 py-12 text-center">
            <Award className="mx-auto mb-3 h-8 w-8 text-[var(--gold-600)]" />
            <p className="text-[15px] font-semibold normal-case tracking-normal text-[var(--maroon-800)]">
              {LABELS.empty}
            </p>
            <button
              onClick={() => setActive(LABELS.all)}
              className="mt-3 text-[13px] font-semibold text-[var(--gold-700)] underline underline-offset-4"
            >
              {LABELS.showAll}
            </button>
          </div>
        )}

        {/* Featured story (first in the current category) */}
        {!loading && featured && (
          <Reveal key={`f-${active}-${featured.slug}`}>
            <Link
              to={`/success-stories/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--maroon-900),var(--maroon-700))] shadow-[0_10px_30px_rgba(44,5,13,0.25)] transition-transform duration-150 active:scale-[0.99]"
            >
              <div className="relative aspect-[5/5] w-full sm:aspect-[16/9]">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(44,5,13,0.95)] via-[rgba(44,5,13,0.45)] to-[rgba(44,5,13,0.05)]" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-[var(--gold-400)] px-3.5 py-1 text-[12px] font-bold normal-case tracking-normal text-[var(--maroon-900)] shadow-sm">
                  {featured.tag}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[var(--gold-300)]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-[13px] w-[13px]" />
                      {featured.place}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-[13px] w-[13px]" />
                      {featured.date}
                    </span>
                  </div>

                  <h2 className="mb-2 line-clamp-2 text-[22px] font-bold normal-case leading-snug tracking-normal text-white sm:text-[26px]">
                    {featured.title}
                  </h2>

                  <p className="mb-4 line-clamp-2 max-w-2xl text-[14px] leading-relaxed text-white/80">
                    {featured.desc}
                  </p>

                  <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--gold-400)] bg-[var(--maroon-800)] text-[15px] font-bold text-[var(--gold-300)]">
                        {getInitial(featured.person)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[14px] font-semibold text-white">
                          {featured.person}
                        </div>
                        {hasOrg(featured.org) && (
                          <div className="truncate text-xs text-white/70">
                            {featured.org}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--gold-400)] py-2 pl-4 pr-3 text-[13px] font-bold text-[var(--maroon-900)] transition-colors duration-300 group-hover:bg-[var(--gold-300)]">
                      {LABELS.read}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Other stories */}
        {!loading && rest.length > 0 && (
          <>
            <Reveal key={`h-${active}`}>
              <div className="mb-3 mt-7 flex items-center gap-3">
                <h3 className="text-[16px] font-bold normal-case tracking-normal text-[var(--maroon-800)]">
                  {LABELS.others}
                </h3>
                <div className="h-px flex-1 bg-[var(--gold-300)]" />
                <span className="rounded-full bg-[var(--gold-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--gold-700)]">
                  {rest.length}
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
              {rest.map((s, i) => (
                <Reveal
                  key={`${active}-${s.slug}`}
                  delay={(i % 3) * 80}
                  className="h-full"
                >
                  <Link
                    to={`/success-stories/${s.slug}`}
                    className="group flex h-full gap-3.5 overflow-hidden rounded-2xl border border-[var(--gold-100)] bg-[var(--paper)] p-3 shadow-[0_2px_10px_rgba(44,5,13,0.06)] transition-transform duration-150 active:scale-[0.985] md:flex-col md:gap-0 md:p-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-[var(--gold-100)] md:aspect-[16/10] md:h-auto md:w-full md:rounded-none">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <span className="absolute left-2 top-2 hidden rounded-full bg-[var(--gold-400)] px-2.5 py-1 text-[11px] font-semibold normal-case tracking-normal text-[var(--maroon-900)] md:block">
                        {s.tag}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between md:p-4">
                      <div>
                        <span className="mb-1 inline-block rounded-md bg-[var(--gold-100)] px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal text-[var(--gold-700)] md:hidden">
                          {s.tag}
                        </span>

                        <h4 className="mb-1 line-clamp-2 text-[15px] font-bold normal-case leading-snug tracking-normal text-[var(--ink)] md:text-[16px]">
                          {s.title}
                        </h4>

                        <p className="mb-2 hidden line-clamp-3 text-[14px] leading-relaxed text-[var(--ink)] opacity-80 md:block">
                          {s.desc}
                        </p>
                      </div>

                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] font-medium text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[var(--gold-700)]" />
                            {s.place}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-[var(--gold-700)]" />
                            {s.date}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 md:border-t md:border-[var(--gold-100)] md:pt-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--maroon-800)] text-[12px] font-semibold text-[var(--gold-300)]">
                              {getInitial(s.person)}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-[12.5px] font-semibold text-[var(--maroon-800)]">
                                {s.person}
                              </div>
                              {hasOrg(s.org) && (
                                <div className="hidden truncate text-[11.5px] text-[var(--text-muted)] md:block">
                                  {s.org}
                                </div>
                              )}
                            </div>
                          </div>

                          <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[var(--gold-100)] transition-colors duration-300 group-hover:bg-[var(--maroon-800)]">
                            <ArrowRight className="h-3.5 w-3.5 stroke-[var(--maroon-800)] transition-colors duration-300 group-hover:stroke-white" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}