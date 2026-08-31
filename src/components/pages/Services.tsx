import React, { useState } from "react";
import SectionHeader from "../SectionHeader";
import {
  FileText,
  Pencil,
  Eye,
  Lock,
  Bell,
  Briefcase,
  Heart,
  ScrollText,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

interface SurveyForm {
  id: string;
  memberName: string;
  updatedAt: string;
}

interface ServicesProps {
  forms: SurveyForm[];
  editPermissionGranted: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

interface ComingSoonServiceProps {
  titleEn: string;
  // titleMr: string;
  descriptionEn: string;
  icon: React.ReactNode;
  features?: string[];
  onNotifyMe: () => void;
  notified: boolean;
}

/* ---------------------------------- */
/* Shared button classes              */
/* ---------------------------------- */

const goldButtonClass =
  "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-[14px] font-extrabold text-[var(--paper)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-10";

const goldIconButtonClass =
  "kc-btn-shine flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] text-white shadow-[0_4px_14px_-4px_rgba(214,169,74,0.65)] transition-transform duration-200 hover:scale-[1.04] active:scale-95";

/* ---------------------------------- */
/* Main card wrapper                  */
/* ---------------------------------- */

function ServiceCard({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <section
      className={`kc-card-glow overflow-hidden rounded-[24px] border bg-[var(--paper)] ${
        active
          ? "border-[var(--gold-500)]/60 shadow-[var(--shadow-gold)]"
          : "border-[var(--gold-500)]/25 shadow-[var(--shadow-maroon)]"
      }`}
    >
      <div
        className={`h-[4px] ${
          active
            ? "bg-[linear-gradient(90deg,var(--maroon-800),var(--gold-300),var(--gold-600),var(--maroon-800))]"
            : "bg-[linear-gradient(90deg,var(--gold-700),var(--gold-400),var(--gold-700))]"
        }`}
      />

      <div className="relative">{children}</div>
    </section>
  );
}

/* ---------------------------------- */
/* Top section                        */
/* ---------------------------------- */

function CardTop({
  titleEn,
  // titleMr,
  icon,
  status,
}: {
  titleEn: string;
  // titleMr: string;
  icon: React.ReactNode;
  status: "open" | "coming-soon";
}) {
  const isOpen = status === "open";

  return (
    <div className="flex items-start gap-3">
      <div className="relative shrink-0">
        <div
          className={`absolute -inset-1 rounded-[18px] blur-md ${
            isOpen ? "bg-[var(--gold-500)]/15" : "bg-[var(--maroon-900)]/8"
          }`}
        />

        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${
            isOpen
              ? "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-700)]"
              : "bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] text-[var(--maroon-700)]"
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.02em] text-[var(--ink)]">
          {titleEn}
        </h2>

        <div
          className={`flex shrink-0 mt-1.5 items-center gap-1.5 rounded-full px-2 py-1 ring-1 ${
            isOpen
              ? "bg-[var(--gold-300)] text-[var(--maroon-800)] ring-[var(--gold-300)] w-max"
              : "bg-[var(--gold-300)] text-[var(--maroon-800)] ring-[var(--gold-300)] w-max"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isOpen ? "kc-live-dot bg-[var(--maroon-800)]" : "bg-[var(--maroon-800)]"
            }`}
          />

          <span className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wide">
            {isOpen ? "Open" : "Coming soon"}
          </span>
        </div>
      </div>

      
    </div>
  );
}

/* ---------------------------------- */
/* Open service                       */
/* ---------------------------------- */

function Services({
  forms,
  editPermissionGranted,
  onView,
  onEdit,
}: ServicesProps) {
  return (
    <ServiceCard active>
      <div className="p-5">
        <CardTop
          titleEn="Socio-economic portal"
          // titleMr="सामाजिक-आर्थिक पोर्टल"
          icon={<FileText className="h-5 w-5" />}
          status="open"
        />

        <p className="mt-5 max-w-[330px] text-sm leading-relaxed text-[var(--text-muted)]">
          Access your family&apos;s socio-economic survey form and information.
        </p>

        {!editPermissionGranted && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--gold-500)]/35 bg-[var(--gold-100)] px-3.5 py-3 text-xs leading-relaxed text-[var(--maroon-900)]">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-700)]" />

            <span>Edit access is unavailable. Contact the administrator.</span>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">
                Family records
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Select a record to continue
              </p>
            </div>

            {forms.length > 0 && (
              <span className="rounded-full bg-[var(--maroon-900)]/8 px-2.5 py-1 text-[10px] font-bold text-[var(--maroon-800)]">
                {forms.length} records
              </span>
            )}
          </div>

          {forms.length === 0 ? (
            <div className="mt-3 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[var(--maroon-900)]/15 bg-[var(--cream)] px-4 py-8 text-center">
              <FileText className="h-6 w-6 text-[var(--gold-600)]" />

              <p className="text-sm font-semibold text-[var(--ink)]">
                No family records yet
              </p>

              <p className="max-w-[220px] text-xs text-[var(--text-muted)]">
                Once a survey form is submitted for your family, it will show
                up here.
              </p>
            </div>
          ) : (
            <div className="mt-3 space-y-2.5">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="group/record flex items-center justify-between gap-3 rounded-2xl border border-[var(--maroon-900)]/10 bg-[var(--cream)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--gold-500)]/50 hover:shadow-[0_12px_24px_-17px_rgba(44,5,13,0.8)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  text-[var(--maroon-700)] shadow-sm">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[var(--ink)]">
                        {form.memberName}
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        Updated {form.updatedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => onView(form.id)}
                      aria-label={`View ${form.memberName}`}
                      className={goldIconButtonClass}
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      disabled={!editPermissionGranted}
                      onClick={() => {
                        if (editPermissionGranted) {
                          onEdit(form.id);
                        }
                      }}
                      aria-label={
                        editPermissionGranted
                          ? `Edit ${form.memberName}`
                          : "Edit unavailable — contact the administrator"
                      }
                      className={`${goldIconButtonClass} ${
                        !editPermissionGranted
                          ? "cursor-not-allowed opacity-45"
                          : ""
                      }`}
                    >
                      {editPermissionGranted ? (
                        <Pencil className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ServiceCard>
  );
}

/* ---------------------------------- */
/* Coming soon service                */
/* ---------------------------------- */

function ComingSoonService({
  titleEn,
  // titleMr,
  descriptionEn,
  icon,
  features,
  onNotifyMe,
  notified,
}: ComingSoonServiceProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ServiceCard>
      <div className="p-5">
        <CardTop
          titleEn={titleEn}
          // titleMr={titleMr}
          icon={icon}
          status="coming-soon"
        />

        <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)]">
          {descriptionEn}
        </p>

        {features && features.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--gold-500)] py-2.5 text-[14px] font-bold text-[var(--gold-700)] transition-colors hover:bg-[var(--gold-100)]"
            >
              <span>
                {expanded ? "Hide what's planned" : "See what's planned"}
              </span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {expanded && (
              <ul className="mt-3 space-y-2 rounded-2xl border border-[var(--gold-500)] bg-[var(--cream)] p-3.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs font-medium text-[var(--maroon-900)]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--maroon-700)]">
                      <ScrollText className="h-3 w-3 text-white" />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <button
          type="button"
          onClick={onNotifyMe}
          disabled={notified}
          className={`${goldButtonClass} mt-4 w-full ${
            notified ? "cursor-default opacity-70" : ""
          }`}
        >
          <Bell className="h-4 w-4" />

          <span>{notified ? "You're on the list" : "Notify me"}</span>

          {!notified && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </ServiceCard>
  );
}

/* ---------------------------------- */
/* Page                               */
/* ---------------------------------- */

export default function ServicesPage() {
  const [editPermissionGranted] = useState(false);

  const [forms] = useState<SurveyForm[]>([
    { id: "1", memberName: "Sharma Family", updatedAt: "12 Jul 2026" },
    { id: "2", memberName: "Deshmukh Family", updatedAt: "3 Jun 2026" },
  ]);

  const [notifiedMatrimonial, setNotifiedMatrimonial] = useState(false);
  const [notifiedJobs, setNotifiedJobs] = useState(false);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[var(--cream)]">
      <div className="space-y-4 px-4 pb-[calc(env(safe-area-inset-bottom)+28px)] pt-5">
        {/* ---- Header ---- */}
        <div className="flex w-full items-center justify-between gap-3 md:gap-4 mb-0">
          <SectionHeader eyebrow="Explore" title="Our Services" />

          <button
            type="button"
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-300)] active:scale-95 sm:h-10 sm:w-10"
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </button>
        </div>

        <Services
          forms={forms}
          editPermissionGranted={editPermissionGranted}
          onView={(id) => console.log("view", id)}
          onEdit={(id) => console.log("edit", id)}
        />

        <ComingSoonService
          titleEn="Matrimonial services"
          // titleMr="विवाह सेवा"
          descriptionEn="A trusted matrimonial platform for eligible community members."
          icon={<Heart className="h-5 w-5" />}
          onNotifyMe={() => setNotifiedMatrimonial(true)}
          notified={notifiedMatrimonial}
        />

        <ComingSoonService
          titleEn="Job portal"
          // titleMr="नोकरी पोर्टल"
          descriptionEn="Find opportunities and connect with employers across the community."
          icon={<Briefcase className="h-5 w-5" />}
          features={[
            "Job opportunities",
            "Job search",
            "Employer registration",
            "Candidate profile",
            "Career guidance",
          ]}
          onNotifyMe={() => setNotifiedJobs(true)}
          notified={notifiedJobs}
        />
      </div>
    </main>
  );
}