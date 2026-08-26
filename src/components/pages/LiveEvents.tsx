import { useState } from "react";

type Tab = "upcoming" | "previous";

interface PreviousItem {
  no: string;
  titleEn: string;
  titleMr: string;
  date: string;
  duration: string;
  views: string;
  host: string;
}

interface UpcomingItem {
  titleEn: string;
  titleMr: string;
  date: string;
  time: string;
  location: string;
  countdown: string;
  host: string;
}

const PREVIOUS: PreviousItem[] = [
  {
    no: "01",
    titleEn: "Convention Inauguration",
    titleMr: "समाज अधिवेशन उद्घाटन सोहळा",
    date: "12 May 2026",
    duration: "1:12:40",
    views: "2.1K",
    host: "अध्यक्ष श्री. प्रकाश बाळबुधे",
  },
  {
    no: "02",
    titleEn: "Youth Guidance Camp",
    titleMr: "युवक मार्गदर्शन शिबिर",
    date: "28 Apr 2026",
    duration: "54:18",
    views: "1.4K",
    host: "करिअर मार्गदर्शन समिती",
  },
  {
    no: "03",
    titleEn: "Women's Empowerment Meet",
    titleMr: "महिला सक्षमीकरण परिषद",
    date: "15 Apr 2026",
    duration: "1:03:55",
    views: "1.8K",
    host: "महिला आघाडी, कोहळी समाज",
  },
  {
    no: "04",
    titleEn: "Scholarship Distribution",
    titleMr: "शैक्षणिक शिष्यवृत्ती वितरण",
    date: "02 Apr 2026",
    duration: "41:07",
    views: "980",
    host: "शिक्षण समिती",
  },
  {
    no: "05",
    titleEn: "Cultural Program",
    titleMr: "समाज सांस्कृतिक कार्यक्रम",
    date: "20 Mar 2026",
    duration: "1:28:32",
    views: "3.2K",
    host: "युवा सांस्कृतिक मंडळ",
  },
  {
    no: "06",
    titleEn: "Employment Workshop",
    titleMr: "रोजगार मार्गदर्शन कार्यशाळा",
    date: "05 Mar 2026",
    duration: "37:50",
    views: "760",
    host: "रोजगार कक्ष",
  },
];

const UPCOMING: UpcomingItem[] = [
  {
    titleEn: "Scholarship Results Announcement",
    titleMr: "शिष्यवृत्ती निकाल घोषणा",
    date: "30 Jun 2026",
    time: "11:00 AM",
    location: "समाज भवन, नागपूर",
    countdown: "in 4 days",
    host: "शिक्षण समिती",
  },
  {
    titleEn: "Monthly Committee Review",
    titleMr: "मासिक कार्यकारिणी सभा",
    date: "12 Jul 2026",
    time: "5:00 PM",
    location: "समाज भवन, नागपूर",
    countdown: "in 16 days",
    host: "कार्यकारिणी मंडळ",
  },
  {
    titleEn: "Free Health Check-up Camp",
    titleMr: "मोफत आरोग्य तपासणी शिबिर",
    date: "19 Jul 2026",
    time: "9:00 AM",
    location: "समाज भवन, नागपूर",
    countdown: "in 23 days",
    host: "आरोग्य समिती",
  },
];

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

/* Shared video-card thumbnail used by both Upcoming and Previous */
function Thumb({ scheduled }: { scheduled?: boolean }) {
  return (
    <span className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(155deg,var(--maroon-800),var(--maroon-950))]">
      {scheduled ? (
        <CalendarIcon className="h-5 w-5 text-[var(--gold-300)]/70" />
      ) : (
        <PlayIcon className="h-5 w-5 text-[var(--gold-300)]/80" />
      )}
      {scheduled && (
        <span className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_4px,transparent_4px,transparent_10px)]" />
      )}
    </span>
  );
}

