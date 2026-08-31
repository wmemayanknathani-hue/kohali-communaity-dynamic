import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import { books as allBooks, type Book } from "../../data/books";

import {
  ArrowLeft,
  // Share2,
  // Bookmark,
  Calendar,
  BookOpen,
  FileText,
  Download,
  ChevronRight,
  User,
} from "lucide-react";

export interface BookDetailProps {
  id: string | number;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  pages: string;
  description: string;
  highlights?: string[];
  pdfUrl?: string;

  onBack?: () => void;
  onReadOnline?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;

  isBookmarked?: boolean;
}

const CONTAINER = "mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl";


/* =====================================================
   MOBILE DETECTION HELPER
===================================================== */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(ua));
  }, []);

  return isMobile;
}

function IconButton({
  onClick,
  children,
  active = false,
  ariaLabel,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={
        active
          ? `
            flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center
            rounded-full
            bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]
            text-[var(--maroon-900)]
            shadow-[0_2px_8px_rgba(0,0,0,0.25)]
            transition-transform duration-200
            hover:scale-110 active:scale-90
          `
          : `
            flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center
            rounded-full
            border border-white/30
            bg-white/10
            text-white
            backdrop-blur-sm
            transition-all duration-200
            hover:bg-white/20 hover:scale-110 active:scale-90
          `
      }
    >
      {children}
    </button>
  );
}


/* =====================================================
   PDF VIEWER
===================================================== */
function PdfViewer({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  const isMobile = useIsMobile();
  const [viewerFailed, setViewerFailed] = useState(false);

  const viewerSrc =
    isMobile && !viewerFailed
      ? `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`
      : pdfUrl;

  if (viewerFailed) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-4 border-[var(--maroon-900)] bg-[var(--maroon-950)] px-6 py-10 text-center">
        <FileText className="h-9 w-9 text-[var(--gold-300)]" strokeWidth={1.6} />
        <p className="text-sm text-[var(--gold-300)]">
          हे पुस्तक येथे थेट दाखवता येत नाही.
          <br />
          कृपया खालील बटणावर टॅप करून वाचा.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-4 py-2 text-sm font-semibold text-[var(--maroon-900)] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          PDF उघडा
        </a>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border-4 border-[var(--maroon-900)] bg-[var(--maroon-950)] p-1 shadow-[0_15px_35px_rgba(44,5,13,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_44px_rgba(44,5,13,0.35)]">
      <div className="pointer-events-none absolute left-1 top-1 h-4 w-4 border-l border-t border-[var(--gold-400)]" />
      <div className="pointer-events-none absolute right-1 top-1 h-4 w-4 border-r border-t border-[var(--gold-400)]" />
      <div className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 border-b border-l border-[var(--gold-400)]" />
      <div className="pointer-events-none absolute bottom-1 right-1 h-4 w-4 border-b border-r border-[var(--gold-400)]" />

      <iframe
        key={viewerSrc}
        src={viewerSrc}
        title={`${title} PDF`}
        className="h-[65vh] min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px] w-full rounded-sm bg-white"
        onError={() => setViewerFailed(true)}
      />
    </div>
  );
}

/* =====================================================
   RELATED BOOK ROW (matches Books.tsx list styling)
===================================================== */
function RelatedBookRow({ book, index }: { book: Book; index: number }) {
  return (
    <Link to={`/books/${book.id}`} style={{ animationDelay: `${index * 70}ms` }} className=" group relative flex w-full items-center gap-3 md:gap-4 overflow-hidden rounded-2xl border border-[var(--gold-400)] bg-[var(--paper)] p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--gold-500)] hover:shadow-[0_10px_22px_rgba(44,5,13,0.14)] animate-[fadeUp_0.4s_ease-out_backwards] " >
      <div
        className="
          relative h-20 w-16 md:h-24 md:w-[76px] shrink-0 overflow-hidden rounded-xl
          bg-gradient-to-br from-[var(--maroon-850)] to-[var(--maroon-700)]
          shadow-[inset_0_0_0_1px_var(--gold-400)]
          transition-transform duration-300 ease-out
          group-hover:scale-[1.05] group-hover:-rotate-1
        "
      >
        <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--gold-500)]" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="
          inline-block rounded-full bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] px-2 py-[1px]
          text-[10px] font-bold uppercase tracking-[0.5px] text-[var(--gold-300)]
        ">
          {book.category}
        </span>

        <h3 className="m-0 mt-1 truncate text-[15px] md:text-base font-bold leading-[1.3] text-[var(--maroon-950)]">
          {book.title}
        </h3>
        <p className="m-0 truncate text-xs md:text-sm text-[var(--text-muted)]">{book.author}</p>

        <div className="mt-1.5 flex items-center gap-3 text-[11px] md:text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[var(--gold-600)]" strokeWidth={2.2} />
            {book.date}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-[var(--gold-600)]" strokeWidth={2.2} />
            {book.pages} पाने
          </span>
        </div>
      </div>

      <div className=" flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_2px_6px_rgba(180,140,20,0.35)] transition-transform duration-300 ease-out group-hover:translate-x-1 " >
        <ChevronRight className="h-4 w-4 text-[var(--maroon-900)]" strokeWidth={2.6} />
      </div>
    </Link>
  );
}

