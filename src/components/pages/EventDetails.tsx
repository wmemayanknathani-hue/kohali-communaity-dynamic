import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import {
  ChevronLeft,
  Share2,
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Phone,
  User,
  Ticket,
  Users,
  Music2,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static data (replace with API data later)                          */
/* ------------------------------------------------------------------ */
const EVENT = {
  titleEn: "Kohali Samaj Annual Convention",
  titleMr: "कोहळी समाज वार्षिक अधिवेशन",
  category: "सामाजिक",
  categoryAccent: { solid: "#8B5CF6", soft: "#EEE8FF" },
  image:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  date: "2027-06-15",
  time: "10:00 AM – 5:00 PM",
  location: "समाज भवन, नागपूर",
  address: "Samaj Bhavan, Central Avenue, Nagpur, Maharashtra 440018",
  entry: "Free entry for all members",
  expectedGuests: "500+ attendees",
  organizerName: "Kohali Samaj Trust",
  organizerPhone: "+91 98765 43210",
  description:
    "वार्षिक सर्वसाधारण सभा — समाज विकासाचा आढावा, मागील वर्षातील कामकाजाचा अहवाल व नवीन योजनांची घोषणा. समाजातील सर्व बांधव, भगिनी व युवकांनी या कार्यक्रमात आवर्जून उपस्थित राहावे.",
  highlights: [
    "वार्षिक अहवाल व आर्थिक ताळेबंद सादरीकरण",
    "गुणवंत विद्यार्थ्यांचा सन्मान सोहळा",
    "नवीन कार्यकारिणीची घोषणा",
    "सांस्कृतिक कार्यक्रम व स्नेहभोजन",
  ],
  schedule: [
    { time: "10:00 AM", title: "नोंदणी व स्वागत" },
    { time: "11:00 AM", title: "उद्घाटन सत्र व दीपप्रज्वलन" },
    { time: "12:30 PM", title: "वार्षिक अहवाल सादरीकरण" },
    { time: "02:00 PM", title: "स्नेहभोजन" },
    { time: "03:00 PM", title: "सन्मान सोहळा व सांस्कृतिक कार्यक्रम" },
  ],
};

const CONTAINER =
  "sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl";

/* ------------------------------------------------------------------ */
/*  Reveal (fade + slide up)                                           */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Info row                                                           */
/* ------------------------------------------------------------------ */
function InfoRow({
  icon,
  label,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 md:gap-4 md:px-5 md:py-4 ${
        last ? "" : "border-b border-[color:var(--gold-300)]/50"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-[var(--text-muted)]">
          {label}
        </p>
        <div className="text-[14px] font-bold text-[var(--ink)]">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const fullDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const dayOf = (iso: string) => new Date(iso).getDate();
const monthOf = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { month: "short" });

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function EventDetail() {
  const navigate = useNavigate();
  const e = EVENT;

  const handleShare = async () => {
    const shareData = {
      title: e.titleEn,
      text: `Check out ${e.titleEn} on Kohali Connect`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--cream)] pb-12 text-[var(--ink)]">
      {/* Header */}
      <div
        className={`mx-auto flex w-full items-center justify-between gap-3 px-4 pt-3 md:gap-4 md:pt-5 ${CONTAINER}`}
      >
        <SectionHeader eyebrow="Our Initiatives" title="Event Details" />

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            aria-label="Share"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 active:scale-90 md:h-[40px] md:w-[40px]"
          >
            <Share2 className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </button>
          <button
            onClick={() => navigate("/events")}
            aria-label="Back"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[var(--gold-500)]/30 bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </button>
        </div>
      </div>

      <main className={`mx-auto w-full px-4 ${CONTAINER}`}>
        <div className="lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div>
            {/* Hero image */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-maroon)]">
                <div className="relative aspect-[4/3] w-full sm:aspect-video">
                  <img
                    src={e.image}
                    alt={e.titleEn}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(59,10,22,0.75)_0%,rgba(59,10,22,0)_55%)]" />
                </div>

                {/* category + date badges */}
                <div className="absolute inset-x-3 top-3 flex items-start justify-between">
                  <span
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold shadow-sm"
                    style={{
                      background: e.categoryAccent.solid,
                      color: e.categoryAccent.soft,
                    }}
                  >
                    <Music2 size={11} className="shrink-0" />
                    {e.category}
                  </span>

                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-[12px] bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]">
                    <span className="text-base font-extrabold leading-none text-[var(--maroon-900)]">
                      {dayOf(e.date)}
                    </span>
                    <span className="text-[8px] font-bold uppercase text-[var(--maroon-900)]">
                      {monthOf(e.date)}
                    </span>
                  </div>
                </div>

                {/* location on image */}
                <span className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-[12px] font-semibold text-white drop-shadow">
                  <MapPin size={13} className="shrink-0" />
                  <span className="truncate">{e.location}</span>
                </span>
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delay={80} className="mt-5">
              <h1 className="text-xl font-extrabold leading-tight text-[var(--maroon-950)] sm:text-2xl md:text-[28px]">
                {e.titleEn}
              </h1>
              <p className="mt-1 text-[14px] font-semibold text-[var(--maroon-800)]">
                {e.titleMr}
              </p>
            </Reveal>

            {/* Action buttons */}
            <Reveal delay={120}>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${e.organizerPhone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-sm font-bold text-[var(--gold-300)] no-underline shadow-[0_4px_14px_-4px_rgba(59,10,22,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                >
                  <Phone className="h-4 w-4" /> Call Organizer
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    e.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--gold-500)] bg-[var(--paper)] py-3.5 text-sm font-bold text-[var(--maroon-800)] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                >
                  <Navigation className="h-4 w-4" /> Directions
                </a>
              </div>
            </Reveal>

            {/* About */}
            <Reveal delay={160} className="mt-6">
              <SectionHeader eyebrow="More Info" title="About Event" />
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-muted)]">
                {e.description}
              </p>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={200} className="mt-6">
              <SectionHeader eyebrow="What to Expect" title="Highlights" />
              <div className="mt-2 grid gap-2.5">
                {e.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] px-3.5 py-3 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]">
                      <CheckCircle2
                        size={16}
                        className="text-[var(--maroon-800)]"
                      />
                    </span>
                    <p className="text-[13.5px] font-medium text-[var(--ink)]">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:sticky lg:top-4">
            {/* Event info card */}
            <Reveal delay={200} className="mt-6 lg:mt-0">
              <SectionHeader eyebrow="Event Info" title="Date & Venue" />
              <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                <InfoRow
                  icon={<CalendarDays size={16} className="text-[var(--maroon-800)]" />}
                  label="Date"
                >
                  {fullDate(e.date)}
                </InfoRow>
                <InfoRow
                  icon={<Clock size={16} className="text-[var(--maroon-800)]" />}
                  label="Time"
                >
                  {e.time}
                </InfoRow>
                <InfoRow
                  icon={<MapPin size={16} className="text-[var(--maroon-800)]" />}
                  label="Venue"
                >
                  <span className="block">{e.location}</span>
                  <span className="block text-[12px] font-normal text-[var(--text-muted)]">
                    {e.address}
                  </span>
                </InfoRow>
                <InfoRow
                  icon={<Ticket size={16} className="text-[var(--maroon-800)]" />}
                  label="Entry"
                >
                  {e.entry}
                </InfoRow>
                <InfoRow
                  icon={<Users size={16} className="text-[var(--maroon-800)]" />}
                  label="Expected Attendance"
                >
                  {e.expectedGuests}
                </InfoRow>
                <InfoRow
                  icon={<User size={16} className="text-[var(--maroon-800)]" />}
                  label="Organizer"
                  last
                >
                  <span className="block">{e.organizerName}</span>
                  <span className="block text-[12px] font-normal text-[var(--text-muted)]">
                    {e.organizerPhone}
                  </span>
                </InfoRow>
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal delay={260} className="mt-6">
              <SectionHeader eyebrow="Programme" title="Schedule" />
              <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                {e.schedule.map((s, i) => (
                  <div
                    key={s.time}
                    className={`flex items-center gap-3 px-4 py-3 md:px-5 ${
                      i === e.schedule.length - 1
                        ? ""
                        : "border-b border-[color:var(--gold-300)]/50"
                    }`}
                  >
                    <span className="w-[76px] shrink-0 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-2 py-1 text-center text-[10.5px] font-bold text-[var(--maroon-900)]">
                      {s.time}
                    </span>
                    <p className="text-[13.5px] font-medium text-[var(--ink)]">
                      {s.title}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}