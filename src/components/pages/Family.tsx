import {
  ChevronLeft,
  Users,
  GraduationCap,
  Briefcase,
  Crown,
  Heart,
  Sparkles,
  ChevronRight,
  Wallet,
} from "lucide-react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";

/* ============================= MOTION / MOTIF (brand-consistent) ============================= */

function MotionStyles() {
  return (
    <style>{`
      @keyframes kc-shimmer {
        0%   { transform: translateX(-120%) skewX(-15deg); }
        100% { transform: translateX(220%) skewX(-15deg); }
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
      .kc-float { animation: kc-float 3.4s ease-in-out infinite; }
    `}</style>
  );
}

function HeroMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <g stroke="var(--gold-300)" strokeWidth="1.4" strokeLinecap="round" opacity="0.18">
        <circle cx="128" cy="28" r="6" />
        <path d="M128 34 L128 54" />
        <path d="M128 40 L116 48" />
        <path d="M128 40 L140 48" />
        <path d="M128 54 L118 68" />
        <path d="M128 54 L138 68" />
        <circle cx="150" cy="76" r="3" />
        <circle cx="104" cy="12" r="3" />
        <circle cx="92" cy="34" r="4.5" />
        <path d="M92 38.5 L92 52" />
        <path d="M92 43 L84 49" />
        <path d="M92 43 L100 49" />
      </g>
    </svg>
  );
}

/* ============================= DATA ============================= */

type Member = {
  name: string;
  nameMr: string;
  relation: string;
  relationMr: string;
  badgeVariant: "maroon" | "gold";
  photo?: string;
  education: string;
  occupation: string;
};

const members: Member[] = [
  {
    name: "Ramesh V. Kohali",
    nameMr: "रमेश व्ही. कोहली",
    relation: "Head",
    relationMr: "प्रमुख",
    badgeVariant: "maroon",
    photo: "https://i.pravatar.cc/100?img=13",
    education: "M.B.A (Finance), B.Com",
    occupation: "Business owner – Retail",
  },
  {
    name: "Sunita R. Kohali",
    nameMr: "सुनीता र. कोहली",
    relation: "Wife",
    relationMr: "पत्नी",
    badgeVariant: "gold",
    photo: "https://i.pravatar.cc/100?img=47",
    education: "B.A (Sociology)",
    occupation: "Homemaker",
  },
  {
    name: "Rohan R. Kohali",
    nameMr: "रोहन र. कोहली",
    relation: "Son",
    relationMr: "मुलगा",
    badgeVariant: "maroon",
    photo: "https://i.pravatar.cc/100?img=68",
    education: "B.Tech (Computer Science)",
    occupation: "Software engineer",
  },
  {
    name: "Priya R. Kohali",
    nameMr: "प्रिया र. कोहली",
    relation: "Daughter",
    relationMr: "मुलगी",
    badgeVariant: "gold",
    education: "Pursuing B.Arch (3rd year)",
    occupation: "Student",
  },
];

/* ============================= HELPERS ============================= */

function relationIcon(relation: string) {
  const r = relation.toLowerCase();
  if (r === "head") return Crown;
  if (r === "wife" || r === "husband") return Heart;
  return Sparkles;
}

/* ============================= PAGE ============================= */

