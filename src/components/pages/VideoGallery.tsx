import { useState } from "react";
import { ArrowLeft, Calendar, Video as VideoIcon, X, Play, Clock } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  desc: string;
  date: string;
  cat: string;
  duration: string;
  thumb: string;
  src: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "वार्षिक स्नेहसंमेलन २०२५ — हायलाइट्स",
    desc: "नागपूर येथे पार पडलेल्या वार्षिक स्नेहसंमेलनाचा संपूर्ण सारांश, सांस्कृतिक कार्यक्रमांसह.",
    date: "१२ जाने २०२५",
    cat: "स्नेहसंमेलन",
    duration: "६:४२",
    thumb: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "अध्यक्षांचे मनोगत",
    desc: "मंडळाचे अध्यक्ष यांनी संमेलनात व्यक्त केलेले विचार व आगामी वर्षाचे नियोजन.",
    date: "१२ जाने २०२५",
    cat: "भाषण",
    duration: "३:१५",
    thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 3,
    title: "शैक्षणिक पुरस्कार वितरण सोहळा",
    desc: "गुणवंत विद्यार्थ्यांच्या सत्कार समारंभाचे संपूर्ण चित्रीकरण.",
    date: "०३ फेब्रु २०२५",
    cat: "शिक्षण",
    duration: "८:०५",
    thumb: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 4,
    title: "महिला मंडळ हस्तकला प्रात्यक्षिक",
    desc: "महिला मंडळाच्या सदस्यांनी सादर केलेले हस्तकला प्रात्यक्षिक व मुलाखती.",
    date: "१९ जून २०२५",
    cat: "महिला मंडळ",
    duration: "५:२८",
    thumb: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 5,
    title: "युवा क्रीडा स्पर्धा — अंतिम सामना",
    desc: "युवा क्रीडा स्पर्धेच्या अंतिम फेरीतील रोमहर्षक क्षण.",
    date: "०५ मार्च २०२५",
    cat: "क्रीडा",
    duration: "१०:५०",
    thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 6,
    title: "वृक्षारोपण उपक्रम — मुलाखती",
    desc: "पर्यावरण संवर्धन उपक्रमात सहभागी सदस्यांच्या प्रतिक्रिया.",
    date: "२२ मार्च २०२५",
    cat: "सामाजिक कार्य",
    duration: "४:३३",
    thumb: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 7,
    title: "होळी सण साजरा — झलक",
    desc: "रंगोत्सवाच्या धमाल क्षणांची एकत्रित झलक.",
    date: "१४ मार्च २०२५",
    cat: "सण-उत्सव",
    duration: "३:५८",
    thumb: "https://images.unsplash.com/photo-1615715661952-e5fd0d1af0e2?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 8,
    title: "रक्तदान शिबीर — अहवाल",
    desc: "रक्तदान शिबिरातील सहभाग व आरोग्य विभागाच्या मुलाखतीसह अहवाल.",
    date: "१० एप्रिल २०२५",
    cat: "सामाजिक कार्य",
    duration: "५:०७",
    thumb: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: 9,
    title: "ज्येष्ठ नागरिक सन्मान सोहळा",
    desc: "समाजातील ज्येष्ठ नागरिकांच्या सत्कार सोहळ्याचे चित्रीकरण.",
    date: "२८ एप्रिल २०२५",
    cat: "स्नेहसंमेलन",
    duration: "७:२२",
    thumb: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 10,
    title: "बालसंस्कार वर्ग — सादरीकरण",
    desc: "उन्हाळी बालसंस्कार वर्गाच्या समारोप सोहळ्यातील बालकांचे सादरीकरण.",
    date: "२ जून २०२५",
    cat: "शिक्षण",
    duration: "६:१०",
    thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  {
    id: 11,
    title: "कारागीर मेळावा — फेरफटका",
    desc: "स्थानिक कारागिरांच्या कलाकृती प्रदर्शन व विक्री मेळाव्याचा फेरफटका.",
    date: "१५ मे २०२५",
    cat: "सामाजिक कार्य",
    duration: "४:४५",
    thumb: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: 12,
    title: "क्रिकेट अजिंक्यपद स्पर्धा — अंतिम षटक",
    desc: "आंतर-विभागीय क्रिकेट स्पर्धेच्या अंतिम सामन्यातील निर्णायक षटक.",
    date: "७ जुलै २०२५",
    cat: "क्रीडा",
    duration: "९:३०",
    thumb: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  },
];

const categories = ["सर्व", ...Array.from(new Set(videos.map((v) => v.cat)))];

