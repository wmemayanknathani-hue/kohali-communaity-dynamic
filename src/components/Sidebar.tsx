import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  X,
  Home,
  Users,
  Grid3x3,
  BarChart3,
  Radio,
  Store,
  HelpCircle,
  Info,
  Globe,
  LogOut,
  Landmark,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const primaryLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/committee", label: "Executive Committee", icon: Users },
  { to: "/live-events", label: "Live Events", icon: Radio },
  { to: "/services", label: "Services", icon: Grid3x3 },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/business-promotion", label: "Business Promotion", icon: Store },
];

const secondaryLinks = [
  { to: "/support", label: "Support", icon: HelpCircle },
  { to: "/contact", label: "Contact Us", icon: Info },
];

// Kohali Samaj — About/heritage submenu.
const kohaliSamajLinks = [
  { to: "/kohali-samaj/about", label: "About Kohali Samaj" },
  { to: "/kohali-samaj/history", label: "History & Origin" },
  { to: "/kohali-samaj/vision-mission", label: "Vision & Mission" },
  { to: "/kohali-samaj/education", label: "Education" },
  { to: "/kohali-samaj/employment", label: "Employment" },
  { to: "/kohali-samaj/social-justice", label: "Social Justice" },
  { to: "/kohali-samaj/youth-development", label: "Youth Development" },
  { to: "/kohali-samaj/women-empowerment", label: "Women Empowerment" },
  { to: "/kohali-samaj/health-awareness", label: "Health Awareness" },
  { to: "/kohali-samaj/community-welfare", label: "Community Welfare" },
  { to: "/kohali-samaj/community-halls", label: "Community Halls" },
];

