import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  User, Users, Radio, Megaphone, CalendarDays, Image as ImageIcon,
  PlayCircle, BookOpen, Store, ChevronRight, MapPin,
  Phone, MessageCircle, Globe, Play,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";

/* ============================= DATA ============================= */

const heroSlides = [
  {
    id: "s1",
    tag: "कार्यक्रम",
    title: "वार्षिक स्नेहसंमेलन २०२४",
    subtitle: "१५ ऑक्टोबर · नागपूर",
    image: hero1,
  },
  {
    id: "s2",
    tag: "स्वागत",
    title: "कोहळी कनेक्टवर आपले स्वागत",
    subtitle: "एकत्र, एक समाज म्हणून",
    image: hero2,
  },
  {
    id: "s3",
    tag: "सूचना",
    title: "सदस्य नोंदणी सुरू",
    subtitle: "आजच आपली नोंदणी करा",
    image: hero3,
  },
];

const quickAccess = [
  { to: "/profile", label: "Profile", icon: User },
  { to: "/family", label: "Family", icon: Users },
  { to: "/live-events", label: "Live", icon: Radio, live: true },
  { to: "/notices", label: "Notices", icon: Megaphone },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/samajdarshan", label: "Videos", icon: PlayCircle },
  { to: "/books", label: "Books", icon: BookOpen },
];

type Business = {
  id: string;
  name: string;
  ownerName: string;
  category: string;
  description: string;
  location: string;
  mobile: string;
  whatsapp: string;
  website: string;
  adType: "poster" | "video";
  posterUrl?: string;
  youtubeUrl?: string;
};

