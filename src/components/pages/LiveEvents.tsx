import { useState } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
} from "lucide-react";

type Tab = "upcoming" | "previous";

interface PreviousItem {
  titleEn: string;
  titleMr: string;
  date: string;
  duration: string;
  views: string;
  host: string;
  youtubeId: string;
}

interface UpcomingItem {
  titleEn: string;
  titleMr: string;
  date: string;
  time: string;
  location: string;
  countdown: string;
  host: string;
  promoDuration?: string; 
  youtubeId?: string;
}

const YT = {
  bigBuckBunny: "YE7VzlLtp-4", // Big Buck Bunny — official
  sintel: "eRsGyueVLvQ", // Sintel — official
  elephantsDream: "TLkA0RELQ1g", // Elephants Dream — official
  tearsOfSteel: "R6MlUcmOul8", // Tears of Steel — official
};

const PREVIOUS: PreviousItem[] = [
  {
    titleEn: "Annual Convention Meeting",
    titleMr: "समाज वार्षिक अधिवेशन सभा",
    date: "15 Jun 2026",
    duration: "1:24:10",
    views: "4.6K",
    host: "अध्यक्ष श्री. प्रकाश बाळबुधे",
    youtubeId: YT.bigBuckBunny,
  },
  {
    titleEn: "Youth Guidance Camp",
    titleMr: "युवक मार्गदर्शन शिबिर",
    date: "31 May 2026",
    duration: "54:18",
    views: "1.4K",
    host: "करिअर मार्गदर्शन समिती",
    youtubeId: YT.sintel,
  },
  {
    titleEn: "Women's Empowerment Meet",
    titleMr: "महिला सक्षमीकरण परिषद",
    date: "17 May 2026",
    duration: "1:03:55",
    views: "1.8K",
    host: "महिला आघाडी, कोहळी समाज",
    youtubeId: YT.elephantsDream,
  },
  {
    titleEn: "Scholarship Distribution Ceremony",
    titleMr: "शैक्षणिक शिष्यवृत्ती वितरण सोहळा",
    date: "03 May 2026",
    duration: "41:07",
    views: "2.3K",
    host: "शिक्षण समिती",
    youtubeId: YT.tearsOfSteel,
  },
  {
    titleEn: "Cultural Program",
    titleMr: "समाज सांस्कृतिक कार्यक्रम",
    date: "12 Apr 2026",
    duration: "1:28:32",
    views: "3.2K",
    host: "युवा सांस्कृतिक मंडळ",
    youtubeId: YT.bigBuckBunny,
  },
  {
    titleEn: "Employment Guidance Workshop",
    titleMr: "रोजगार मार्गदर्शन कार्यशाळा",
    date: "22 Mar 2026",
    duration: "37:50",
    views: "760",
    host: "रोजगार कक्ष",
    youtubeId: YT.sintel,
  },
];

const UPCOMING: UpcomingItem[] = [
  {
    titleEn: "Ganesh Utsav Community Celebration",
    titleMr: "गणेशोत्सव सामाजिक कार्यक्रम",
    date: "05 Sep 2026",
    time: "6:00 PM",
    location: "समाज भवन, नागपूर",
    countdown: "in 7 days",
    host: "उत्सव समिती",
    promoDuration: "0:42",
    youtubeId: YT.elephantsDream,
  },
  {
    titleEn: "Monthly Committee Review",
    titleMr: "मासिक कार्यकारिणी सभा",
    date: "12 Sep 2026",
    time: "5:00 PM",
    location: "समाज भवन, नागपूर",
    countdown: "in 14 days",
    host: "कार्यकारिणी मंडळ",
  },
  {
    titleEn: "Free Health Check-up Camp",
    titleMr: "मोफत आरोग्य तपासणी शिबिर",
    date: "20 Sep 2026",
    time: "9:00 AM",
    location: "समाज भवन, नागपूर",
    countdown: "in 22 days",
    host: "आरोग्य समिती",
    promoDuration: "1:05",
    youtubeId: YT.tearsOfSteel,
  },
];

const LIVE_YOUTUBE_ID = YT.bigBuckBunny;

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/** Pulls the leading number out of a countdown string ("in 7 days" -> 7) so
 *  urgency can be encoded visually — cards inside a week read as "Soon". */
