import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import Prakash from "../../assets/member-president.png";


/* ---------------------------------------------------------------------- */
/* Types                                                                  */
/* ---------------------------------------------------------------------- */

export interface CommitteeMember {
  id: string;
  name: string;
  nameEn?: string;
  position: string;
  positionEn: string;
  rank: number;
  photoUrl?: string;
  shortIntro?: string;
  responsibilities?: string[];
  phone?: string;
  email?: string;
  contactPublic: boolean;
}

/* ---------------------------------------------------------------------- */
/* Committee Members                                                      */
/* ---------------------------------------------------------------------- */
export const MEMBERS: CommitteeMember[] = [
  {
    id: "m1",
    name: "मा. श्री. प्रकाश ह. बाळबुधे",
    nameEn: "Prakash H. Balbudhe",
    position: "अध्यक्ष",
    positionEn: "President",
    rank: 1,
    photoUrl: Prakash,
    shortIntro:
      "President of the Kohali community, responsible for providing leadership and guiding the community towards its goals.",
    responsibilities: [
      "Lead the community and executive committee.",
      "Guide major community initiatives and activities.",
      "Represent the community at important meetings and events.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "president@kohlisamaj.org",
  },

  {
    id: "m2",
    name: "मा. श्री. अमोल श्री. मुंगमोडे",
    nameEn: "Amol S. Mungmode",
    position: "उपाध्यक्ष",
    positionEn: "Vice President",
    rank: 2,
    shortIntro:
      "Supports the President in managing community activities and organizational responsibilities.",
    responsibilities: [
      "Support the President in community activities.",
      "Assist in planning and coordinating programs.",
      "Help manage important committee responsibilities.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "vicepresident@kohlisamaj.org",
  },

  {
    id: "m3",
    name: "मा. श्री. माणिकराव कि. लोथे",
    nameEn: "Manikrao K. Lothe",
    position: "सचिव",
    positionEn: "Secretary",
    rank: 3,
    shortIntro:
      "Responsible for committee communication, documentation and coordination.",
    responsibilities: [
      "Maintain committee records and documentation.",
      "Coordinate meetings and official communications.",
      "Maintain important organizational information.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "secretary@kohlisamaj.org",
  },

  {
    id: "m4",
    name: "मा. श्री. सुरेश ना. पाटील",
    nameEn: "Suresh N. Patil",
    position: "कोषाध्यक्ष",
    positionEn: "Treasurer",
    rank: 4,
    shortIntro:
      "Responsible for supporting the financial administration of the community.",
    responsibilities: [
      "Maintain financial records.",
      "Support budgeting and financial planning.",
      "Assist with transparent management of community funds.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "treasurer@kohlisamaj.org",
  },

  {
    id: "m5",
    name: "मा. श्री. दिनेश रा. कोहळे",
    nameEn: "Dinesh R. Kohale",
    position: "सहसचिव",
    positionEn: "Joint Secretary",
    rank: 5,
    shortIntro:
      "Assists the Secretary with administrative and organizational activities.",
    responsibilities: [
      "Assist with committee documentation.",
      "Support meeting coordination.",
      "Help with community communications and activities.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "jointsecretary@kohlisamaj.org",
  },

  {
    id: "m6",
    name: "मा. सौ. सुनीता वि. बाळबुधे",
    nameEn: "Sunita V. Balbudhe",
    position: "महिला अध्यक्ष",
    positionEn: "Women's President",
    rank: 6,
    shortIntro:
      "Works towards encouraging women's participation and community development.",
    responsibilities: [
      "Coordinate women's community activities.",
      "Encourage participation in community programs.",
      "Support initiatives focused on women and families.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "women@kohlisamaj.org",
  },

  {
    id: "m7",
    name: "मा. श्री. रोहित प्र. पाटील",
    nameEn: "Rohit P. Patil",
    position: "युवक अध्यक्ष",
    positionEn: "Youth President",
    rank: 7,
    shortIntro:
      "Works with young members and supports youth-focused community initiatives.",
    responsibilities: [
      "Coordinate youth activities.",
      "Encourage youth participation in community programs.",
      "Support sports, cultural and educational initiatives.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "youth@kohlisamaj.org",
  },

  {
    id: "m8",
    name: "मा. श्री. विनोद ह. मुंगमोडे",
    nameEn: "Vinod H. Mungmode",
    position: "सांस्कृतिक प्रमुख",
    positionEn: "Cultural Head",
    rank: 8,
    shortIntro:
      "Responsible for supporting cultural activities and preserving community traditions.",
    responsibilities: [
      "Coordinate cultural programs.",
      "Promote community traditions and heritage.",
      "Support festivals and cultural events.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "culture@kohlisamaj.org",
  },

  {
    id: "m9",
    name: "मा. श्री. अनिल के. लोथे",
    nameEn: "Anil K. Lothe",
    position: "शिक्षण प्रमुख",
    positionEn: "Education Head",
    rank: 9,
    shortIntro:
      "Works to encourage education and support educational initiatives within the community.",
    responsibilities: [
      "Promote educational activities.",
      "Support students and educational initiatives.",
      "Encourage educational awareness within the community.",
    ],
    contactPublic: true,
    phone: "+91 98XXXXXXXX",
    email: "education@kohlisamaj.org",
  },
];
/* ---------------------------------------------------------------------- */
/* Scroll reveal                           */
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

/* ---------------------------------------------------------------------- */
/* Featured card   */
/* ---------------------------------------------------------------------- */

function FeaturedLeaderCard({
  member,
  onView,
}: {
  member: CommitteeMember;
  onView: (member: CommitteeMember) => void;
}) {
  const displayName = member.nameEn || member.name;
  const { ref, visible } = useRevealVisible();

  return (
    <div
      ref={ref}
      onClick={() => onView(member)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
      className="
        kc-featured
        group relative flex cursor-pointer flex-col items-center gap-3
        overflow-hidden rounded-2xl
        bg-gradient-to-br from-[var(--maroon-900)] to-[var(--maroon-700)]
        px-6 py-7
        text-center
        shadow-[0_16px_36px_rgba(44,5,13,0.35)]
        transition-transform duration-300
        hover:-translate-y-1
        sm:flex-row sm:text-left
        md:px-8 md:py-8
      "
    >
      {/* decorative gold ring pattern in the corner */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[var(--gold-400)]/30" />
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-[var(--gold-400)]/20" />

      <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
        <div className="kc-ring-glow absolute inset-0 rounded-full" />
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={displayName}
            className="relative h-full w-full rounded-full border-[3px] border-[var(--gold-400)] object-cover shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-[3px] border-[var(--gold-400)] bg-[var(--gold-100)]">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-[var(--maroon-700)]" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="4.2" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7v1H4v-1z" />
            </svg>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col items-center sm:items-start">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(120deg,var(--gold-300)_0%,var(--gold-500)_100%)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--maroon-950)]">
          {member.positionEn}
        </span>

        <h3 className="mt-2 text-xl font-extrabold leading-snug text-[var(--gold-100)] md:text-2xl">
          {displayName}
        </h3>

        {/* <p
          className="mt-0.5 text-sm text-[var(--gold-300)]"
          style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}
        >
          {member.position}
        </p> */}

        {member.shortIntro && (
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[var(--gold-100)]/75">
            {member.shortIntro}
          </p>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onView(member);
          }}
          aria-label={`View ${displayName} profile`}
          className="
            mt-4 flex items-center gap-1.5 rounded-full
            bg-[linear-gradient(120deg,var(--gold-300)_0%,var(--gold-500)_100%)] px-4 py-1.5
            text-xs font-bold text-[var(--maroon-950)]
            transition-all duration-200
            hover:-translate-y-0.5 hover:bg-[var(--gold-400)] hover:shadow-[0_6px_16px_rgba(212,175,55,0.4)]
          "
        >
          View profile
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Committee Card                                                         */
/* ---------------------------------------------------------------------- */

interface CommitteeCardProps {
  member: CommitteeMember;
  index: number;
  onView: (member: CommitteeMember) => void;
}

function CommitteeCard({ member, index, onView }: CommitteeCardProps) {
  const displayName = member.nameEn || member.name;
  const { ref, visible } = useRevealVisible();

  return (
    <div
      ref={ref}
      onClick={() => onView(member)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 45}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 45}ms`,
      }}
      className="
        group relative flex cursor-pointer flex-col items-center
        overflow-hidden rounded-xl border border-[var(--gold-300)]
        bg-[var(--paper)] px-3 pb-3 pt-4
        shadow-[0_2px_10px_rgba(74,17,25,0.06)]
        transition-all duration-300
        hover:-translate-y-1 hover:border-[var(--gold-500)] hover:shadow-[0_14px_28px_rgba(74,17,25,0.16)]
        active:scale-[0.98]
      "
    >
      {/* faint gold wash that appears on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--gold-300)]/0 to-[var(--gold-300)]/0 transition-colors duration-300 group-hover:from-[var(--gold-300)]/10 group-hover:to-transparent" />

      {/* Avatar */}
      <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={displayName}
            className="h-full w-full rounded-full border-2 border-[var(--gold-400)] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[var(--gold-400)] bg-[var(--gold-100)] transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-[var(--maroon-700)]" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="4.2" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7v1H4v-1z" />
            </svg>
          </div>
        )}
      </div>

      {/* Position */}
      <span className="relative mt-2 rounded-full bg-[var(--maroon-800)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--gold-100)] transition-colors duration-200 group-hover:bg-[var(--maroon-900)]">
        {member.positionEn}
      </span>

      {/* Name */}
      <h3 className="relative mt-1.5 text-center text-[13.5px] font-bold leading-snug text-[var(--maroon-950)] md:text-sm">
        {displayName}
      </h3>

      {/* Marathi position */}
      {/* <p
        className="relative text-center text-[11.5px] text-[var(--text-muted)]"
        style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}
      >
        {member.position}
      </p> */}

      {/* View button */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onView(member);
        }}
        aria-label={`View ${displayName} profile`}
        className="relative mt-2 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--gold-400)] text-[var(--maroon-800)] transition-colors duration-200 group-hover:bg-[var(--maroon-800)] group-hover:text-[var(--gold-100)]"
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Main Committee Page                                                    */
/* ---------------------------------------------------------------------- */

export default function ExecutiveCommittee() {
  const navigate = useNavigate();
  const sorted = [...MEMBERS].sort((a, b) => a.rank - b.rank);
  const leader = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <style>{`
        @keyframes kc-fade-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes kc-ring-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); } 50% { box-shadow: 0 0 0 9px rgba(212,175,55,0); } }
        .kc-header-in { animation: kc-fade-down 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .kc-ring-glow { animation: kc-ring-pulse 2.4s ease-out infinite; border-radius: 9999px; }
        @media (prefers-reduced-motion: reduce) {
          .kc-header-in, .kc-ring-glow { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-md px-4 py-6 md:max-w-3xl md:px-8 md:py-10 lg:max-w-5xl xl:max-w-6xl">
         {/* ---- Header ---- */}
          <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4  lg:max-w-4xl xl:max-w-5xl">
            <SectionHeader eyebrow="Our team" title="Executive Committee"/>

            <button onClick={() => navigate("/home")} className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]  shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px]">
              <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
            </button>
          </div>
        {/* Featured leader */}
        {leader && (
          <div className="mb-6 md:mb-8 mt-2">
            <FeaturedLeaderCard
              member={leader}
              onView={(selectedMember) => {
                window.location.href = `/committee/${selectedMember.id}`;
              }}
            />
          </div>
        )}

        {/* Rest of the committee */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {rest.map((member, index) => (
            <CommitteeCard
              key={member.id}
              member={member}
              index={index}
              onView={(selectedMember) => {
                window.location.href = `/committee/${selectedMember.id}`;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}