/*
  Every var() call carries a real fallback color (e.g. var(--maroon-950,#3A0A12))
  so this renders correctly with or without the app shell's --cream / --maroon-* /
  --gold-* / --paper / --ink tokens in scope. Matches the photo gallery page.
*/

export default function VideoGallery() {
  const [activeCat, setActiveCat] = useState("सर्व");
  const [selected, setSelected] = useState<VideoItem | null>(null);

  const list =
    activeCat === "सर्व" ? videos : videos.filter((v) => v.cat === activeCat);

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
              व्हिडिओ दालन
            </div>
            <div className="text-[11px] font-semibold tracking-wide text-[var(--ink-soft,#8A7570)]">
              VIDEO GALLERY
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
              चित्रफिती
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--paper,#FFFDF8)] mb-2 leading-tight">
              कोहळी समाज विकास मंडळ
            </div>
            <p className="text-[12.5px] sm:text-[13.5px] text-[var(--paper,#FFFDF8)]/75 leading-relaxed max-w-md">
              सोहळे, भाषणे आणि उपक्रमांचे जिवंत क्षण — पाहा, अनुभवा आणि
              पुन्हा त्या आठवणींमध्ये रमून जा.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] text-[var(--maroon-950,#3A0A12)] text-[11.5px] font-extrabold">
              <VideoIcon size={12} strokeWidth={2.5} />
              <span>{videos.length} व्हिडिओ</span>
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
              सर्व चित्रफिती
            </div>
            <h2 className="text-[17px] font-extrabold text-[var(--maroon-950,#3A0A12)] truncate">
              {activeCat === "सर्व" ? "अलीकडील व्हिडिओ" : activeCat}
            </h2>
          </div>
          <span className="flex-shrink-0 text-[11.5px] font-bold text-[var(--ink-soft,#8A7570)]">
            {list.length} व्हिडिओ
          </span>
        </div>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 lg:gap-4">
            {list.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                className="gallery-card group relative rounded-[18px] overflow-hidden bg-[var(--paper,#FFFDF8)] shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)] text-left transition-transform hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(58,10,18,0.4)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)]"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950,#3A0A12)]/85 via-[var(--maroon-950,#3A0A12)]/10 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[var(--paper,#FFFDF8)]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
                      <Play
                        size={18}
                        className="text-[var(--maroon-950,#3A0A12)] translate-x-[1.5px]"
                        strokeWidth={2.4}
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/65 text-white text-[10px] font-bold">
                    <Clock size={9.5} strokeWidth={2.4} />
                    {v.duration}
                  </span>

                  <span className="absolute top-2 left-2 max-w-[75%] truncate px-2.5 py-1 rounded-full bg-[var(--maroon-950,#3A0A12)] text-[var(--gold-300,#F3D98B)] text-[9.5px] font-extrabold">
                    {v.cat}
                  </span>
                </div>

                <div className="p-3">
                  <div className="text-[13px] font-extrabold text-[var(--maroon-950,#3A0A12)] leading-snug line-clamp-2 min-h-[2.4em] mb-1.5">
                    {v.title}
                  </div>
                  <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[var(--ink-soft,#8A7570)]">
                    <Calendar size={10} strokeWidth={2} />
                    {v.date}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-5 text-[var(--ink-soft,#8A7570)]">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--paper,#FFFDF8)] shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)] flex items-center justify-center">
              <VideoIcon size={24} className="text-[var(--maroon-700,#7A2035)]" strokeWidth={2} />
            </div>
            <div className="text-sm font-extrabold text-[var(--maroon-900,#4A0F1A)] mb-1">
              कोणतेही व्हिडिओ नाहीत
            </div>
            <div className="text-xs">या श्रेणीत अद्याप व्हिडिओ जोडलेले नाहीत.</div>
          </div>
        )}
      </div>

      {/* Video player drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-[2px] flex items-end md:items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full md:w-[560px] bg-[var(--paper,#FFFDF8)] rounded-t-[28px] md:rounded-[28px] overflow-hidden max-h-[90vh] flex flex-col shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile only) */}
            <div className="flex-shrink-0 pt-3 pb-1 md:hidden">
              <div className="w-9 h-1 rounded-full bg-[var(--maroon-950,#3A0A12)]/15 mx-auto" />
            </div>

            {/* Player */}
            <div className="relative flex-shrink-0 px-4 pt-2 md:p-4 md:pb-0">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                <video
                  key={selected.id}
                  src={selected.src}
                  poster={selected.thumb}
                  controls
                  autoPlay
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
                <div className="flex items-center gap-3 text-[11.5px] font-bold text-[var(--maroon-800,#611626)]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} strokeWidth={2.2} />
                    {selected.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} strokeWidth={2.2} />
                    {selected.date}
                  </span>
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