export default function BookDetail({
  id,
  image,
  category,
  title,
  author,
  date,
  pages,
  description,
  highlights = [],
  pdfUrl = "",

  onBack,
onReadOnline,
  // onBookmark = () => {},
  // onShare = () => {},

  // isBookmarked = false,
}: BookDetailProps) {
   const navigate = useNavigate();

    const handleBack = () => {
      if (onBack) {
        onBack();
        return;
      }

      navigate("/books");
    };
  const handleReadOnline = () => {
    if (onReadOnline) {
      onReadOnline();
      return;
    }
    document.getElementById("book-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // const handleShare = async () => {
  //   if (onShare) {
  //     onShare();
  //     return;
  //   }
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({ title, text: description, url: window.location.href });
  //     } catch {
  //       // cancelled
  //     }
  //   }
  // };

  // real, non-repeating related books: prefer same category, exclude current book
  const relatedBooks = React.useMemo(() => {
    const others = allBooks.filter((b) => String(b.id) !== String(id));
    const sameCategory = others.filter((b) => b.category === category);
    const rest = others.filter((b) => b.category !== category);
    return [...sameCategory, ...rest].slice(0, 4);
  }, [id, category]);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes coverIn {
          from { opacity: 0; transform: translateY(10px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shine {
          0% { transform: translateX(-120%) rotate(8deg); }
          100% { transform: translateX(220%) rotate(8deg); }
        }
      `}</style>


      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      {/* pb-24 leaves room for the sticky CTA bar so it never covers content */}
      <main className={`${CONTAINER} px-4 pb-6 pt-6 md:px-6 md:pt-9 lg:px-8 xl:px-0`}>
        
      {/* =================================================
          MAROON HERO
          NOTE: cover+info switches to a side-by-side row only
          at `lg` (1024px). iPad portrait (768px) lands right on
          the old `md` breakpoint, which made the row feel cramped
          and inconsistent between portrait/landscape on the same
          device. Now portrait iPad stays stacked/centered, and
          landscape iPad (and up) gets the row layout.
      ================================================= */}
      <div className="mb-5 relative mt-0 overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_38%,var(--maroon-700)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-maroon)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-7 lg:px-10">
       {/* diagonal cross-hatch texture */}
          <div
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]"
          />

        <div className={`relative`}>
          <div className="flex items-center justify-between">
            <IconButton onClick={handleBack} ariaLabel="मागे जा">
              <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            </IconButton>

            {/* <div className="flex items-center gap-2">
              <IconButton onClick={handleShare} ariaLabel="पुस्तक शेअर करा">
                <Share2 className="h-[15px] w-[15px]" strokeWidth={2} />
              </IconButton>
              <IconButton onClick={onBookmark} active={isBookmarked} ariaLabel="पुस्तक जतन करा">
                <Bookmark className="h-[15px] w-[15px]" strokeWidth={2} fill={isBookmarked ? "currentColor" : "none"} />
              </IconButton>
            </div> */}
          </div>

          {/* cover + info: stacked/centered through iPad portrait, side-by-side from lg (iPad landscape) up */}
          <div className="mt-0 flex flex-col items-center gap-6 text-center md:mt-8 lg:flex-row lg:items-center lg:gap-8 lg:text-left">
            <div className=" group relative h-56 w-[168px] shrink-0 md:h-64 md:w-[188px] lg:h-72 lg:w-[208px] overflow-hidden rounded-2xl shadow-[0_20px_44px_rgba(0,0,0,0.4)] ring-2 ring-[var(--gold-400)]/70 transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:rotate-[-1deg] animate-[coverIn_0.6s_ease-out_backwards] " >
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[var(--gold-500)]" />
            </div>

            <div className="flex flex-1 flex-col items-center lg:items-start">
              <span className=" inline-block rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-3 py-1 font-['Noto_Sans_Devanagari'] text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--maroon-900)] shadow-[0_3px_10px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-105 " >
                {category}
              </span>

              <h1 className="mt-3 max-w-md lg:max-w-lg text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-bold leading-snug text-white">
                {title}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm md:text-base text-[var(--gold-300)]">
                <User className="h-[13px] w-[13px]" strokeWidth={2} />
                {author}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20">
                  <Calendar className="h-[13px] w-[13px] text-[var(--gold-300)]" strokeWidth={2} />
                  {date}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20">
                  <BookOpen className="h-[13px] w-[13px] text-[var(--gold-300)]" strokeWidth={2} />
                  {pages} पाने
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/*
          Description + details grid.
          Was `md:grid-cols-2` with the description div claiming
          `md:col-span-3` — a 3-span item in a 2-column grid, which
          never produced the intended 3:2 split and made iPad
          portrait (768px) render inconsistently. Fixed to a proper
          5-column grid (3:2 split) that only activates at `lg`
          (iPad landscape+), so iPad portrait stays single-column
          and readable.
        */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-8">
          <div className="lg:col-span-3">
            {/* DESCRIPTION */}
            <section>
              <SectionHeader eyebrow="Introduction" title="पुस्तकाबद्दल" />
              <p className="mt-3 text-sm md:text-[15px] leading-7 text-[var(--text-muted)]">
                {description}
              </p>
            </section>

            {/* HIGHLIGHTS */}
            {highlights.length > 0 && (
              <section className="mt-6">
                <SectionHeader eyebrow="Key Highlights" title="पुस्तकाची वैशिष्ट्ये" />
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map((highlight, i) => (
                    <div
                      key={highlight}
                      style={{ animationDelay: `${i * 60}ms` }}
                      className="group flex items-start gap-3 rounded-xl border border-[var(--gold-500)] bg-[var(--paper)] px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--gold-600)] hover:shadow-[0_6px_16px_rgba(44,5,13,0.1)] animate-[fadeUp_0.4s_ease-out_backwards]"
                    >
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-[var(--maroon-900)] shadow-sm transition-transform duration-200 group-hover:scale-110"
                        style={{ background: "linear-gradient(160deg, var(--gold-300), var(--gold-500))" }}
                      >
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-6 font-bold text-[var(--text-muted)]">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-6 lg:col-span-2 lg:mt-0">
            {/* BOOK DETAILS */}
            <section>
              <SectionHeader eyebrow="Information" title="पुस्तक तपशील" />
              <div className="mt-3 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">
                {[
                  { label: "लेखक / संपादक", value: author, Icon: User },
                  { label: "प्रकाशन", value: date, Icon: Calendar },
                  { label: "एकूण पाने", value: pages, Icon: BookOpen },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex items-center gap-3 px-4 py-3 md:py-3.5 transition-colors duration-150 hover:bg-[var(--gold-300)]/10 ${
                      i < arr.length - 1 ? "border-b border-[var(--gold-400)]/30" : ""
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]  shadow-sm"
                      style={{ background: "linear-gradient(160deg, var(--gold-300), var(--gold-500))" }}
                    >
                      <row.Icon className="h-[15px] w-[15px] text-[var(--maroon-900)]" strokeWidth={2.2} />
                    </span>
                    <div>
                      <span className="font-display block text-[14px] font-bold text-[var(--ink)] md:text-[14px]">
                        {row.label}
                      </span>
                      <span className="font-mr block text-[12px] text-[var(--text-muted)]">
                        {row.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* PDF READER */}
        {pdfUrl && (
          <section
            id="book-reader"
            className="mt-6"
          >
            <div className="flex items-center justify-between">
              <SectionHeader eyebrow="Digital Reading" title="ऑनलाइन वाचा" />
              <span className="rounded-full bg-[var(--maroon-700)] px-2.5 py-1 text-[12px] font-semibold text-white">
                PDF
              </span>
            </div>

            <div className="mt-3">
              <PdfViewer pdfUrl={pdfUrl} title={title} />
            </div>

            <p className="mt-2 text-center text-[14px] text-[var(--text-muted)]">
              खालील व्ह्यूअरमध्ये पुस्तक थेट वाचता येईल.
            </p>

            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className=" mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--gold-400)] bg-[var(--cream)] py-3 text-sm font-semibold text-[var(--maroon-900)] transition-all duration-200 hover:bg-[var(--gold-300)]/20 hover:border-[var(--gold-500)] active:scale-[0.98] " >
              <Download className="h-4 w-4" strokeWidth={2} />
              PDF डाउनलोड करा
            </a>
          </section>
        )}

        {/* RELATED BOOKS — same row style as Books.tsx, real distinct data */}
        {relatedBooks.length > 0 && (
          <section className="mt-6">
            <div className="">
              <SectionHeader eyebrow="More to Explore" title="इतर पुस्तके" actionLabel="सर्व पहा" actionTo="/books" />
            </div>

            <div className="mt-3 grid gap-2.5 md:grid-cols-2">
              {relatedBooks.map((b, i) => (
                <RelatedBookRow key={b.id} book={b} index={i} />
              ))}
            </div>
          </section>
        )}
         <button type="button" onClick={handleReadOnline} className="mt-5 group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--maroon-900)] to-[var(--maroon-700)] py-3.5 md:py-4 text-sm md:text-base font-semibold text-[var(--gold-300)] shadow-[0_6px_18px_rgba(44,5,13,0.2)] transition-all duration-200 hover:shadow-[0_10px_26px_rgba(44,5,13,0.3)] active:scale-[0.98] " >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
            ऑनलाइन वाचा
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.4} />
          </button>

      </main>
    </div>
  );
}