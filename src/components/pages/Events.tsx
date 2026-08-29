import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Music2,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  Search,
} from "lucide-react";

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

// NOTE: image URLs below are seeded placeholders (picsum.photos) so the
// layout always renders correctly. Swap `image` for real event photos
// (e.g. uploaded to your CDN / asset folder) before shipping.
const EVENTS: EventItem[] = [
  {
    id: "e1",
    titleMr: "वार्षिक सर्वसाधारण सभा",
    titleEn: "Annual General Meeting",
    category: "social",
    descriptionMr:
      "मंडळाच्या वार्षिक कामकाजाचा आढावा, नवीन उपक्रमांची घोषणा व सदस्यांशी चर्चा.",
    location: "माधव सभागृह, नागपूर",
    date: "2026-09-14",
    image: "https://picsum.photos/seed/kohali-agm/900/650",
  },
  {
    id: "e2",
    titleMr: "रक्तदान शिबिर",
    titleEn: "Blood Donation Camp",
    category: "health",
    descriptionMr:
      "समाजासाठी आयोजित रक्तदान शिबिर, सर्व सदस्य व नातेवाईकांना सहभागाचे आवाहन.",
    location: "कोहळी भवन, नागपूर",
    date: "2026-09-28",
    image: "https://picsum.photos/seed/kohali-blood/700/500",
  },
  {
    id: "e3",
    titleMr: "गणेशोत्सव सांस्कृतिक कार्यक्रम",
    titleEn: "Ganeshotsav Cultural Program",
    category: "cultural",
    descriptionMr:
      "गीत, नृत्य व नाट्य सादरीकरणासह बाल ते वृद्धांपर्यंत सर्वांसाठी सांस्कृतिक संध्याकाळ.",
    location: "कोहळी भवन प्रांगण, नागपूर",
    date: "2026-10-05",
    image: "https://picsum.photos/seed/kohali-ganesh/700/500",
  },
  {
    id: "e4",
    titleMr: "शिष्यवृत्ती वितरण समारंभ",
    titleEn: "Scholarship Distribution Ceremony",
    category: "education",
    descriptionMr:
      "गुणवंत विद्यार्थ्यांचा सत्कार व आर्थिक मदतीच्या शिष्यवृत्तीचे वितरण.",
    location: "सरस्वती सभागृह, नागपूर",
    date: "2026-10-20",
    image: "https://picsum.photos/seed/kohali-scholarship/700/500",
  },
  {
    id: "e5",
    titleMr: "आंतर-मंडळ क्रिकेट स्पर्धा",
    titleEn: "Inter-Mandal Cricket Tournament",
    category: "sports",
    descriptionMr:
      "युवकांसाठी आयोजित मैत्रीपूर्ण क्रिकेट स्पर्धा, विजेत्या संघास चषक व प्रमाणपत्र.",
    location: "विभागीय क्रीडा मैदान, नागपूर",
    date: "2026-11-08",
    image: "https://picsum.photos/seed/kohali-cricket/700/500",
  },
  {
    id: "e6",
    titleMr: "महिला सक्षमीकरण कार्यशाळा",
    titleEn: "Women Empowerment Workshop",
    category: "social",
    descriptionMr:
      "स्वयंरोजगार, बचत गट व कायदेशीर हक्कांबाबत मार्गदर्शन करणारी कार्यशाळा.",
    location: "कोहळी भवन, नागपूर",
    date: "2026-07-12",
    image: "https://picsum.photos/seed/kohali-women/700/500",
  },
  {
    id: "e7",
    titleMr: "विद्यार्थी मार्गदर्शन शिबिर",
    titleEn: "Student Guidance Camp",
    category: "education",
    descriptionMr:
      "करिअर निवड व स्पर्धा परीक्षांबाबत तज्ज्ञांचे मार्गदर्शन शिबिर.",
    location: "सरस्वती सभागृह, नागपूर",
    date: "2026-06-20",
    image: "https://picsum.photos/seed/kohali-guidance/700/500",
  },
  {
    id: "e8",
    titleMr: "आरोग्य तपासणी शिबिर",
    titleEn: "Health Checkup Camp",
    category: "health",
    descriptionMr:
      "मोफत सर्वसाधारण आरोग्य तपासणी, रक्तदाब व मधुमेह चाचणी शिबिर.",
    location: "कोहळी भवन, नागपूर",
    date: "2026-05-15",
    image: "https://picsum.photos/seed/kohali-checkup/700/500",
  },
  {
    id: "e9",
    titleMr: "होळी स्नेहसंमेलन",
    titleEn: "Holi Get-together",
    category: "cultural",
    descriptionMr: "रंगपंचमीनिमित्त सर्व सदस्यांसाठी आनंददायी स्नेहसंमेलन.",
    location: "कोहळी भवन प्रांगण, नागपूर",
    date: "2026-03-24",
    image: "https://picsum.photos/seed/kohali-holi/700/500",
  },
];