function daysFromCountdown(countdown: string): number | null {
  const m = countdown.match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v13.72c0 .74.81 1.19 1.44.81l10.9-6.86a.96.96 0 000-1.62L9.44 4.33C8.81 3.95 8 4.4 8 5.14z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0V11.25A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* Shared video-card thumbnail. Real YouTube thumbnail when a video exists,
   otherwise a warm placeholder for unconfirmed / not-yet-filmed upcoming events. */
function Thumb({ youtubeId }: { youtubeId?: string }) {
  if (!youtubeId) {
    return (
      <span className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(155deg,var(--maroon-800),var(--maroon-950))]">
        <span
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 25%, var(--gold-300) 0%, transparent 60%)" }}
        />
        <CalendarIcon className="relative h-5 w-5 text-[var(--gold-300)]/80" />
      </span>
    );
  }
  return (
    <span className="group/thumb relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--maroon-950)]">
      <img
        src={ytThumb(youtubeId)}
        alt=""
        className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
      />
      <span className="absolute inset-0 bg-black/15 transition-colors group-hover/thumb:bg-black/30" />
      <PlayIcon className="absolute h-5 w-5 text-white drop-shadow transition-transform group-hover/thumb:scale-110" />
    </span>
  );
}

/* Inline lightbox player — embeds the YouTube video directly, no popups/new tabs required */
function VideoLightbox({ youtubeId, title, onClose }: { youtubeId: string; title: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-[fade-in_.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-[var(--gold-400)]/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[var(--maroon-950)] px-3 py-2">
          <p className="truncate pr-2 text-sm font-semibold text-[var(--gold-100)]">{title}</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--gold-200)] transition-colors hover:bg-white/10"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            key={youtubeId}
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function LiveEvents() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [playing, setPlaying] = useState<{ youtubeId: string; title: string } | null>(null);
  const isLiveNow = true;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <style>{`
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(220,38,38,0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .live-dot { animation: live-pulse 1.8s infinite; }
        .fade-up { animation: fade-up .5s cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .live-dot, .fade-up { animation: none; }
        }
      `}</style>

      {playing && (
        <VideoLightbox youtubeId={playing.youtubeId} title={playing.title} onClose={() => setPlaying(null)} />
      )}

        {/* Header */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
          <SectionHeader eyebrow="Live Streaming" title="Live Events"/>

          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
          </button>
        </div>


      <div className="px-4 pb-6 sm:px-6">
        {/* CURRENTLY LIVE */}
        {isLiveNow && (
          <div className="fade-up relative overflow-hidden rounded-3xl bg-[var(--maroon-950)] shadow-[var(--shadow-maroon)] ring-1 ring-[var(--gold-400)]/20">
            {/* video preview — the actual broadcast thumbnail, not just a plain gradient */}
            <button
              onClick={() => setPlaying({ youtubeId: LIVE_YOUTUBE_ID, title: "रक्षाबंधन स्नेहसंमेलन" })}
              className="group relative flex aspect-video w-full items-center justify-center overflow-hidden"
            >
              <img
                src={ytThumb(LIVE_YOUTUBE_ID)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,5,13,0.35)_0%,rgba(44,5,13,0.15)_45%,var(--maroon-950)_100%)]" />

              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-white">On Air</span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-white/40 px-2.5 py-1 text-[11px] font-medium text-[var(--gold-200)] backdrop-blur-sm">
                प्रसारण चालू आहे
              </span>

              {/* soft ambient glow behind the play button, drawing the eye without a hard shadow */}
              <span className="absolute h-24 w-24 rounded-full bg-[var(--gold-400)]/25 blur-2xl" />
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-[var(--gold-100)] backdrop-blur transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-950)]">
                  <PlayIcon className="h-5 w-5 translate-x-0.5" />
                </span>
              </span>
            </button>

            <div className="px-5 pb-5 pt-4">
              <h2 className="text-xl font-bold leading-snug text-white">
                रक्षाबंधन स्नेहसंमेलन
              </h2>
              <p className="mt-0.5 text-sm text-[var(--gold-100)]">Raksha Bandhan Get-together</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  29 August 2026
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3.5 w-3.5" />
                  6:00 PM
                </span>
                <span className="flex items-center gap-1">
                  <PinIcon className="h-3.5 w-3.5" />
                  समाज भवन, नागपूर
                </span>
                {/* <span className="flex items-center gap-1 text-[var(--gold-200)]">
                  <EyeIcon className="h-3.5 w-3.5" />
                  1.2K watching
                </span> */}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setPlaying({ youtubeId: LIVE_YOUTUBE_ID, title: "रक्षाबंधन स्नेहसंमेलन" })}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] py-2.5 text-sm font-bold text-[var(--maroon-950)] transition-transform active:scale-[0.98]"
                >
                  <PlayIcon className="h-3.5 w-3.5" />
                  Watch Now
                </button>
                <button
                  aria-label="Share"
                  className="flex items-center justify-center rounded-xl border border-white/25 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.6 7.2c-.2-1-1-1.8-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5c-1 .2-1.8 1-2 2C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 1 1.8 2 2 1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5c1-.2 1.8-1 2-2 .4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPCOMING / PREVIOUS toggle — sliding gold pill instead of a hard swap */}
        <div className="relative mt-8 grid grid-cols-2 rounded-xl border border-[var(--gold-300)] bg-white p-1">
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-[linear-gradient(155deg,var(--maroon-800),var(--maroon-950))] shadow-sm transition-transform duration-300 ease-out ${
              tab === "previous" ? "translate-x-[calc(100%+2px)]" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setTab("upcoming")}
            className={`relative z-10 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              tab === "upcoming" ? "text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
            }`}
          >
            Upcoming <span className="opacity-75">· आगामी</span>
          </button>
          <button
            onClick={() => setTab("previous")}
            className={`relative z-10 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              tab === "previous" ? "text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
            }`}
          >
            Previous <span className="opacity-75">· मागील</span>
          </button>
        </div>

        {/* Both tabs share the same card layout — no timeline design */}
        {tab === "upcoming" ? (
          <div className="mt-5 space-y-3">
            {UPCOMING.map((ev, i) => {
              const days = daysFromCountdown(ev.countdown);
              const soon = days !== null && days <= 7;
              return (
                <div
                  key={ev.titleEn}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="fade-up relative flex items-start gap-3 overflow-hidden rounded-2xl border border-[var(--gold-300)] bg-white p-3 pl-4"
                >
                  
                  <div className="relative shrink-0">
                    <Thumb youtubeId={ev.youtubeId} />
                    {ev.promoDuration && (
                      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">
                        {ev.promoDuration}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          soon ? "bg-[var(--maroon-800)] text-[var(--gold-100)]" : "bg-[var(--gold-100)] text-[var(--gold-700)]"
                        }`}
                      >
                        {soon ? "Soon" : "Scheduled"}
                      </span>
                      <span className={`text-[11px] font-semibold ${soon ? "text-[var(--maroon-800)]" : "text-[var(--maroon-700)]"}`}>
                        {ev.countdown}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[14px] font-bold text-[var(--maroon-950)]">{ev.titleEn}</p>
                    {/* <p className="truncate text-[12px] text-[var(--gold-700)]">{ev.titleMr}</p> */}

                    <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {ev.time}
                      </span>
                      <span className="flex min-w-0 items-center gap-1">
                        <PinIcon className="h-3 w-3 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </span>
                    </div>

                    {/* <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] text-[var(--text-muted)]">{ev.host}</p>
                      <button className="shrink-0 rounded-full border border-[var(--gold-400)] px-2.5 py-1 text-[11px] font-semibold text-[var(--maroon-800)] active:scale-95">
                        Remind
                      </button>
                    </div> */}

                    {/* {ev.youtubeId && (
                      <button
                        onClick={() => setPlaying({ youtubeId: ev.youtubeId!, title: `${ev.titleEn} — Teaser` })}
                        className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[var(--maroon-800)]"
                      >
                        <PlayIcon className="h-3 w-3" />
                        Watch teaser
                      </button>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {PREVIOUS.map((item, i) => (
              <button
                key={item.titleEn}
                onClick={() => setPlaying({ youtubeId: item.youtubeId, title: item.titleEn })}
                style={{ animationDelay: `${i * 60}ms` }}
                className="fade-up flex w-full items-start gap-3 rounded-2xl border border-[var(--gold-300)] bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-400)] hover:shadow-md active:scale-[0.99]"
              >
                <div className="relative shrink-0">
                  <Thumb youtubeId={item.youtubeId} />
                  <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">
                    {item.duration}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-[var(--maroon-950)]">{item.titleEn}</p>
                  {/* <p className="truncate text-[12px] text-[var(--gold-700)]">{item.titleMr}</p> */}
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <EyeIcon className="h-3 w-3" />
                      {item.views} views
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-[var(--text-muted)]">{item.host}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}