import { useState } from "react";
import { ArrowLeft, Calendar, Image as ImageIcon, X } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  desc: string;
  date: string;
  cat: string;
  img: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: "वार्षिक स्नेहसंमेलन २०२५",
    desc: "नागपूर येथे पार पडलेल्या वार्षिक स्नेहसंमेलनातील एक क्षण, ज्यात मंडळाचे सर्व सदस्य कुटुंबासह सहभागी झाले होते.",
    date: "१२ जाने २०२५",
    cat: "स्नेहसंमेलन",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80",
  },
  {
    id: 2,
    title: "शैक्षणिक पुरस्कार वितरण",
    desc: "गुणवंत विद्यार्थ्यांचा सत्कार समारंभ — शैक्षणिक क्षेत्रात उल्लेखनीय कामगिरी करणाऱ्या विद्यार्थ्यांना सन्मानित करण्यात आले.",
    date: "०३ फेब्रु २०२५",
    cat: "शिक्षण",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
  },
  {
    id: 3,
    title: "महिला मंडळ बैठक",
    desc: "महिला मंडळाची त्रैमासिक बैठक, आगामी उपक्रमांच्या नियोजनासाठी आयोजित करण्यात आली.",
    date: "१८ फेब्रु २०२५",
    cat: "महिला मंडळ",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&q=80",
  },
  {
    id: 4,
    title: "युवा क्रीडा स्पर्धा",
    desc: "समाजातील युवकांसाठी आयोजित क्रीडा स्पर्धेतील विजेत्यांसह गटछायाचित्र.",
    date: "०५ मार्च २०२५",
    cat: "क्रीडा",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
  },
  {
    id: 5,
    title: "वृक्षारोपण उपक्रम",
    desc: "पर्यावरण संवर्धनासाठी मंडळातर्फे राबविण्यात आलेला वृक्षारोपण कार्यक्रम.",
    date: "२२ मार्च २०२५",
    cat: "सामाजिक कार्य",
    img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80",
  },
  {
    id: 6,
    title: "होळी सण साजरा",
    desc: "रंगांच्या उत्सवात सर्व सदस्य कुटुंबियांसह सहभागी झाले.",
    date: "१४ मार्च २०२५",
    cat: "सण-उत्सव",
    img: "https://images.unsplash.com/photo-1615715661952-e5fd0d1af0e2?w=500&q=80",
  },
  {
    id: 7,
    title: "रक्तदान शिबीर",
    desc: "आरोग्य विभागाच्या सहकार्याने आयोजित रक्तदान शिबिरातील स्वयंसेवक.",
    date: "१० एप्रिल २०२५",
    cat: "सामाजिक कार्य",
    img: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80",
  },
  {
    id: 8,
    title: "ज्येष्ठ नागरिक सन्मान",
    desc: "समाजातील ज्येष्ठ नागरिकांचा विशेष सत्कार सोहळा.",
    date: "२८ एप्रिल २०२५",
    cat: "स्नेहसंमेलन",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
  },
  {
    id: 9,
    title: "कारागीर मेळावा",
    desc: "स्थानिक कारागिरांच्या कलाकृतींचे प्रदर्शन व विक्री मेळावा.",
    date: "१५ मे २०२५",
    cat: "सामाजिक कार्य",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&q=80",
  },
  {
    id: 10,
    title: "बालसंस्कार वर्ग समारोप",
    desc: "उन्हाळी बालसंस्कार वर्गाचा समारोप सोहळा, बालकांचे सादरीकरण.",
    date: "२ जून २०२५",
    cat: "शिक्षण",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
  },
  {
    id: 11,
    title: "महिला मंडळ हस्तकला प्रदर्शन",
    desc: "महिला मंडळाच्या सदस्यांनी तयार केलेल्या हस्तकलांचे प्रदर्शन.",
    date: "१९ जून २०२५",
    cat: "महिला मंडळ",
    img: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=500&q=80",
  },
  {
    id: 12,
    title: "क्रिकेट अजिंक्यपद स्पर्धा",
    desc: "आंतर-विभागीय क्रिकेट स्पर्धेच्या अंतिम सामन्यातील विजेता संघ.",
    date: "७ जुलै २०२५",
    cat: "क्रीडा",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80",
  },
];

const categories = ["सर्व", ...Array.from(new Set(photos.map((p) => p.cat)))];

/*
  Fallback colors are baked into every var() call (e.g. var(--maroon-950,#3A0A12))
  so the page renders correctly even if this component is previewed outside the
  app shell that defines --cream / --maroon-* / --gold-* / --paper / --ink tokens.
  If your app already defines those tokens, the fallback is simply ignored.
*/

