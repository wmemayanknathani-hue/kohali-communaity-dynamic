import { useState, useRef } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  FormEvent,
} from "react";
import type { ChangeEvent } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import {
  Send,
  ChevronLeft,
  AlertCircle,
  MessageCircleQuestion,
  Paperclip,
  Video,
  Check,
  User,
  Smartphone,
  AtSign,
  MapPin,
  Navigation,
  Landmark,
  Tag,
  Type,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceType = "report" | "guidance";

const CATEGORIES: string[] = [
  "Financial Assistance",
  "Education",
  "Health & Medical",
  "Employment",
  "Legal / Documentation",
  "Social / Family",
  "Other",
];

interface ContactMethod {
  id: string;
  label: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  { id: "call", label: "Phone Call" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
];

/* -------------------------------------------------------------------------- */
/* Shared field styling                                                       */
/* -------------------------------------------------------------------------- */

const FIELD_WRAP =
  "kc-field flex items-center gap-2.5 rounded-2xl border-[1.5px] border-[var(--gold-500)] bg-[var(--cream)]/50 px-3.5 py-2.5 transition-all duration-200";

const FIELD_ICON =
  "kc-field-icon h-4 w-4 shrink-0 text-[var(--ink)]/35 transition-colors duration-200";

/* -------------------------------------------------------------------------- */
/* Shared field components                                                    */
/* -------------------------------------------------------------------------- */

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-3.5">
      <h4 className="text-[15px] font-bold text-[var(--maroon-900)]">
        {title}
      </h4>
    </div>
  );
}

interface FieldLabelProps {
  label: string;
  required?: boolean;
}

function FieldLabel({ label, required }: FieldLabelProps) {
  return (
    <label className="mb-1.5 flex items-center justify-between">
      <span className="text-[11.5px] font-bold text-[var(--maroon-700)]">
        {label}
        {required && (
          <span className="text-[var(--gold-600)]"> *</span>
        )}
      </span>
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon;
};

function TextInput({ icon: Icon, ...props }: TextInputProps) {
  return (
    <div className={FIELD_WRAP}>
      <Icon className={FIELD_ICON} strokeWidth={2.25} />

      <input
        {...props}
        className="w-full bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
      />
    </div>
  );
}

type TextAreaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    icon: LucideIcon;
  };

function TextArea({ icon: Icon, ...props }: TextAreaProps) {
  return (
    <div className={`${FIELD_WRAP} items-start`}>
      <Icon
        className={`${FIELD_ICON} mt-[3px]`}
        strokeWidth={2.25}
      />

      <textarea
        {...props}
        rows={3}
        className="w-full resize-none bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
      />
    </div>
  );
}

type SelectFieldProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    icon: LucideIcon;
  };

