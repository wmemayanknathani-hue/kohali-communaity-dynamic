import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Grid3x3,
  BarChart3,
  HelpCircle,
} from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/committee", label: "Committee", icon: Users },
  { to: "/services", label: "Services", icon: Grid3x3 },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/support", label: "Support", icon: HelpCircle },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50">
      <div className="relative border-t border-[var(--gold-500)]/35 bg-[var(--cream)] shadow-[0_-8px_22px_-18px_rgba(44,5,13,0.7)]">

        {/* Gold decorative line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold-500)]/70 to-transparent" />

        <div className="mx-auto grid h-[72px] w-full grid-cols-5 items-center px-4 pb-[env(safe-area-inset-bottom)] sm:h-[78px] sm:px-6 md:h-[84px] md:max-w-3xl md:px-8 lg:h-[88px] lg:max-w-4xl lg:px-10 xl:max-w-5xl">

          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className="group relative flex h-full items-center justify-center"
            >
              {({ isActive }) => (
                <div
                  className={`relative flex min-w-[58px] flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-300 sm:min-w-[70px] md:gap-1.5 ${
                    isActive
                      ? "text-[var(--maroon-800)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {/* Active indicator */}
                  <span
                    className={`absolute -top-[1px] left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-[var(--gold-500)] transition-all duration-300 ${
                      isActive ? "w-7 opacity-100 md:w-8" : "w-0 opacity-0"
                    }`}
                  />

                  {/* Icon */}
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 md:h-9 md:w-9 ${
                      isActive
                        ? "bg-[var(--maroon-900)] text-[var(--gold-300)]"
                        : "bg-transparent group-hover:bg-[var(--cream)] group-hover:text-[var(--maroon-800)]"
                    }`}
                  >
                    <Icon
                      strokeWidth={isActive ? 2.4 : 1.8}
                      className="h-5 w-5 md:h-[22px] md:w-[22px]"
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={`text-[10px] leading-none transition-all duration-300 sm:text-[11px] md:text-[12px] ${
                      isActive
                        ? "font-bold text-[var(--maroon-900)]"
                        : "font-medium text-[var(--text-muted)]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}

        </div>
      </div>
    </nav>
  );
}