export default function LiveEvents() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const isLiveNow = true;

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <style>{`
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(220,38,38,0); }
        }
        .live-dot { animation: live-pulse 1.8s infinite; }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3 sm:px-6">
        <button
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold-300)] bg-white text-[var(--maroon-800)]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold leading-tight text-[var(--maroon-900)]">Live Events</h1>
          <p className="text-xs text-[var(--gold-700)]">थेट प्रसारण</p>
        </div>
      </div>

      <div className="px-4 pb-24 sm:px-6">
        {/* CURRENTLY LIVE */}
        {isLiveNow && (
          <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--maroon-800),var(--maroon-950))] shadow-[var(--shadow-maroon)]">
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--gold-500)]/10 blur-2xl" />

            <div className="flex items-center justify-between px-4 pt-4">
              <span className="flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-white">On Air</span>
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-[var(--gold-200)]">
                प्रसारण चालू आहे
              </span>
            </div>

            <button className="mx-auto my-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-[var(--gold-100)] backdrop-blur transition active:scale-95">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-950)]">
                <PlayIcon className="h-6 w-6 translate-x-0.5" />
              </span>
            </button>

            <div className="px-5 pb-5">
              <h2 className="text-xl font-bold leading-snug text-white">
                कोहळी समाज वार्षिक अधिवेशन सभा
              </h2>
              <p className="mt-0.5 text-sm text-[var(--gold-200)]">Annual Convention Meeting</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  15 June 2026
                </span>
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  समाज भवन, नागपूर
                </span>
                <span>3.4K watching</span>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] py-2.5 text-sm font-bold text-[var(--maroon-950)] active:scale-[0.98]">
                  Watch Now
                </button>
                <button className="flex items-center justify-center rounded-xl border border-white/25 px-3.5 text-sm font-semibold text-white active:scale-[0.98]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.6 7.2c-.2-1-1-1.8-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5c-1 .2-1.8 1-2 2C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 1 1.8 2 2 1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5c1-.2 1.8-1 2-2 .4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPCOMING / PREVIOUS toggle */}
        <div className="mt-8 flex gap-1 rounded-xl border border-[var(--gold-300)] bg-white p-1">
          <button
            onClick={() => setTab("upcoming")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              tab === "upcoming" ? "bg-[var(--maroon-900)] text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
            }`}
          >
            Upcoming <span className="opacity-75">· आगामी</span>
          </button>
          <button
            onClick={() => setTab("previous")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              tab === "previous" ? "bg-[var(--maroon-900)] text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
            }`}
          >
            Previous <span className="opacity-75">· मागील</span>
          </button>
        </div>

        {tab === "upcoming" ? (
          <div className="mt-5 space-y-3">
            {UPCOMING.map((ev) => (
              <div key={ev.titleEn} className="flex items-start gap-3 rounded-2xl border border-[var(--gold-300)] bg-white p-3">
                <Thumb scheduled />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-[var(--gold-100)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--gold-700)]">
                      Scheduled
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--maroon-700)]">{ev.countdown}</span>
                  </div>
                  <p className="mt-1 truncate text-[14px] font-bold text-[var(--maroon-950)]">{ev.titleEn}</p>
                  <p className="truncate text-[12px] text-[var(--gold-700)]">{ev.titleMr}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                    {ev.date} · {ev.time} · {ev.location}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">{ev.host}</p>
                </div>
                <button className="shrink-0 rounded-full border border-[var(--gold-400)] px-3 py-1.5 text-[11px] font-semibold text-[var(--maroon-800)] active:scale-95">
                  Remind
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mt-5">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--gold-300)]" />
            <div className="space-y-4">
              {PREVIOUS.map((item) => (
                <button key={item.no} className="group flex w-full items-start gap-3 text-left active:scale-[0.99]">
                  <span className="relative z-10 mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--gold-400)] bg-[var(--cream)] text-[11px] font-bold text-[var(--maroon-800)] transition group-active:border-[var(--maroon-800)]">
                    {item.no}
                  </span>
                  <div className="flex min-w-0 flex-1 items-start gap-3 border-b border-[var(--gold-300)]/50 pb-4">
                    <div className="relative shrink-0">
                      <Thumb />
                      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">
                        {item.duration}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-[var(--maroon-950)]">{item.titleEn}</p>
                      <p className="truncate text-[12px] text-[var(--gold-700)]">{item.titleMr}</p>
                      <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                        {item.date} · {item.views} views
                      </p>
                      <p className="truncate text-[11px] text-[var(--text-muted)]">{item.host}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}