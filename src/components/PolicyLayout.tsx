import { Link } from "react-router-dom";
import { Mail, Globe, FileText, Lock, ShieldAlert, ArrowLeft } from "lucide-react";
import type { PolicyDoc } from "../data/policies";

function PolicyIcon({ kind }: { kind: PolicyDoc["icon"] }) {
  if (kind === "terms") return <FileText size={16} className="text-[var(--gold-300)]" />;
  if (kind === "privacy") return <Lock size={16} className="text-[var(--gold-300)]" />;
  return <ShieldAlert size={16} className="text-[var(--gold-300)]" />;
}

export function PolicyPageLayout({ title, doc }: { title: string; doc: PolicyDoc }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-[640px] min-h-screen flex-col">
        {/* header */}
        <div className="relative shrink-0 bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] px-5 pt-5 pb-4">
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-semibold text-[var(--gold-100)] transition-colors duration-150 hover:bg-white/20"
          >
            <ArrowLeft size={13} />
            Back
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
              <PolicyIcon kind={doc.icon} />
            </span>
            <h3 className="text-[16px] font-extrabold leading-snug text-white">{title}</h3>
          </div>

          {/* meta chips */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--gold-100)]">
              {doc.organization}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--gold-100)]">
              Effective {doc.effectiveDate}
            </span>
          </div>
        </div>

        {/* body */}
        <div className="flex-1 px-5 py-4">
          {doc.extra && (
            <p className="mb-4 rounded-lg bg-[var(--cream)] px-3 py-2 text-[11.5px] font-semibold text-[var(--maroon-800)]">
              {doc.extra}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {doc.sections.map((section, si) => (
              <div key={si}>
                {section.heading && (
                  <h4 className="mb-1.5 text-[12.5px] font-extrabold uppercase text-[var(--maroon-800)]">
                    {section.heading}
                  </h4>
                )}

                {section.paragraphs?.map((p: string, pi: number) => (
                  <p
                    key={pi}
                    className="mb-1.5 flex items-center gap-1.5 text-[12.5px] leading-relaxed text-[var(--ink)] text-justify"
                  >
                    {p.startsWith("Email:") ? (
                      <>
                        <Mail size={14} className="shrink-0 text-[var(--maroon-800)]" />
                        <a
                          href={`mailto:${p.replace("Email:", "").trim()}`}
                          className="text-[var(--maroon-800)] hover:underline"
                        >
                          {p.replace("Email:", "").trim()}
                        </a>
                      </>
                    ) : p.startsWith("Website:") ? (
                      <>
                        <Globe size={14} className="shrink-0 text-[var(--maroon-800)]" />
                        <a
                          href={p.replace("Website:", "").trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--maroon-800)] hover:underline"
                        >
                          {p.replace("Website:", "").trim()}
                        </a>
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-1 flex flex-col gap-1">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-[12.5px] leading-relaxed text-[var(--ink)]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-500)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="shrink-0 border-t border-[var(--gold-500)]/20 bg-white px-5 py-3.5">
          <Link
            to="/"
            className="kc-btn-shine block w-full rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3 text-center text-[13.5px] font-extrabold text-[var(--maroon-950)] transition-all duration-150 hover:brightness-105"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}