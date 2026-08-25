import { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Users,
  Home,
  MapPin,
  Landmark,
  Briefcase,
  GraduationCap,
  Sprout,
  Store,
  Building2,
  Leaf,
  Droplet,
  User,
  Sparkles,
  PieChart,
  BarChart3,
  Wheat,
} from "lucide-react";

/* ============================= MOTION ============================= */

function MotionStyles() {
  return (
    <style>{`
      @keyframes kc-expand { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      .kc-expand { animation: kc-expand 0.2s ease-out; }
      .kc-bar-fill { transition: width 0.6s ease-out; }
      @media (prefers-reduced-motion: reduce) {
        .kc-expand { animation: none !important; }
        .kc-bar-fill { transition: none !important; }
      }
    `}</style>
  );
}

/* ============================= PALETTE (extends the maroon/gold system for multi-category charts) ============================= */

const PALETTE = [
  "var(--maroon-800)",
  "var(--gold-500)",
  "#B76E3A", // copper
  "#8C6239", // bronze
  "#5C4033", // deep brown
  "var(--gold-300)",
  "#9C8AA5", // muted heather (used sparingly, last resort category)
];

/* ============================= DATA (placeholder — wire to real records) ============================= */

const overview = {
  totalMembers: 3842,
  totalFamilies: 812,
};

const secondaryStats = [
  { label: "Villages", labelMr: "गावे", value: 96, icon: MapPin },
  { label: "Talukas", labelMr: "तालुके", value: 14, icon: Landmark },
  { label: "Districts", labelMr: "जिल्हे", value: 6, icon: Landmark },
  { label: "Male members", labelMr: "पुरुष सदस्य", value: 1986, icon: User },
  { label: "Female members", labelMr: "महिला सदस्य", value: 1856, icon: User },
  { label: "Working members", labelMr: "नोकरदार सदस्य", value: 1540, icon: Briefcase },
  { label: "Students", labelMr: "विद्यार्थी", value: 972, icon: GraduationCap },
  { label: "Farmers", labelMr: "शेतकरी", value: 640, icon: Sprout },
  { label: "Business owners", labelMr: "व्यावसायिक", value: 318, icon: Store },
];

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

/* ============================= SMALL PRIMITIVES ============================= */