// Small ornamental divider — flanking hairlines with a center diamond,
// used instead of a plain uppercase section label on its own.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-2 pb-1.5 pt-1">
      <span className="h-px flex-1 bg-[var(--gold-500)]/30" />
      <span className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)]">
        <span className="h-1 w-1 rotate-45 bg-[var(--gold-500)]" />
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--gold-500)]/30" />
    </div>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [kohaliSamajOpen, setKohaliSamajOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("authToken"); // clear session if you're storing one
    onClose();                             // close the drawer
    navigate("/login", { replace: true }); // go to login
  }
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/45 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[82%] max-w-[300px] flex-col bg-[var(--cream)] shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ---- profile header card ---- */}
        <div className="relative overflow-hidden bg-[linear-gradient(140deg,var(--maroon-800),var(--maroon-950))] px-4 pb-5 pt-4">
          {/* diagonal cross-hatch texture */}
          <div
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
          />
         

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="relative z-10 mb-3 ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[var(--gold-300)] transition-colors duration-200 hover:bg-white/20 active:scale-90"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border-2 border-[var(--gold-500)] bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[var(--shadow-gold)]">
                <span className="kc-font-display text-[15px] font-extrabold text-[var(--maroon-950)]">RK</span>
              </div>
              {/* subtle ring accent, like a medallion edge */}
              <div className="pointer-events-none absolute -inset-[3px] rounded-full border border-[var(--gold-500)]/30" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14.5px] font-extrabold text-white">Rajesh Kohali</p>
              <p className="truncate text-[11.5px] font-medium text-[var(--gold-300)]">+91 98765 43210</p>
            </div>
          </div>

          <NavLink
            to="/profile"
            onClick={onClose}
            className="kc-btn-shine relative z-10 mt-4 block rounded-lg bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-2 text-center text-[13px] font-extrabold text-[var(--maroon-900)] no-underline shadow-[0_4px_14px_-4px_rgba(214,169,74,0.6)]"
          >
            View Profile
          </NavLink>
        </div>

        {/* ---- nav links ---- */}
        <nav className="flex-1 overflow-y-auto px-3 pt-3">
          <SectionLabel>Explore</SectionLabel>
          <ul className="m-0 list-none space-y-0.5 p-0">
            <li key="/">
              <NavLink
                to="/"
                onClick={onClose}
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-xl py-2 pl-3 pr-2.5 text-[14px] no-underline transition-colors duration-150 ${
                    isActive
                      ? "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] font-bold text-[var(--maroon-900)]"
                      : "font-medium text-[var(--ink)] hover:bg-[var(--gold-100)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-shadow duration-150 ${
                        isActive
                          ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[var(--shadow-gold)]"
                          : "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]"
                      }`}
                    >
                      <Home size={15} className={isActive ? "text-[var(--gold-300)]" : "text-[var(--maroon-800)]"} />
                    </span>
                    Home
                  </>
                )}
              </NavLink>
            </li>

            {/* ---- Kohali Samaj — expandable submenu ---- */}
            <li>
              <button
                type="button"
                onClick={() => setKohaliSamajOpen((v) => !v)}
                aria-expanded={kohaliSamajOpen}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl py-2 pl-3 pr-2.5 text-[14px] font-medium text-[var(--ink)] transition-colors duration-150 hover:bg-[var(--gold-100)] ${
                  kohaliSamajOpen ? "bg-[var(--gold-100)]" : ""
                }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]">
                  <Landmark size={15} className="text-[var(--maroon-800)]" />
                </span>
                <span className="flex-1 text-left">Kohali Samaj</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[var(--gold-600)] transition-transform duration-200 ${
                    kohaliSamajOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* submenu panel */}
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-250 ease-out ${
                  kohaliSamajOpen ? "grid-rows-[1fr] pt-0.5" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="m-0 list-none space-y-0.5 border-l border-[var(--gold-500)]/30 py-0.5 pl-4 pr-0">
                    {kohaliSamajLinks.map(({ to, label }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `relative flex items-center gap-2 rounded-lg py-2 pl-3 pr-2.5 text-[13px] no-underline transition-colors duration-150 ${
                              isActive
                                ? "bg-[var(--gold-100)] font-bold text-[var(--maroon-900)]"
                                : "font-medium text-[var(--text-muted)] hover:bg-[var(--gold-100)] hover:text-[var(--ink)]"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rotate-45 ${
                                  isActive ? "bg-[var(--maroon-800)]" : "bg-[var(--gold-500)]/60"
                                }`}
                              />
                              <span className="truncate">{label}</span>
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {primaryLinks.slice(1).map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-xl py-2 pl-3 pr-2.5 text-[14px] no-underline transition-colors duration-150 ${
                      isActive
                        ? "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] font-bold text-[var(--maroon-900)]"
                        : "font-medium text-[var(--ink)] hover:bg-[var(--gold-100)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-shadow duration-150 ${
                          isActive
                            ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[var(--shadow-gold)]"
                            : "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]"
                        }`}
                      >
                        <Icon size={15} className={isActive ? "text-[var(--gold-300)]" : "text-[var(--maroon-800)]"} />
                      </span>
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <SectionLabel>More</SectionLabel>
          <ul className="m-0 list-none space-y-0.5 p-0">
            {secondaryLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-xl py-2 pl-3 pr-2.5 text-[14px] no-underline transition-colors duration-150 ${
                      isActive
                        ? "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] font-bold text-[var(--maroon-900)]"
                        : "font-medium text-[var(--ink)] hover:bg-[var(--gold-100)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[var(--gold-500)] transition-opacity duration-150 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-shadow duration-150 ${
                          isActive
                            ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[var(--shadow-gold)]"
                            : "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]"
                        }`}
                      >
                        <Icon size={15} className={isActive ? "text-[var(--gold-300)]" : "text-[var(--maroon-800)]"} />
                      </span>
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li>
            <a  
                href="https://kohalisamaj.org"
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center gap-3 rounded-xl py-2 pl-3 pr-2.5 text-[14px] font-medium text-[var(--ink)] no-underline transition-colors duration-150 hover:bg-[var(--gold-100)]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]">
                  <Globe size={15} className="text-[var(--maroon-800)]" />
                </span>
                Website
              </a>
            </li>
          </ul>
        </nav>

        {/* ---- footer: logout ---- */}
        <div className="relative border-t border-[var(--gold-500)]/25 p-3">
          {/* small diamond mark centered on the top border, echoing the header flourish */}
          <span
            aria-hidden="true"
            className="absolute -top-[3.5px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rotate-45 bg-[var(--cream)] border border-[var(--gold-500)]/40"
          />
          <button onClick={handleLogout} className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-[14px] font-bold text-[var(--maroon-900)] transition-colors duration-150 hover:bg-[var(--gold-200)] active:bg-[var(--gold-200)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[var(--shadow-gold)]">
              <LogOut size={15} className="text-[var(--gold-300)]" />
            </span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}