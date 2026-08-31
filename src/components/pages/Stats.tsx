import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  Users,
  MapPin,
  Landmark,
  Briefcase,
  GraduationCap,
  Sprout,
  Store,
  Building2,
  Home,
  Leaf,
  Droplet,
  Sparkles,
  PieChart,
  BarChart3,
  Wheat, 
} from "lucide-react";
import SectionHeader from "../SectionHeader";

/* ============================= MOTION ============================= */

function GlobalStyles() {
  return (
    <style>{`
      @keyframes kc-expand { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes kc-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .kc-expand { animation: kc-expand 0.2s ease-out; }
      .kc-rise { animation: kc-rise 0.4s ease-out backwards; }
      .kc-bar-fill { transition: width 0.6s ease-out; }
      .kc-arc { transition: stroke-width 0.2s ease, opacity 0.2s ease; }
      @media (prefers-reduced-motion: reduce) {
        .kc-expand, .kc-rise { animation: none !important; }
        .kc-bar-fill, .kc-arc { transition: none !important; }
      }
    `}</style>
  );
}

/** Eyebrow + accent bar + bold heading — same device as "EXPLORE / Quick Access" on Home */
// function SectionHeading({ eyebrow, eyebrowMr, title }: { eyebrow: string; eyebrowMr?: string; title: string }) {
//   return (
//     <div className="mb-3">
//       <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--gold-600)]">
//         {eyebrow} {eyebrowMr && <span className="font-mr font-normal normal-case tracking-normal text-[var(--text-muted)]">· {eyebrowMr}</span>}
//       </p>
//       <div className="mt-1 flex items-center gap-2">
//         <span className="h-4 w-1 rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] " />
//         <h2 className="font-display text-[19px] font-extrabold leading-tight text-[var(--maroon-800)] md:text-[21px]">{title}</h2>
//       </div>
//     </div>
//   );
// }

/* ============================= PALETTE ============================= */

const PALETTE = [
  "var(--maroon-800)",
  "var(--gold-500)",
  "#B76E3A",
  "#8C6239",
  "#5C4033",
  "var(--gold-300)",
  "#9C8AA5",
];

/* ============================= DATA ============================= */

const overview = { totalMembers: 3842, totalFamilies: 812 };

const quickFacts = [
  { label: "Villages", value: 96, icon: MapPin },
  { label: "Talukas", value: 14, icon: Landmark },
  { label: "Districts", value: 6, icon: Landmark },
];

const atAGlance = [
  { label: "Working members", labelMr: "नोकरदार सदस्य", value: 1540, icon: Briefcase },
  { label: "Students", labelMr: "विद्यार्थी", value: 972, icon: GraduationCap },
  { label: "Farmers", labelMr: "शेतकरी", value: 640, icon: Sprout },
  { label: "Business owners", labelMr: "व्यावसायिक", value: 318, icon: Store },
];

const genderStats = { male: 1986, female: 1856 };

const educationData = [
  { label: "Graduate", value: 28 },
  { label: "Secondary", value: 22 },
  { label: "Higher secondary", value: 18 },
  { label: "Post graduate", value: 14 },
  { label: "Primary", value: 12 },
  { label: "Professional", value: 4 },
  { label: "Other", value: 2 },
].map((d, i) => ({ ...d, color: PALETTE[i % PALETTE.length] }));

const occupationData = [
  { label: "Agriculture", value: 22, icon: Sprout },
  { label: "Private service", value: 20, icon: Building2 },
  { label: "Business", value: 16, icon: Store },
  { label: "Government service", value: 12, icon: Landmark },
  { label: "Student", value: 12, icon: GraduationCap },
  { label: "Self employed", value: 10, icon: Briefcase },
  { label: "Homemaker", value: 6, icon: Home },
  { label: "Other", value: 2, icon: Sparkles },
].sort((a, b) => b.value - a.value);

