import type { ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Briefcase,
  BadgeCheck,
  Pencil,
  LogOut,
  Gem,
} from "lucide-react";

// ---------- Types ----------

interface ContactInfo {
  mobile: string;
  whatsapp: string;
  email: string;
}

interface PersonalDetails {
  village: string;
  occupation: string;
}

interface ProfileData {
  name: string;
  memberId: string;
  verified: boolean;
  contact: ContactInfo;
  personal: PersonalDetails;
}

interface ProfileProps {
  profile?: ProfileData;
  onBack?: () => void;
  onEditProfile?: () => void;
  onLogout?: () => void;
}

const defaultProfile: ProfileData = {
  name: "Sanjay Kohali",
  memberId: "4421",
  verified: true,
  contact: {
    mobile: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "sanjay.kohali@email.com",
  },
  personal: {
    village: "Nagpur",
    occupation: "Business Owner",
  },
};


// ---------- Warli motif — brand watermark, reused from the Home screen language ----------

const CardMotif: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 160 160"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
  >
    <g stroke="var(--gold-300)" strokeWidth="1.4" strokeLinecap="round" opacity="0.16">
      <circle cx="128" cy="30" r="6" />
      <path d="M128 36 L128 56" />
      <path d="M128 42 L116 50" />
      <path d="M128 42 L140 50" />
      <path d="M128 56 L118 70" />
      <path d="M128 56 L138 70" />
      <circle cx="150" cy="78" r="3" />
      <circle cx="104" cy="14" r="3" />
    </g>
  </svg>
);

// ---------- List row — tactile, tappable when a href is supplied ----------

interface ListRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  first?: boolean;
  href?: string;
  external?: boolean;
}

const ListRow: FC<ListRowProps> = ({ icon, label, value, first, href, external }) => {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  shadow-sm">
        <span className="text-[var(--maroon-800)]">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display block text-[14px] font-bold text-[var(--ink)] md:text-[14px]">
          {label}
        </div>
        <div className="font-mr block text-[12px] text-[var(--text-muted)]">
          {value}
        </div>
      </div>
      {href && (
        <ChevronRight className="h-4 w-4 flex-shrink-0 text-[var(--gold-500)] transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  const rowClasses = `group kc-row-shine flex items-center gap-3 px-4 py-3.5 md:gap-4 md:px-5 md:py-4 ${
    first ? "" : "border-t border-[color:var(--gold-300)]/50"
  } ${href ? "cursor-pointer transition-colors duration-200 hover:bg-[var(--gold-100)]/40 active:scale-[0.99]" : ""}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={rowClasses}
      >
        {content}
      </a>
    );
  }

  return <div className={rowClasses}>{content}</div>;
};

// ---------- Main component ----------

