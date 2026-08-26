import React, { useEffect, useState } from "react";

export interface BookDetailProps {
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

/* =====================================================
   MOBILE DETECTION HELPER
   iOS Safari and most Android WebViews cannot render
   PDFs inside a plain <iframe> — they just show blank.
   We detect that and swap to a wrapper viewer instead.
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
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-[var(--gold-500)]
            text-[var(--maroon-900)]
            transition-transform
            active:scale-90
          `
          : `
            flex h-9 w-9 items-center justify-center
            rounded-full
            border border-[var(--gold-400)]
            bg-[var(--paper)]
            text-[var(--maroon-900)]
            transition-colors
            hover:bg-[var(--gold-300)]/20
            active:scale-90
          `
      }
    >
      {children}
    </button>
  );
}

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <div
          className="
            flex h-8 w-8 shrink-0
            items-center justify-center
            rounded-lg
            bg-[var(--maroon-900)]
            text-[var(--gold-300)]
          "
        >
          {icon}
        </div>
      )}

      <div>
        <h2
          className="
            font-['Tiro_Devanagari_Marathi']
            text-base font-bold
            text-[var(--maroon-950)]
          "
        >
          {title}
        </h2>

        <div className="mt-1 h-0.5 w-9 bg-[var(--gold-500)]" />
      </div>
    </div>
  );
}

/* =====================================================
   BOOK COVER IMAGE
===================================================== */
function BookCoverImage({ image, title }: { image: string; title: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    image ? "loading" : "error"
  );

  useEffect(() => {
    setStatus(image ? "loading" : "error");
  }, [image]);

  return (
    <div className=" relative h-60 w-[180px] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--maroon-850)] to-[var(--maroon-700)] shadow-[0_14px_32px_rgba(44,5,13,0.25)] ring-1 ring-inset ring-[var(--gold-400)]/60 " >
      {status !== "error" && (
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-opacity duration-300 `}
          onLoad={() => setStatus("loaded")}
          onError={(e) => {
            console.warn("Book cover image failed to load:", image, e);
            setStatus("error");
          }}
        />
      )}

      {status === "error" && (
        <div
          className="
            flex h-full w-full
            flex-col items-center justify-center
            gap-2
            px-4
            text-center
          "
        >
          <svg
            className="h-8 w-8 text-[var(--gold-300)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
            <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
          </svg>
          <p className="font-['Noto_Sans_Devanagari'] text-[11px] leading-tight text-[var(--gold-300)]">
            {title}
          </p>
        </div>
      )}

      <div
        className="
          absolute bottom-0 left-0 right-0
          h-1.5
          bg-[var(--gold-500)]
        "
      />
    </div>
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
      ? `https://docs.google.com/viewer?url=${encodeURIComponent(
          pdfUrl
        )}&embedded=true`
      : pdfUrl;

  if (viewerFailed) {
    return (
      <div
        className="
          flex flex-col items-center justify-center
          gap-3
          rounded-xl
          border-4
          border-[var(--maroon-900)]
          bg-[var(--maroon-950)]
          px-6 py-10
          text-center
        "
      >
        <svg
          className="h-9 w-9 text-[var(--gold-300)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
          <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
        </svg>
        <p className="font-['Noto_Sans_Devanagari'] text-sm text-[var(--gold-300)]">
          हे पुस्तक येथे थेट दाखवता येत नाही.
          <br />
          कृपया खालील बटणावर टॅप करून वाचा.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-lg
            bg-[var(--gold-500)]
            px-4 py-2
            font-['Noto_Sans_Devanagari']
            text-sm font-semibold
            text-[var(--maroon-900)]
          "
        >
          PDF उघडा
        </a>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-xl
        border-4
        border-[var(--maroon-900)]
        bg-[var(--maroon-950)]
        p-1
        shadow-[0_15px_35px_rgba(44,5,13,0.25)]
      "
    >
      {/* Gold corner decorations */}
      <div
        className="
          pointer-events-none
          absolute left-1 top-1
          h-4 w-4
          border-l border-t
          border-[var(--gold-400)]
        "
      />
      <div
        className="
          pointer-events-none
          absolute right-1 top-1
          h-4 w-4
          border-r border-t
          border-[var(--gold-400)]
        "
      />
      <div
        className="
          pointer-events-none
          absolute bottom-1 left-1
          h-4 w-4
          border-b border-l
          border-[var(--gold-400)]
        "
      />
      <div
        className="
          pointer-events-none
          absolute bottom-1 right-1
          h-4 w-4
          border-b border-r
          border-[var(--gold-400)]
        "
      />

      <iframe
        key={viewerSrc}
        src={viewerSrc}
        title={`${title} PDF`}
        className="
          h-[65vh]
          min-h-[480px]
          w-full
          rounded-sm
          bg-white
        "
        onError={() => setViewerFailed(true)}
      />
    </div>
  );
}

export default function BookDetail({
  image,
  category,
  title,
  author,
  date,
  pages,
  description,
  highlights = [],
  pdfUrl = "",

  onBack = () => window.history.back(),
  onReadOnline,
  onBookmark = () => {},
  onShare = () => {},

  isBookmarked = false,
}: BookDetailProps) {
  const handleReadOnline = () => {
    if (onReadOnline) {
      onReadOnline();
      return;
    }

    document
      .getElementById("book-reader")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* =================================================
          TOP BAR
      ================================================= */}

      <header
        className="
          sticky top-0 z-40
          flex items-center justify-between
          border-b border-[var(--gold-400)]/50
          bg-[var(--paper)]/95
          px-3.5 py-3
          backdrop-blur-md
        "
      >
        <IconButton
          onClick={onBack}
          ariaLabel="मागे जा"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </IconButton>

        <div className="flex items-center gap-2">
          <IconButton
            onClick={handleShare}
            ariaLabel="पुस्तक शेअर करा"
          >
            <svg
              className="h-[15px] w-[15px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" />
            </svg>
          </IconButton>

          <IconButton
            onClick={onBookmark}
            active={isBookmarked}
            ariaLabel="पुस्तक जतन करा"
          >
            <svg
              className="h-[15px] w-[15px]"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 3.5h12v17l-6-3.8-6 3.8v-17Z" />
            </svg>
          </IconButton>
        </div>
      </header>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main className="px-5 pb-28 pt-5">

        {/* =================================================
            BOOK COVER
        ================================================= */}

        <div className="flex justify-center">
          <BookCoverImage image={image} title={title} />
        </div>

        {/* =================================================
            CATEGORY
        ================================================= */}

        <div className="mt-5 flex justify-center">
          <span
            className="
              rounded-full
              border border-[var(--gold-400)]
              bg-[var(--paper)]
              px-3 py-1
              font-['Noto_Sans_Devanagari']
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.4px]
              text-[var(--gold-700)]
            "
          >
            {category}
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1
          className="
            mt-3
            text-center
            font-['Tiro_Devanagari_Marathi']
            text-2xl
            font-bold
            leading-snug
            text-[var(--maroon-950)]
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-1
            text-center
            font-['Noto_Sans_Devanagari']
            text-sm
            text-[var(--text-muted)]
          "
        >
          {author}
        </p>

        {/* =================================================
            META
        ================================================= */}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span
            className="
              flex items-center gap-1.5
              rounded-full
              border border-[var(--gold-400)]
              bg-[var(--paper)]
              px-3 py-1.5
              font-['Noto_Sans_Devanagari']
              text-[12px]
              text-[var(--text-muted)]
            "
          >
            <svg
              className="h-[13px] w-[13px] text-[var(--gold-700)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>

            {date}
          </span>

          <span
            className="
              flex items-center gap-1.5
              rounded-full
              border border-[var(--gold-400)]
              bg-[var(--paper)]
              px-3 py-1.5
              font-['Noto_Sans_Devanagari']
              text-[12px]
              text-[var(--text-muted)]
            "
          >
            <svg
              className="h-[13px] w-[13px] text-[var(--gold-700)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>

            {pages} पाने
          </span>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="my-6 h-px bg-[var(--gold-400)]/40" />

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <section>
          <SectionTitle
            title="पुस्तकाबद्दल"
            icon={
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
                <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
              </svg>
            }
          />

          <p
            className="
              mt-4
              font-['Noto_Sans_Devanagari']
              text-sm
              leading-7
              text-[var(--text-muted)]
            "
          >
            {description}
          </p>
        </section>

        {/* =================================================
            HIGHLIGHTS
        ================================================= */}

        {highlights.length > 0 && (
          <section className="mt-7">
            <SectionTitle
              title="पुस्तकाची वैशिष्ट्ये"
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
                </svg>
              }
            />

            <div className="mt-4 space-y-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="
                    flex items-start gap-3
                    rounded-xl
                    border
                    border-[var(--gold-400)]/40
                    bg-[var(--paper)]
                    px-3.5 py-3
                  "
                >
                  <span
                    className="
                      mt-2
                      h-1.5 w-1.5
                      shrink-0
                      rounded-full
                      bg-[var(--gold-500)]
                    "
                  />

                  <p
                    className="
                      font-['Noto_Sans_Devanagari']
                      text-sm
                      leading-6
                      text-[var(--text-muted)]
                    "
                  >
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================
            BOOK DETAILS
        ================================================= */}

        <section className="mt-7">
          <SectionTitle
            title="पुस्तक तपशील"
            icon={
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            }
          />

          <div
            className="
              mt-4
              overflow-hidden
              rounded-xl
              border
              border-[var(--gold-400)]/50
              bg-[var(--paper)]
            "
          >
            <div
              className="
                flex items-center justify-between
                border-b
                border-[var(--gold-400)]/30
                px-4 py-3
              "
            >
              <span
                className="
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  text-[var(--text-muted)]
                "
              >
                लेखक / संपादक
              </span>

              <span
                className="
                  max-w-[55%]
                  text-right
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  font-semibold
                  text-[var(--maroon-950)]
                "
              >
                {author}
              </span>
            </div>

            <div
              className="
                flex items-center justify-between
                border-b
                border-[var(--gold-400)]/30
                px-4 py-3
              "
            >
              <span
                className="
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  text-[var(--text-muted)]
                "
              >
                प्रकाशन
              </span>

              <span
                className="
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  font-semibold
                  text-[var(--maroon-950)]
                "
              >
                {date}
              </span>
            </div>

            <div
              className="
                flex items-center justify-between
                px-4 py-3
              "
            >
              <span
                className="
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  text-[var(--text-muted)]
                "
              >
                एकूण पाने
              </span>

              <span
                className="
                  font-['Noto_Sans_Devanagari']
                  text-sm
                  font-semibold
                  text-[var(--maroon-950)]
                "
              >
                {pages}
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            PDF READER
        ================================================= */}

        {pdfUrl && (
          <section
            id="book-reader"
            className="mt-8 scroll-mt-20"
          >
            <div className="flex items-center justify-between">
              <SectionTitle
                title="ऑनलाइन वाचा"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
                    <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
                  </svg>
                }
              />

              <span
                className="
                  rounded-full
                  bg-[var(--gold-500)]/15
                  px-2.5 py-1
                  font-['Noto_Sans_Devanagari']
                  text-[10px]
                  font-semibold
                  text-[var(--gold-700)]
                "
              >
                PDF
              </span>
            </div>

            {/* Reader frame (handles desktop iframe + mobile viewer + failure fallback) */}
            <div className="mt-4">
              <PdfViewer pdfUrl={pdfUrl} title={title} />
            </div>

            <p
              className="
                mt-2
                text-center
                font-['Noto_Sans_Devanagari']
                text-[11px]
                text-[var(--text-muted)]
              "
            >
              खालील व्ह्यूअरमध्ये पुस्तक थेट वाचता येईल.
            </p>

            {/* Download */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-3
                flex w-full
                items-center justify-center gap-2
                rounded-xl
                border
                border-[var(--gold-400)]
                bg-[var(--paper)]
                py-3
                font-['Noto_Sans_Devanagari']
                text-sm
                font-semibold
                text-[var(--maroon-900)]
                transition-colors
                hover:bg-[var(--gold-300)]/20
                active:scale-[0.98]
              "
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>

              PDF डाउनलोड करा
            </a>
          </section>
        )}

        {/* =================================================
            RELATED BOOKS
        ================================================= */}

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <SectionTitle
              title="इतर पुस्तके"
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
                  <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
                </svg>
              }
            />

            <button
              type="button"
              className="
                font-['Noto_Sans_Devanagari']
                text-xs font-semibold
                text-[var(--gold-700)]
              "
            >
              सर्व पहा
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {/* Replace these with your actual related books */}
            <RelatedBook
              image={image}
              category={category}
              title={title}
              author={author}
            />

            <RelatedBook
              image={image}
              category={category}
              title={title}
              author={author}
            />
          </div>
        </section>
      </main>

      {/* =================================================
          STICKY BOTTOM CTA
      ================================================= */}

      <div
        className="
          fixed inset-x-0 bottom-0 z-50
          border-t
          border-[var(--gold-400)]/50
          bg-[var(--paper)]/95
          px-5 pb-5 pt-3
          backdrop-blur-md
        "
      >
        <button
          type="button"
          onClick={handleReadOnline}
          className="
            flex w-full
            items-center justify-center gap-2
            rounded-xl
            bg-gradient-to-r
            from-[var(--maroon-900)]
            to-[var(--maroon-700)]
            py-3.5
            font-['Noto_Sans_Devanagari']
            text-sm
            font-semibold
            text-[var(--gold-300)]
            shadow-[0_6px_18px_rgba(44,5,13,0.2)]
            transition-transform
            active:scale-[0.98]
          "
        >
          ऑनलाइन वाचा

          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}


/* =====================================================
   RELATED BOOK
===================================================== */

function RelatedBook({
  image,
  category,
  title,
  author,
}: {
  image: string;
  category: string;
  title: string;
  author: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      className="
        flex w-full
        items-center gap-3
        rounded-xl
        border
        border-[var(--gold-400)]
        bg-[var(--paper)]
        p-3
        text-left
        shadow-[0_2px_8px_rgba(74,17,25,0.05)]
        transition-transform
        active:scale-[0.98]
      "
    >
      <div
        className="
          h-[72px] w-[52px]
          shrink-0
          overflow-hidden
          rounded-md
          border-2
          border-[var(--gold-400)]
          bg-[var(--maroon-900)]
        "
      >
        {!imgError && image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-4 w-4 text-[var(--gold-300)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
              <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
            </svg>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            truncate
            font-['Noto_Sans_Devanagari']
            text-[10px]
            font-semibold
            uppercase
            tracking-wide
            text-[var(--gold-700)]
          "
        >
          {category}
        </p>

        <h3
          className="
            mt-0.5
            line-clamp-2
            font-['Tiro_Devanagari_Marathi']
            text-sm
            font-bold
            leading-5
            text-[var(--maroon-950)]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-0.5
            truncate
            font-['Noto_Sans_Devanagari']
            text-xs
            text-[var(--text-muted)]
          "
        >
          {author}
        </p>
      </div>

      <div
        className="
          flex h-8 w-8
          shrink-0
          items-center justify-center
          rounded-full
          bg-[var(--gold-500)]
          text-[var(--maroon-950)]
        "
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}