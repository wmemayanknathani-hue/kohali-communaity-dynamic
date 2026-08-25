import React, { useState } from "react";
import {
  FileText,
  Pencil,
  Eye,
  Lock,
  Bell,
  Briefcase,
  Heart,
} from "lucide-react";

/**
 * Services page — Kohli Samaj community app
 * Theme: maroon / gold heritage system (matches existing tokens in globals.css)
 *
 * If your token names differ from the ones below, just swap the class
 * names — everything maroon/gold-related is isolated to these utility
 * classes so a find-and-replace is enough:
 *
 *   bg-maroon-900   text-maroon-900   border-maroon-900
 *   bg-gold-500     text-gold-500     border-gold-200
 *
 * tailwind.config.js (extend, if not already present):
 *   colors: {
 *     maroon: { 50:'#FBF2F3', 100:'#F3DCE0', 200:'#E4B4BC', 500:'#8A2432', 700:'#6B1B26', 900:'#4A1219' },
 *     gold:   { 100:'#FBF3DD', 200:'#F3E0A8', 300:'#E9C766', 500:'#C9971F', 600:'#A87A16' },
 *   }
 */

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
  titleMr: string;
  descriptionEn: string;
  icon: React.ReactNode;
  features?: string[];
  onNotifyMe: () => void;
  notified: boolean;
}

/* ---------------------------------- */
/* Shared bits                        */
/* ---------------------------------- */

function SectionHeader() {
  return (
    <div className="px-4 pt-6 pb-4 sm:px-6 md:px-8 lg:px-10">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
        सेवा
      </p>
      <h1 className="mt-1 text-2xl font-bold text-maroon-900 sm:text-3xl">
        Services
      </h1>
      <div className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-maroon-700 to-gold-500" />
    </div>
  );
}

function ServiceCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gold-200 bg-white shadow-sm shadow-maroon-900/5 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon,
  titleEn,
  titleMr,
  badge,
}: {
  icon: React.ReactNode;
  titleEn: string;
  titleMr: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gold-100 bg-gradient-to-br from-maroon-900 to-maroon-700 px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300 ring-1 ring-gold-500/30">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">
            {titleEn}
          </h2>
          <p className="text-sm text-gold-200/90">{titleMr}</p>
        </div>
      </div>
      {badge}
    </div>
  );
}

function ComingSoonBadge() {
  return (
    <span className="shrink-0 rounded-full bg-gold-500/20 px-2.5 py-1 text-[11px] font-semibold text-gold-100 ring-1 ring-gold-300/40 sm:text-xs">
      Coming Soon
    </span>
  );
}

/* ---------------------------------- */
/* Service 1 — Socio-Economic Portal  */
/* ---------------------------------- */

