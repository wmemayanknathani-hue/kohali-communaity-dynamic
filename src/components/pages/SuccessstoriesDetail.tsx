import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  ArrowRight,
} from "lucide-react";
import { successStories, getStoryBySlug, getInitial } from "../../data/success-stories";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";

export default function SuccessStoryDetail() {
  const { storySlug } = useParams<{ storySlug: string }>();
  const story = getStoryBySlug(storySlug ?? "");
  const [mounted, setMounted] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setMounted(false);
    setSlide(0);
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [storySlug]);

  if (!story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--cream)] px-6 text-center font-['Tiro_Devanagari_Marathi']">
        <p className="text-lg text-[var(--maroon-900)]">ही यशोगाथा सापडली नाही</p>
        <Link
          to="/success-stories"
          className=" text-sm font-semibold text-[var(--maroon-800)] underline"
        >
          सर्व यशोगाथा पहा
        </Link>
      </div>
    );
  }

  const bodyParagraphs = story.body ?? [story.desc];
  const related = successStories.filter((s) => s.slug !== story.slug).slice(0, 3);

  const reveal = (step: number) => ({
    className: `transition-all duration-500 ease-out ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
    style: { transitionDelay: mounted ? `${step * 90}ms` : "0ms" },
  });

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Top bar */}
      <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
            <SectionHeader eyebrow="Story Detail" title="सर्व यशोगाथा पहा" />

            <button onClick={() => navigate("/success-stories")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
            </button>
        </div>
      

      <div className="mx-auto w-full px-4 pb-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        {/* Category + title + byline */}
        <div {...reveal(0)}>
          <span className="mb-3 inline-block rounded-full bg-[var(--gold-400)] px-3 py-1 text-[11.5px] font-semibold text-[var(--gold-100)]">
            {story.tag}
          </span>
          <h1 className="mb-3 text-[18px] font-bold text-[var(--ink)]">
            {story.title}
          </h1>

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--maroon-800)] text-[15px] font-semibold text-[var(--gold-300)] shadow-[0_2px_6px_rgba(44,5,13,0.25)]">
              {getInitial(story.person)}
            </div>
            <div className="min-w-0">
              <div className=" text-sm font-semibold text-[var(--maroon-800)]">
                {story.person}
              </div>
              <div className="truncate text-xs text-[var(--text-muted)]">
                {story.org}
              </div>
              <div className="mt-1 flex items-center gap-3 text-[11.5px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 stroke-[var(--gold-700)]" />
                  {story.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 stroke-[var(--gold-700)]" />
                  {story.place}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div
          {...reveal(1)}
          className={`${reveal(1).className} group mb-5 overflow-hidden rounded-2xl border border-[var(--gold-100)] shadow-[0_4px_16px_rgba(44,5,13,0.10)]`}
        >
          <div className="aspect-[16/11] w-full overflow-hidden">
            <img
              src={story.img}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Body */}
        <div {...reveal(2)} className={`${reveal(2).className} mb-5 flex flex-col gap-4`}>
          {bodyParagraphs.map((para, i) => (
            <p key={i} className="text-[15px]  text-[var(--ink)] opacity-90">
              {para}
            </p>
          ))}
        </div>

        {/* Quote */}
        {story.quote && (
          <div
            {...reveal(3)}
            className={`${reveal(3).className} mb-6 rounded-2xl border border-[var(--gold-100)] bg-[var(--paper)] p-5`}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold-100)]">
              <Quote className="h-4 w-4 stroke-[var(--gold-700)]" />
            </div>
            <p className="mb-2 text-[16px] italic  text-[var(--maroon-900)]">
              {story.quote.text}
            </p>
            <p className=" text-xs font-semibold text-[var(--text-muted)]">
              — {story.quote.author}
            </p>
          </div>
        )}

        {/* Highlights */}
        {story.highlights && story.highlights.length > 0 && (
          <div {...reveal(4)} className={`${reveal(4).className} mb-8`}>
            <SectionHeader eyebrow="मुख्य उपलब्धी" title="ठळक वैशिष्ट्ये" />
            <div className="flex flex-col gap-2">
              {story.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: mounted ? `${450 + i * 80}ms` : "0ms" }}
                  className={`flex items-center gap-3 rounded-xl border border-[var(--gold-100)] bg-[var(--paper)] p-3 transition-all duration-400 ease-out ${
                    mounted ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--gold-100)]">
                    <CheckCircle2 className="h-4 w-4 stroke-[var(--gold-700)]" />
                  </span>
                  <span className="text-[14px]  text-[var(--ink)]">{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related stories — slider */}
        {related.length > 0 && (
          <div {...reveal(5)} className={reveal(5).className}>
            <div className="mb-3 flex items-center justify-between">
              <SectionHeader eyebrow="प्रेरणेचे क्षण" title="इतर यशोगाथा" />
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="मागील"
                  onClick={() => setSlide((i) => (i - 1 + related.length) % related.length)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--gold-100)] bg-[var(--paper)] transition-transform active:scale-90"
                >
                  <ChevronLeft className="h-3.5 w-3.5 stroke-[var(--maroon-800)]" />
                </button>
                <button
                  type="button"
                  aria-label="पुढील"
                  onClick={() => setSlide((i) => (i + 1) % related.length)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--gold-100)] bg-[var(--paper)] transition-transform active:scale-90"
                >
                  <ChevronRight className="h-3.5 w-3.5 stroke-[var(--maroon-800)]" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-[0_2px_10px_rgba(44,5,13,0.08)]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/success-stories/${r.slug}`}
                    className="group block w-full shrink-0 overflow-hidden rounded-2xl border border-[var(--gold-100)] bg-[var(--paper)] transition-transform active:scale-[0.985]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--gold-100)]">
                      <img
                        src={r.img}
                        alt={r.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(44,5,13,0.85)] via-[rgba(44,5,13,0.35)] to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--gold-400)] px-2.5 py-1 text-[11px] font-semibold text-[var(--maroon-900)]">
                        {r.tag}
                      </span>
                      <span className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs font-medium text-white">
                        <MapPin className="h-[13px] w-[13px] stroke-[var(--gold-300)]" />
                        {r.place}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-[var(--gold-700)]">
                        <Calendar className="h-[13px] w-[13px] shrink-0 stroke-[var(--gold-700)]" />
                        {r.date}
                      </div>

                      <h3 className="mb-2.5 line-clamp-2 text-[16px] font-bold text-[var(--ink)]">
                        {r.title}
                      </h3>

                      <div className="mb-3 flex items-center gap-2.5">
                        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--maroon-800)] text-[13px] font-semibold text-[var(--gold-300)]">
                          {getInitial(r.person)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-[var(--maroon-800)]">
                            {r.person}
                          </div>
                          <div className="truncate text-xs text-[var(--text-muted)]">
                            {r.org}
                          </div>
                        </div>
                      </div>

                      <p className="mb-3.5 line-clamp-2 text-[14.5px] text-[var(--ink)] opacity-85">
                        {r.desc}
                      </p>

                      <div className="flex items-center justify-between border-t border-[var(--gold-100)] pt-3.5 text-[13px] font-semibold text-[var(--maroon-800)]">
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

            <div className="mt-3 flex justify-center gap-1.5">
              {related.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  aria-label={`स्लाइड ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-5 bg-[var(--gold-600)]" : "w-1.5 bg-[var(--gold-100)]"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}