const geoTabs = {
  State: [
    { label: "Maharashtra", value: 3540 },
    { label: "Madhya Pradesh", value: 180 },
    { label: "Other states", value: 122 },
  ],
  District: [
    { label: "Nagpur", value: 1120 },
    { label: "Wardha", value: 640 },
    { label: "Chandrapur", value: 520 },
    { label: "Bhandara", value: 460 },
    { label: "Gondia", value: 380 },
    { label: "Other districts", value: 722 },
  ],
  Taluka: [
    { label: "Nagpur (Rural)", value: 420 },
    { label: "Kamptee", value: 310 },
    { label: "Hingna", value: 275 },
    { label: "Umred", value: 240 },
    { label: "Katol", value: 210 },
    { label: "Other talukas", value: 2387 },
  ],
  Village: [
    { label: "Kelwad", value: 186 },
    { label: "Bhiwapur", value: 164 },
    { label: "Mowad", value: 141 },
    { label: "Sindi", value: 128 },
    { label: "Kondhali", value: 112 },
    { label: "Other villages", value: 3111 },
  ],
} as const;

const agriculture = {
  farmingFamilies: 512,
  cropCategories: 6,
  irrigatedPct: 62,
  nonIrrigatedPct: 38,
  majorCrops: ["Cotton", "Soybean", "Wheat", "Tur (pigeon pea)", "Orange", "Vegetables"],
};

/* ============================= HOOKS ============================= */

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

/* ============================= PRIMITIVES ============================= */

