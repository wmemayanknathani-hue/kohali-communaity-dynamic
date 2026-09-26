import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import { successStories, getInitial } from "../../data/success-stories";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
export default function SuccessStories() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Top bar */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
            <SectionHeader eyebrow="प्रेरणादायी कहाण्या" title="यशोगाथा" />

            <button onClick={() => navigate("/home")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
            </button>
        </div>
      

      {/* List */}
      <div className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:px-6 md:max-w-3xl md:grid-cols-2 md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:grid-cols-3">
        {successStories.map((s, i) => (
          <Link
            key={s.slug}
            to={`/success-stories/${s.slug}`}
            style={{ transitionDelay: mounted ? `${i * 90}ms` : "0ms" }}
            className={`group block overflow-hidden rounded-2xl border border-[var(--gold-100)] bg-[var(--paper)] transition-all duration-500 ease-out active:scale-[0.985] active:shadow-[0_2px_10px_rgba(44,5,13,0.10)] ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--gold-100)]">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(44,5,13,0.85)] via-[rgba(44,5,13,0.35)] to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-[var(--gold-400)] px-2.5 py-1  text-[11px] font-semibold text-[var(--maroon-900)]">
                {s.tag}
              </span>
              <span className="absolute bottom-2.5 left-3 flex items-center gap-1.5  text-xs font-medium text-white">
                <MapPin className="h-[13px] w-[13px] stroke-[var(--gold-300)]" />
                {s.place}
              </span>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-2.5 flex items-center gap-1.5  text-xs font-medium text-[var(--gold-700)]">
                <Calendar className="h-[13px] w-[13px] shrink-0 stroke-[var(--gold-700)]" />
                {s.date}
              </div>

              <h2 className="mb-2.5 text-[16px] font-bold text-[var(--ink)]">
                {s.title}
              </h2>

              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--maroon-800)]  text-[13px] font-semibold text-[var(--gold-300)]">
                  {getInitial(s.person)}
                </div>
                <div className="min-w-0">
                  <div className=" text-[13px] font-semibold text-[var(--maroon-800)]">
                    {s.person}
                  </div>
                  <div className="truncate  text-xs text-[var(--text-muted)]">
                    {s.org}
                  </div>
                </div>
              </div>

              <p className="mb-3.5 text-[14.5px]  text-[var(--ink)] opacity-85">
                {s.desc}
              </p>

              <div className="flex items-center justify-between border-t border-[var(--gold-100)] pt-3.5  text-[13px] font-semibold text-[var(--maroon-800)]">
                अधिक पहा
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[var(--gold-100)] transition-colors duration-300 group-hover:bg-[var(--maroon-800)]">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[var(--maroon-800)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:stroke-white" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}