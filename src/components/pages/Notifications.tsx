// src/components/pages/Notifications.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellOff, CheckCheck, ChevronRight, ChevronLeft } from "lucide-react";
import {
  SAMPLE_NOTIFICATIONS,
  categoryAccent,
  categoryLabel,
  getNotificationRoute,
  groupByDate,
} from "../../data/notifications";
import type { Notification } from "../../data/notifications";
import SectionHeader from "../SectionHeader";

type Filter = "all" | "unread" | Notification["category"];

// one container width for header, chips and list so everything lines up
const CONTAINER =
  "mx-auto w-full px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl";

export default function Notifications() {
  const navigate = useNavigate();
  // TODO: replace with the same source your Header passes to <NotificationDropdown />
  const [items, setItems] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  // categories that actually exist in the data, in first-seen order
  const categories = useMemo(
    () => Array.from(new Set(items.map((n) => n.category))),
    [items]
  );

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.category === filter);
  }, [items, filter]);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);

  const orderIndex = useMemo(() => {
    const map = new Map<string, number>();
    groups.forEach((g) => g.items.forEach((n) => map.set(n.id, map.size)));
    return map;
  }, [groups]);

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleClick = (n: Notification) => {
    markRead(n.id);
    const route = getNotificationRoute(n.type);
    if (route) navigate(route);
  };

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "सर्व" },
    { key: "unread", label: `न वाचलेल्या (${unreadCount})` },
    ...categories.map((c) => ({ key: c as Filter, label: categoryLabel[c] })),
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-[var(--cream)] text-[var(--ink)]">
      {/* Header */}
      <div className={`${CONTAINER} flex items-center justify-between gap-3 pt-3 md:gap-4 md:pt-5`}>
        <SectionHeader
          eyebrow={unreadCount > 0 ? `${unreadCount} नवीन सूचना` : "सर्व सूचना पाहिल्या आहेत"}
          title="सूचना फलक"
        />

        <div className="flex gap-2">
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            aria-label="सर्व वाचले"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 md:h-[40px] md:w-[40px]"
          >
            <CheckCheck className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </button>
          <button
            onClick={() => navigate(-1)}
            aria-label="मागे जा"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 text-white md:h-[18px] md:w-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Filter chips (light-background colors) */}
      <div className={CONTAINER}>
        <div className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((chip) => {
            const active = filter === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => setFilter(chip.key)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-colors duration-150 sm:text-xs md:px-4 md:py-2 md:text-[13px] ${
                  active
                    ? "border-[var(--maroon-800)] bg-[var(--maroon-800)] text-white shadow-sm"
                    : "border-[var(--gold-500)]/50 bg-[var(--paper)] text-[var(--maroon-800)] hover:bg-[var(--gold-100)]"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className={`${CONTAINER} pb-24 pt-2 md:pt-4`}>
        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className={`mt-3 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[var(--gold-500)]/50 bg-[var(--paper)] px-6 py-14 text-center transition-all duration-500 motion-reduce:transition-none ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <BellOff size={24} className="text-[var(--gold-500)]/70" />
            <p className="kc-font-display text-sm font-bold text-[var(--ink)] sm:text-base">
              फलक रिकामा आहे
            </p>
            <p className="text-xs leading-snug text-[var(--text-muted)] sm:text-sm">
              नवीन कार्यक्रम व घोषणा इथे दिसतील
            </p>
          </div>
        )}

        {/* Grouped list */}
        {groups.map((group) => (
          <section key={group.date} className="mb-2">
            <div className="flex items-center gap-2 px-1 pb-2 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--maroon-700)] sm:text-xs">
                {group.date}
              </span>
              <div className="h-px flex-1 bg-[var(--gold-500)]/25" />
            </div>

            <ul className="space-y-2 sm:space-y-2.5">
              {group.items.map((n) => {
                const delay = (orderIndex.get(n.id) ?? 0) * 50;
                return (
                  <li
                    key={n.id}
                    style={{ transitionDelay: `${delay}ms` }}
                    className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
                      mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleClick(n)}
                      className={`group flex w-full cursor-pointer gap-3 rounded-xl border border-[var(--gold-500)]/25 px-3.5 py-3 text-left transition-colors duration-150 hover:bg-[var(--gold-100)]/50 sm:gap-4 sm:px-4 sm:py-3.5 ${
                        !n.read ? "bg-[var(--gold-100)]/35" : "bg-[var(--paper)]"
                      }`}
                    >
                      <div
                        className="w-[3px] shrink-0 self-stretch rounded-full"
                        style={{ background: categoryAccent[n.category] }}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className="text-[9.5px] font-bold uppercase tracking-wide sm:text-[11px]"
                            style={{ color: categoryAccent[n.category] }}
                          >
                            {categoryLabel[n.category]}
                          </span>
                          {!n.read && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--maroon-700)] sm:h-2 sm:w-2" />
                          )}
                        </div>

                        <p className="kc-font-display mt-1 text-[13px] font-extrabold leading-tight text-[var(--ink)] sm:text-[15px]">
                          {n.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-muted)] sm:text-[13px] sm:leading-relaxed">
                          {n.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={16}
                        className="mt-1 shrink-0 self-center text-[var(--maroon-800)]/50 transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}