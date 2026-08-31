import React, { useState } from "react";
import type { FormEvent } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Paperclip,
  Send,
  Navigation,
  CheckCircle2,
  User,
  AtSign,
  Smartphone,
  Type,
  MessageSquare, ChevronLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";

const STYLES = `
  @keyframes kc-shine {
    0% {
      transform: translateX(-120%) rotate(8deg);
    }

    100% {
      transform: translateX(220%) rotate(8deg);
    }
  }

  @keyframes kc-pop {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .kc-shine::after {
    content: "";
    position: absolute;
    top: -40%;
    left: 0;
    width: 30%;
    height: 180%;
    background: linear-gradient(
      100deg,
      transparent,
      rgba(255,255,255,0.28),
      transparent
    );
    animation: kc-shine 3.2s ease-in-out infinite;
    animation-delay: 1s;
  }

  .kc-pop {
    animation: kc-pop 0.45s cubic-bezier(.2,.7,.3,1) both;
  }

  .kc-field:focus-within .kc-field-icon {
    color: var(--maroon-700);
  }

  .kc-field:focus-within {
    border-color: var(--maroon-700);
    box-shadow: 0 0 0 3px rgba(122,31,43,0.12);
  }
`;



interface InfoRowProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  action?: string;
  last?: boolean;
}

function InfoRow({
  Icon,
  label,
  value,
  action,
  last = false,
}: InfoRowProps) {
  return (
    <div
      className={
        "group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-[var(--gold-100)]/40 active:scale-[0.99] md:gap-4 md:px-5 md:py-4" +
        (last ? "" : " border-b border-[var(--gold-300)]/50")
      }
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm"
      >
        <Icon
          className="h-[18px] w-[18px] text-[var(--maroon-900)]"
          strokeWidth={2.25}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="block font-display text-[14px] font-bold text-[var(--ink)]">
          {label}
        </h1>

        <p className="block font-mr text-[12px] text-[var(--text-muted)]">
          {value}
        </p>
      </div>

      {action && (
        <button
          type="button"
          className="shrink-0 rounded-full border border-[var(--maroon-600)]/40 px-3 py-1.5 text-[11px] font-bold text-[var(--maroon-700)] transition active:scale-95"
        >
          {action}
        </button>
      )}
    </div>
  );
}

interface FieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  textarea?: boolean;
  required?: boolean;
  colSpan?: boolean;
}

