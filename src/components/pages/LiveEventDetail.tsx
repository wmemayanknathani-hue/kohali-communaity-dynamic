import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import {
  ChevronLeft,
  Share2,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Eye,
  Radio,
  Bell,
} from "lucide-react";
import {
  FaYoutube,
} from "react-icons/fa";
/* ------------------------------------------------------------------ */
/*  Static data (replace with API data later)                          */
/* ------------------------------------------------------------------ */
const LIVE_EVENT = {
  titleEn: "Annual Convention Meeting",
  titleMr: "समाज वार्षिक अधिवेशन सभा",
  youtubeId: "YE7VzlLtp-4",
  isLive: true,
  viewers: "1.2K watching",
  date: "15 Jun 2027",
  time: "10:00 AM",
  location: "समाज भवन, नागपूर",
  host: "अध्यक्ष श्री. प्रकाश बाळबुधे",
  description:
    "कोहळी समाजाची वार्षिक सर्वसाधारण सभा थेट प्रक्षेपण. समाज विकासाचा आढावा, मागील वर्षातील कामकाजाचा अहवाल, गुणवंत विद्यार्थ्यांचा सन्मान व नवीन योजनांची घोषणा या कार्यक्रमात होईल.",
  agenda: [
    { time: "10:00 AM", title: "स्वागत व दीपप्रज्वलन" },
    { time: "11:00 AM", title: "वार्षिक अहवाल सादरीकरण" },
    { time: "12:30 PM", title: "सन्मान सोहळा" },
    { time: "02:00 PM", title: "समारोप व आभार" },
  ],
};

const UP_NEXT = [
  {
    titleEn: "Ganesh Utsav Community Celebration",
    date: "05 Sep 2027",
    time: "6:00 PM",
    location: "समाज भवन, नागपूर",
    countdown: "in 7 days",
    youtubeId: "TLkA0RELQ1g",
  },
  {
    titleEn: "Free Health Check-up Camp",
    date: "20 Sep 2027",
    time: "9:00 AM",
    location: "समाज भवन, नागपूर",
    countdown: "in 22 days",
    youtubeId: "R6MlUcmOul8",
  },
];

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LiveEventDetail() {
  const navigate = useNavigate();
  const e = LIVE_EVENT;

  const handleShare = async () => {
    const shareData = {
      title: e.titleEn,
      text: `Watch ${e.titleEn} live on Kohali Connect`,
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
      <style>{`
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(220,38,38,0); }
        }
        .live-dot { animation: live-pulse 1.8s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .live-dot { animation: none; }
        }
      `}</style>

      {/* Header */}
      <div
        className={`mx-auto flex w-full items-center justify-between gap-3 px-4 pt-3 md:gap-4 md:pt-5 ${CONTAINER}`}
      >
        <SectionHeader eyebrow="Live Streaming" title="Live Event" />

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            aria-label="Share"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 active:scale-90 md:h-[40px] md:w-[40px]"
          >
            <Share2 className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </button>
          <button
            onClick={() => navigate("/live-events")}
            aria-label="Back"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </button>
        </div>
      </div>

      <main className={`mx-auto w-full px-4 ${CONTAINER}`}>
        <div className="lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div>
            {/* Player */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[var(--gold-500)]/30 bg-black shadow-[var(--shadow-maroon)]">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${e.youtubeId}?rel=0`}
                    title={e.titleEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {e.isLive && (
                  <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 backdrop-blur-md md:left-4 md:top-4 md:px-3 md:py-1.5">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-white md:text-xs">
                      On Air
                    </span>
                  </span>
                )}
              </div>
            </Reveal>

            {/* Title block */}
            <Reveal delay={80} className="mt-5">
              {e.isLive && (
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--maroon-900)] shadow-sm">
                    <Radio size={12} />
                    प्रसारण चालू आहे
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--text-muted)]">
                    <Eye size={13} />
                    {e.viewers}
                  </span>
                </div>
              )}
              <h1 className="text-xl font-extrabold leading-tight text-[var(--maroon-950)] sm:text-2xl md:text-[28px]">
                {e.titleEn}
              </h1>
              <p className="mt-1 text-[14px] font-semibold text-[var(--maroon-800)]">
                {e.titleMr}
              </p>
            </Reveal>

            {/* Actions */}
            <Reveal delay={120}>
              <div className="mt-4 grid grid-cols-1 gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${e.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-sm font-bold text-[var(--gold-300)] no-underline shadow-[0_4px_14px_-4px_rgba(59,10,22,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                >
                  <FaYoutube className="h-4 w-4" /> Watch on YouTube
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

            {/* Agenda */}
            <Reveal delay={200} className="mt-6">
              <SectionHeader eyebrow="Programme" title="Agenda" />
              <div className="mt-2 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                {e.agenda.map((a, i) => (
                  <div
                    key={a.time}
                    className={`flex items-center gap-3 px-4 py-3 md:px-5 ${
                      i === e.agenda.length - 1
                        ? ""
                        : "border-b border-[color:var(--gold-300)]/50"
                    }`}
                  >
                    <span className="w-[76px] shrink-0 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-2 py-1 text-center text-[10.5px] font-bold text-[var(--maroon-900)]">
                      {a.time}
                    </span>
                    <p className="text-[13.5px] font-medium text-[var(--ink)]">
                      {a.title}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:sticky lg:top-4">
            {/* Details */}
            <Reveal delay={200} className="mt-6 lg:mt-0">
              <SectionHeader eyebrow="Event Info" title="Details" />
              <div className="mt-2 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                <InfoRow
                  icon={<CalendarDays size={16} className="text-[var(--maroon-800)]" />}
                  label="Date"
                >
                  {e.date}
                </InfoRow>
                <InfoRow
                  icon={<Clock size={16} className="text-[var(--maroon-800)]" />}
                  label="Time"
                >
                  {e.time}
                </InfoRow>
                <InfoRow
                  icon={<MapPin size={16} className="text-[var(--maroon-800)]" />}
                  label="Location"
                >
                  {e.location}
                </InfoRow>
                <InfoRow
                  icon={<User size={16} className="text-[var(--maroon-800)]" />}
                  label="Host"
                  last
                >
                  {e.host}
                </InfoRow>
              </div>
            </Reveal>

            {/* Up next */}
            <Reveal delay={260} className="mt-6">
              <SectionHeader eyebrow="Coming Soon" title="Up Next" />
              <div className="mt-2 grid gap-3">
                {UP_NEXT.map((ev) => (
                  <div
                    key={ev.titleEn}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--gold-300)] bg-white p-3 md:p-4"
                  >
                    <span className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--maroon-950)] md:h-20 md:w-28">
                      <img
                        src={ytThumb(ev.youtubeId)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/15" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-[var(--gold-100)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--gold-700)]">
                          Scheduled
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--maroon-700)]">
                          {ev.countdown}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-[14px] font-bold text-[var(--maroon-950)] md:text-[15px]">
                        {ev.titleEn}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12px] text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          {ev.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {ev.time}
                        </span>
                        <span className="flex min-w-0 items-center gap-1">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </span>
                      </div>
                      <button className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--gold-400)] px-2.5 py-1 text-[11px] font-semibold text-[var(--maroon-800)] transition-transform active:scale-95">
                        <Bell size={11} /> Remind me
                      </button>
                    </div>
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