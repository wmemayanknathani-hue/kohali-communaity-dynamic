import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Store } from "lucide-react";
import { BusinessCard } from "../BusinessCard";
import { sampleBusinesses } from "../../data/business";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-10">
      <div className="mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 md:px-8 lg:px-10 pt-5">
        
      <div className="mx-auto flex w-full items-center justify-between gap-3 md:gap-4 ">
          <SectionHeader eyebrow="Businesses List" title="Our Businesses"/>

          <button
            onClick={() => navigate("/home")}
            aria-label="Back"
            className="mb-3.5 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
          </button>
        </div>
        {sampleBusinesses.length === 0 ? (
          <Reveal delay={80}>
            <div className="mt-5 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[var(--gold-400)]/60 bg-[var(--paper)] px-4 py-10 text-center">
              <Store className="h-8 w-8 text-[var(--gold-500)]" strokeWidth={1.5} />
              <p className="text-sm text-[var(--text-muted)]">
                No businesses listed yet. Be the first to promote yours!
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-0 grid grid-cols-2 md:grid-cols-3 gap-3.5">
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