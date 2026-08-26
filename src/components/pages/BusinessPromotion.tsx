import React, { useEffect, useRef, useState } from "react";
import {
  Megaphone,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Store,
  Tag,
  FileText,
  Navigation,
  Smartphone,
  MessageCircle,
  Globe,
  Link2,
  Image as ImageIcon,
  Video,
  Layers,
  Send,
  CheckCircle2,
  ShieldCheck,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STYLES = `
  @keyframes bp-shine {
    0% {
      transform: translateX(-120%) rotate(8deg);
    }

    100% {
      transform: translateX(220%) rotate(8deg);
    }
  }

  @keyframes bp-pop {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bp-check-pop {
    0% { opacity: 0; transform: scale(0.5); }
    60% { opacity: 1; transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  @keyframes bp-orb-pulse {
    0%, 100% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(1.12); opacity: 0.3; }
  }

  .bp-shine::after {
    content: "";
    position: absolute;
    top: -40%;
    left: 0;
    width: 28%;
    height: 180%;
    background: linear-gradient(
      100deg,
      transparent,
      rgba(255,255,255,0.28),
      transparent
    );
    animation: bp-shine 3.4s ease-in-out infinite;
    animation-delay: 1s;
  }

  .bp-pop {
    animation: bp-pop 0.45s cubic-bezier(.2,.7,.3,1) both;
  }

  .bp-check-pop {
    animation: bp-check-pop 0.35s cubic-bezier(.34,1.56,.64,1) both;
  }

  .bp-orb {
    animation: bp-orb-pulse 3.5s ease-in-out infinite;
  }

  .bp-field:focus-within {
    border-color: var(--maroon-600);
    box-shadow: 0 0 0 3px rgba(122,31,43,0.12);
  }

  .bp-field:focus-within .bp-field-icon {
    color: var(--maroon-700);
  }

  @media (prefers-reduced-motion: reduce) {
    .bp-shine::after, .bp-pop, .bp-check-pop, .bp-orb { animation: none !important; }
  }
`;

/* ---------------------------------------------------------------------- */
/* Scroll reveal — same lightweight pattern used across the other pages   */
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Types                                                                  */
/* ---------------------------------------------------------------------- */

interface BusinessPromotionCTAProps {
  onPress: () => void;
}

interface EyebrowProps {
  children: React.ReactNode;
}

interface InfoRowProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  last?: boolean;
}

interface FieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  textarea?: boolean;
  required?: boolean;
  colSpan?: boolean;
  action?: React.ReactNode;
}

interface SectionCardProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

interface AdType {
  key: string;
  label: string;
  Icon: LucideIcon;
}

/* ---------------------------------------------------------------------- */
/* 1. Home CTA card                                                       */
/* ---------------------------------------------------------------------- */

export function BusinessPromotionCTA({
  onPress,
}: BusinessPromotionCTAProps) {
  return (
    <>
      <style>{STYLES}</style>

      <button
        type="button"
        onClick={onPress}
        className="bp-shine group relative w-full overflow-hidden rounded-3xl p-5 text-left shadow-[0_8px_22px_rgba(58,13,20,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(58,13,20,0.35)] active:scale-[0.99]"
        style={{
          background:
            "linear-gradient(135deg, var(--maroon-800), var(--maroon-900))",
        }}
      >
        <div
          className="bp-orb pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full"
          style={{
            background: "var(--gold-500)",
          }}
        />

        <div className="flex items-center gap-4">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background:
                "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
            }}
          >
            <Megaphone
              className="h-6 w-6 text-[var(--maroon-900)]"
              strokeWidth={2.25}
            />
          </div>

          <div className="min-w-0 flex-1">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-widest text-[var(--maroon-900)]"
              style={{
                background:
                  "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
              }}
            >
              Business Promotion
            </span>

            <p className="mt-1.5 text-[15px] font-extrabold leading-tight text-[var(--paper)]">
              आपल्या व्यवसायाची जाहिरात करा
            </p>

            <p className="mt-0.5 text-[12px] text-[var(--paper)]/70">
              Get your business featured to the whole community
            </p>
          </div>

          <ArrowRight
            className="h-5 w-5 shrink-0 text-[var(--paper)]/70 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </div>
      </button>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Shared components                                                      */
/* ---------------------------------------------------------------------- */

function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)]">
      {children}
    </p>
  );
}

