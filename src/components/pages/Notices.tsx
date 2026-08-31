import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import type { ElementType, ReactNode } from "react";
import {
  ChevronLeft, CheckCheck, ChevronRight, BellOff, Bell,
  CalendarDays, Clock, Radio, Sparkles, RefreshCw, HeartHandshake, Paperclip,
} from "lucide-react";
import type { Notification, NotificationCategory } from "../NotificationDropdown";

/* ============================= REVEAL ============================= */

function useRevealVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================= DATA ============================= */

const categoryLabel: Record<NotificationCategory, string> = {
  notice: "सूचना",
  event: "कार्यक्रम",
  reminder: "स्मरणपत्र",
  live: "लाइव्ह",
  announcement: "घोषणा",
  update: "अपडेट",
  service: "सेवा",
};

// each category gets a real color pairing + icon, plus a solid accent hex used for the card's top band / wash
const categoryStyle: Record<
  NotificationCategory,
  {
    bg: string;
    text: string;
    icon: ElementType;
    accent: string;
  }
> = {
  notice: {
    bg: "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]",
    text: "text-[var(--maroon-900)]",
    icon: Bell,
    accent: "#d4af37",
  },
  event: {
    bg: "bg-[linear-gradient(160deg,var(--maroon-600,#8a2237),var(--maroon-800))]",
    text: "text-white",
    icon: CalendarDays,
    accent: "#6f1327",
  },
  reminder: {
    bg: "bg-[linear-gradient(160deg,#f4b942,#d6902a)]",
    text: "text-white",
    icon: Clock,
    accent: "#d6902a",
  },
  live: {
    bg: "bg-[linear-gradient(160deg,#e0364f,#b3243a)]",
    text: "text-white",
    icon: Radio,
    accent: "#b3243a",
  },
  announcement: {
    bg: "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]",
    text: "text-[var(--maroon-900)]",
    icon: Sparkles,
    accent: "#d4af37",
  },
  update: {
    bg: "bg-[linear-gradient(160deg,#7c6fd1,#5a4bb8)]",
    text: "text-white",
    icon: RefreshCw,
    accent: "#5a4bb8",
  },
  service: {
    bg: "bg-[linear-gradient(160deg,#2fa87a,#1f8562)]",
    text: "text-white",
    icon: HeartHandshake,
    accent: "#1f8562",
  },
};

type NoticeItem = Notification & { attachment?: string; attachmentUrl?: string };

const sampleNotices: NoticeItem[] = [
  {
    id: "n1",
    title: "वार्षिक सर्वसाधारण सभा",
    description: "सर्व सदस्यांनी वार्षिक सर्वसाधारण सभेस उपस्थित राहावे. सभेत महत्त्वाचे निर्णय घेतले जातील.",
    date: "आज",
    category: "notice",
    read: false,
    attachment: "सभा-अजेंडा.pdf",
    attachmentUrl: "/files/sabha-agenda.pdf",
  },
  {
    id: "n2",
    title: "स्नेहसंमेलन नोंदणी सुरू",
    description: "१५ ऑक्टोबर रोजी होणाऱ्या वार्षिक स्नेहसंमेलनासाठी नोंदणी सुरू झाली आहे. लवकर नोंदणी करा.",
    date: "आज",
    category: "event",
    read: false,
    attachment: "स्नेहसंमेलन-वेळापत्रक.pdf",
    attachmentUrl: "/files/sneha-sammelan-schedule.pdf",
  },
  {
    id: "n3",
    title: "सदस्यत्व नूतनीकरण स्मरणपत्र",
    description: "आपले वार्षिक सदस्यत्व येत्या ७ दिवसांत संपत आहे. कृपया वेळेत नूतनीकरण करा.",
    date: "काल",
    category: "reminder",
    read: true,
    attachment: "नूतनीकरण-फॉर्म.pdf",
    attachmentUrl: "/files/renewal-form.pdf",
  },
  {
    id: "n4",
    title: "लाइव्ह प्रक्षेपण: पूजा विधी",
    description: "आज सायंकाळी ६ वाजता मंदिरातील विशेष पूजा विधीचे थेट प्रक्षेपण होणार आहे.",
    date: "काल",
    category: "live",
    read: true,
    attachment: "प्रक्षेपण-सूचना.pdf",
    attachmentUrl: "/files/broadcast-notice.pdf",
  },
  {
    id: "n5",
    title: "नवीन समिती सदस्यांची घोषणा",
    description: "या वर्षासाठी नवीन कार्यकारिणी समितीची घोषणा करण्यात आली आहे.",
    date: "१२ ऑग",
    category: "announcement",
    read: true,
    attachment: "समिती-यादी.pdf",
    attachmentUrl: "/files/committee-list.pdf",
  },
  {
    id: "n6",
    title: "संकेतस्थळ अद्यतन",
    description: "कोहळी कनेक्ट अॅपमध्ये नवीन वैशिष्ट्ये आणि सुधारणा समाविष्ट करण्यात आल्या आहेत.",
    date: "१२ ऑग",
    category: "update",
    read: true,
  },
  {
    id: "n7",
    title: "वैद्यकीय शिबिर आयोजन",
    description: "समाजातील ज्येष्ठ नागरिकांसाठी मोफत वैद्यकीय तपासणी शिबिराचे आयोजन करण्यात आले आहे.",
    date: "५ ऑग",
    category: "service",
    read: true,
    attachment: "शिबिर-तपशील.pdf",
    attachmentUrl: "https://www.orimi.com/pdf-test.pdf",
  },
];

