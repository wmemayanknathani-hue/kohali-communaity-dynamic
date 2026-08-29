import { useEffect, useRef, useState } from "react";
import { Store } from "lucide-react";
import { BusinessCard } from "../BusinessCard";
import { sampleBusinesses } from "../../data/business";

// TODO: replace sampleBusinesses with real data (API/CMS) once available.

/* local reveal-on-scroll, matches Home.tsx motion language */
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

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 md:px-8 lg:px-10 pt-5">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm">
              <Store size={18} className="text-[var(--maroon-950)]" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-[var(--maroon-900)] font-['Yatra_One',cursive]">
                Our Businesses
              </h1>
              <p className="text-xs font-medium text-[var(--text-muted)]">आपले व्यवसाय</p>
            </div>
          </div>
        </Reveal>

        {sampleBusinesses.length === 0 ? (
          <Reveal delay={80}>
            <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[var(--gold-400)]/60 bg-[var(--paper)] px-4 py-10 text-center">
              <Store className="h-8 w-8 text-[var(--gold-500)]" strokeWidth={1.5} />
              <p className="text-sm text-[var(--text-muted)]">
                No businesses listed yet. Be the first to promote yours!
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3.5">
            {sampleBusinesses.map((business, index) => (
              <Reveal key={business.id} delay={index * 60}>
                <BusinessCard business={business} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}