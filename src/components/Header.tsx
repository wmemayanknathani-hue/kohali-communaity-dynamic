import { useState } from "react";
import { Bell, User, Globe, Check, ChevronDown } from "lucide-react";
import {
  NotificationDropdown,
  type Notification,
} from "./NotificationDropdown";
import logo from "../assets/kohali-logo.png";

const notifications: Notification[] = [
  {
    id: "1",
    title: "Annual General Meeting 2024",
    description:
      "Join us for the AGM to review yearly progress and vote on upcoming samaj initiatives.",
    date: "24 Oct, 10:00 AM",
    category: "notice",
    read: false,
  },
  {
    id: "2",
    title: "Diwali Milan Samaroh — Live Now",
    description:
      "The community Diwali gathering has started. Tap to join the live stream.",
    date: "Today, 6:30 PM",
    category: "live",
    read: false,
  },
  {
    id: "3",
    title: "Scholarship Applications Open",
    description:
      "Applications for the 2024–25 student scholarship program are now open for members.",
    date: "20 Oct, 9:00 AM",
    category: "announcement",
    read: false,
  },
  {
    id: "4",
    title: "Reminder: Blood Donation Camp",
    description:
      "The samaj blood donation camp begins tomorrow morning at the community hall.",
    date: "Tomorrow, 8:00 AM",
    category: "reminder",
    read: true,
  },
  {
    id: "5",
    title: "App Update: Faster Directory Search",
    description:
      "We've improved search speed and added filters to the business directory.",
    date: "18 Oct, 4:15 PM",
    category: "update",
    read: true,
  },
];

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"mr" | "en">("mr");

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <header className="sticky top-0 z-40">
      {/* Fine maroon–gold decorative edge */}
      <div className="relative border-b border-[var(--gold-500)]/35 bg-[var(--cream)] shadow-[0_8px_22px_-18px_rgba(44,5,13,0.7)]">
        <div className="mx-auto flex h-[70px] w-full items-center gap-2 px-4 sm:h-[76px] sm:px-6 md:h-[80px] md:max-w-3xl md:px-8 lg:h-[84px] lg:max-w-4xl lg:px-10 xl:max-w-5xl">
          {/* Brand */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 md:gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-[var(--gold-400)]/40 blur-md" />

              <div className="relative grid h-11 w-11 place-items-center rounded-full border border-[var(--gold-500)] bg-[var(--paper)] shadow-[var(--shadow-gold)] sm:h-12 sm:w-12 md:h-14 md:w-14">
                <img
                  src={logo}
                  alt="Kohali Samaj Vikas Mandal logo"
                  className="h-9 w-9 object-contain sm:h-10 sm:w-10 md:h-11 md:w-11"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="kc-font-display truncate text-[14px] font-extrabold leading-tight tracking-tight text-[var(--maroon-900)] sm:text-[16px] md:text-[18px] lg:text-[19px]">
                कोहळी समाज विकास मंडळ
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[var(--gold-500)]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--gold-700)] sm:text-[10px] md:text-[11px]">
                  नागपूर
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangOpen((value) => !value);
                  setNotifOpen(false);
                }}
                aria-label="Change language"
                aria-expanded={langOpen}
                className={`flex h-10 items-center gap-1 rounded-xl border px-2.5 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)]/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--cream)] active:scale-[0.94] active:duration-75 md:h-11 md:px-3 ${
                  langOpen
                    ? "border-[var(--gold-500)]/60 bg-[var(--gold-300)]/55 text-[var(--maroon-900)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                    : "border-[var(--gold-500)]/25 bg-[var(--gold-100)] text-[var(--maroon-800)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-[var(--gold-500)]/40 hover:bg-[var(--gold-300)]/45 hover:shadow-[0_2px_6px_-2px_rgba(90,15,20,0.18)]"
                }`}
              >
                <Globe strokeWidth={2.2} className="h-4 w-4 md:h-[18px] md:w-[18px]" />

                <span className="text-[10px] font-extrabold uppercase md:text-[11px]">
                  {lang}
                </span>

                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ease-out md:h-3.5 md:w-3.5 ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close language menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setLangOpen(false)}
                  />

                  <div className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-36 origin-top-right animate-[menuIn_.14s_ease-out] overflow-hidden rounded-2xl border border-[var(--gold-500)]/45 bg-[var(--paper)] p-1.5 shadow-[0_14px_32px_-12px_rgba(44,5,13,0.35),0_2px_8px_-2px_rgba(44,5,13,0.15)] md:w-44 md:p-2">
                    <p className="px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--gold-700)] md:text-[10px]">
                      Language
                    </p>

                    {[
                      { code: "mr" as const, label: "मराठी" },
                      { code: "en" as const, label: "English" },
                    ].map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => {
                          setLang(option.code);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-[12px] font-bold transition-colors duration-150 md:px-3 md:py-2.5 md:text-[13px] ${
                          lang === option.code
                            ? "bg-[var(--gold-100)] text-[var(--maroon-800)]"
                            : "text-[var(--ink)] hover:bg-[var(--cream)]"
                        }`}
                      >
                        {option.label}

                        {lang === option.code && (
                          <Check
                            className="h-3.5 w-3.5 text-[var(--maroon-800)] md:h-4 md:w-4"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((value) => !value);
                  setLangOpen(false);
                }}
                aria-label="Notifications"
                aria-expanded={notifOpen}
                className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)]/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--cream)] active:scale-[0.94] active:duration-75 md:h-11 md:w-11 ${
                  notifOpen
                    ? "border-[var(--gold-500)]/60 bg-[var(--gold-300)]/55 text-[var(--maroon-900)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                    : "border-[var(--gold-500)]/25 bg-[var(--gold-100)] text-[var(--maroon-800)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-[var(--gold-500)]/40 hover:bg-[var(--gold-300)]/45 hover:shadow-[0_2px_6px_-2px_rgba(90,15,20,0.18)]"
                }`}
              >
                <Bell strokeWidth={2.2} className="h-[18px] w-[18px] md:h-5 md:w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-[var(--cream)] bg-[var(--maroon-700)] px-1 text-[8px] font-extrabold text-[var(--gold-100)] shadow-[0_2px_4px_-1px_rgba(90,15,20,0.5)] md:h-5 md:min-w-[20px] md:text-[9px]">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              <NotificationDropdown
                open={notifOpen}
                notifications={notifications}
                onClose={() => setNotifOpen(false)}
              />
            </div>

            {/* Profile / menu */}
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open account menu"
              className="group relative ml-0.5 grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-[var(--gold-400)] bg-[linear-gradient(145deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-950)] shadow-[0_3px_8px_-2px_rgba(90,15,20,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)]/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--cream)] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_-3px_rgba(90,15,20,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-0 active:scale-[0.94] active:shadow-[0_1px_3px_-1px_rgba(90,15,20,0.3),inset_0_1px_2px_rgba(0,0,0,0.1)] active:duration-75 md:h-11 md:w-11"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/20" />
              <User
                strokeWidth={2.3}
                className="relative h-[18px] w-[18px] transition-transform duration-200 ease-out group-hover:scale-110 md:h-5 md:w-5"
              />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes menuIn {
          from { opacity: 0; transform: scale(0.94) translateY(-4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </header>
  );
}