function groupByDate(notifications: NoticeItem[]) {
  const groups: { date: string; items: NoticeItem[] }[] = [];
  for (const n of notifications) {
    const g = groups.find((g) => g.date === n.date);
    if (g) g.items.push(n);
    else groups.push({ date: n.date, items: [n] });
  }
  return groups;
}

/* ============================= PAGE ============================= */

export default function NoticesPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NoticeItem[]>(sampleNotices);
  const [activeFilter, setActiveFilter] = useState<NotificationCategory | "all">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    if (activeFilter === "all") return notifications;
    return notifications.filter((n) => n.category === activeFilter);
  }, [notifications, activeFilter]);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);

  const filterOptions: (NotificationCategory | "all")[] = [
    "all", "notice", "event", "reminder", "live", "announcement", "update", "service",
  ];

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      {/* ---- header ---- */}
      <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
        <SectionHeader eyebrow="सूचना फलक" title="Our Notices" />

        <div className="flex shrink-0 items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 text-[11px] font-bold text-[var(--maroon-900)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-700)] active:scale-90 sm:h-10 sm:px-4 sm:text-[12px]"
            >
              <CheckCheck size={16} strokeWidth={2.2} />
              <span className="hidden sm:inline">सर्व वाचले</span>
            </button>
          )}
          <button
            onClick={() => navigate("/home")}
            aria-label="मागे जा"
            className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 text-white sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:max-w-4xl md:px-8  lg:max-w-6xl lg:px-10">
        {/* ---- filter chips ---- */}
        <Reveal>
          <div className="sticky top-0 z-10 -mx-4 bg-[var(--cream)]/90 px-4 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:px-0 sm:py-1 md:static md:bg-transparent md:backdrop-blur-none">
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 sm:gap-2.5 md:flex-wrap md:overflow-visible">
              {filterOptions.map((cat) => {
                const isActive = activeFilter === cat;
                const label = cat === "all" ? "सर्व" : categoryLabel[cat];
                const style = cat === "all" ? null : categoryStyle[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11.5px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-700)] active:scale-90 sm:px-4 sm:py-2 sm:text-[12.5px] ${
                      isActive
                        ? `border-transparent shadow-sm ${style ? style.bg + " " + style.text : "bg-[var(--maroon-800)] text-white"}`
                        : "border-[var(--gold-500)]/35 bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gold-500)]/60 hover:bg-[var(--gold-100)]/40"
                    }`}
                  >
                    {style && <style.icon size={12} />}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---- list ---- */}
        <div className="mt-5 sm:mt-7">
          {filtered.length === 0 ? (
            <Reveal delay={90}>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[var(--gold-400)]/60 bg-[var(--paper)] px-4 py-14 text-center sm:py-20">
                <BellOff size={26} className="text-[var(--gold-500)]/60 sm:h-8 sm:w-8" />
                <p className="kc-font-display text-[14px] font-bold text-[var(--ink)] sm:text-[16px]">
                  या श्रेणीत काही सूचना नाहीत
                </p>
                <p className="text-[11.5px] leading-snug text-[var(--text-muted)] sm:text-[13px]">
                  नवीन सूचना इथे दिसतील
                </p>
              </div>
            </Reveal>
          ) : (
            groups.map((group, gi) => (
              <div key={group.date} className="mb-2 sm:mb-4">
                <Reveal delay={gi * 40}>
                  <div className="flex items-center gap-2 pb-2.5 pt-1 sm:pb-3.5">
                    <span className="rounded-full bg-[var(--gold-300)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[var(--maroon-700)] sm:text-[11.5px]">
                      {group.date}
                    </span>
                    <div className="h-px flex-1 bg-[var(--gold-500)]/25" />
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
                  {group.items.map((n, i) => {
                    const style = categoryStyle[n.category];
                    const Icon = style.icon;
                    return (
                      <Reveal key={n.id} delay={gi * 40 + i * 45}>
                        <button
                          onClick={() => markRead(n.id)}
                          className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-[var(--paper)] text-left shadow-[0_4px_18px_rgba(59,10,22,0.09)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_34px_-10px_rgba(59,10,22,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-700)] ${
                            !n.read ? "ring-2 ring-[var(--gold-500)]/45" : ""
                          }`}
                        >
                          {/* top accent band, category-colored */}
                          <div className={`h-[5px] w-full ${style.bg}`} />

                          {/* soft tinted wash behind header so the card doesn't read as flat white */}
                          <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.07]"
                            style={{ background: `linear-gradient(180deg, ${style.accent}, transparent)` }}
                          />

                          {!n.read && (
                            <span className="absolute right-4 top-4 z-10 h-2.5 w-2.5 rounded-full bg-[var(--maroon-700)]">
                              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--maroon-700)]/60" />
                            </span>
                          )}

                          <div className="relative flex flex-1 flex-col gap-3.5 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                            <div className="flex items-start gap-3.5">
                              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-md ring-1 ring-black/5 ${style.bg} sm:h-14 sm:w-14`}>
                                <Icon size={20} className={style.text} strokeWidth={2.1} />
                              </span>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wide shadow-sm sm:text-[10.5px] ${style.bg} ${style.text}`}
                                  >
                                    {categoryLabel[n.category]}
                                  </span>
                                  <span className="flex items-center gap-1 rounded-full bg-[var(--maroon-900)]/[0.06] px-2.5 py-1 text-[9.5px] font-bold text-[var(--maroon-700)] sm:text-[10.5px]">
                                    <CalendarDays size={10} /> {n.date}
                                  </span>
                                </div>

                                <p className="kc-font-display mt-2 text-[15px] font-extrabold leading-tight text-[var(--ink)] sm:text-[16.5px]">
                                  {n.title}
                                </p>
                              </div>
                            </div>

                            <p className="line-clamp-2 text-[12.5px] leading-relaxed text-[var(--text-muted)] sm:text-[13.5px]">
                              {n.description}
                            </p>

                            {n.attachment && (
                              <a
                                href={n.attachmentUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-auto flex items-center gap-2.5 rounded-xl border border-[#b3243a]/20 bg-[linear-gradient(100deg,#fff3f0,#fde7e2)] px-3 py-2.5 transition-all duration-200 hover:border-[#b3243a]/40 hover:shadow-sm sm:px-3.5"
                              >
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[linear-gradient(160deg,#e0364f,#b3243a)] shadow-sm">
                                  <Paperclip size={14} className="text-white" strokeWidth={2.3} />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-[11.5px] font-bold text-[var(--maroon-900)] sm:text-[12.5px]">
                                    {n.attachment}
                                  </p>
                                  <p className="text-[9.5px] font-semibold uppercase tracking-wide text-[#b3243a]/70">
                                    संलग्न फाईल · PDF
                                  </p>
                                </div>
                                <ChevronRight size={14} className="shrink-0 text-[#b3243a]/60" />
                              </a>
                            )}
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}