// src/components/NotificationDropdown.tsx
import { ChevronRight, X, BellOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  categoryAccent,
  categoryLabel,
  getNotificationRoute,
  groupByDate,
} from "../data/notifications";
import type { Notification } from "../data/notifications";

// Re-exported so existing imports from this file keep working
export type { Notification, NotificationCategory } from "../data/notifications";

export function NotificationDropdown({
  open,
  notifications,
  onClose,
  onMarkRead,
}: {
  open: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}) {
  const navigate = useNavigate();

  const handleNotificationClick = async (notification: Notification) => {
    await onMarkRead?.(notification.id);
    const route = getNotificationRoute(notification.type);
    if (route) navigate(route);
    onClose();
  };

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const groups = groupByDate(notifications);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className="
          fixed inset-x-3 top-16 bottom-20 z-50
          sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-11
          flex w-auto flex-col sm:w-[336px]
          max-w-full sm:max-w-[90vw]
          mx-auto sm:mx-0
          overflow-hidden rounded-2xl border border-[var(--gold-500)]/40 bg-[var(--paper)] shadow-[var(--shadow-maroon)]
        "
      >
        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between overflow-hidden bg-[linear-gradient(120deg,var(--maroon-800),var(--maroon-950))] px-4 py-3.5">
          <div className="relative">
            <p className="kc-font-display text-[14px] font-extrabold text-white">सूचना फलक</p>
            <p className="text-[10px] font-medium text-[var(--gold-300)]/90">
              {unreadCount > 0 ? `${unreadCount} नवीन सूचना` : "सर्व सूचना पाहिल्या आहेत"}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="बंद करा"
            className="relative cursor-pointer rounded-full p-1.5 text-[var(--gold-300)] transition-colors hover:bg-white/10"
          >
            <X size={15} />
          </button>
        </div>

        {/* List */}
        <div className="min-h-0 flex-1 overflow-y-auto sm:max-h-[64vh] sm:flex-none">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
              <BellOff size={22} className="text-[var(--gold-500)]/60" />
              <p className="kc-font-display text-[13px] font-bold text-[var(--ink)]">
                फलक रिकामा आहे
              </p>
              <p className="text-[11px] leading-snug text-[var(--text-muted)]">
                नवीन कार्यक्रम व घोषणा इथे दिसतील
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.date}>
                {/* date divider */}
                <div className="sticky top-0 z-10 flex items-center gap-2 bg-[var(--paper)]/95 px-4 pt-2.5 pb-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--maroon-700)]">
                    {group.date}
                  </span>
                  <div className="h-px flex-1 bg-[var(--gold-500)]/25" />
                </div>

                {group.items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`group flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                      !n.read ? "bg-[var(--gold-100)]/35" : "bg-transparent"
                    } hover:bg-[var(--gold-100)]/50`}
                  >
                    <div
                      className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full"
                      style={{ background: categoryAccent[n.category] }}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className="text-[9.5px] font-bold uppercase tracking-wide"
                          style={{ color: categoryAccent[n.category] }}
                        >
                          {categoryLabel[n.category]}
                        </span>
                        {!n.read && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--maroon-700)]" />
                        )}
                      </div>

                      <p className="kc-font-display mt-1 text-[13px] font-extrabold leading-tight text-[var(--ink)]">
                        {n.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-muted)]">
                        {n.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer — opens the full notifications page */}
        {notifications.length > 0 && (
          <Link
            to="/notifications"
            onClick={onClose}
            className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 border-t border-[var(--gold-500)]/25 bg-[var(--paper)] py-2.5 text-center text-[11px] font-bold text-[var(--maroon-800)] transition-colors hover:bg-[var(--gold-100)]/40"
          >
            View All
            <ChevronRight size={13} strokeWidth={2.4} />
          </Link>
        )}
      </div>
    </>
  );
}