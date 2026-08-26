import { useState, useRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, FormEvent } from "react";
import type { ChangeEvent } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle, MessageCircleQuestion, Paperclip, Video, Check } from "lucide-react";

type ServiceType = "report" | "guidance";

interface CategoryOption {
  en: string;
  mr: string;
}

interface ContactMethod {
  id: string;
  en: string;
  mr: string;
}

const CATEGORIES: CategoryOption[] = [
  { en: "Financial Assistance", mr: "आर्थिक मदत" },
  { en: "Education", mr: "शिक्षण" },
  { en: "Health & Medical", mr: "आरोग्य" },
  { en: "Employment", mr: "रोजगार" },
  { en: "Legal / Documentation", mr: "कायदेशीर / कागदपत्रे" },
  { en: "Social / Family", mr: "सामाजिक / कौटुंबिक" },
  { en: "Other", mr: "इतर" },
];

const CONTACT_METHODS: ContactMethod[] = [
  { id: "call", en: "Phone Call", mr: "फोन कॉल" },
  { id: "whatsapp", en: "WhatsApp", mr: "व्हॉट्सअॅप" },
  { id: "email", en: "Email", mr: "ईमेल" },
];

/* ---------- shared bits ---------- */

function SectionHeading({ en, mr }: { en: string; mr: string }) {
  return (
    <div className="mb-5">
      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold-700)]">
        {mr}
      </span>
      <h4 className="text-base font-bold text-[var(--maroon-900)]">{en}</h4>
    </div>
  );
}

interface FieldLabelProps {
  en: string;
  mr: string;
  required?: boolean;
}

function FieldLabel({ en, mr, required }: FieldLabelProps) {
  return (
    <label className="mb-1.5 block">
      <span className="text-sm font-semibold text-[var(--ink)]">
        {en} {required && <span className="text-[var(--maroon-700)]">*</span>}
      </span>
      <span className="ml-1.5 text-xs text-[var(--text-muted)]">{mr}</span>
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border-2 border-[var(--gold-300)] bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--maroon-800)] focus:bg-white focus:ring-4 focus:ring-[var(--gold-500)]/15"
    />
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextArea(props: TextAreaProps) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full rounded-xl border-2 border-[var(--gold-300)] bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--maroon-800)] focus:bg-white focus:ring-4 focus:ring-[var(--gold-500)]/15"
    />
  );
}

/* ---------- animated segmented toggle ---------- */

interface SegmentedToggleProps {
  active: ServiceType;
  onChange: (s: ServiceType) => void;
}

function SegmentedToggle({ active, onChange }: SegmentedToggleProps) {
  return (
    <div className="relative grid grid-cols-2 rounded-full bg-[var(--gold-100)] p-1">
      <div
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-[linear-gradient(160deg,var(--maroon-700),var(--maroon-900))] shadow-[var(--shadow-maroon)] transition-transform duration-300 ease-out"
        style={{ transform: active === "report" ? "translateX(2px)" : "translateX(calc(100% + 6px))" }}
      />
      <button
        type="button"
        onClick={() => onChange("report")}
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-colors ${
          active === "report" ? "text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
        }`}
      >
        <AlertCircle className="h-4 w-4" />
        Report an Issue
      </button>
      <button
        type="button"
        onClick={() => onChange("guidance")}
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-colors ${
          active === "guidance" ? "text-[var(--gold-100)]" : "text-[var(--maroon-800)]"
        }`}
      >
        <MessageCircleQuestion className="h-4 w-4" />
        Guidance
      </button>
    </div>
  );
}

/* ---------- page ---------- */