function DonutChart({
  data,
  size = 128,
  thickness = 17,
  centerLabel,
  centerSub,
  activeIndex = null,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel: string;
  centerSub?: string;
  activeIndex?: number | null;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 overflow-visible">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--gold-100)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const offset = cumulative * circumference;
          cumulative += fraction;
          const isDim = activeIndex !== null && activeIndex !== i;
          const isActive = activeIndex === i;
          return (
            <circle
              key={i}
              className="kc-arc"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={isActive ? thickness + 4 : thickness}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              opacity={isDim ? 0.32 : 1}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <span className="font-display text-[15px] font-bold leading-tight text-[var(--ink)]">{centerLabel}</span>
        {centerSub && <span className="text-[9px] leading-tight text-[var(--text-muted)]">{centerSub}</span>}
      </div>
    </div>
  );
}

function EducationChart() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <DonutChart
        data={educationData}
        activeIndex={active}
        centerLabel={active !== null ? `${educationData[active].value}%` : "7"}
        centerSub={active !== null ? educationData[active].label : "categories"}
      />
      <div className="w-full flex-1 space-y-0.5">
        {educationData.map((d, i) => (
          <button
            key={d.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive((a) => (a === i ? null : i))}
            className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[12px] transition-colors md:text-[12.5px] ${
              active === i ? "bg-[var(--gold-100)]" : "hover:bg-[var(--gold-100)]/50"
            }`}
          >
            <span className="flex items-center gap-2 text-[var(--ink)]/85">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              {d.label}
            </span>
            <span className="font-semibold text-[var(--maroon-800)]">{d.value}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BarRow({
  label,
  value,
  percent,
  color,
  Icon,
  delay = 0,
}: {
  label: string;
  value?: number;
  percent: number;
  color: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  delay?: number;
}) {
  return (
    <div className="kc-rise" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-1 flex items-center justify-between gap-2 text-[12px] text-[var(--ink)]/85 md:text-[12.5px]">
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--gold-600)]" strokeWidth={2} />}
          <span className="truncate">{label}</span>
        </span>
        <span className="shrink-0 font-semibold text-[var(--maroon-800)]">
          {percent}%{typeof value === "number" && <span className="ml-1 font-normal text-[var(--text-muted)]">· {value.toLocaleString()}</span>}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--gold-100)]">
        <div className="kc-bar-fill h-full rounded-full" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

/** Two-tone ratio bar. `dark` swaps to gold/white-on-maroon so it reads correctly inside the hero card. */
function SplitBar({
  icon: Icon,
  title,
  left,
  right,
  dark = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  left: { label: string; pct: number };
  right: { label: string; pct: number };
  dark?: boolean;
}) {
  const leftColor = dark ? "var(--gold-500)" : "var(--maroon-800)";
  const rightColor = dark ? "rgba(255,255,255,0.85)" : "var(--gold-500)";
  return (
    <div>
      <p className={`mb-2 flex items-center gap-1.5 text-[12px] font-semibold md:text-[12px] ${dark ? "text-white" : "text-[var(--ink)]/75"}`}>
        <Icon className={`h-3.5 w-3.5 ${dark ? "text-[var(--gold-300)]" : "text-[var(--gold-600)]"}`} strokeWidth={2} />
        {title}
      </p>
      <div className={`flex h-2.5 w-full overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-[var(--gold-100)]"}`}>
        <div className="kc-bar-fill h-full" style={{ width: `${left.pct}%`, background: leftColor }} />
        <div className="kc-bar-fill h-full" style={{ width: `${right.pct}%`, background: rightColor }} />
      </div>
      <div className={`mt-1.5 flex justify-between text-[12px] md:text-[12px] ${dark ? "text-white" : "text-[var(--text-muted)]"}`}>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full" style={{ background: leftColor }} />
          {left.label} · {left.pct}%
        </span>
        <span className="flex items-center gap-1">
          {right.label} · {right.pct}%
          <span className="h-2 w-2 rounded-full" style={{ background: rightColor }} />
        </span>
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  titleMr,
  Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  titleMr: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-transform duration-150 active:scale-[0.99] md:px-5 md:py-4"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  shadow-sm">
          <Icon className="h-4.5 w-4.5 text-[var(--maroon-800)]" strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-display block text-[14px] font-bold text-[var(--ink)] md:text-[14.5px]">{title}</span>
          <span className="font-mr block text-[11px] text-[var(--text-muted)] md:text-[12px]">{titleMr}</span>
        </span>
        <ChevronDown
          className={`h-4.5 w-4.5 shrink-0 text-[var(--maroon-800)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.4}
        />
      </button>
      {open && <div className="kc-expand border-t border-[var(--gold-300)]/25 px-4 pb-4 pt-4 md:px-5 md:pb-5">{children}</div>}
    </div>
  );
}

/* ============================= PAGE ============================= */

export default function Stats() {
  const navigate = useNavigate();
  const [geoTab, setGeoTab] = useState<keyof typeof geoTabs>("District");
  const geoRows = geoTabs[geoTab];
  const geoMax = Math.max(...geoRows.map((r) => r.value));

  const membersCount = useCountUp(overview.totalMembers);
  const familiesCount = useCountUp(overview.totalFamilies);

  const genderTotal = genderStats.male + genderStats.female;
  const malePct = Math.round((genderStats.male / genderTotal) * 100);
  const femalePct = 100 - malePct;

  return (
    <div className="min-h-screen bg-[var(--cream)] font-body">
      <GlobalStyles />

      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
         <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
            <SectionHeader eyebrow="Numbers" title="Community Statistics"/>

            <button onClick={() => navigate("/home")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
              <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
            </button>
          </div>

        <div className="px-4 pb-10 sm:px-6 md:px-8 lg:px-10">
          {/* ================= HERO — the one bold maroon card, same move as the Home banner ================= */}
          <div className="relative rounded-[28px] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-800)_100%)] p-5 shadow-[0_12px_28px_-14px_rgba(107,15,26,0.55)] md:p-6">
            {/* diagonal cross-hatch texture */}
            <div
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
            />

            <p className="relative text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--gold-300)]">
              Community overview 
            </p>

            <div className="relative mt-3 flex items-stretch">
              <div className="flex-1 pr-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white">Total members</p>
                <p className="font-display mt-1 text-[34px] font-black leading-none tabular-nums text-white md:text-[40px]">
                  {membersCount.toLocaleString()}
                </p>
              </div>
              <div className="w-px shrink-0 bg-white/15" />
              <div className="flex-1 pl-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white">Total families</p>
                <p className="font-display mt-1 text-[34px] font-black leading-none tabular-nums text-white md:text-[40px]">
                  {familiesCount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* quick facts as solid gold pill badges — same device as the "स्वागत" / category badges on Home */}
            <div className="relative mt-4 flex flex-wrap gap-1.5">
              {quickFacts.map((f) => (
                <span
                  key={f.label}
                  className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  px-3 py-1.5 text-[11px] font-bold text-[var(--maroon-800)]"
                >
                  <f.icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {f.value.toLocaleString()} {f.label}
                </span>
              ))}
            </div>

            <div className="relative mt-4 border-t border-white/10 pt-3.5">
              <SplitBar
                dark
                icon={Users}
                title="Member composition"
                left={{ label: "Male", pct: malePct }}
                right={{ label: "Female", pct: femalePct }}
              />
            </div>
          </div>

          {/* ================= "At a glance" ================= */}
          <div className="mt-5">
            <SectionHeader eyebrow="Quick numbers" title="At a glance" />
            <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
              <div className="divide-y divide-[var(--gold-300)]/50">
                {atAGlance.map((s, i) => (
                  <div key={s.label} className="kc-rise flex items-center gap-3 px-4 py-3 md:px-5" style={{ animationDelay: `${i * 50}ms` }}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  shadow-sm">
                      <s.icon className="h-4.5 w-4.5 text-[var(--maroon-800)]" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-[14px] font-bold text-[var(--ink)] md:text-[14px]">{s.label}</span>
                      <span className="font-mr block text-[12px] text-[var(--text-muted)]">{s.labelMr}</span>
                    </span>
                    <span className="font-display shrink-0 text-[17px] font-extrabold text-[var(--maroon-800)] md:text-[18px]">
                      {s.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= DETAILED STATISTICS ================= */}
          <div className="mt-6">
            <SectionHeader eyebrow="Detailed statistics" title="Full Breakdown" />
            <div className="space-y-3">
              <AccordionSection title="Education statistics" titleMr="शैक्षणिक आकडेवारी" Icon={PieChart}>
                <EducationChart />
              </AccordionSection>

              <AccordionSection title="Occupation statistics" titleMr="व्यवसाय आकडेवारी" Icon={BarChart3}>
                <div className="space-y-3">
                  {occupationData.map((d, i) => (
                    <BarRow key={d.label} label={d.label} percent={d.value} color={PALETTE[i % PALETTE.length]} Icon={d.icon} delay={i * 40} />
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection title="Geographic statistics" titleMr="भौगोलिक आकडेवारी" Icon={MapPin}>
                <div className="mb-3 flex gap-1.5 overflow-x-auto">
                  {(Object.keys(geoTabs) as (keyof typeof geoTabs)[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGeoTab(tab)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-colors md:text-[12px] ${
                        geoTab === tab ? "bg-[var(--maroon-800)] text-white" : "bg-[var(--gold-100)] text-[var(--maroon-800)]"
                      }`}
                    >
                      {tab}-wise
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {geoRows.map((r, i) => (
                    <BarRow
                      key={r.label}
                      label={r.label}
                      value={r.value}
                      percent={Math.round((r.value / geoMax) * 100)}
                      color={PALETTE[i % PALETTE.length]}
                      delay={i * 40}
                    />
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection title="Agriculture statistics" titleMr="कृषी आकडेवारी" Icon={Wheat}>
                <div className="flex flex-wrap gap-1.5">
                  <span className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  px-3 py-1.5 text-[11px] font-bold text-[var(--maroon-800)]">
                    <Sprout className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {agriculture.farmingFamilies} farming families
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  px-3 py-1.5 text-[11px] font-bold text-[var(--maroon-800)]">
                    <Leaf className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {agriculture.cropCategories} crop categories
                  </span>
                </div>

                <div className="mt-4">
                  <SplitBar
                    icon={Droplet}
                    title="Irrigated vs. non-irrigated land"
                    left={{ label: "Irrigated", pct: agriculture.irrigatedPct }}
                    right={{ label: "Non-irrigated", pct: agriculture.nonIrrigatedPct }}
                  />
                </div>

                <div className="mt-4">
                  <p className="mb-1.5 text-[11px] font-semibold text-[var(--ink)]/70">Major crops</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agriculture.majorCrops.map((c) => (
                      <span key={c} className="rounded-full bg-[var(--maroon-800)]/8 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--maroon-800)]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}