export default function Family() {
  const navigate = useNavigate();
  const totalMembers = members.length;
  const earningCount = 2;

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <MotionStyles />

      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        
        {/* ---- Family Overview — hero membership-card treatment ---- */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          {/* ---- Header ---- */}
           <div className="mt-5 mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl">
              <SectionHeader eyebrow="Explore" title="Family Overview"/>
    
              <button onClick={() => navigate("/committee")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
                <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
              </button>
            </div>

          <div className="relative mt-3">
            <div className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_40%,var(--maroon-700)_100%)] p-4 shadow-[var(--shadow-maroon)] md:rounded-[26px] md:p-6">
              {/* dot texture */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(240,213,133,0.9)_1px,transparent_1.3px)] bg-[length:16px_16px] opacity-[0.12]" />
              {/* foil shine streak */}
              <div className="pointer-events-none absolute -left-12 -top-16 h-56 w-28 rotate-[22deg] bg-[linear-gradient(90deg,transparent,rgba(240,213,133,0.2),transparent)]" />
              {/* brand motif */}
              <HeroMotif className="pointer-events-none absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-300)] md:text-[11px]">
                    Total members
                  </p>
                  <p className="font-display mt-1.5 text-4xl font-bold text-white md:text-5xl">
                    {totalMembers}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-500))] px-2.5 py-[3px] text-[10px] font-bold text-[var(--maroon-950)] shadow-sm md:text-[11px]">
                    <Sparkles className="h-3 w-3" />
                    Registered
                  </span>
                </div>
                <div className="kc-float flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] shadow-[0_6px_16px_rgba(0,0,0,0.3)] md:h-16 md:w-16">
                  <Users className="h-6 w-6 text-[var(--maroon-950)] md:h-7 md:w-7" strokeWidth={1.8} />
                </div>
              </div>

              {/* stat chips */}
              <div className="relative z-10 mt-4 grid grid-cols-2 gap-3 md:mt-6">
                <div className="rounded-xl border border-[var(--gold-300)]/25 bg-[var(--maroon-950)]/45 px-3 py-2.5 md:px-4 md:py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--gold-300)]/20">
                      <GraduationCap className="h-3 w-3 text-[var(--gold-300)]" />
                    </span>
                    <p className="text-[10.5px] font-semibold text-[var(--gold-100)] md:text-[11.5px]">Highest edu.</p>
                  </div>
                  <p className="font-mr mt-1 text-[9.5px] text-[var(--gold-300)]/70">सर्वोच्च शिक्षण</p>
                  <p className="font-display mt-1 text-[13.5px] font-semibold text-white md:text-[15px]">Post grad</p>
                </div>
                <div className="rounded-xl border border-[var(--gold-300)]/25 bg-[var(--maroon-950)]/45 px-3 py-2.5 md:px-4 md:py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--gold-300)]/20">
                      <Wallet className="h-3 w-3 text-[var(--gold-300)]" />
                    </span>
                    <p className="text-[10.5px] font-semibold text-[var(--gold-100)] md:text-[11.5px]">Earning</p>
                  </div>
                  <p className="font-mr mt-1 text-[9.5px] text-[var(--gold-300)]/70">कमावता सदस्य</p>
                  <p className="font-display mt-1 text-[13.5px] font-semibold text-white md:text-[15px]">
                    {earningCount} members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Members Directory ---- */}
        <div className="px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pt-8 lg:px-10">
          <SectionHeader eyebrow="Explore" title="Members directory"  actionLabel="Add New" actionTo="/businesses" />
          {/* <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-[15px] font-semibold text-[var(--ink)] md:text-[17px]">
                
              </h2>
              <p className="font-mr text-[12px] text-[var(--text-muted)] md:text-[13px]">सदस्य यादी</p>
            </div>
            <button className="kc-btn-shine flex items-center gap-1 rounded-full bg-[var(--gold-100)] px-3 py-1.5 text-[12px] font-medium text-[var(--maroon-800)] transition-transform duration-150 active:scale-95 md:px-3.5 md:py-2 md:text-[13px]">
              <UserPlus className="h-3.5 w-3.5" strokeWidth={2.4} />
              Add new
            </button>
          </div> */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================= MEMBER CARD ============================= */

function MemberCard({
  name,
  nameMr,
  relation,
  relationMr,
  badgeVariant,
  photo,
  education,
  occupation,
}: Member) {
  const isMaroon = badgeVariant === "maroon";
  const badgeClasses = isMaroon
    ? "text-[var(--maroon-800)] bg-[var(--gold-100)]"
    : "text-[var(--gold-700)] bg-[var(--gold-300)]";
  const RelationIcon = relationIcon(relation);

  return (
    <div className="group flex items-start gap-3 rounded-2xl bg-[var(--paper)] p-3.5 shadow-[0_6px_20px_-14px_rgba(74,11,26,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(74,11,26,0.45)] md:p-4">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[var(--gold-300)] md:h-16 md:w-16"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--gold-100)] ring-2 ring-[var(--gold-300)] md:h-16 md:w-16">
          <span className="font-display text-lg font-semibold text-[var(--gold-700)]">
            {name.charAt(0)}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display truncate text-[14px] font-semibold text-[var(--ink)] md:text-[15.5px]">
              {name}
            </p>
            <p className="font-mr truncate text-[11px] text-[var(--text-muted)] md:text-[12px]">{nameMr}</p>
          </div>
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-500)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>

        <span className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium md:text-[10.5px] ${badgeClasses}`}>
          <RelationIcon className="h-2.5 w-2.5 md:h-3 md:w-3" strokeWidth={2.4} />
          {relation} <span className="font-mr">/ {relationMr}</span>
        </span>

        <div className="mt-2 space-y-1.5">
          <p className="flex items-center gap-1.5 text-[12px] text-[var(--ink)]/80 md:text-[12.5px]">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[var(--gold-600)]" strokeWidth={2} />
            <span className="truncate">{education}</span>
          </p>
          <p className="flex items-center gap-1.5 text-[12px] text-[var(--ink)]/80 md:text-[12.5px]">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-[var(--gold-600)]" strokeWidth={2} />
            <span className="truncate">{occupation}</span>
          </p>
        </div>
      </div>
    </div>
  );
}