function Services({
  forms,
  editPermissionGranted,
  onView,
  onEdit,
}: ServicesProps) {
  return (
    <ServiceCard>
      <CardHeader
        icon={<FileText className="h-5 w-5" />}
        titleEn="Socio-Economic Portal"
        titleMr="सामाजिक-आर्थिक पोर्टल"
      />

      <div className="px-4 py-4 sm:px-5">
        <p className="text-sm text-maroon-900/70">
          Access your family&apos;s socio-economic survey form and information.
        </p>

        {!editPermissionGranted && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-gold-100/70 px-3 py-2.5 text-xs text-maroon-900/80 sm:text-sm">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            <span>
              Edit access is currently unavailable. Please contact the
              administrator.
            </span>
          </div>
        )}

        <ul className="mt-4 divide-y divide-gold-100">
          {forms.map((form) => (
            <li
              key={form.id}
              className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-maroon-900">
                  {form.memberName}
                </p>
                <p className="text-xs text-maroon-900/50">
                  Updated {form.updatedAt}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onView(form.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-maroon-700/20 px-3 py-1.5 text-xs font-semibold text-maroon-900 transition-colors hover:bg-maroon-50 active:scale-[0.98] sm:text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>

                <button
                  type="button"
                  disabled={!editPermissionGranted}
                  onClick={() => editPermissionGranted && onEdit(form.id)}
                  title={
                    editPermissionGranted
                      ? undefined
                      : "Edit access is currently unavailable. Please contact the administrator."
                  }
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors active:scale-[0.98] sm:text-sm ${
                    editPermissionGranted
                      ? "bg-maroon-700 text-white hover:bg-maroon-900"
                      : "cursor-not-allowed bg-maroon-900/5 text-maroon-900/30"
                  }`}
                >
                  {editPermissionGranted ? (
                    <Pencil className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ServiceCard>
  );
}

/* ---------------------------------- */
/* Coming-soon service (2 & 3 share)  */
/* ---------------------------------- */

function ComingSoonService({
  titleEn,
  titleMr,
  descriptionEn,
  icon,
  features,
  onNotifyMe,
  notified,
}: ComingSoonServiceProps) {
  return (
    <ServiceCard className="relative">
      <CardHeader
        icon={icon}
        titleEn={titleEn}
        titleMr={titleMr}
        badge={<ComingSoonBadge />}
      />

      <div className="px-4 py-4 sm:px-5">
        <p className="text-sm text-maroon-900/70">{descriptionEn}</p>
        <p className="mt-0.5 text-xs text-maroon-900/40">लवकरच उपलब्ध</p>

        {features && features.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 rounded-lg bg-maroon-50/60 px-3 py-2 text-xs text-maroon-900/80 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onNotifyMe}
          disabled={notified}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] sm:w-auto ${
            notified
              ? "cursor-default bg-gold-100 text-gold-700"
              : "bg-gold-500 text-maroon-900 hover:bg-gold-600"
          }`}
        >
          <Bell className="h-4 w-4" />
          {notified ? "We'll notify you" : "Notify Me"}
        </button>
      </div>
    </ServiceCard>
  );
}

/* ---------------------------------- */
/* Page                                */
/* ---------------------------------- */

export default function ServicesPage() {
  // Demo state — wire these up to real API/auth data.
  const [editPermissionGranted] = useState(false);
  const [forms] = useState<SurveyForm[]>([
    { id: "1", memberName: "Sharma Family", updatedAt: "12 Jul 2026" },
    { id: "2", memberName: "Deshmukh Family", updatedAt: "3 Jun 2026" },
  ]);
  const [notifiedMatrimonial, setNotifiedMatrimonial] = useState(false);
  const [notifiedJobs, setNotifiedJobs] = useState(false);

  return (
    <div className="min-h-screen bg-maroon-50/40">
      <SectionHeader />

      <div className="grid grid-cols-1 gap-4 px-4 pb-10 sm:px-6 md:grid-cols-2 md:gap-5 md:px-8 lg:grid-cols-3 lg:px-10">
        <div className="md:col-span-2 lg:col-span-1">
          <Services
            forms={forms}
            editPermissionGranted={editPermissionGranted}
            onView={(id) => console.log("view", id)}
            onEdit={(id) => console.log("edit", id)}
          />
        </div>

        <ComingSoonService
          titleEn="Matrimonial Services"
          titleMr="विवाह सेवा"
          descriptionEn="A trusted matrimonial platform for eligible community members."
          icon={<Heart className="h-4 w-4" />}
          onNotifyMe={() => setNotifiedMatrimonial(true)}
          notified={notifiedMatrimonial}
        />

        <ComingSoonService
          titleEn="Job Portal"
          titleMr="नोकरी पोर्टल"
          descriptionEn="Find opportunities and connect with employers across the community."
          icon={<Briefcase className="h-4 w-4" />}
          features={[
            "Job Opportunities",
            "Job Search",
            "Employer Registration",
            "Candidate Profile",
            "Career Guidance",
          ]}
          onNotifyMe={() => setNotifiedJobs(true)}
          notified={notifiedJobs}
        />
      </div>
    </div>
  );
}