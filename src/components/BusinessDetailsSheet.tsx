import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Phone, MessageCircle, Globe, Mail, Share2,
  MapPin, PlayCircle, Star, Navigation, User,
} from "lucide-react";
import {
  getBusinessById,
  getYouTubeId,
  toTelHref,
  toWhatsAppHref,
  toWebsiteHref,
  toMailHref,
  toDirectionsHref,
} from "../data/business";

function useRevealVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
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
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function BusinessDetailPage() {
  const { businessId } = useParams<{ businessId: string }>();
  const business = businessId ? getBusinessById(businessId) : undefined;

  if (!business) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-[var(--cream)] p-6 text-center">
        <h1 className="text-lg font-bold text-[var(--maroon-900)]">व्यवसाय सापडला नाही</h1>
        <p className="text-sm text-[var(--text-muted)]">
          The business you're looking for isn't available.
        </p>
        <Link
          to="/business"
          className="mt-2 rounded-lg bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] px-4 py-2 text-sm font-bold text-[var(--gold-300)] no-underline"
        >
          Back to Our Businesses
        </Link>
      </div>
    );
  }

  const {
    name,
    nameMr,
    ownerName,
    ownerAvatarUrl,
    memberId,
    category,
    categoryMr,
    description,
    location,
    addressLine,
    mobile,
    whatsapp,
    email,
    website,
    adType,
    posterUrl,
    youtubeUrl,
    rating,
    reviewCount,
    isOpen,
  } = business;

  const youtubeId = adType === "video" && youtubeUrl ? getYouTubeId(youtubeUrl) : null;

  const handleShare = async () => {
    const shareData = { title: name, text: `Check out ${name} on Kohali Connect`, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      {/* top bar */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-[var(--cream)]/95 px-4 py-3 backdrop-blur-sm">
        <Link
          to="/business"
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--maroon-900)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-sm font-bold text-[var(--maroon-900)]">Business Details</h2>
      </div>

      <div className="mx-auto w-full md:max-w-2xl px-4 sm:px-6">
        {/* hero media */}
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-maroon)]">
            {youtubeId ? (
              <div className="aspect-video w-full overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={name}
                  className="h-full w-full"
                  allow="accelerated-video; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : posterUrl ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={posterUrl}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(59,10,22,0.6)_0%,rgba(59,10,22,0)_55%)]" />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)]">
                <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
              </div>
            )}

            <span className="absolute bottom-3 left-3 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--maroon-900)] shadow-sm">
              {categoryMr ?? category}
            </span>

            {typeof isOpen === "boolean" && (
              <span
                className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-sm ${
                  isOpen ? "bg-[#1a9c4d]" : "bg-[var(--maroon-800)]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-white ${isOpen ? "animate-pulse" : ""}`} />
                {isOpen ? "Open Now" : "Closed"}
              </span>
            )}
          </div>
        </Reveal>

        {/* name / rating */}
        <Reveal delay={70}>
          <div className="mt-4">
            <h1 className="text-2xl font-extrabold leading-tight text-[var(--ink)] font-['Yatra_One',cursive]">
              {nameMr ?? name}
            </h1>
            {typeof rating === "number" && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="flex items-center gap-1 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-2.5 py-1 text-sm font-bold text-[var(--maroon-900)]">
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  {rating.toFixed(1)}
                </span>
                {reviewCount != null && (
                  <span className="text-sm font-medium text-[var(--text-muted)]">
                    ({reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>
        </Reveal>

        {/* call / whatsapp */}
        <Reveal delay={110}>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={toTelHref(mobile)}
              className="kc-btn-shine flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-sm font-bold text-[var(--gold-300)] no-underline shadow-[0_4px_14px_-4px_rgba(59,10,22,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={toWhatsAppHref(whatsapp ?? mobile, `Hi ${ownerName}, I found ${name} on Kohali Connect.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(145deg,#2fbf67,#1a9c4d)] py-3.5 text-sm font-bold text-white no-underline shadow-[0_4px_14px_-4px_rgba(31,168,85,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </Reveal>

        {/* address card */}
        <Reveal delay={150}>
          <div className="mt-4 rounded-2xl bg-[var(--paper)] p-4 shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm">
                <MapPin size={17} className="text-[var(--maroon-950)]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
                  Address
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-[var(--ink)]">
                  {addressLine ?? location}
                </p>
                <a
                  href={toDirectionsHref(addressLine ?? location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--maroon-900)]/5 px-3 py-1.5 text-xs font-bold text-[var(--maroon-800)] no-underline transition-colors duration-150 hover:bg-[var(--maroon-900)]/10"
                >
                  <Navigation size={12} /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* owner card */}
        <Reveal delay={190}>
          <div className="mt-3 rounded-2xl bg-[var(--paper)] p-4 shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] ring-2 ring-white shadow-sm">
                {ownerAvatarUrl ? (
                  <img src={ownerAvatarUrl} alt={ownerName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[var(--maroon-900)]">
                    <User size={20} strokeWidth={2} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
                  Owner
                </p>
                <p className="mt-0.5 truncate text-sm font-bold text-[var(--ink)]">{ownerName}</p>
                {memberId && (
                  <p className="text-xs font-medium text-[var(--text-muted)]">Member ID: {memberId}</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* about */}
        <Reveal delay={230}>
          <div className="mt-3 rounded-2xl bg-[var(--paper)] p-4 shadow-[var(--shadow-gold)]">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
              About Business
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]">{description}</p>
          </div>
        </Reveal>

        {/* bottom icon row */}
        <Reveal delay={270}>
          <div className="mt-5 flex items-center justify-center gap-3">
            {website && (
              <a
                href={toWebsiteHref(website)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="grid h-12 w-12 place-items-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-1 hover:bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] hover:text-[var(--gold-300)] hover:shadow-lg active:scale-90"
              >
                <Globe size={17} />
              </a>
            )}
            {email && (
            <a  
                href={toMailHref(email)}
                aria-label="Email"
                className="grid h-12 w-12 place-items-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-1 hover:bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] hover:text-[var(--gold-300)] hover:shadow-lg active:scale-90"
              >
                <Mail size={17} />
              </a>
            )}
            <button
              onClick={handleShare}
              aria-label="Share"
              className="grid h-12 w-12 place-items-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-1 hover:bg-[linear-gradient(145deg,var(--maroon-700),var(--maroon-900))] hover:text-[var(--gold-300)] hover:shadow-lg active:scale-90"
            >
              <Share2 size={17} />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}