import {
  ChevronLeft,
  Users,
  GraduationCap,
  Briefcase,
  Crown,
  Heart,
  Sparkles,
  // ChevronRight,
  Wallet, Pencil,
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
    <div className="">
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
            <div className="relative rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_40%,var(--maroon-700)_100%)] p-4 shadow-[var(--shadow-maroon)] md:rounded-[26px] md:p-6">
               {/* diagonal cross-hatch texture */}
                <div
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
                />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-300)] md:text-[11px]">
                    Total members
                  </p>
                  <p className="font-display mt-1.5 text-4xl font-bold text-white md:text-5xl">
                    {totalMembers}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-500))] px-2.5 py-[3px] text-[12px] font-bold text-[var(--maroon-950)] shadow-sm md:text-[11px]">
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
                    <p className="text-[10.5px] font-semibold text-[var(--gold-100)] md:text-[14px]">Highest Education</p>
                  </div>
                  <p className="font-display mt-1 text-[14px] font-semibold text-white md:text-[15px]">Post Graduation</p>
                </div>
                <div className="rounded-xl border border-[var(--gold-300)]/25 bg-[var(--maroon-950)]/45 px-3 py-2.5 md:px-4 md:py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--gold-300)]/20">
                      <Wallet className="h-3 w-3 text-[var(--gold-300)]" />
                    </span>
                    <p className="text-[10.5px] font-semibold text-[var(--gold-100)] md:text-[14px]">Earning</p>
                  </div>
                  <p className="font-display mt-1 text-[14px] font-semibold text-white md:text-[15px]">
                    {earningCount} members
                  </p>
                </div>
              </div>

              <br />
                 {/* floating edit action, anchored to the card */}
                <button
                  aria-label="Edit profile"
                  className="kc-edit-pulse absolute -bottom-5 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] text-[var(--maroon-950)] shadow-[var(--shadow-gold)] transition-transform duration-150 active:scale-95 md:-bottom-6 md:-right-3 md:h-14 md:w-14"
                >
                  <Pencil className="h-4.5 w-4.5 md:h-5 md:w-5" />
                </button>
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
  // nameMr,
  relation,
  // relationMr,
  badgeVariant,
  photo,
  education,
  occupation,
}: Member) {
  const isMaroon = badgeVariant === "maroon";
  const badgeClasses = isMaroon
    ? "text-[var(--maroon-800)] bg-[var(--gold-100)]"
    : "text-[var(--maroon-800)] bg-[var(--gold-100)]";
  const RelationIcon = relationIcon(relation);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_8px_30px_-18px_rgba(74,11,26,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold-400)]/50 hover:shadow-[0_18px_40px_-20px_rgba(74,11,26,0.5)]">

  
  <div className="relative p-4 md:p-5">

    {/* Top section */}
    <div className="flex items-center gap-3.5">

      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-500)] to-[var(--gold-700)] opacity-60 blur-[2px]" />

        {photo ? (
          <img
            src={photo}
            alt={name}
            className="relative h-16 w-16 rounded-full border-2 border-[var(--paper)] object-cover shadow-md md:h-[72px] md:w-[72px]"
          />
        ) : (
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--paper)] bg-gradient-to-br from-[var(--gold-100)] to-[var(--gold-200)] shadow-md md:h-[72px] md:w-[72px]">
            <span className="font-display text-xl font-bold text-[var(--gold-700)]">
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Online/status style dot */}
        <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[var(--paper)] bg-[var(--gold-500)]" />
      </div>

      {/* Name */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display truncate text-[15px] font-bold tracking-[-0.01em] text-[var(--ink)] md:text-[16px]">
              {name}
            </p>

            {/* <p className="font-mr mt-0.5 truncate text-[14px] text-[var(--text-muted)] md:text-[12px]">
              {nameMr}
            </p> */}
          </div>

          {/* Arrow */}
          {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold-300)]/50 bg-[var(--gold-100)]/50 text-[var(--gold-700)] transition-all duration-300 group-hover:bg-[var(--gold-500)] group-hover:text-white">
            <ChevronRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </div> */}
        </div>

        {/* Relation badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold md:text-[11px] ${badgeClasses}`}
        >
          <RelationIcon
            className="h-3 w-3"
            strokeWidth={2.4}
          />

          <span>{relation}</span>

          {/* <span className="opacity-40">•</span> */}

          {/* <span className="font-mr">{relationMr}</span> */}
        </span>
      </div>
    </div>

    {/* Details */}
    <div className="grid grid-cols-1 gap-2.5 mt-2">

      {/* Education */}
      <div className="flex items-center gap-2.5 rounded-xl bg-[var(--gold-100)]/35 px-3 py-2 transition-colors duration-200 group-hover:bg-[var(--gold-100)]/55">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] text-[var(--maroon-950)]">
          <GraduationCap
            className="h-4 w-4 text-[var(--maroon-800)]"
            strokeWidth={2.2}
          />
        </div>

        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Education
          </p>

          <p className="truncate text-[14px] font-medium text-[var(--ink)] md:text-[12px]">
            {education}
          </p>
        </div>
      </div>

      {/* Occupation */}
      <div className="flex items-center gap-2.5 rounded-xl bg-[var(--gold-100)]/35 px-3 py-2 transition-colors duration-200 group-hover:bg-[var(--gold-100)]/55">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] text-[var(--maroon-950)]">
          <Briefcase
            className="h-4 w-4 text-[var(--maroon-800)]"
            strokeWidth={2.2}
          />
        </div>

        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Occupation
          </p>

          <p className="truncate text-[14px] font-medium text-[var(--ink)] md:text-[12px]">
            {occupation}
          </p>
        </div>
      </div>

    </div>
  </div>

  {/* Bottom accent */}
  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-700)] transition-all duration-500 group-hover:w-full" />
</div>
  );
}