import { Link } from "react-router-dom";
import { books, type Book } from "../../data/books";
import SectionHeader from "../SectionHeader";
import { ChevronLeft, Calendar, BookOpen, ChevronRight } from "lucide-react";

function BookRow({ book, index }: { book: Book; index: number }) {
  return (
    <Link
      to={`/books/${book.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="
        group relative flex w-full items-center gap-3
        rounded-2xl border border-[var(--gold-400)]
        bg-[var(--paper)] p-3
        shadow-[0_1px_3px_rgba(0,0,0,0.06)]
        cursor-pointer overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-[var(--gold-500)]
        hover:shadow-[0_10px_22px_rgba(44,5,13,0.14)]
        animate-[fadeUp_0.45s_ease-out_backwards]
      "
    >
      {/* soft gold wash that sweeps in on hover */}
      <div className=" pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.08),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full " />

     <div className=" relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--maroon-850)] to-[var(--maroon-700)] shadow-[inset_0_0_0_1px_var(--gold-400)] transition-transform duration-300 ease-out group-hover:scale-[1.05] group-hover:rotate-[-1.5deg] " >
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--gold-500)]" />
      </div>

      <div className="min-w-0 flex-1">
        <span
        className="
          inline-block rounded-full bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] px-2 py-[1px]
          text-[10px] font-bold uppercase tracking-[0.5px] text-[var(--gold-300)]
        "
      >
        {book.category}
      </span>

        <h3 className="m-0 mt-1 truncate text-[15px] font-bold leading-[1.3] text-[var(--maroon-950)]">
          {book.title}
        </h3>

        <p className="m-0 truncate text-xs text-[var(--text-muted)]">
          {book.author}
        </p>

        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
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

      <div className=" relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_2px_6px_rgba(180,140,20,0.35)] transition-transform duration-300 ease-out group-hover:translate-x-1 " >
        <ChevronRight className="h-4 w-4"/>
      </div>
    </Link>
  );
}

export default function Books() {
  return (
    <div className="">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex flex-col gap-2.5 px-3.5 py-3">
        <div className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-3xl md:gap-4 lg:max-w-4xl xl:max-w-5xl">
          <SectionHeader eyebrow="Our Collection" title="Books" />

          <Link to="/" className=" mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 active:scale-95 md:h-[40px] md:w-[40px] " >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </Link>
        </div>

        <div className="mx-auto flex w-full flex-col gap-2.5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          {books.map((book, i) => (
            <BookRow key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}