/* ------------------------------------------------------------------ */
/*  Per-category accent (keeps the maroon/gold spine but lets each      */
/*  kind of gathering read at a glance, like different colours of      */
/*  invitation card)                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_ACCENT: Record<CategoryId, { solid: string; soft: string }> = {
  cultural: { solid: "#B5482E", soft: "#F4DED4" },
  social: { solid: "#7E1F2C", soft: "#EFD9DC" },
  education: { solid: "#3E5C3A", soft: "#DEE7DA" },
  health: { solid: "#9C2B3B", soft: "#F1DADE" },
  sports: { solid: "#8A5A17", soft: "#EEE0C4" },
  religious: { solid: "#C1440E", soft: "#F5DED0" },
};

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

export default function EventsInitiatives({ onBack }: EventsInitiativesProps) {
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
    <div
      className="min-h-screen w-full"
      style={
        {
          background: "var(--cream)",
          "--maroon-900": "#5C0E1A",
          "--maroon-700": "#7E1F2C",
          "--gold-300": "#F3D27A",
          "--gold-500": "#D4A017",
          "--cream": "#FDF8EC",
          "--paper": "#FFFFFF",
          "--ink": "#2B2118",
          fontFamily: "'Work Sans', 'Noto Sans Devanagari', sans-serif",
        } as React.CSSProperties
      }
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Work+Sans:wght@400;500;600;700;800&display=swap');

        .ei-mr { font-family: 'Noto Sans Devanagari', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(243,210,122,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(243,210,122,0); }
          100% { box-shadow: 0 0 0 0 rgba(243,210,122,0); }
        }
        .ei-enter { animation: fadeSlideUp 0.4s ease-out both; }
        .ei-pulse { animation: pulseDot 1.8s ease-out infinite; }
        .ei-scroll::-webkit-scrollbar { display: none; }
        .ei-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .ei-card-img img { transition: transform 0.4s ease; }
        .ei-card:hover .ei-card-img img { transform: scale(1.04); }
        @media (prefers-reduced-motion: reduce) {
          .ei-enter, .ei-pulse { animation: none !important; }
          .ei-card-img img { transition: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[var(--gold-300)]/40 bg-[var(--cream)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6 md:px-8 lg:px-10">
          <button
            onClick={onBack}
            aria-label="मागे जा"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--maroon-900)]/5 text-[var(--maroon-900)] transition hover:bg-[var(--maroon-900)]/10 active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold-500)]">
              आमचे उपक्रम &middot; Our Initiatives
            </p>
            <h1 className="ei-mr truncate text-lg font-extrabold text-[var(--maroon-900)] sm:text-xl">
              कार्यक्रम व उपक्रम
              <span className="ml-2 align-middle font-sans text-xs font-medium text-[var(--ink)]/50">
                Events &amp; Initiatives
              </span>
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-14 pt-5 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-5xl lg:px-10 xl:max-w-6xl">
        {/* Poster-style hero for the next upcoming event */}
        {featured ? (
          <section className="ei-enter relative mb-6 h-72 overflow-hidden rounded-3xl shadow-lg sm:h-80">
            <img
              src={featured.image}
              alt={featured.titleEn}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(92,14,26,0.10) 0%, rgba(92,14,26,0.55) 55%, rgba(43,7,13,0.95) 100%)",
              }}
            />

            {/* date badge */}
            <div className="absolute right-4 top-4 flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-lg">
              <span className="text-lg font-extrabold leading-none text-[var(--maroon-900)]">
                {dayOf(featured.date)}
              </span>
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--maroon-900)]">
                {monthOf(featured.date)}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--cream)] sm:p-6">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-300)]">
                <span className="ei-pulse h-2 w-2 rounded-full bg-[var(--gold-300)]" />
                पुढील कार्यक्रम &middot; Up next
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[11px] font-bold text-[var(--maroon-900)]">
                {React.createElement(getCategory(featured.category).icon, {
                  size: 13,
                })}
                {getCategory(featured.category).mr}
              </div>
              <h2 className="ei-mr text-xl font-extrabold leading-snug sm:text-2xl">
                {featured.titleMr}
              </h2>
              <p className="mb-2 text-xs font-medium text-[var(--cream)]/55">
                {featured.titleEn}
              </p>
              <p className="mb-3 max-w-lg text-sm leading-relaxed text-[var(--cream)]/85 sm:line-clamp-2">
                {featured.descriptionMr}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-medium">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-[var(--gold-300)]" />
                  {fullDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[var(--gold-300)]" />
                  {featured.location}
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section className="ei-enter mb-6 flex items-center gap-3 rounded-3xl bg-[linear-gradient(135deg,var(--maroon-900),var(--maroon-700))] p-5 text-[var(--cream)] shadow-lg">
            <Sparkles size={20} className="text-[var(--gold-300)]" />
            <p className="text-sm">
              सध्या कोणताही आगामी कार्यक्रम जाहीर झालेला नाही.
            </p>
          </section>
        )}

        {/* Segmented toggle */}
        <div className="mb-4 flex rounded-full bg-[var(--maroon-900)]/6 p-1">
          {(["upcoming", "past"] as const).map((key) => {
            const active = tab === key;
            const count =
              key === "upcoming" ? upcomingEvents.length : pastEvents.length;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-bold transition-all ${
                  active
                    ? "bg-[var(--maroon-900)] text-[var(--cream)] shadow"
                    : "text-[var(--maroon-900)]/60"
                }`}
              >
                {key === "upcoming" ? "आगामी" : "मागील"}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                    active
                      ? "bg-[var(--gold-300)] text-[var(--maroon-900)]"
                      : "bg-[var(--maroon-900)]/10 text-[var(--maroon-900)]/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category filter chips */}
        <div className="ei-scroll mb-6 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "all"
                ? "border-transparent bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-900)]"
                : "border-[var(--gold-300)]/50 bg-[var(--paper)] text-[var(--maroon-900)]/70"
            }`}
          >
            सर्व &middot; All
          </button>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                  active
                    ? "border-transparent bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-900)]"
                    : "border-[var(--gold-300)]/50 bg-[var(--paper)] text-[var(--maroon-900)]/70"
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
          <div className="ei-enter flex flex-col items-center justify-center gap-2 rounded-3xl bg-[var(--paper)] py-14 text-center shadow-sm">
            <Search size={26} className="text-[var(--maroon-900)]/25" />
            <p className="text-sm font-semibold text-[var(--maroon-900)]/70">
              या श्रेणीत कोणतेही कार्यक्रम नाहीत
            </p>
            <p className="text-xs text-[var(--ink)]/45">
              No events found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, idx) => {
              const cat = getCategory(event.category);
              const Icon = cat.icon;
              const accent = CATEGORY_ACCENT[event.category];
              const past = !isUpcoming(event.date);
              return (
                <article
                  key={event.id}
                  className="ei-card ei-enter flex flex-col overflow-hidden rounded-[20px] bg-[var(--paper)] shadow-[0_4px_14px_rgba(43,33,24,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(43,33,24,0.16)]"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Image */}
                  <div className="ei-card-img relative h-40 overflow-hidden">
                    <img
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
                          "linear-gradient(180deg, rgba(92,14,26,0) 40%, rgba(92,14,26,0.55) 100%)",
                      }}
                    />

                    <span
                      className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
                      style={{ background: accent.soft, color: accent.solid }}
                    >
                      <Icon size={11} />
                      {cat.mr}
                    </span>

                    {past ? (
                      <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[var(--cream)]/92 px-2.5 py-1 text-[9px] font-bold text-[var(--maroon-900)]/70">
                        <CheckCircle2 size={11} />
                        पूर्ण
                      </span>
                    ) : (
                      <div className="absolute right-2.5 top-2.5 flex h-11 w-11 flex-col items-center justify-center rounded-[10px] bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow">
                        <span className="text-sm font-extrabold leading-none text-[var(--maroon-900)]">
                          {dayOf(event.date)}
                        </span>
                        <span className="text-[7.5px] font-bold uppercase text-[var(--maroon-900)]">
                          {monthOf(event.date)}
                        </span>
                      </div>
                    )}

                    <span className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[10.5px] font-semibold text-white drop-shadow">
                      <MapPin size={11} />
                      {event.location}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1 px-3.5 pb-4 pt-3">
                    <h3 className="ei-mr text-[14.5px] font-extrabold leading-snug text-[var(--ink)]">
                      {event.titleMr}
                    </h3>
                    <p className="-mt-0.5 text-[10.5px] font-semibold text-[var(--ink)]/40">
                      {event.titleEn}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-[var(--ink)]/65">
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