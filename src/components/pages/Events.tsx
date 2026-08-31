import React, { useMemo, useState } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  CalendarDays,
  MapPin,
  Music2,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  Trophy,
  Flame,
  Sparkles,
  Search,
  ImageOff,
} from "lucide-react";
import event1 from "../../assets/event-adhiveshan.jpg";
import event2 from "../../assets/event-mahila-parishad.jpg";
import event3 from "../../assets/event-yuvak-shibir.jpg";
import event4 from "../../assets/live-featured.jpg";
import event5 from "../../assets/live-v1.jpg";
import event6 from "../../assets/live-v3.jpg";

/* ------------------------------------------------------------------ */
/*  Image with graceful fallback                                       */
/* ------------------------------------------------------------------ */
function EventImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(150deg,var(--maroon-800,#5C0F21),var(--maroon-950,#2A0A12))]">
        <ImageOff size={22} className="text-[var(--gold-300,#F3D98B)]/60" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */

type CategoryId =
  | "cultural"
  | "social"
  | "education"
  | "health"
  | "sports"
  | "religious";

interface Category {
  id: CategoryId;
  mr: string;
  en: string;
  icon: React.ElementType;
}

interface EventItem {
  id: string;
  titleMr: string;
  titleEn: string;
  category: CategoryId;
  descriptionMr: string;
  location: string;
  date: string; // ISO date
  image: string; // replace with real event photography when available
}

const CATEGORIES: Category[] = [
  { id: "cultural", mr: "सांस्कृतिक", en: "Cultural", icon: Music2 },
  { id: "social", mr: "सामाजिक", en: "Social welfare", icon: HeartHandshake },
  { id: "education", mr: "शैक्षणिक", en: "Educational", icon: GraduationCap },
  { id: "health", mr: "आरोग्य", en: "Health", icon: HeartPulse },
  { id: "sports", mr: "क्रीडा", en: "Sports", icon: Trophy },
  { id: "religious", mr: "धार्मिक", en: "Religious", icon: Flame },
];

const EVENTS: EventItem[] = [
  {
    id: "e1",
    titleMr: "कोहळी समाज वार्षिक अधिवेशन",
    titleEn: "Kohali Samaj Annual Convention",
    category: "social",
    descriptionMr:
      "वार्षिक सर्वसाधारण सभा — समाज विकासाचा आढावा व नवीन योजनांची घोषणा.",
    location: "समाज भवन, नागपूर",
    date: "2027-06-15",
    image: event1,
  },
  {
    id: "e2",
    titleMr: "युवक मार्गदर्शन शिबिर",
    titleEn: "Youth Guidance Camp",
    category: "education",
    descriptionMr:
      "करिअर मार्गदर्शन, स्पर्धा परीक्षा तयारी व व्यक्तिमत्व विकास शिबिर.",
    location: "सांस्कृतिक सभागृह, नागपूर",
    date: "2027-06-22",
    image: event3,
  },
  {
    id: "e3",
    titleMr: "महिला सक्षमीकरण परिषद",
    titleEn: "Women Empowerment Conference",
    category: "social",
    descriptionMr:
      "महिलांच्या आर्थिक स्वावलंबन व उद्योजकता विकासावर विशेष परिषद.",
    location: "महिला मंडळ हॉल, नागपूर",
    date: "2027-07-05",
    image: event2,
  },
  {
    id: "e4",
    titleMr: "समाज स्नेह मेळावा २०२५",
    titleEn: "Samaj Sneh Melava 2025",
    category: "cultural",
    descriptionMr:
      "समाज बांधवांचा वार्षिक स्नेह मेळावा — सांस्कृतिक कार्यक्रम व सन्मान सोहळा.",
    location: "समाज भवन, नागपूर",
    date: "2025-12-20",
    image: event4,
  },
  {
    id: "e5",
    titleMr: "रक्तदान शिबिर",
    titleEn: "Blood Donation Camp",
    category: "health",
    descriptionMr:
      "समाजाच्या वतीने आयोजित मोफत रक्तदान शिबिर — १५० हून अधिक दात्यांचा सहभाग.",
    location: "समाज भवन, नागपूर",
    date: "2025-11-10",
    image: event5,
  },
  {
    id: "e6",
    titleMr: "शैक्षणिक सन्मान सोहळा",
    titleEn: "Educational Honour Ceremony",
    category: "education",
    descriptionMr:
      "गुणवंत विद्यार्थ्यांचा शैक्षणिक सन्मान व शिष्यवृत्ती वितरण सोहळा.",
    location: "सांस्कृतिक सभागृह, नागपूर",
    date: "2025-08-15",
    image: event6,
  },
];

/* ------------------------------------------------------------------ */
/*  Per-category accent                                                 */
/* ------------------------------------------------------------------ */

const CATEGORY_ACCENT: Record<CategoryId, { solid: string; soft: string }> = {
  cultural: {
    solid: "#C2415D",
    soft: "#FCE4E9",
  },

  social: {
    solid: "#8B5CF6",
    soft: "#EEE8FF",
  },

  education: {
    solid: "#2563EB",
    soft: "#E3EEFF",
  },

  health: {
    solid: "#0F9F8F",
    soft: "#DDF7F3",
  },

  sports: {
    solid: "#E58A24",
    soft: "#FFF0D9",
  },

  religious: {
    solid: "#D16B2F",
    soft: "#FBE8DC",
  },
};

/* ------------------------------------------------------------------ */
/*  Shared container widths           */
/* ------------------------------------------------------------------ */
const CONTAINER = "sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const getCategory = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

const now = new Date();
const isUpcoming = (iso: string) => new Date(`${iso}T23:59:59`) >= now;

const fullDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const dayOf = (iso: string) => new Date(iso).getDate();
const monthOf = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { month: "short" });

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface EventsInitiativesProps {
  onBack?: () => void;
}

export default function EventsInitiatives({ }: EventsInitiativesProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">(
    "all"
  );

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter((e) => isUpcoming(e.date)).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    []
  );
  const pastEvents = useMemo(
    () =>
      EVENTS.filter((e) => !isUpcoming(e.date)).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const featured = upcomingEvents[0];
  const list = tab === "upcoming" ? upcomingEvents : pastEvents;
  const filtered =
    activeCategory === "all"
      ? list
      : list.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-[var(--cream,#F7F1E6)] text-[var(--ink,#2A1416)]">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(243,210,122,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(243,210,122,0); }
          100% { box-shadow: 0 0 0 0 rgba(243,210,122,0); }
        }
        @keyframes hero-shine {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(320%) skewX(-12deg); }
        }
        .ei-enter { animation: fadeSlideUp 0.4s ease-out both; }
        .ei-pulse { animation: pulseDot 1.8s ease-out infinite; }
        .ei-scroll::-webkit-scrollbar { display: none; }
        .ei-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .ei-card-img img { transition: transform 0.4s ease; }
        .ei-card:hover .ei-card-img img { transform: scale(1.04); }
        .ei-hero-shine { animation: hero-shine 3.2s ease-in-out 0.4s 1; }
        @media (prefers-reduced-motion: reduce) {
          .ei-enter, .ei-pulse, .ei-hero-shine { animation: none !important; }
          .ei-card-img img { transition: none !important; }
        }
      `}</style>

      <div className={`mx-auto flex w-full items-center justify-between gap-3 px-4 pt-3 md:gap-4 md:pb-5 md:pt-5 ${CONTAINER}`}>
        <SectionHeader eyebrow="Our Initiatives" title="Events & Initiatives" />

        <button
          onClick={() => navigate("/home")}
          aria-label="Back"
          className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border border-[var(--gold-500,#D4AF37)]/30 bg-[linear-gradient(115deg,var(--maroon-900,#4A0F1A),var(--maroon-700,#7A2035)_65%,var(--maroon-850,#5C0F21))] shadow-[0_6px_14px_-6px_rgba(58,10,18,0.5)] transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
        >
          <ChevronLeft className="h-4 w-4 text-white md:h-[18px] md:w-[18px]" strokeWidth={2.2} />
        </button>
      </div>

      <main className={`mx-auto w-full px-4 pb-14 ${CONTAINER}`}>
       
        {featured ? (
          <section className="ei-enter relative isolate mb-6 flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl border border-[var(--gold-500,#D4AF37)]/25 shadow-[0_16px_38px_-16px_rgba(58,10,18,0.55)] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[25rem]">
            <div className="absolute inset-0 -z-20 h-full w-full">
              <EventImage
                src={featured.image}
                alt={featured.titleEn}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(58,10,18,0.15) 0%, rgba(58,10,18,0.6) 45%, rgba(31,5,10,0.97) 100%)",
              }}
            />

            {/* Shine sweep */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="ei-hero-shine h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
            </div>

            {/* date badge */}
            {/* <div className="absolute right-4 top-4 flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] shadow-[0_8px_18px_-6px_rgba(0,0,0,0.4)]">
              <span className="text-lg font-extrabold leading-none text-[var(--maroon-900,#4A0F1A)]">
                {dayOf(featured.date)}
              </span>
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--maroon-900,#4A0F1A)]">
                {monthOf(featured.date)}
              </span>
            </div> */}

            {/* text sits in normal flow (not absolutely positioned), so the
                section simply grows to fit it — nothing gets cut off */}
            <div className="relative p-5 text-white sm:p-6 md:p-8">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-300,#F3D98B)]">
                <span className="ei-pulse h-2 w-2 shrink-0 rounded-full bg-[var(--gold-300,#F3D98B)]" />
                Up next
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] px-3 py-1 text-[11px] font-bold text-[var(--maroon-900,#4A0F1A)]">
                {React.createElement(getCategory(featured.category).icon, {
                  size: 13,
                })}
                {getCategory(featured.category).mr}
              </div>
              <h2 className="text-[16px] font-extrabold leading-snug sm:text-2xl md:text-[28px]">
                {featured.titleEn}
              </h2>
              <p className="mb-3 mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-[rgba(247,241,230,0.85)] md:max-w-xl md:text-[15px] lg:max-w-2xl">
                {featured.descriptionMr}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-medium md:text-sm">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="shrink-0 text-[var(--gold-300,#F3D98B)]" />
                  {fullDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="shrink-0 text-[var(--gold-300,#F3D98B)]" />
                  {featured.location}
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section className="ei-enter mb-6 flex items-center gap-3 rounded-3xl bg-[linear-gradient(135deg,var(--maroon-900,#4A0F1A),var(--maroon-700,#7A2035))] p-5 text-[var(--cream,#F7F1E6)] shadow-lg">
            <Sparkles size={20} className="shrink-0 text-[var(--gold-300,#F3D98B)]" />
            <p className="text-sm">
              सध्या कोणताही आगामी कार्यक्रम जाहीर झालेला नाही.
            </p>
          </section>
        )}

        {/* Segmented toggle */}
        <div className="relative mb-4 mt-8 grid grid-cols-2 rounded-xl border border-[var(--gold-300)] bg-white p-1 md:max-w-sm md:mx-auto">
  <span
    aria-hidden="true"
    className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-[linear-gradient(155deg,var(--maroon-800),var(--maroon-950))] shadow-sm transition-transform duration-300 ease-out ${
      tab === "past" ? "translate-x-[calc(100%+2px)]" : "translate-x-0"
    }`}
  />

  {(["upcoming", "past"] as const).map((key) => {
    const active = tab === key;
    // const count =
    //   key === "upcoming" ? upcomingEvents.length : pastEvents.length;

    return (
      <button
        key={key}
        onClick={() => setTab(key)}
        className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
          active
            ? "text-[var(--gold-100)]"
            : "text-[var(--maroon-800)]"
        }`}
      >
        {key === "upcoming" ? "Upcoming" : "Previous"}

        {/* <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
            active
              ? "bg-[var(--gold-300)] text-[var(--maroon-900)]"
              : "bg-[rgba(74,15,26,0.1)] text-[var(--maroon-800)]"
          }`}
        >
          {count}
        </span> */}
      </button>
    );
  })}