function Field({
  Icon,
  label,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  colSpan = false,
}: FieldProps) {
  const wrap =
    "kc-field flex items-start gap-2.5 rounded-2xl border border-[var(--gold-500)] bg-[var(--cream)]/50 px-3.5 py-2.5 transition";

  return (
    <label className={colSpan ? "block sm:col-span-2" : "block"}>
      <span className="mb-1.5 block text-[11.5px] font-bold text-[var(--maroon-700)]">
        {label}

        {required && (
          <span className="text-[var(--gold-600)]"> *</span>
        )}
      </span>

      <div className={wrap}>
        <Icon
          className="kc-field-icon mt-[3px] h-4 w-4 shrink-0 text-[var(--ink)]/35 transition"
        />

        {textarea ? (
          <textarea
            rows={4}
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

interface SocialItem {
  Icon: IconType;
  label: string;
}

export default function Contact() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const socials: SocialItem[] = [
    {
      Icon: FaFacebookF,
      label: "Facebook",
    },
    {
      Icon: FaInstagram,
      label: "Instagram",
    },
    {
      Icon: FaYoutube,
      label: "YouTube",
    },
    {
      Icon: FaWhatsapp,
      label: "WhatsApp",
    },
  ];

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="min-h-screen w-full pb-10"
      >
        <div className="mx-auto max-w-md px-4 pt-5 sm:max-w-lg md:max-w-3xl md:px-8 lg:max-w-4xl">
          {/* Header */}
            <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4 lg:max-w-4xl xl:max-w-5xl">
              <SectionHeader eyebrow="Kohli Samaj Nagpur" title="Contact Us" />
              <button
                onClick={() => navigate("/home")}
                className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]"
              >
                <ChevronLeft className="h-4 w-4 text-white md:h-[18px] md:w-[18px]" strokeWidth={2.2} />
              </button>
            </div>
    
            {/* HERO BANNER — same language as Home's hero card */}
            <div className="relative mb-6 mt-2 overflow-hidden rounded-3xl bg-[linear-gradient(155deg,var(--maroon-800),var(--maroon-950))] px-6 py-6 shadow-[var(--shadow-maroon)] sm:px-8">
              {/* diagonal cross-hatch texture */}
                <div
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
                />
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{ animation: "support-shine 3.5s ease-in-out 0.3s 1" }}
              >
                <div className="h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
              </div>
              <span className="inline-flex items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--maroon-950)]">
                संपर्क करा
              </span>
              <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">Contact Us</h2>
              <p className="mt-1 text-sm text-[var(--gold-100)]">
                Reach the central office directly, or send us a message and we'll get back to you.
              </p>
            </div>
          

          {/* Unified info panel */}
          <SectionHeader eyebrow="Contact Details" title="Get In Touch" />
          <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
         
            <InfoRow
              Icon={MapPin}
              label="Central Office"
              value="Kohali Samaj Bhavan, Nagpur, Maharashtra"
            />

            <InfoRow
              Icon={Mail}
              label="Email"
              value="info@kohalisamaj.org"
            />

            <InfoRow
              Icon={Phone}
              label="Phone"
              value="+91 98765 43210"
            />

            <InfoRow
              Icon={Clock}
              label="Office Hours"
              value="Mon – Sat, 10:00 AM – 6:00 PM"
              last
            />

            {/* Social row */}
            <div className="group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-[var(--gold-100)]/40 active:scale-[0.99] md:gap-4 md:px-5 md:py-4 border-b border-[var(--gold-300)]/50">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--maroon-600)]/60">
                Follow
              </span>

              <div className="flex flex-1 flex-wrap justify-end gap-2">
                {socials.map(({ Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full text-[var(--maroon-900)] shadow-sm transition active:scale-90"
                    style={{
                      background:
                        "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="kc-pop mt-5 overflow-hidden rounded-3xl shadow-[0_4px_16px_rgba(58,13,20,0.1)] mb-5">
            <div
              className="relative h-40 sm:h-48 md:h-64 lg:h-72"
              style={{
                background:
                  "repeating-linear-gradient(135deg, var(--gold-100), var(--gold-100) 10px, var(--paper) 10px, var(--paper) 20px)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.217284193431!2d79.0817205!3d21.103901799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf2c8f241ec9%3A0xc0e3514369ce5f55!2sKohali%20Samajbhawan%20Nagpur!5e0!3m2!1sen!2sin!4v1787742601709!5m2!1sen!2sin"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                title="Kohali Samajbhawan Nagpur location"
              />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 py-3 text-[13px] font-extrabold text-[var(--paper)] transition active:brightness-95 relative z-40"
              style={{
                background:
                  "linear-gradient(135deg, var(--maroon-700), var(--maroon-900))",
              }}
            >
              <Navigation className="h-4 w-4" />
              Open in Google Maps
            </button>
          </div>

          {/* Contact form */}
           <SectionHeader eyebrow="Send a Message" title="We'd love to hear from you"/>
          <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
            <div className="px-4 py-3.5 md:px-5 md:py-4 ">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
              >
                <Field
                  Icon={User}
                  label="Name"
                  placeholder="Your full name"
                  required
                  colSpan
                />

                <Field
                  Icon={Smartphone}
                  label="Mobile Number"
                  placeholder="+91 00000 00000"
                  type="tel"
                  required
                />

                <Field
                  Icon={AtSign}
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  required
                />

                <Field
                  Icon={Type}
                  label="Subject"
                  placeholder="What is this about?"
                  required
                  colSpan
                />

                <Field
                  Icon={MessageSquare}
                  label="Message"
                  placeholder="Write your message here..."
                  textarea
                  required
                  colSpan
                />

                {/* Attachment */}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[11.5px] font-bold text-[var(--maroon-700)]">
                    Attachment
                  </span>

                  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[var(--gold-500)] bg-[var(--cream)]/60 px-3.5 py-2.5">
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(160deg, var(--gold-300), var(--gold-500))",
                      }}
                    >
                      <Paperclip className="h-4 w-4 text-[var(--maroon-900)]" />
                    </div>

                    <div className="min-w-0 flex-1 truncate text-[12px] text-[var(--ink)]/60">
                      {fileName || "PDF, JPG or PNG, up to 5 MB"}
                    </div>

                    <label className="cursor-pointer whitespace-nowrap rounded-full border border-[var(--maroon-700)] px-3 py-1.5 text-[11px] font-bold text-[var(--maroon-700)] transition active:scale-95">
                      Browse

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          setFileName(
                            e.target.files?.[0]?.name || ""
                          )
                        }
                      />
                    </label>
                  </div>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="kc-shine relative mt-1 flex items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-[14px] font-extrabold text-[var(--paper)] shadow-lg transition active:scale-[0.98] sm:col-span-2"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--maroon-700), var(--maroon-900))",
                  }}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}