export default function Support() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<ServiceType>("report");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [videoName, setVideoName] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (name: string) => void
  ) => {
    setter(e.target.files?.[0]?.name ?? "");
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">

      <div className="mx-auto px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        {/* Header */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4 lg:max-w-4xl xl:max-w-5xl mt-5">
          <SectionHeader eyebrow="Kohli Samaj Nagpur" title="Support" />
          <button
            onClick={() => navigate("/")}
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
            Samaj Support Desk
          </span>
          <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">We're here to help</h2>
          <p className="mt-1 text-sm text-[var(--gold-100)]">
            समाज सदस्यांसाठी मदत आणि मार्गदर्शन
          </p>
        </div>

        {/* FORM SECTION */}
        <div ref={formRef} className="mx-auto max-w-2xl pb-20">
          {submitted ? (
            <div className="animate-support-pop relative overflow-hidden rounded-3xl border-2 border-[var(--gold-300)] bg-white px-8 py-14 text-center shadow-[var(--shadow-maroon)] sm:px-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-950)] shadow-inner">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[var(--maroon-900)]">
                Thank you — we've received it
              </h3>
              <p className="mt-2 text-lg text-[var(--maroon-700)]">
                धन्यवाद — आम्हाला तुमचा अर्ज मिळाला आहे
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
                A member of the Samaj team will contact you shortly via your preferred method.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full bg-[var(--maroon-900)] px-7 py-3 text-sm font-semibold text-[var(--gold-100)] shadow hover:bg-[var(--maroon-800)]"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border-2 border-[var(--gold-300)] bg-white shadow-[var(--shadow-maroon)]">
              <div className="px-6 pb-2 pt-6 sm:px-8">
                <SegmentedToggle active={activeService} onChange={setActiveService} />
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
                {/* Contact details */}
                <section className="mb-5">
                  <SectionHeading en="Your Details" mr="तुमची माहिती" />
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                    <div>
                      <FieldLabel en="Name" mr="नाव" required />
                      <TextInput type="text" placeholder="Full name" required />
                    </div>
                    <div>
                      <FieldLabel en="Mobile Number" mr="मोबाईल नंबर" required />
                      <TextInput type="tel" placeholder="10-digit mobile number" required />
                    </div>
                    <div>
                      <FieldLabel en="Email" mr="ईमेल" />
                      <TextInput type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <FieldLabel en="Preferred Contact Method" mr="संपर्काची पसंतीची पद्धत" />
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {CONTACT_METHODS.map((m) => (
                          <label
                            key={m.id}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-[var(--gold-300)] bg-[var(--paper)] px-3 py-2 text-sm has-[:checked]:border-[var(--maroon-800)] has-[:checked]:bg-[var(--gold-100)]"
                          >
                            <input type="radio" name="contactMethod" value={m.id} className="accent-[var(--maroon-800)]" />
                            <span className="font-medium text-[var(--ink)]">{m.en}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Location — report only */}
                {activeService === "report" && (
                  <section className="mb-5">
                    <SectionHeading en="Location" mr="ठिकाण" />
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                      <div>
                        <FieldLabel en="Village" mr="गाव" />
                        <TextInput type="text" placeholder="Village" />
                      </div>
                      <div>
                        <FieldLabel en="Taluka" mr="तालुका" />
                        <TextInput type="text" placeholder="Taluka" />
                      </div>
                      <div>
                        <FieldLabel en="District" mr="जिल्हा" />
                        <TextInput type="text" placeholder="District" />
                      </div>
                    </div>
                  </section>
                )}

                {/* Problem details */}
                <section className="mb-5">
                  <SectionHeading
                    en={activeService === "report" ? "Problem Details" : "Your Message"}
                    mr={activeService === "report" ? "समस्येचा तपशील" : "तुमचा संदेश"}
                  />
                  <div className="space-y-5">
                    {activeService === "report" && (
                      <div>
                        <FieldLabel en="Problem Category" mr="समस्येचा प्रकार" required />
                        <select
                          required
                          defaultValue=""
                          className="w-full rounded-xl border-2 border-[var(--gold-300)] bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)] outline-none transition focus:border-[var(--maroon-800)] focus:bg-white focus:ring-4 focus:ring-[var(--gold-500)]/15"
                        >
                          <option value="" disabled>
                            Select a category / प्रकार निवडा
                          </option>
                          {CATEGORIES.map((c) => (
                            <option key={c.en} value={c.en}>
                              {c.en} — {c.mr}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <FieldLabel
                        en={activeService === "report" ? "Problem Title" : "Subject"}
                        mr={activeService === "report" ? "समस्येचे शीर्षक" : "विषय"}
                        required
                      />
                      <TextInput type="text" placeholder="Short summary" required />
                    </div>

                    <div>
                      <FieldLabel
                        en={activeService === "report" ? "Problem Description" : "Message"}
                        mr={activeService === "report" ? "समस्येचे वर्णन" : "संदेश"}
                        required
                      />
                      <TextArea placeholder="Describe in detail..." required />
                    </div>
                  </div>
                </section>

                {/* Attachments — report only */}
                {activeService === "report" && (
                  <section className="mb-5">
                    <SectionHeading en="Attachments" mr="जोडणी" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--gold-400)] bg-[var(--gold-100)]/50 px-4 py-5 text-center transition hover:border-[var(--maroon-800)]">
                        <Paperclip className="h-5 w-5 shrink-0 text-[var(--gold-700)]" />
                        <span className="truncate text-sm font-medium text-[var(--gold-700)]">
                          {fileName || "Upload photo"}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, setFileName)} />
                      </label>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--gold-400)] bg-[var(--gold-100)]/50 px-4 py-5 text-center transition hover:border-[var(--maroon-800)]">
                        <Video className="h-5 w-5 shrink-0 text-[var(--gold-700)]" />
                        <span className="truncate text-sm font-medium text-[var(--gold-700)]">
                          {videoName || "Upload video (optional)"}
                        </span>
                        <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, setVideoName)} />
                      </label>
                    </div>
                  </section>
                )}

                <div className="border-t border-[var(--gold-300)]/60 pt-6">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[var(--maroon-900)] px-8 py-3.5 text-base font-bold text-[var(--gold-100)] shadow-[var(--shadow-gold)] transition hover:bg-[var(--maroon-800)] active:scale-[0.99] sm:w-auto sm:px-10"
                  >
                    Submit {activeService === "report" ? "Report" : "Message"} · सबमिट करा
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