function DonutChart({
  data,
  size = 128,
  thickness = 18,
  centerLabel,
  centerSub,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel: string;
  centerSub?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--gold-100)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const offset = cumulative * circumference;
          cumulative += fraction;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[15px] font-bold text-[var(--ink)]">{centerLabel}</span>
        {centerSub && <span className="text-[9px] text-[var(--text-muted)]">{centerSub}</span>}
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
}: {
  label: string;
  value?: number;
  percent: number;
  color: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-[11.5px] text-[var(--ink)]/85 md:text-[12.5px]">
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
    <div className="overflow-hidden rounded-2xl bg-[var(--paper)] shadow-[0_6px_20px_-14px_rgba(74,11,26,0.4)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left md:px-5 md:py-4"
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-100)]">
          <Icon className="h-4.5 w-4.5 text-[var(--maroon-800)]" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-display block text-[13.5px] font-semibold text-[var(--ink)] md:text-[14.5px]">
            {title}
          </span>
          <span className="font-mr block text-[11px] text-[var(--text-muted)] md:text-[11.5px]">{titleMr}</span>
        </span>
        <ChevronDown
          className={`h-4.5 w-4.5 shrink-0 text-[var(--gold-600)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>
      {open && (
        <div className="kc-expand border-t border-[var(--gold-300)]/25 px-4 pb-4 pt-4 md:px-5 md:pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

/* ============================= PAGE ============================= */

export default function Stats() {
  const [geoTab, setGeoTab] = useState<keyof typeof geoTabs>("District");
  const geoRows = geoTabs[geoTab];
  const geoMax = Math.max(...geoRows.map((r) => r.value));

  return (
    <div className="min-h-screen bg-[var(--cream)] font-body">
      <MotionStyles />

      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        {/* ---- Header ---- */}
        <div className="flex items-center justify-between px-4 pt-3 pb-4 sm:px-6 md:px-8 md:pt-5 lg:px-10">
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--ink)] shadow-sm transition-transform duration-150 active:scale-90 md:h-10 md:w-10">
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={2.2} />
          </button>
          <div className="text-center">
            <h1 className="font-display text-[17px] font-semibold leading-tight text-[var(--ink)] md:text-[20px]">
              Community Statistics
            </h1>
            <p className="font-mr text-[12px] leading-tight text-[var(--text-muted)] md:text-[13px]">
              सामुदायिक आकडेवारी
            </p>
          </div>
          <span
            title="This module is still being finalized"
            className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-[var(--text-muted)]/25 bg-[var(--paper)] px-2.5 text-[10px] font-semibold text-[var(--text-muted)] md:h-10 md:px-3 md:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]/50" />
            On hold
          </span>
        </div>

        {/* ================= KEY STATISTICS (always visible) ================= */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold-600)]">
            Key statistics <span className="font-mr font-normal normal-case tracking-normal text-[var(--text-muted)]">· ठळक आकडेवारी</span>
          </p>

          {/* two hero numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-800)_100%)] p-4">
              <Users className="absolute -right-2 -top-2 h-16 w-16 text-white/10" strokeWidth={1.5} />
              <p className="relative text-[10px] font-semibold uppercase tracking-wide text-[var(--gold-300)]">Total members</p>
              <p className="font-mr relative -mt-0.5 text-[10px] text-[var(--gold-300)]/70">एकूण सदस्य</p>
              <p className="font-display relative mt-1.5 text-[26px] font-bold text-white md:text-[30px]">
                {overview.totalMembers.toLocaleString()}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--maroon-800)_0%,var(--maroon-700)_100%)] p-4">
              <Home className="absolute -right-2 -top-2 h-16 w-16 text-white/10" strokeWidth={1.5} />
              <p className="relative text-[10px] font-semibold uppercase tracking-wide text-[var(--gold-300)]">Total families</p>
              <p className="font-mr relative -mt-0.5 text-[10px] text-[var(--gold-300)]/70">एकूण कुटुंबे</p>
              <p className="font-display relative mt-1.5 text-[26px] font-bold text-white md:text-[30px]">
                {overview.totalFamilies.toLocaleString()}
              </p>
            </div>
          </div>

          {/* compact secondary stat grid */}
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-3 md:grid-cols-3">
            {secondaryStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-[var(--paper)] px-2.5 py-2.5 shadow-[0_4px_14px_-10px_rgba(74,11,26,0.4)] md:px-3 md:py-3"
              >
                <s.icon className="h-3.5 w-3.5 text-[var(--gold-600)]" strokeWidth={2} />
                <p className="font-display mt-1.5 text-[15px] font-bold leading-none text-[var(--ink)] md:text-[17px]">
                  {s.value.toLocaleString()}
                </p>
                <p className="mt-1 truncate text-[9.5px] leading-tight text-[var(--text-muted)] md:text-[10px]">{s.label}</p>
                <p className="font-mr truncate text-[9px] leading-tight text-[var(--text-muted)]/70">{s.labelMr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DETAILED STATISTICS (expandable) ================= */}
        <div className="px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pt-8 lg:px-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--gold-600)]">
            Detailed statistics <span className="font-mr font-normal normal-case tracking-normal text-[var(--text-muted)]">· सविस्तर आकडेवारी</span>
          </p>

          <div className="space-y-3">
            {/* Education */}
            <AccordionSection title="Education statistics" titleMr="शैक्षणिक आकडेवारी" Icon={PieChart}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <DonutChart data={educationData} centerLabel="7" centerSub="categories" />
                <div className="w-full flex-1 space-y-1.5">
                  {educationData.map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-[11.5px] md:text-[12.5px]">
                      <span className="flex items-center gap-2 text-[var(--ink)]/85">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
                        {d.label}
                      </span>
                      <span className="font-semibold text-[var(--maroon-800)]">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionSection>

            {/* Occupation */}
            <AccordionSection title="Occupation statistics" titleMr="व्यवसाय आकडेवारी" Icon={BarChart3}>
              <div className="space-y-3">
                {occupationData.map((d, i) => (
                  <BarRow key={d.label} label={d.label} percent={d.value} color={PALETTE[i % PALETTE.length]} Icon={d.icon} />
                ))}
              </div>
            </AccordionSection>

            {/* Geographic */}
            <AccordionSection title="Geographic statistics" titleMr="भौगोलिक आकडेवारी" Icon={MapPin}>
              <div className="mb-3 flex gap-1.5 overflow-x-auto">
                {(Object.keys(geoTabs) as (keyof typeof geoTabs)[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGeoTab(tab)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors md:text-[12px] ${
                      geoTab === tab
                        ? "bg-[var(--maroon-800)] text-white"
                        : "bg-[var(--gold-100)] text-[var(--maroon-800)]"
                    }`}
                  >
                    {tab}-wise
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {geoRows.map((r, i) => (
                  <BarRow key={r.label} label={r.label} value={r.value} percent={Math.round((r.value / geoMax) * 100)} color={PALETTE[i % PALETTE.length]} />
                ))}
              </div>
            </AccordionSection>

            {/* Agriculture */}
            <AccordionSection title="Agriculture statistics" titleMr="कृषी आकडेवारी" Icon={Wheat}>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-[var(--gold-100)]/50 px-3 py-2.5">
                  <Sprout className="h-3.5 w-3.5 text-[var(--gold-600)]" strokeWidth={2} />
                  <p className="font-display mt-1 text-[16px] font-bold text-[var(--ink)]">{agriculture.farmingFamilies}</p>
                  <p className="text-[9.5px] text-[var(--text-muted)]">Farming families</p>
                </div>
                <div className="rounded-xl bg-[var(--gold-100)]/50 px-3 py-2.5">
                  <Leaf className="h-3.5 w-3.5 text-[var(--gold-600)]" strokeWidth={2} />
                  <p className="font-display mt-1 text-[16px] font-bold text-[var(--ink)]">{agriculture.cropCategories}</p>
                  <p className="text-[9.5px] text-[var(--text-muted)]">Crop categories</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ink)]/80">
                  <Droplet className="h-3.5 w-3.5 text-[var(--gold-600)]" strokeWidth={2} />
                  Irrigated vs. non-irrigated land
                </p>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--gold-100)]">
                  <div className="kc-bar-fill h-full" style={{ width: `${agriculture.irrigatedPct}%`, background: "var(--maroon-800)" }} />
                  <div className="kc-bar-fill h-full" style={{ width: `${agriculture.nonIrrigatedPct}%`, background: "var(--gold-300)" }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[10.5px] text-[var(--text-muted)]">
                  <span>Irrigated · {agriculture.irrigatedPct}%</span>
                  <span>Non-irrigated · {agriculture.nonIrrigatedPct}%</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-[11px] font-semibold text-[var(--ink)]/80">Major crops</p>
                <div className="flex flex-wrap gap-1.5">
                  {agriculture.majorCrops.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-[var(--gold-100)] px-2.5 py-1 text-[10.5px] font-medium text-[var(--maroon-800)]"
                    >
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
  );
}