</div>
        {/* Category filter chips */}
        <div className="ei-scroll mb-6 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition md:px-4 md:py-2 md:text-sm ${
              activeCategory === "all"
                ? "border-transparent bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] text-[var(--maroon-900,#4A0F1A)] shadow-[0_6px_14px_-6px_rgba(58,10,18,0.4)]"
                : "border-[rgba(243,217,139,0.5)] bg-[var(--paper,#FFFDF8)] text-[rgba(74,15,26,0.7)] hover:border-[var(--gold-500,#D4AF37)]/70"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition md:px-4 md:py-2 md:text-sm ${
                  active
                    ? "border-transparent bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] text-[var(--maroon-900,#4A0F1A)] shadow-[0_6px_14px_-6px_rgba(58,10,18,0.4)]"
                    : "border-[rgba(243,217,139,0.5)] bg-[var(--paper,#FFFDF8)] text-[rgba(74,15,26,0.7)] hover:border-[var(--gold-500,#D4AF37)]/70"
                }`}
              >
                <Icon size={13} />
                {cat.mr}
              </button>
            );
          })}
        </div>

        {/* Event grid */}
        {filtered.length === 0 ? (
          <div className="ei-enter flex flex-col items-center justify-center gap-2 rounded-3xl bg-[var(--paper,#FFFDF8)] py-14 text-center shadow-sm">
            <Search size={26} className="text-[rgba(74,15,26,0.25)]" />
            <p className="text-sm font-semibold text-[rgba(74,15,26,0.7)]">
              या श्रेणीत कोणतेही कार्यक्रम नाहीत
            </p>
            <p className="text-xs text-[rgba(42,20,22,0.45)]">
              No events found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, idx) => {
              const cat = getCategory(event.category);
              const Icon = cat.icon;
              const accent = CATEGORY_ACCENT[event.category];
              const past = !isUpcoming(event.date);
              return (
                <article
                  key={event.id}
                  className="ei-card ei-enter flex flex-col overflow-hidden rounded-[20px] bg-[var(--paper,#FFFDF8)] shadow-[0_4px_14px_rgba(43,33,24,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_26px_-8px_rgba(58,10,18,0.35)] hover:ring-1 hover:ring-[var(--gold-500,#D4AF37)]/45"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Image — fixed height is fine here because badges sit
                      inside it, not the variable-length title/description.
                      Height steps up slightly on tablet so it doesn't look
                      squat once the card itself is wider. */}
                  <div className="ei-card-img relative h-40 shrink-0 overflow-hidden md:h-44 lg:h-48">
                    <EventImage
                      src={event.image}
                      alt={event.titleEn}
                      className={`h-full w-full object-cover ${
                        past ? "grayscale-[0.35] brightness-95" : ""
                      }`}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(58,10,18,0) 40%, rgba(58,10,18,0.6) 100%)",
                      }}
                    />

                    <span
                      className="absolute left-2.5 top-2.5 flex max-w-[calc(100%-58px)] items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm"
                      style={{ background: accent.solid, color: accent.soft }}
                    >
                      <Icon size={11} className="shrink-0" />
                      <span className="truncate">{cat.mr}</span>
                    </span>

                    {past ? (
                      <div className="absolute right-2.5 top-2.5 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[10px] bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]">
                        <span className="text-sm font-extrabold leading-none text-[var(--maroon-900,#4A0F1A)]">
                          {dayOf(event.date)}
                        </span>
                        <span className="text-[7.5px] font-bold uppercase text-[var(--maroon-900,#4A0F1A)]">
                          {monthOf(event.date)}
                        </span>
                      </div>
                    ) : (
                      <div className="absolute right-2.5 top-2.5 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[10px] bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]">
                        <span className="text-sm font-extrabold leading-none text-[var(--maroon-900,#4A0F1A)]">
                          {dayOf(event.date)}
                        </span>
                        <span className="text-[7.5px] font-bold uppercase text-[var(--maroon-900,#4A0F1A)]">
                          {monthOf(event.date)}
                        </span>
                      </div>
                    )}

                    <span className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 truncate text-[10.5px] font-semibold text-white drop-shadow">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  </div>

                  {/* Content — normal flow, grows with the text, never clipped */}
                  <div className="flex flex-1 flex-col gap-1 px-3.5 pb-4 pt-3 md:px-4">
                    <h3 className="text-[16px] font-bold text-[var(--ink)] md:text-[17px]">
                      {event.titleEn}
                    </h3>
                    <p className="mt-1 text-[14px] text-[var(--text-muted)]">
                      {event.descriptionMr}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}