import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import {
  Phone, Globe, Mail, Share2,
  MapPin, PlayCircle, Play, Star, Navigation, User, BadgeCheck, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  getBusinessById,
  getYouTubeId,
  toTelHref,
  getBusinesses,
  toWhatsAppHref,
  toWebsiteHref,
  toDirectionsHref,
  type Business,
} from "../data/business";

type MediaItem = {
  type: "image" | "video" | "youtube";
  src: string; // image url, mp4 url, or YouTube url
};

// Static sample gallery. Later replace with data from the API (business.gallery).
// const STATIC_MEDIA: MediaItem[] = [
//   { type: "image", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
//   { type: "image", src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&q=80" },
//   { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
//   { type: "image", src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" },
//   { type: "youtube", src: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
// ];  

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
  y = 14,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  children,
  action,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`group kc-row-shine flex items-center gap-3 px-4 py-3.5 md:gap-4 md:px-5 md:py-4 cursor-pointer transition-colors duration-200 hover:bg-[var(--gold-100)]/40 active:scale-[0.99] ${
        last ? "" : "border-t border-[color:var(--gold-300)]/50"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display block text-[14px] font-bold text-[var(--ink)] md:text-[14px]">
          {label}
        </p>
        <div className="font-mr block text-[12px] text-[var(--text-muted)]">
          {children}
        </div>
        {action}
      </div>
    </div>
  );
}

type SocialLink = {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
};

export default function BusinessDetailPage() {
  const navigate = useNavigate();
  const { businessId } = useParams<{ businessId: string }>();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  // keep the active thumbnail centred in the strip when the slide changes
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[activeIndex];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await getBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error("Business API error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  const business = businessId
    ? getBusinessById(businesses, businessId)
    : undefined;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[var(--cream)]">
        <p className="text-sm text-[var(--text-muted)]">Loading business...</p>
      </div>
    );
  }

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
    instagram,
    facebook,
    youtube,
    // adType,
    // posterUrl,
    // youtubeUrl,
    rating,
    reviewCount,
    isOpen,
  } = business;

  // const youtubeId = adType === "video" && youtubeUrl ? getYouTubeId(youtubeUrl) : null;

  // first item = the business's main ad, followed by the gallery items
const media: MediaItem[] = Array.isArray(business.all_files)
  ? business.all_files
  : [];
  const goTo = (i: number) => setActiveIndex((i + media.length) % media.length);
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 50) return;
    if (diff < 0) goNext();
    else goPrev();
  };

  const socialLinks: SocialLink[] = [
    facebook ? { Icon: FaFacebookF, label: "Facebook", href: toWebsiteHref(facebook) } : null,
    instagram ? { Icon: FaInstagram, label: "Instagram", href: toWebsiteHref(instagram) } : null,
    youtube ? { Icon: FaYoutube, label: "YouTube", href: toWebsiteHref(youtube) } : null,
    (whatsapp ?? mobile)
      ? {
          Icon: FaWhatsapp,
          label: "WhatsApp",
          href: toWhatsAppHref(whatsapp ?? mobile, `Hi ${ownerName}, I found ${name} on Kohali Connect.`),
        }
      : null,
  ].filter(Boolean) as SocialLink[];

  const hasSocial = socialLinks.length > 0;

  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `Check out ${name} on Kohali Connect`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      {/* Header */}
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-4 pt-3 sm:px-6 md:max-w-3xl md:gap-4 md:px-8 md:pt-5 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        <SectionHeader eyebrow="Information" title="Business Details" />

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            aria-label="Share"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--maroon-800)] shadow-[var(--shadow-gold)] transition-all duration-200 hover:-translate-y-0.5 active:scale-90"
          >
            <Share2 className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </button>
          <button
            onClick={() => navigate("/business")}
            aria-label="Back"
            className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 text-white md:h-[18px] md:w-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-10 xl:max-w-5xl">
        <div className="lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div>
            {/* hero gallery */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-maroon)]">
                {/* sliding track */}
                <div
                  className="relative aspect-[4/3] w-full bg-black sm:aspect-video"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <div
                    className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {media.map((item, i) => {
                      const isActive = i === activeIndex;
                      const ytId = item.type === "youtube" ? getYouTubeId(item.src) : null;
                      return (
                        <div key={`${item.src}-${i}`} className="relative h-full w-full shrink-0">
                          {item.type === "image" && (
                            <>
                              <img src={item.src} alt={name} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(59,10,22,0.75)_0%,rgba(59,10,22,0)_55%)]" />
                            </>
                          )}

                          {item.type === "video" &&
                            (isActive ? (
                              <video
                                src={item.src}
                                className="h-full w-full object-cover"
                                autoPlay
                                muted
                                controls
                                loop
                                playsInline
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-black text-white/80">
                                <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
                              </div>
                            ))}

                          {item.type === "youtube" &&
                            ytId &&
                            (isActive ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${ytId}`}
                                title={name}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <img
                                src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ))}
                        </div>
                      );
                    })}
                  </div>

                  {media.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)]">
                      <PlayCircle className="h-10 w-10" strokeWidth={1.5} />
                    </div>
                  )}

                  {/* arrows */}
                  {media.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous"
                        className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[var(--maroon-900)] shadow-md backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white active:scale-90"
                      >
                        <ChevronLeft size={20} strokeWidth={2.4} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next"
                        className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[var(--maroon-900)] shadow-md backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white active:scale-90"
                      >
                        <ChevronRight size={20} strokeWidth={2.4} />
                      </button>
                    </>
                  )}
                </div>

                {/* category + open badges */}
                <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
                  <span className="pointer-events-auto rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--maroon-900)] shadow-sm">
                    {categoryMr ?? category}
                  </span>
                  {typeof isOpen === "boolean" && (
                    <span
                      className={`pointer-events-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-sm ${
                        isOpen ? "bg-[#1a9c4d]" : "bg-[var(--maroon-950)]"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-white ${isOpen ? "animate-pulse" : ""}`} />
                      {isOpen ? "Open Now" : "Closed"}
                    </span>
                  )}
                </div>

                {/* counter */}
                {media.length > 1 && (
                  <span className="pointer-events-none absolute right-3 top-12 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold text-white">
                    {activeIndex + 1} / {media.length}
                  </span>
                )}
              </div>

              {/* thumbnail strip */}
              {media.length > 1 && (
                <div ref={stripRef} className="relative mt-3 flex gap-2 overflow-x-auto pb-1">
                  {media.map((item, i) => {
                    const ytId = item.type === "youtube" ? getYouTubeId(item.src) : null;
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={`${item.src}-${i}`}
                        ref={(el) => {
                          thumbRefs.current[i] = el;
                        }}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Show ${item.type} ${i + 1}`}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-black transition-all duration-200 active:scale-95 md:h-[68px] md:w-28 ${
                          isActive
                            ? "ring-2 ring-[var(--gold-500)] ring-offset-2 ring-offset-[var(--cream)]"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        {item.type === "image" && (
                          <img src={item.src} alt="" className="h-full w-full object-cover" />
                        )}
                        {item.type === "youtube" && ytId && (
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                        {item.type === "video" && (
                          <video
                            src={`${item.src}#t=0.5`}
                            preload="metadata"
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          />
                        )}
                        {item.type !== "image" && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[var(--maroon-900)]">
                              <Play size={12} fill="currentColor" strokeWidth={0} />
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </Reveal>

            {/* owner + title */}
            <Reveal delay={80} className="mt-5">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm ring-2 ring-white">
                  {ownerAvatarUrl ? (
                    <img src={ownerAvatarUrl} alt={ownerName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[var(--maroon-900)]">
                      <User size={18} strokeWidth={2} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-bold leading-tight text-[var(--maroon-950)] sm:text-2xl">
                    {nameMr ?? name}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="flex items-center gap-1 text-xs font-bold text-[var(--maroon-800)]">
                      {ownerName}
                      <BadgeCheck size={13} className="text-[var(--maroon-700)]" fill="var(--gold-400)" />
                    </span>
                    {typeof rating === "number" && (
                      <span className="flex items-center gap-1 rounded-full bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-2 py-0.5 text-[11px] font-bold text-[var(--maroon-900)]">
                        <Star size={10} fill="currentColor" strokeWidth={0} />
                        {rating.toFixed(1)}
                        {reviewCount != null && <span className="font-medium opacity-80">({reviewCount})</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* call / whatsapp */}
            <Reveal delay={120}>
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
                  <FaWhatsapp className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </Reveal>

            {/* about */}
            <Reveal delay={160} className="mt-5">
              <SectionHeader eyebrow="More Info" title="About Us" />
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-muted)] text-justify">{description}</p>
            </Reveal>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:sticky lg:top-4">
            <Reveal delay={200} className="mt-4 lg:mt-0">
              <SectionHeader eyebrow="Get in Touch" title="Contact Info" />
              <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                <DetailRow
                  icon={<MapPin size={16} className="text-[var(--maroon-800)]" />}
                  label="Address"
                  last={!memberId && !website && !email && !hasSocial}
                  action={
                    <a
                      href={toDirectionsHref(addressLine ?? location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] px-3 py-1.5 text-xs font-bold text-white no-underline transition-colors duration-150 hover:bg-[var(--maroon-900)]/15"
                    >
                      <Navigation size={12} /> Get Directions
                    </a>
                  }
                >
                  {addressLine ?? location}
                </DetailRow>

                {memberId && (
                  <DetailRow
                    icon={<BadgeCheck size={16} className="text-[var(--maroon-800)]" />}
                    label="Member ID"
                    last={!website && !email && !hasSocial}
                  >
                    {memberId}
                  </DetailRow>
                )}

                {website && (
                  <DetailRow
                    icon={<Globe size={16} className="text-[var(--maroon-800)]" />}
                    label="Website"
                    last={!email && !hasSocial}
                  >
                    <a
                      href={toWebsiteHref(website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mr block text-[12px] text-[var(--text-muted)]"
                    >
                      {website}
                    </a>
                  </DetailRow>
                )}

                {email && (
                  <DetailRow
                    icon={<Mail size={16} className="text-[var(--maroon-800)]" />}
                    label="Email"
                    last={!hasSocial}
                  >
                    <a href={`mailto:${email}`} className="text-[var(--maroon-800)] no-underline">
                      {email}
                    </a>
                  </DetailRow>
                )}

                {/* ---- social media (inside card) ---- */}
                {hasSocial && (
                  <div className="border-t border-[color:var(--gold-300)]/50 px-4 py-4 text-center md:px-5">
                    <p className="inline-block rounded-full border border-[var(--maroon-800)] bg-[linear-gradient(100deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--maroon-900)]">
                      Follow Us
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      {socialLinks.map(({ Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(160deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] no-underline shadow transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:shadow-lg active:scale-90 md:h-10 md:w-10"
                        >
                          <Icon size={14} />
                        </a>
                      ))}
                    </div>
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