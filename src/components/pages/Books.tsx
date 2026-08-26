import { Link } from "react-router-dom";
import { books, type Book } from "../../data/books";
import SectionHeader from "../SectionHeader";
// import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function BookRow({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="
        flex w-full items-center gap-3 rounded-2xl
        border border-[var(--gold-400)]
        bg-[var(--paper)]
        p-3 text-left
        shadow-[0_1px_3px_rgba(0,0,0,0.06)]
        cursor-pointer
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_4px_12px_rgba(44,5,13,0.12)]
      "
    >
      <div
        className="
          relative h-16 w-16 shrink-0 overflow-hidden
          rounded-xl bg-gradient-to-br
          from-[var(--maroon-850)] to-[var(--maroon-700)]
          shadow-[inset_0_0_0_1px_var(--gold-400)]
        "
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--gold-500)]" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[var(--gold-700)]">
          {book.category}
        </span>

        <h3 className="m-0 truncate text-[15px] font-bold leading-[1.3] text-[var(--maroon-950)]">
          {book.title}
        </h3>

        <p className="m-0 truncate text-xs text-[var(--text-muted)]">
          {book.author}
        </p>

        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <span>{book.date}</span>

          <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--gold-500)]" />

          <span>{book.pages} पाने</span>
        </div>
      </div>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))]">
        <svg
          className="h-[15px] w-[15px] stroke-[var(--maroon-900)]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.6"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}

export default function Books() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <div className="flex flex-col gap-2.5 px-3.5 py-3">

        {/* Header */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4 lg:max-w-4xl xl:max-w-5xl">
          <SectionHeader eyebrow="Our Collection" title="Books" />

          <Link
            to="/"
            className="
              mb-3.5 flex h-[34px] w-[34px] shrink-0
              items-center justify-center rounded-full border
              bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))]
              shadow-sm transition-transform duration-150
              active:scale-95 md:h-[40px] md:w-[40px]
            "
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </Link>
        </div>

        {/* Books */}
        {books.map((book) => (
          <BookRow key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