const businesses: Business[] = [
  {
    id: "1",
    name: "Kohali Buildcon Pvt Ltd",
    ownerName: "Ramesh Kohali",
    category: "Construction",
    description: "Residential & commercial construction and turnkey project execution across Pune.",
    location: "Pune, Maharashtra",
    mobile: "919876543210",
    whatsapp: "919876543210",
    website: "https://kohalibuildcon.example.com",
    adType: "poster",
    posterUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=70",
  },
  {
    id: "2",
    name: "Hotel Royal Palace",
    ownerName: "Suresh Patil",
    category: "Hospitality",
    description: "Banquet halls and guest rooms for weddings and samaj gatherings in central Mumbai.",
    location: "Mumbai, Maharashtra",
    mobile: "919812345678",
    whatsapp: "919812345678",
    website: "https://hotelroyalpalace.example.com",
    adType: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

/* ============================= HELPERS ============================= */

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

/* ============================= SIGNATURE MOTIF ============================= */


function WarliMotif({ className = "", opacity = 0.14 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 60"
      fill="none"
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      {[0, 60, 120, 180].map((x) => (
        <g key={x} stroke="var(--warli)" strokeWidth="1.6" strokeLinecap="round">
          <circle cx={x + 12} cy={14} r="5" />
          <path d={`M${x + 12} 19 L${x + 12} 34`} />
          <path d={`M${x + 12} 23 L${x + 2} 30`} />
          <path d={`M${x + 12} 23 L${x + 22} 30`} />
          <path d={`M${x + 12} 34 L${x + 4} 46`} />
          <path d={`M${x + 12} 34 L${x + 20} 46`} />
          <circle cx={x + 38} cy={40} r="2.2" />
        </g>
      ))}
    </svg>
  );
}


/* ============================= SHARED MOTION STYLES ============================= */

function MotionStyles() {
  return (
    <style>{`
      @keyframes kc-shimmer {
        0%   { transform: translateX(-120%) skewX(-15deg); }
        100% { transform: translateX(220%) skewX(-15deg); }
      }
      @keyframes kc-pulse-ring {
        0%   { box-shadow: 0 0 0 0 rgba(140,24,47,0.5); }
        100% { box-shadow: 0 0 0 9px rgba(140,24,47,0); }
      }
      @keyframes kc-float {
        0%, 100% { transform: translateY(0px); }
        50%      { transform: translateY(-3px); }
      }
      .kc-btn-shine { position: relative; overflow: hidden; }
      .kc-btn-shine::after {
        content: "";
        position: absolute; inset: 0;
        width: 40%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
        transform: translateX(-120%) skewX(-15deg);
      }
      .kc-btn-shine:hover::after { animation: kc-shimmer 1s ease forwards; }
      .kc-live-dot { animation: kc-pulse-ring 1.6s ease-out infinite; }
      .kc-float { animation: kc-float 3.2s ease-in-out infinite; }
    `}</style>
  );
}


/* ============================= HERO — FANNED CARD STACK ============================= */
/* backgroundImage stays inline — per-slide imported asset (dynamic data),
   not a design-system color, so it can't become a static Tailwind class. */

function HeroSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = heroSlides.length;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((i) => (i + 1) % n), 4200);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => { setActive(i); startTimer(); };

  return (
    <div className="mt-4 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 xl:h-[22rem]">
        {heroSlides.map((slide, i) => {
          const offset = (i - active + n) % n; // 0 = front, 1 = next peek, 2 = back
          const styles = [
            { transform: "translateX(0px) rotate(0deg) scale(1)", zIndex: 30, opacity: 1 },
            { transform: "translateX(22px) rotate(3.5deg) scale(0.94)", zIndex: 20, opacity: 0.9 },
            { transform: "translateX(40px) rotate(6.5deg) scale(0.88)", zIndex: 10, opacity: 0.55 },
          ][offset];

          return (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={slide.title}
              className="absolute inset-0 h-full w-full origin-bottom-left cursor-pointer overflow-hidden rounded-[26px] shadow-[var(--shadow-maroon)] transition-all duration-500 ease-out"
              style={styles}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--maroon-950)_10%,rgba(74,11,26,0.55)_50%,rgba(74,11,26,0.1)_100%)]" />
              {offset === 0 && (
                <WarliMotif className="absolute right-0 top-0 h-16 w-32 md:h-20 md:w-40" opacity={0.22} />
              )}
              <div className="relative flex h-full flex-col justify-end p-4 md:p-6 text-left">
                <span className="w-fit rounded-full bg-[var(--gold-500)] px-2.5 py-1 text-[9px] md:text-[10px] font-bold text-[var(--maroon-950)] shadow-sm">
                  {slide.tag}
                </span>
                <h2 className="mt-2 text-[21px] sm:text-[24px] md:text-[27px] lg:text-[30px] font-bold leading-tight tracking-tight text-white font-['Yatra_One',cursive]">
                  {slide.title}
                </h2>
                <p className="mt-1 text-xs md:text-sm font-medium text-[var(--gold-300)]">{slide.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 hover:scale-125 ${
              i === active ? "w-[22px] bg-[var(--gold-500)]" : "w-1.5 bg-[var(--gold-300)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================= SECTION HEADER ============================= */

function SectionHeader({ eyebrow, title, actionLabel, actionTo }: { eyebrow: string; title: string; actionLabel?: string; actionTo?: string }) {
  return (
    <div className="mb-3.5 flex items-end justify-between">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[var(--gold-500)]" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-600)]">{eyebrow}</p>
          <h3 className="mt-0.5 text-[18px] md:text-[20px] lg:text-[22px] font-extrabold tracking-tight text-[var(--maroon-700)] font-['Yatra_One',cursive]">{title}</h3>
        </div>
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="kc-btn-shine group flex items-center gap-0.5 rounded-full bg-[linear-gradient(120deg,var(--maroon-800),var(--maroon-950))] px-3 py-1.5 text-[11px] md:text-xs font-bold text-[var(--gold-300)] no-underline shadow-[0_6px_16px_-6px_rgba(59,10,22,0.55)] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {actionLabel}
          <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

/* ============================= BUSINESS CARD ============================= */

function BusinessCard({ b }: { b: Business }) {
  const thumbnail = b.adType === "video" && b.youtubeUrl ? getYoutubeThumbnail(b.youtubeUrl) : b.posterUrl;

  return (
    <div className="group rounded-2xl bg-[var(--paper)] p-3 md:p-4 shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1">
      <div className="flex gap-3 md:gap-4">
        <a
          href={b.adType === "video" ? b.youtubeUrl : undefined}
          target={b.adType === "video" ? "_blank" : undefined}
          rel={b.adType === "video" ? "noopener noreferrer" : undefined}
          className="relative h-[84px] w-[84px] md:h-24 md:w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--maroon-900)]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : undefined }}
          />
          <span className="absolute left-1 top-1 rounded-full bg-[var(--gold-500)] px-1.5 py-[1px] text-[7px] font-bold uppercase text-[var(--maroon-950)]">
            {b.adType === "video" ? "Video" : "Poster"}
          </span>
          {b.adType === "video" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/45 transition-transform duration-200 group-hover:scale-110">
                <Play size={12} fill="white" className="text-white" />
              </span>
            </span>
          )}
        </a>

        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--maroon-900)]">
            {b.category}
          </span>
          <p className="mt-1.5 truncate text-[14.5px] md:text-[16px] font-extrabold leading-tight text-[var(--ink)]">
            {b.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1 truncate text-[10.5px] md:text-[11.5px] font-medium text-[var(--text-muted)]">
            <span>by {b.ownerName}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-[var(--text-muted)]" />
            <MapPin size={10} /> {b.location}
          </p>
          <p className="mt-1 line-clamp-1 text-[11.5px] md:text-[12.5px] text-[var(--text-muted)]">
            {b.description}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <Link
          to={`/business/${b.id}`}
          className="kc-btn-shine flex flex-1 items-center justify-center gap-1 rounded-lg bg-[linear-gradient(120deg,var(--gold-300)_0%,var(--gold-500)_100%)] py-2 text-[11.5px] md:text-[12.5px] font-extrabold text-[var(--maroon-900)] no-underline shadow-[0_4px_14px_-4px_rgba(214,169,74,0.65)] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          View Details <ChevronRight size={12} />
        </Link>
        <a
          href={`tel:+${b.mobile}`}
          aria-label="Call"
          className="grid h-9 w-9 md:h-10 md:w-10 shrink-0 place-items-center rounded-lg bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] text-[var(--gold-300)] shadow-[0_4px_12px_-4px_rgba(59,10,22,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-90"
        >
          <Phone size={15} />
        </a>
        <a
          href={b.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Website"
          className="grid h-9 w-9 md:h-10 md:w-10 shrink-0 place-items-center rounded-lg bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] text-[var(--gold-300)] shadow-[0_4px_12px_-4px_rgba(59,10,22,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-90"
        >
          <Globe size={15} />
        </a>
        <a
          href={`https://wa.me/${b.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="grid h-9 w-9 md:h-10 md:w-10 shrink-0 place-items-center rounded-lg bg-[linear-gradient(145deg,#2fbf67,#1a9c4d)] text-white shadow-[0_4px_12px_-4px_rgba(31,168,85,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-90"
        >
          <FaWhatsapp size={15} />
        </a>

      </div>
    </div>
  );
}

/* ============================= PAGE ============================= */

export function Home() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      <MotionStyles />

      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <HeroSlider />

        {/* ---- quick access ---- */}
        <section className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10">
          <SectionHeader eyebrow="Explore" title="Quick Access" />
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {quickAccess.map(({ to, label, icon: Icon, live }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col items-center gap-1.5 rounded-xl bg-[var(--paper)] border border-[var(--gold-500)] py-3 md:py-4 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95"
              >
                <span className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={16} className="text-[var(--maroon-950)]" />
                </span>
                {live && (
                  <span className="kc-live-dot absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-[var(--maroon-700)]" />
                )}
                <span className="text-[12px] md:text-[13px] font-semibold text-[var(--ink)]">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>


        {/* ---- our businesses ---- */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 mt-5">
          <SectionHeader eyebrow="Directory" title="Our Businesses" actionLabel="सर्व पहा" actionTo="/businesses" />
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3.5">
            {businesses.map((b) => <BusinessCard key={b.id} b={b} />)}
          </div>
        </section>

        {/* ---- promote your business ---- */}
        <section className="mt-5 px-4 sm:px-6 md:px-8 lg:px-10">
          <Link
            to="/business-promotion"
            className="kc-btn-shine group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] p-4 md:p-5 no-underline shadow-[var(--shadow-maroon)] transition-all duration-300 hover:-translate-y-1"
          >
            <WarliMotif className="absolute inset-0 h-full w-full" opacity={0.12} />
            <span className="kc-float grid h-11 w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-600))]">
              <Store size={18} className="text-[var(--maroon-950)]" />
            </span>
            <div className="relative min-w-0 flex-1">
              <p className="text-sm md:text-base font-bold text-white">Promote Your Business</p>
              <p className="truncate text-xs md:text-sm font-medium text-[var(--gold-300)]">
                आपल्या व्यवसायाची जाहिरात करा किंवा नोंदणी करा
              </p>
            </div>
            <ChevronRight size={16} className="relative text-[var(--gold-300)] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </section>

        {/* ---- social media ---- */}
        <section className="mt-8 px-5 sm:px-6 md:px-8 lg:px-10 text-center">
          <p className="inline-block rounded-full border border-[var(--maroon-800)] bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--maroon-900)]">
            Follow Us
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 rounded-full bg-[var(--paper)] p-2 shadow-[var(--shadow-gold)] mx-auto w-fit">
            {[FaFacebookF, FaInstagram, FaYoutube, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-full bg-[linear-gradient(160deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] shadow transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:scale-90"
              >
                <Icon size={14} />
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}