export default function Profile({
  profile = defaultProfile,
  onEditProfile,
  onLogout,
}: ProfileProps) {
  const waDigits = profile.contact.whatsapp.replace(/\D/g, "");
  const mobileDigits = profile.contact.mobile.replace(/\D/g, "");
   const navigate = useNavigate();

   const handleLogout = () => {
    // run any parent-provided cleanup (clear tokens, context, etc.)
    onLogout?.();

    // clear whatever you're using to persist auth
    localStorage.removeItem("authToken"); // adjust to your actual key(s)

    navigate("/login", { replace: true });
  };

  return (
    <div>

      {/* Header */}
       <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl px-4 pt-3  sm:px-6 md:px-8 md:pt-5 lg:px-10">
          <SectionHeader eyebrow="Personal Info" title="My Profile"/>

          <button onClick={() => navigate("/home")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
          </button>
        </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto bg-[var(--cream)] px-4 pb-6 pt-2 [scrollbar-width:none] sm:px-6 md:px-8 md:pb-10 md:pt-4 lg:px-10 [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          {/* ===== Signature element: membership card ===== */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_38%,var(--maroon-700)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-maroon)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-7 lg:px-10">
              {/* diagonal cross-hatch texture */}
              <div
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
              />
              {/* foil shine streak */}
              <div className="pointer-events-none absolute -left-12 -top-20 h-64 w-28 rotate-[22deg] bg-[linear-gradient(90deg,transparent,rgba(240,213,133,0.22),transparent)] md:h-80 md:w-36" />

              {/* brand watermark motif */}
              <CardMotif className="pointer-events-none absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32" />

              {/* inner top hairline for a "card edge" feel */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,213,133,0.5),transparent)]" />

              {/* org name + verified seal */}
              <div className="relative z-10 mb-4 flex items-center justify-between md:mb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-300)] md:text-[13px]">
                  Kohali Samaj Vikas Mandal
                </div>
                {profile.verified && (
                  <div className="flex items-center gap-1 rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-500))] px-2.5 py-[4px] text-[10px] font-bold text-[var(--maroon-950)] shadow-[0_2px_8px_rgba(0,0,0,0.25)] md:px-3.5 md:py-[6px] md:text-[12px]">
                    <BadgeCheck className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />
                    Verified
                  </div>
                )}
              </div>

              {/* photo + identity */}
              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                <div className="flex h-[62px] w-[62px] flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] p-[2.5px] shadow-[0_6px_16px_rgba(0,0,0,0.3)] ring-2 ring-[rgba(240,213,133,0.25)] md:h-[88px] md:w-[88px] md:rounded-[20px] md:p-[3px] lg:h-[100px] lg:w-[100px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--paper)] md:rounded-[17px]">
                    <User
                      className="h-8 w-8 text-[var(--maroon-800)] md:h-11 md:w-11 lg:h-12 lg:w-12"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[20px] font-bold leading-tight text-white md:text-[27px] lg:text-[30px]">
                    {profile.name}
                  </div>
                  <div className="mt-1 truncate text-[12.5px] font-semibold text-[var(--gold-300)] md:text-[15px]">
                    {profile.personal.occupation} · {profile.personal.village}
                  </div>
                </div>
              </div>

              {/* card number row */}
              <div className="relative z-10 mt-6 flex items-center gap-1.5 md:mt-8 md:gap-2">
                <Gem className="h-3 w-3 text-[var(--gold-400)] md:h-3.5 md:w-3.5" />
                <div>
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-400)]/90 md:text-[11px]">
                    Member No.
                  </div>
                  <div className="mt-0.5 text-[18px] font-bold tracking-[0.18em] text-[var(--gold-100)] md:text-[23px]">
                    {profile.memberId
                      .padStart(6, "0")
                      .replace(/(\d{2})(?=\d)/g, "$1 ")}
                  </div>
                </div>
              </div>
            </div>

            {/* floating edit action, anchored to the card */}
            <button
              onClick={onEditProfile}
              aria-label="Edit profile"
              className="kc-edit-pulse absolute -bottom-5 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(155deg,var(--gold-300),var(--gold-600))] text-[var(--maroon-950)] shadow-[var(--shadow-gold)] transition-transform duration-150 active:scale-95 md:-bottom-6 md:-right-3 md:h-14 md:w-14"
            >
              <Pencil className="h-4.5 w-4.5 md:h-5 md:w-5" />
            </button>
          </div>

          {/*  Info groups */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 mt-5">
            {/* Contact — elevated list group, rows are tappable */}
            <div>
              <SectionHeader eyebrow="Get in Touch" title="Contact Info" />
              <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                <ListRow
                  first
                  href={`tel:${mobileDigits}`}
                  icon={<Phone className="h-4 w-4 md:h-[18px] md:w-[18px]" />}
                  label="Mobile Number"
                  value={profile.contact.mobile}
                />
                <ListRow
                  href={`https://wa.me/${waDigits}`}
                  external
                  icon={<MessageCircle className="h-4 w-4 md:h-[18px] md:w-[18px]" />}
                  label="WhatsApp Number"
                  value={profile.contact.whatsapp}
                />
                <ListRow
                  href={`mailto:${profile.contact.email}`}
                  icon={<Mail className="h-4 w-4 md:h-[18px] md:w-[18px]" />}
                  label="Email ID"
                  value={profile.contact.email}
                />
              </div>
            </div>

            {/* Personal details — elevated list group */}
            <div className="mt-5">
              <SectionHeader eyebrow="About Me" title="Personal Details" />
              <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                <ListRow
                  first
                  icon={<MapPin className="h-4 w-4 md:h-[18px] md:w-[18px]" />}
                  label="Village / City"
                  value={profile.personal.village}
                />
                <ListRow
                  icon={<Briefcase className="h-4 w-4 md:h-[18px] md:w-[18px]" />}
                  label="Occupation"
                  value={profile.personal.occupation}
                />
              </div>
            </div>
          </div>

          {/* ===== Logout  ===== */}
          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] py-3.5 text-[14px] font-bold text-[#fff] transition-transform duration-150 active:scale-[0.99] md:mt-8 md:rounded-3xl md:py-4 md:text-[15px] lg:mx-auto lg:max-w-[420px]"
          >
            <LogOut className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}