function SelectField({
  icon: Icon,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <div className={FIELD_WRAP}>
      <Icon
        className={FIELD_ICON}
        strokeWidth={2.25}
      />

      <select
        {...props}
        className="w-full bg-transparent text-[14px] text-[var(--ink)] outline-none"
      >
        {children}
      </select>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animated service toggle                                                    */
/* -------------------------------------------------------------------------- */

interface SegmentedToggleProps {
  active: ServiceType;
  onChange: (service: ServiceType) => void;
}

function SegmentedToggle({
  active,
  onChange,
}: SegmentedToggleProps) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl bg-[var(--gold-100)] p-1">
      <div
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] shadow-[var(--shadow-maroon)] transition-transform duration-300 ease-out"
        style={{
          transform:
            active === "report"
              ? "translateX(2px)"
              : "translateX(calc(100% + 6px))",
        }}
      />

      <button
        type="button"
        onClick={() => onChange("report")}
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold transition-colors ${
          active === "report"
            ? "text-[var(--gold-100)]"
            : "text-[var(--maroon-800)]"
        }`}
      >
        <AlertCircle className="h-4 w-4" />
        Report an Issue
      </button>

      <button
        type="button"
        onClick={() => onChange("guidance")}
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold transition-colors ${
          active === "guidance"
            ? "text-[var(--gold-100)]"
            : "text-[var(--maroon-800)]"
        }`}
      >
        <MessageCircleQuestion className="h-4 w-4" />
        Guidance
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Support() {
  const navigate = useNavigate();

  const [activeService, setActiveService] =
    useState<ServiceType>("report");

  const [submitted, setSubmitted] =
    useState<boolean>(false);

  const [fileName, setFileName] =
    useState<string>("");

  const [videoName, setVideoName] =
    useState<string>("");

  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (name: string) => void
  ) => {
    setter(e.target.files?.[0]?.name ?? "");
  };

  return (
    <div className="min-h-screen w-full bg-[var(--cream)] pb-10 text-[var(--ink)]">

      <div className="mx-auto max-w-md px-4 pt-5 sm:max-w-lg md:max-w-3xl md:px-8 lg:max-w-4xl">

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-auto flex w-full items-center justify-between gap-3">
          <SectionHeader
            eyebrow="Kohli Samaj Nagpur"
            title="Support"
          />

          <button
            type="button"
            onClick={() => navigate("/home")}
            aria-label="Go back"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 active:scale-95 md:h-10 md:w-10"
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mt-0 overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_38%,var(--maroon-700)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-maroon)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-7 lg:px-10">

          {/* Cross hatch */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]" />

          {/* Shine */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              animation:
                "support-shine 3.5s ease-in-out 0.3s 1",
            }}
          >
            <div className="h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--maroon-950)]">
              Samaj Support Desk
            </span>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              We're here to help
            </h2>

            <p className="mt-1 text-sm text-[var(--gold-100)]">
              Support and guidance for Samaj members
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Form section                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div
          ref={formRef}
          className="mx-auto"
        >
          {submitted ? (
            /* ------------------------------------------------------------ */
            /* Success state                                                 */
            /* ------------------------------------------------------------ */

            <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] px-6 py-12 text-center shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl md:px-10 md:py-14">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-950)] shadow-inner">
                <Check
                  className="h-8 w-8"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[var(--maroon-900)]">
                Thank you — we've received it
              </h3>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
                A member of the Samaj team will contact you shortly via your preferred method.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-2xl bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] px-7 py-3 text-[13px] font-extrabold text-[var(--paper)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
              >
                Submit another request
              </button>
            </div>
          ) : (
            /* ------------------------------------------------------------ */
            /* Form                                                           */
            /* ------------------------------------------------------------ */

            <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">

              {/* Service toggle */}
              <div className="px-4 pb-2 pt-4 md:px-5 md:pt-5">
                <SegmentedToggle
                  active={activeService}
                  onChange={setActiveService}
                />
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-4 pb-5 pt-4 md:px-5 md:pb-6 md:pt-5"
              >

                {/* -------------------------------------------------------- */}
                {/* Your Details                                               */}
                {/* -------------------------------------------------------- */}

                <section className="mb-5">
                  <SectionHeading title="Your Details" />

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">

                    {/* Name */}
                    <div>
                      <FieldLabel
                        label="Name"
                        required
                      />

                      <TextInput
                        icon={User}
                        type="text"
                        placeholder="Full name"
                        required
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <FieldLabel
                        label="Mobile Number"
                        required
                      />

                      <TextInput
                        icon={Smartphone}
                        type="tel"
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <FieldLabel label="Email" />

                      <TextInput
                        icon={AtSign}
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <FieldLabel label="Preferred Contact Method" />

                      <div className="flex flex-wrap gap-2">
                        {CONTACT_METHODS.map((m) => (
                          <label
                            key={m.id}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border-[1.5px] border-[var(--gold-500)] bg-[var(--cream)]/50 px-3 py-2 text-[12px] transition-all duration-200 hover:border-[var(--maroon-700)] has-[:checked]:border-[var(--maroon-700)] has-[:checked]:bg-[var(--gold-100)]"
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={m.id}
                              className="accent-[var(--maroon-800)]"
                            />

                            <span className="font-medium text-[var(--ink)]">
                              {m.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* -------------------------------------------------------- */}
                {/* Location — report only                                    */}
                {/* -------------------------------------------------------- */}

                {activeService === "report" && (
                  <section className="mb-5">
                    <SectionHeading title="Location" />

                    {/*
                      Was `sm:grid-cols-3` — jumping straight to three
                      columns at 640px squeezed these in the 640–767px
                      range (large phones in landscape, small tablets).
                      Now it eases into two columns at `sm` and only goes
                      to three right at `md` (768px, iPad portrait), where
                      there's comfortably enough width for it.
                    */}
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">

                      {/* Village */}
                      <div>
                        <FieldLabel label="Village" />

                        <TextInput
                          icon={MapPin}
                          type="text"
                          placeholder="Village"
                        />
                      </div>

                      {/* Taluka */}
                      <div>
                        <FieldLabel label="Taluka" />

                        <TextInput
                          icon={Navigation}
                          type="text"
                          placeholder="Taluka"
                        />
                      </div>

                      {/* District */}
                      <div>
                        <FieldLabel label="District" />

                        <TextInput
                          icon={Landmark}
                          type="text"
                          placeholder="District"
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* -------------------------------------------------------- */}
                {/* Problem details                                           */}
                {/* -------------------------------------------------------- */}

                <section className="mb-5">
                  <SectionHeading
                    title={
                      activeService === "report"
                        ? "Problem Details"
                        : "Your Message"
                    }
                  />

                  <div className="space-y-3.5">

                    {/* Category */}
                    {activeService === "report" && (
                      <div>
                        <FieldLabel
                          label="Problem Category"
                          required
                        />

                        <SelectField
                          icon={Tag}
                          required
                          defaultValue=""
                        >
                          <option
                            value=""
                            disabled
                          >
                            Select a category
                          </option>

                          {CATEGORIES.map((c) => (
                            <option
                              key={c}
                              value={c}
                            >
                              {c}
                            </option>
                          ))}
                        </SelectField>
                      </div>
                    )}

                    {/* Problem Title / Subject */}
                    <div>
                      <FieldLabel
                        label={
                          activeService === "report"
                            ? "Problem Title"
                            : "Subject"
                        }
                        required
                      />

                      <TextInput
                        icon={Type}
                        type="text"
                        placeholder="Short summary"
                        required
                      />
                    </div>

                    {/* Description / Message */}
                    <div>
                      <FieldLabel
                        label={
                          activeService === "report"
                            ? "Problem Description"
                            : "Message"
                        }
                        required
                      />

                      <TextArea
                        icon={MessageSquare}
                        placeholder="Describe in detail..."
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* -------------------------------------------------------- */}
                {/* Attachments — report only                                 */}
                {/* -------------------------------------------------------- */}

                {activeService === "report" && (
                  <section className="mb-5">
                    <SectionHeading title="Attachments" />

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">

                      {/* Photo — padding/icon bumped slightly at md for a
                          more comfortable tablet touch target */}
                      <label className="kc-file flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[var(--gold-500)] bg-[var(--cream)]/50 px-4 py-4 text-center transition-all duration-200 hover:border-[var(--maroon-700)] md:px-5 md:py-5">

                        <Paperclip
                          className="h-5 w-5 shrink-0 text-[var(--maroon-700)]/65 md:h-6 md:w-6"
                          strokeWidth={2.25}
                        />

                        <span className="truncate text-[12px] font-bold text-[var(--maroon-700)] md:text-[13px]">
                          {fileName || "Upload photo"}
                        </span>

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              setFileName
                            )
                          }
                        />
                      </label>

                      {/* Video */}
                      <label className="kc-file flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[var(--gold-500)] bg-[var(--cream)]/50 px-4 py-4 text-center transition-all duration-200 hover:border-[var(--maroon-700)] md:px-5 md:py-5">

                        <Video
                          className="h-5 w-5 shrink-0 text-[var(--maroon-700)]/65 md:h-6 md:w-6"
                          strokeWidth={2.25}
                        />

                        <span className="truncate text-[12px] font-bold text-[var(--maroon-700)] md:text-[13px]">
                          {videoName || "Upload video (optional)"}
                        </span>

                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              setVideoName
                            )
                          }
                        />
                      </label>
                    </div>
                  </section>
                )}

                {/* -------------------------------------------------------- */}
                {/* Submit                                                     */}
                {/* -------------------------------------------------------- */}

                <div className="relative mt-4 border-t border-[var(--gold-300)]/60 pt-4">

                  <button
                    type="submit"
                    className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-[14px] font-extrabold text-[var(--paper)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-10"
                  >
                     <Send
                        className="h-4 w-4"
                        strokeWidth={2.5}
                      />
                    {activeService === "report"
                      ? "Submit Report"
                      : "Submit Message"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}