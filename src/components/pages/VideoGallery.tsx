import { useState } from "react";
import { ChevronLeft, Calendar, Video as VideoIcon, X, Play, Clock } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";

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

export default function VideoGallery() {
  const navigate = useNavigate();
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
        @keyframes hero-shine {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(320%) skewX(-12deg); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(212,175,55,0); }
        }
        @keyframes play-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .gallery-card {
          opacity: 0;
          transform: translateY(10px);
          animation: gallery-rise 0.45s ease forwards;
        }
        .hero-shine {
          animation: hero-shine 3.2s ease-in-out 0.4s 1;
        }
        .chip-row { -ms-overflow-style: none; scrollbar-width: none; }
        .chip-row::-webkit-scrollbar { display: none; }
        .count-badge { animation: badge-pulse 2.4s ease-in-out infinite; }
        .group:hover .play-btn { animation: play-pop 0.6s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .gallery-card { animation: none !important; opacity: 1 !important; transform: none !important; }
          .hero-shine { animation: none !important; }
          .count-badge { animation: none !important; }
          .group:hover .play-btn { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        {/* Header */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 pt-3 md:gap-4 md:pt-5">
          <SectionHeader eyebrow="Gallery" title="Video Gallery" />

          <button
            onClick={() => navigate("/home")}
            aria-label="Back"
            className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border border-[var(--gold-500,#D4AF37)]/30 bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-[0_6px_14px_-6px_rgba(58,10,18,0.5)] transition-transform duration-150 hover:brightness-110 active:scale-95 md:h-[40px] md:w-[40px]"
          >
            <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" strokeWidth={2.2} />
          </button>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_38%,var(--maroon-700)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-maroon)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-7 lg:px-10">
          {/* Diagonal weave texture */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.06)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.06)_0_1.5px,transparent_1.5px_26px)]" />

          {/* Gold corner flourish */}
          <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-[var(--gold-500,#D4AF37)]/10 blur-2xl md:h-44 md:w-44" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[var(--gold-400,#E6C765)]/10 blur-2xl" />

          {/* Shine sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-shine h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
          </div>

          <div className="relative">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--gold-400,#E9C46A)]">
              चित्रफिती
            </div>
            <div className="mb-2 text-xl font-extrabold leading-tight text-[var(--paper,#FFFDF8)] sm:text-2xl md:text-3xl">
              कोहळी समाज विकास मंडळ
            </div>
            <p className="max-w-md text-[12.5px] leading-relaxed text-[var(--paper,#FFFDF8)]/75 sm:text-[13.5px]">
              सोहळे, भाषणे आणि उपक्रमांचे जिवंत क्षण — पाहा, अनुभवा आणि
              पुन्हा त्या आठवणींमध्ये रमून जा.
            </p>
            <div className="count-badge mt-4 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] px-3 py-1.5 text-[11.5px] font-extrabold text-[var(--maroon-950,#3A0A12)]">
              <VideoIcon size={12} strokeWidth={2.5} />
              <span>{videos.length} व्हिडिओ</span>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="chip-row -mx-4 flex gap-2 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              aria-pressed={activeCat === cat}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-bold transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)] ${
                activeCat === cat
                  ? "bg-[linear-gradient(160deg,var(--maroon-800,#611626),var(--maroon-950,#3A0A12))] text-[var(--gold-300,#F3D98B)] shadow-[0_6px_16px_-6px_rgba(58,10,18,0.55)] ring-1 ring-[var(--gold-500,#D4AF37)]/40"
                  : "border border-[var(--maroon-950,#3A0A12)]/10 bg-[var(--paper,#FFFDF8)] text-[var(--maroon-900,#4A0F1A)] hover:border-[var(--gold-500,#D4AF37)]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="mx-auto flex w-full items-center justify-between gap-3 pt-3 md:gap-4 md:pt-5">
          <div className="mb-3.5 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[var(--gold-500)]" />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-600)]">
                  सर्व चित्रफिती
                </p>

                <h3 className="mt-0.5 text-[18px] font-extrabold tracking-tight text-[var(--maroon-700)] md:text-[20px] lg:text-[22px] font-['Yatra_One',cursive]">
                  {activeCat === "सर्व" ? "अलीकडील व्हिडिओ" : activeCat}
                </h3>
              </div>
            </div>
          </div>

          <span className="flex-shrink-0 text-[11.5px] font-bold text-[var(--ink-soft,#8A7570)]">
            {list.length} व्हिडिओ
          </span>
        </div>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {list.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                className="gallery-card group relative overflow-hidden rounded-[18px] bg-[var(--paper,#FFFDF8)] text-left shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(58,10,18,0.45)] hover:ring-1 hover:ring-[var(--gold-500,#D4AF37)]/50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500,#C99A3E)]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950,#3A0A12)]/85 via-[var(--maroon-950,#3A0A12)]/10 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-btn flex h-11 w-11 items-center justify-center rounded-full bg-[var(--paper,#FFFDF8)]/90 shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)] backdrop-blur-sm ring-2 ring-[var(--gold-500,#D4AF37)]/0 transition-all group-hover:ring-[var(--gold-500,#D4AF37)]/60">
                      <Play
                        size={18}
                        className="translate-x-[1.5px] text-[var(--maroon-950,#3A0A12)]"
                        strokeWidth={2.4}
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    <Clock size={9.5} strokeWidth={2.4} />
                    {v.duration}
                  </span>

                  <span className="absolute left-2 top-2 max-w-[75%] truncate rounded-full bg-[linear-gradient(160deg,var(--maroon-800,#611626),var(--maroon-950,#3A0A12))] px-2.5 py-1 text-[9.5px] font-extrabold text-[var(--gold-300,#F3D98B)] shadow-sm">
                    {v.cat}
                  </span>
                </div>

                <div className="p-3">
                  <div className="mb-1.5 text-[16px] font-extrabold leading-snug text-[var(--maroon-950)]">
                    {v.title}
                  </div>
                  <div className="flex items-center gap-1 text-[14px] font-semibold text-[var(--text-muted)]">
                    <Calendar size={10} strokeWidth={2} />
                    {v.date}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-5 py-16 text-center text-[var(--ink-soft,#8A7570)]">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--paper,#FFFDF8)] shadow-[0_8px_22px_-10px_rgba(58,10,18,0.3)]">
              <VideoIcon size={24} className="text-[var(--maroon-700,#7A2035)]" strokeWidth={2} />
            </div>
            <div className="mb-1 text-sm font-extrabold text-[var(--maroon-900,#4A0F1A)]">
              कोणतेही व्हिडिओ नाहीत
            </div>
            <div className="text-xs">या श्रेणीत अद्याप व्हिडिओ जोडलेले नाहीत.</div>
          </div>
        )}
      </div>

      {/* Video player drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 backdrop-blur-[2px] md:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-[var(--paper,#FFFDF8)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] md:w-[560px] md:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile only) */}
            <div className="flex-shrink-0 pb-1 pt-3 md:hidden">
              <div className="mx-auto h-1 w-9 rounded-full bg-[var(--maroon-950,#3A0A12)]/15" />
            </div>

            {/* Player */}
            <div className="relative flex-shrink-0 px-4 pt-2 md:p-4 md:pb-0">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <video
                  key={selected.id}
                  src={selected.src}
                  poster={selected.thumb}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="बंद करा"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X size={16} className="text-white" strokeWidth={2.4} />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="inline-block rounded-full bg-[linear-gradient(160deg,var(--gold-300,#F3D98B),var(--gold-500,#C99A3E))] px-2.5 py-1 text-[10.5px] font-extrabold text-[var(--maroon-950,#3A0A12)]">
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
              <h3 className="mb-2 text-[18px] font-extrabold leading-snug text-[var(--maroon-950,#3A0A12)]">
                {selected.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[var(--ink-soft,#8A7570)]">
                {selected.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}