function InfoRow({
  Icon,
  label,
  value,
  last = false,
}: InfoRowProps) {
  return (
    <div
      className={
        "flex items-center gap-3.5 py-3.5 transition-colors duration-200" +
        (last ? "" : " border-b border-[var(--maroon-50)]")
      }
    >
      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-sm"
        style={{
          background:
            "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
        }}
      >
        <Icon
          className="h-[18px] w-[18px] text-[var(--maroon-900)]"
          strokeWidth={2.25}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--maroon-600)]/60">
          {label}
        </p>

        <p className="truncate text-[14.5px] font-semibold text-[var(--ink)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function Field({
  Icon,
  label,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  colSpan = false,
  action,
}: FieldProps) {
  return (
    <label className={colSpan ? "block sm:col-span-2 lg:col-span-3" : "block"}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11.5px] font-bold text-[var(--maroon-700)]">
          {label}

          {required && (
            <span className="text-[var(--gold-600)]"> *</span>
          )}
        </span>

        {action}
      </div>

      <div className="bp-field flex items-start gap-2.5 rounded-2xl border border-[var(--maroon-100)] bg-[var(--cream)]/50 px-3.5 py-2.5 transition-all duration-200">
        <Icon className="bp-field-icon mt-[3px] h-4 w-4 shrink-0 text-[var(--ink)]/35 transition-colors duration-200" />

        {textarea ? (
          <textarea
            rows={3}
            placeholder={placeholder}
            required={required}
            className="w-full resize-none bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            required={required}
            className="w-full bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
          />
        )}
      </div>
    </label>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: SectionCardProps) {
  return (
    <div className="mt-5 rounded-3xl bg-[var(--paper)] p-5 shadow-[0_4px_16px_rgba(58,13,20,0.1)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(58,13,20,0.14)] md:p-6">
      <Eyebrow>{eyebrow}</Eyebrow>

      <h2 className="mb-4 text-[16px] font-extrabold text-[var(--maroon-800)] md:text-[18px]">
        {title}
      </h2>

      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Advertisement types                                                    */
/* ---------------------------------------------------------------------- */

const AD_TYPES: AdType[] = [
  {
    key: "poster",
    label: "Poster",
    Icon: ImageIcon,
  },
  {
    key: "video",
    label: "Video",
    Icon: Video,
  },
  {
    key: "both",
    label: "Poster + Video",
    Icon: Layers,
  },
];

/* ---------------------------------------------------------------------- */
/* Full application form page                                             */
/* ---------------------------------------------------------------------- */

export default function BusinessPromotion() {
  const [adType, setAdType] = useState<string>("poster");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!agreed) {
      return;
    }

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="min-h-screen w-full pb-10"
        style={{
          background: "var(--cream)",
          color: "var(--ink)",
        }}
      >
        <div className="mx-auto max-w-md px-4 pt-5 sm:max-w-lg md:max-w-3xl md:px-8 lg:max-w-4xl">

          {/* Hero */}
          <div
            className="bp-shine bp-pop relative overflow-hidden rounded-3xl px-5 py-6 shadow-[0_8px_24px_rgba(58,13,20,0.28)] md:px-8 md:py-8"
            style={{
              background:
                "linear-gradient(135deg, var(--maroon-800), var(--maroon-900))",
            }}
          >
            <div
              className="bp-orb pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full"
              style={{
                background: "var(--gold-500)",
              }}
            />

            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--maroon-900)]"
              style={{
                background:
                  "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
              }}
            >
              व्यवसाय प्रचार
            </span>

            <h1 className="mt-3 text-2xl font-extrabold text-[var(--paper)] md:text-3xl">
              Business Promotion
            </h1>

            <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-[var(--paper)]/75 md:max-w-md md:text-sm">
              आपल्या व्यवसायाची जाहिरात करा — tell us about your business and
              we'll help promote it to the community.
            </p>
          </div>

          {/* Applicant information */}
          <Reveal>
            <div className="mt-5 rounded-3xl bg-[var(--paper)] px-5 py-1 shadow-[0_4px_16px_rgba(58,13,20,0.1)] md:px-6">
              <div className="flex items-center justify-between pt-3">
                <Eyebrow>Applicant Information</Eyebrow>

                <span className="mb-1 text-[10.5px] font-semibold text-[var(--ink)]/40">
                  From your Survey form
                </span>
              </div>

              <InfoRow
                Icon={User}
                label="Name"
                value="Rajesh Kohali"
              />

              <InfoRow
                Icon={Phone}
                label="Phone"
                value="+91 98765 43210"
              />

              <InfoRow
                Icon={MapPin}
                label="Address"
                value="Nagpur, Maharashtra"
                last
              />
            </div>
          </Reveal>

          {/* Business information */}
          <Reveal delay={80}>
            <SectionCard
              eyebrow="About The Business"
              title="Business Information"
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                <Field
                  Icon={Store}
                  label="Business Name"
                  placeholder="e.g. Kohali Textiles"
                  required
                  colSpan
                />

                <Field
                  Icon={Tag}
                  label="Business Category"
                  placeholder="e.g. Retail, Food, Services"
                  required
                />

                <Field
                  Icon={Smartphone}
                  label="Contact Number"
                  placeholder="+91 00000 00000"
                  type="tel"
                  required
                />

                <Field
                  Icon={MessageCircle}
                  label="WhatsApp Number"
                  placeholder="+91 00000 00000"
                  type="tel"
                />

                <Field
                  Icon={FileText}
                  label="Business Description"
                  placeholder="What does your business offer?"
                  textarea
                  required
                  colSpan
                />

                <Field
                  Icon={MapPin}
                  label="Business Address"
                  placeholder="Shop / street / area, city"
                  textarea
                  required
                  colSpan
                />

                <Field
                  Icon={Navigation}
                  label="Business Location"
                  placeholder="Pin dropped on map"
                  action={
                    <button
                      type="button"
                      className="text-[10.5px] font-bold text-[var(--maroon-700)] underline underline-offset-2 transition-colors hover:text-[var(--maroon-900)]"
                    >
                      Pick on map
                    </button>
                  }
                />

                <Field
                  Icon={Globe}
                  label="Website"
                  placeholder="www.yourbusiness.com"
                  type="url"
                />

                <Field
                  Icon={Link2}
                  label="Social Media Links"
                  placeholder="Instagram / Facebook profile links"
                  colSpan
                />
              </div>
            </SectionCard>
          </Reveal>

          {/* Advertisement information */}
          <Reveal delay={140}>
            <SectionCard
              eyebrow="Promote It"
              title="Advertisement Information"
            >
              <div className="mb-4">
                <span className="mb-2 block text-[11.5px] font-bold text-[var(--maroon-700)]">
                  Advertisement Type{" "}
                  <span className="text-[var(--gold-600)]">*</span>
                </span>

                <div className="grid grid-cols-3 gap-2 md:max-w-md">
                  {AD_TYPES.map(
                    ({ key, label, Icon }: AdType) => {
                      const active = adType === key;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setAdType(key)}
                          className="relative flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                          style={
                            active
                              ? {
                                  background:
                                    "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
                                  borderColor: "var(--gold-500)",
                                  boxShadow: "0 6px 16px rgba(212,175,55,0.35)",
                                }
                              : {
                                  background: "var(--cream)",
                                  borderColor: "var(--maroon-100)",
                                }
                          }
                        >
                          {active && (
                            <span className="bp-check-pop absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--maroon-800)] text-[var(--gold-100)] shadow-sm">
                              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                          )}
                          <Icon
                            className="h-5 w-5 transition-transform duration-200"
                            strokeWidth={2.25}
                            style={{
                              color: active
                                ? "var(--maroon-900)"
                                : "var(--ink)",
                              opacity: active ? 1 : 0.55,
                              transform: active ? "scale(1.1)" : "scale(1)",
                            }}
                          />

                          <span
                            className="text-[11px] font-bold leading-tight"
                            style={{
                              color: active
                                ? "var(--maroon-900)"
                                : "var(--ink)",
                              opacity: active ? 1 : 0.6,
                            }}
                          >
                            {label}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
                <Field
                  Icon={Type}
                  label="Advertisement Title"
                  placeholder="A short catchy title"
                />

                <Field
                  Icon={FileText}
                  label="Advertisement Description"
                  placeholder="What should the ad say?"
                  textarea
                  colSpan
                />
              </div>
            </SectionCard>
          </Reveal>

          {/* Declaration + submit */}
          <Reveal delay={200}>
            <div className="relative mt-5 overflow-hidden rounded-3xl bg-[var(--paper)] shadow-[0_6px_20px_rgba(58,13,20,0.12)]">
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--gold-300), var(--gold-500), var(--maroon-700))",
                }}
              />

              <div className="p-5 md:p-6">
                <button
                  type="button"
                  onClick={() => setAgreed((current) => !current)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-[var(--maroon-100)] bg-[var(--cream)]/50 px-3.5 py-3 text-left transition-all duration-200 hover:border-[var(--maroon-300)] active:scale-[0.99]"
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all duration-200"
                    style={{
                      borderColor: agreed
                        ? "var(--maroon-700)"
                        : "var(--maroon-100)",
                      background: agreed
                        ? "var(--maroon-700)"
                        : "transparent",
                    }}
                  >
                    {agreed && (
                      <CheckCircle2
                        className="bp-check-pop h-3.5 w-3.5 text-[var(--paper)]"
                        strokeWidth={3}
                      />
                    )}
                  </span>

                  <span className="flex items-start gap-2 text-[13px] leading-snug text-[var(--ink)]/85">
                    <ShieldCheck className="mt-[2px] h-4 w-4 shrink-0 text-[var(--maroon-700)]/60" />

                    <span>
                      I agree to the{" "}
                      <span className="font-bold text-[var(--maroon-700)] underline underline-offset-2">
                        advertisement guidelines
                      </span>
                      .
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!agreed}
                  className="bp-shine relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-[14px] font-extrabold text-[var(--paper)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 md:w-auto md:px-10"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--maroon-700), var(--maroon-900))",
                  }}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="bp-check-pop h-4 w-4" />
                      Application Submitted
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}