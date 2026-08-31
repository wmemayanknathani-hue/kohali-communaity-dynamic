import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Phone,
  Mail,
  MessageCircle,
  User,
  ListChecks,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MEMBERS } from "./ExecutiveCommittee";
import SectionHeader from "../SectionHeader";

/* ---------------------------------------------------------------------- */
/* Types                                                                  */
/* ---------------------------------------------------------------------- */

interface CommitteeMemberWithResponsibilities {
  id: string | number;
  name: string;
  nameEn?: string;
  position: string;
  positionEn: string;
  photoUrl?: string;
  shortIntro: string;
  contactPublic?: boolean;
  phone?: string;
  email?: string;
  responsibilities?: string[];
}

/* ---------------------------------------------------------------------- */
/* Shared scroll-reveal (same pattern as the book & committee-list pages) */
/* ---------------------------------------------------------------------- */

function useRevealVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Section title          */
/* ---------------------------------------------------------------------- */

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5 md:gap-3">
      <div className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--maroon-900)] to-[var(--maroon-700)] text-[var(--gold-300)] shadow-[0_3px_10px_rgba(44,5,13,0.25)]">
        {icon}
      </div>
      <div>
        <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[var(--maroon-900)]">
          {title}
        </h2>
        <div className="mt-1 h-0.5 w-9 bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-300)]" />
      </div>
    </div>
  );
}

function initials(displayName: string): string {
  return (
    displayName
      .replace(/^(Shri\.|Smt\.|Kum\.)\s*/, "")
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("") || "CM"
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function CommitteeDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const member = MEMBERS.find(
    (m) => String(m.id) === String(id)
  ) as CommitteeMemberWithResponsibilities | undefined;

  if (!member) {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <button
            type="button"
            onClick={() => navigate("/committee")}
            className="flex items-center gap-1.5 rounded-full border border-[var(--gold-300)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--maroon-900)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mt-10 text-center">
            <h1 className="text-xl font-bold text-[var(--maroon-900)]">
              Committee Member Not Found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const displayName = member.nameEn || member.name;

  const hasContact =
    Boolean(member.contactPublic) && Boolean(member.phone || member.email);

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <div className="mx-auto max-w-md px-4 py-6 pb-16 md:max-w-3xl md:px-8 lg:max-w-5xl">
        {/* ---- Header ---- */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl">
          <SectionHeader eyebrow="Committee Member" title="Personal Details" />

          <button onClick={() => navigate("/committee")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10 lg:items-start">
          {/* =================================================
              LEFT: portrait + identity
          ================================================= */}
          <Reveal>
            <div className="flex flex-col items-center pb-4 lg:items-start lg:pb-0">
              <div className="relative h-52 w-44 rounded-t-full rounded-b-lg lg:h-64 lg:w-52">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={displayName}
                    className="h-full w-full rounded-t-full rounded-b-lg border-[3px] border-[var(--gold-400)] object-cover shadow-lg"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center rounded-t-full rounded-b-lg border-[3px] border-[var(--gold-400)] bg-gradient-to-b from-[var(--maroon-800)] to-[var(--maroon-950)] text-4xl font-bold text-[var(--gold-100)] shadow-lg md:text-5xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {initials(displayName)}
                  </div>
                )}
              </div>

              <div className="mt-3 lg:ml-6">
                <span
                  className="inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--maroon-950)] shadow-sm"
                  style={{ backgroundColor: "var(--gold-500)" }}
                >
                  {member.positionEn}
                </span>
              </div>

              <h1
                className="mt-2 text-center text-3xl font-extrabold leading-tight text-[var(--maroon-950)] lg:text-left lg:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {displayName}
              </h1>

              {/* <p
                className="mt-1 text-center text-xl font-semibold text-[var(--maroon-800)] lg:text-left"
                style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}
              >
                {member.position}
              </p> */}

              <div
                className="mx-auto mt-2 h-0.5 w-16 bg-[var(--gold-500)] lg:mx-0"
                aria-hidden="true"
              />

              {/* Quick contact actions — inline on tablet+, under the identity block */}
              {hasContact && member.phone && (
                <div className="mt-6 hidden w-full max-w-[220px] grid-cols-2 gap-3 lg:grid">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--gold-600)] bg-gradient-to-b from-[var(--gold-400)] to-[var(--gold-600)] px-3 py-2.5 text-sm font-bold text-[var(--maroon-950)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${member.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--gold-300)] bg-white px-3 py-2.5 text-sm font-bold text-[var(--maroon-900)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          {/* =================================================
              RIGHT: biography / responsibilities / contact
          ================================================= */}
          <div className="mt-4 space-y-4 lg:mt-0">
            <Reveal>
              <div className="rounded-2xl border border-[var(--gold-300)] bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <SectionTitle title="Biography" icon={<User className="h-4 w-4" />} />
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {member.shortIntro}
                </p>
              </div>
            </Reveal>

            {member.responsibilities && member.responsibilities.length > 0 && (
              <Reveal delay={80}>
                <div className="rounded-2xl border border-[var(--gold-300)] bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <SectionTitle title="Responsibilities" icon={<ListChecks className="h-4 w-4" />} />
                  <ul className="space-y-2.5">
                    {member.responsibilities.map((item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex items-start gap-2.5 text-sm text-[var(--ink)]"
                      >
                        <span className="mt-1 text-[var(--gold-600)]">◆</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Contact — always renders, shows a pending state if private        */}
            {/* ---------------------------------------------------------------- */}

            <Reveal delay={140}>
              <div className="rounded-2xl border border-[var(--gold-300)] bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <SectionTitle title="Contact Information" icon={<Phone className="h-4 w-4" />} />

                {hasContact ? (
                  <>
                    <div className="space-y-3">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center justify-between rounded-xl border border-[var(--gold-300)] bg-[var(--cream)] px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-2.5 text-sm font-semibold text-[var(--maroon-950)]">
                            <Phone className="h-4 w-4 text-[var(--maroon-800)]" />
                            {member.phone}
                          </span>
                          <span className="text-[var(--gold-600)]">→</span>
                        </a>
                      )}

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-between rounded-xl border border-[var(--gold-300)] bg-[var(--cream)] px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-2.5 break-all text-sm font-semibold text-[var(--maroon-950)]">
                            <Mail className="h-4 w-4 shrink-0 text-[var(--maroon-800)]" />
                            {member.email}
                          </span>
                          <span className="shrink-0 text-[var(--gold-600)]">→</span>
                        </a>
                      )}
                    </div>

                    {member.phone && (
                      <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--gold-600)] bg-gradient-to-b from-[var(--gold-400)] to-[var(--gold-600)] px-4 py-2.5 text-sm font-bold text-[var(--maroon-950)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                        >
                          <Phone className="h-4 w-4" />
                          Call
                        </a>

                        <a
                          href={`https://wa.me/${member.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--gold-300)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--maroon-900)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-[var(--gold-300)] bg-[var(--cream)] px-4 py-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gold-100)] text-[var(--maroon-700)]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <p className="text-sm text-[var(--text-muted)]">
                      Contact information pending
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}