export default function Gallery() {
  const [activeCat, setActiveCat] = useState("सर्व");
  const [selected, setSelected] = useState<Photo | null>(null);

  const list =
    activeCat === "सर्व" ? photos : photos.filter((p) => p.cat === activeCat);

  return (
    <div className="min-h-screen bg-[var(--cream,#F7F1E6)] text-[var(--ink,#2A1416)] pb-12">
      <style>{`
        @keyframes gallery-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        .gallery-card {
          opacity: 0;
          transform: translateY(10px);
          animation: gallery-rise 0.45s ease forwards;
        }
        .chip-row { -ms-overflow-style: none; scrollbar-width: none; }
        .chip-row::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .gallery-card { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-[var(--cream,#F7F1E6)]/95 backdrop-blur-sm flex items-center gap-3 py-3.5 border-b border-[var(--maroon-950,#3A0A12)]/10">
          <button
            onClick={() => window.history.back()}
            aria-label="मागे जा"
            className="w-[38px] h-[38px] rounded-xl bg-[var(--paper,#FFFDF8)] border border-[var(--maroon-950,#3A0A12)]/10 shadow-[0_8px_20px_-10px_rgba(58,10,18,0.3)] flex items-center justify-center flex-shrink-0 transition-transform active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)]"
          >
            <ArrowLeft size={18} className="text-[var(--maroon-900,#4A0F1A)]" strokeWidth={2.4} />
          </button>
          <div className="min-w-0">
            <div className="text-lg font-extrabold text-[var(--maroon-950,#3A0A12)] leading-tight truncate">
              छायाचित्र दालन
            </div>
            <div className="text-[11px] font-semibold tracking-wide text-[var(--ink-soft,#8A7570)]">
              PHOTO GALLERY
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="relative mt-4 rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[var(--maroon-950,#3A0A12)] via-[var(--maroon-800,#611626)] to-[var(--maroon-700,#7A2035)] shadow-[0_10px_28px_-12px_rgba(58,10,18,0.3)] overflow-hidden">
          <div
            className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, var(--gold-400,#E9C46A), transparent 70%)" }}
          />
          <div className="relative">
            <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[var(--gold-400,#E9C46A)] mb-2">
              क्षणचित्रे
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--paper,#FFFDF8)] mb-2 leading-tight">
              कोहळी समाज विकास मंडळ
            </div>
            <p className="text-[12.5px] sm:text-[13.5px] text-[var(--paper,#FFFDF8)]/75 leading-relaxed max-w-md">
              मंडळाच्या स्नेहसंमेलनांपासून सामाजिक उपक्रमांपर्यंत — प्रत्येक
              आठवणीचा एक क्षण, एकाच ठिकाणी जतन केलेला.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] text-[var(--maroon-950,#3A0A12)] text-[11.5px] font-extrabold">
              <ImageIcon size={12} strokeWidth={2.5} />
              <span>{photos.length} छायाचित्रे</span>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="chip-row flex gap-2 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              aria-pressed={activeCat === cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)] ${
                activeCat === cat
                  ? "bg-[linear-gradient(160deg,var(--maroon-800,#611626),var(--maroon-950,#3A0A12))] text-[var(--gold-300,#F3D98B)] shadow-[0_6px_14px_-6px_rgba(58,10,18,0.4)]"
                  : "bg-[var(--paper,#FFFDF8)] text-[var(--maroon-900,#4A0F1A)] border border-[var(--maroon-950,#3A0A12)]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="flex items-baseline justify-between gap-3 mb-3 mt-1">
          <div className="min-w-0">
            <div className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[var(--gold-500,#C99A3E)] mb-1">
              सर्व अल्बम
            </div>
            <h2 className="text-[17px] font-extrabold text-[var(--maroon-950,#3A0A12)] truncate">
              {activeCat === "सर्व" ? "अलीकडील छायाचित्रे" : activeCat}
            </h2>
          </div>
          <span className="flex-shrink-0 text-[11.5px] font-bold text-[var(--ink-soft,#8A7570)]">
            {list.length} छायाचित्रे
          </span>
        </div>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
            {list.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                className="gallery-card group relative rounded-[18px] overflow-hidden bg-[var(--paper,#FFFDF8)] shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)] text-left transition-transform hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(58,10,18,0.4)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)]"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950,#3A0A12)]/85 via-[var(--maroon-950,#3A0A12)]/10 to-transparent" />
                  <span className="absolute top-2 left-2 max-w-[85%] truncate px-2.5 py-1 rounded-full bg-[var(--maroon-950,#3A0A12)] text-[var(--gold-300,#F3D98B)] text-[9.5px] font-extrabold">
                    {p.cat}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <div className="text-[12.5px] font-extrabold text-[var(--paper,#FFFDF8)] leading-tight line-clamp-2 min-h-[2.35em] mb-1">
                      {p.title}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[var(--gold-300,#F3D98B)]">
                      <Calendar size={10} strokeWidth={2} />
                      {p.date}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-5 text-[var(--ink-soft,#8A7570)]">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--paper,#FFFDF8)] shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)] flex items-center justify-center">
              <ImageIcon size={24} className="text-[var(--maroon-700,#7A2035)]" strokeWidth={2} />
            </div>
            <div className="text-sm font-extrabold text-[var(--maroon-900,#4A0F1A)] mb-1">
              कोणतीही छायाचित्रे नाहीत
            </div>
            <div className="text-xs">या श्रेणीत अद्याप छायाचित्रे जोडलेली नाहीत.</div>
          </div>
        )}
      </div>

      {/* Info drawer / lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px] flex items-end md:items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full md:w-[440px] bg-[var(--paper,#FFFDF8)] rounded-t-[28px] md:rounded-[28px] overflow-hidden max-h-[85vh] flex flex-col shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile only) */}
            <div className="flex-shrink-0 pt-3 pb-1 md:hidden">
              <div className="w-9 h-1 rounded-full bg-[var(--maroon-950,#3A0A12)]/15 mx-auto" />
            </div>

            {/* Image */}
            <div className="relative flex-shrink-0 px-4 pt-2 md:p-4 md:pb-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--maroon-950,#3A0A12)]">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="बंद करा"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X size={16} className="text-white" strokeWidth={2.4} />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="overflow-y-auto px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] text-[var(--maroon-950,#3A0A12)] text-[10.5px] font-extrabold">
                  {selected.cat}
                </span>
                <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[var(--maroon-800,#611626)]">
                  <Calendar size={13} strokeWidth={2.2} />
                  {selected.date}
                </div>
              </div>
              <h3 className="text-[18px] font-extrabold text-[var(--maroon-950,#3A0A12)] leading-snug mb-2">
                {selected.title}
              </h3>
              <p className="text-[13.5px] text-[var(--ink-soft,#8A7570)] leading-relaxed">
                {selected.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}