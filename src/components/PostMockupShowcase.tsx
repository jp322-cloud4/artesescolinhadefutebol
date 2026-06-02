import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
}

const CAROUSEL_IMAGES: CarouselItem[] = [
  {
    id: 1,
    image: "https://i.ibb.co/Z1VvxGFX/1.webp",
    title: "Divulgação de Treinos"
  },
  {
    id: 2,
    image: "https://i.ibb.co/9kVcVqRx/2.webp",
    title: "Matrículas Abertas"
  },
  {
    id: 3,
    image: "https://i.ibb.co/WvtVJ3tC/4.webp",
    title: "Flyer de Jogo"
  },
  {
    id: 4,
    image: "https://i.ibb.co/x8Kz4rbf/10.webp",
    title: "Dias e Horários"
  },
  {
    id: 5,
    image: "https://i.ibb.co/yngPbpfp/7.webp",
    title: "Peneira e Seletiva"
  },
  {
    id: 6,
    image: "https://i.ibb.co/dJf6QHcZ/8.webp",
    title: "Resultado da Partida"
  },
  {
    id: 7,
    image: "https://i.ibb.co/5gxhT757/9.webp",
    title: "Destaque do Atleta"
  },
  {
    id: 8,
    image: "https://i.ibb.co/Gvn65kXC/3.webp",
    title: "Comunicado Oficial"
  },
  {
    id: 9,
    image: "https://i.ibb.co/WWY4tF5k/5.webp",
    title: "Incentivo e Frase"
  },
  {
    id: 10,
    image: "https://i.ibb.co/JWQF6Mqm/d0c64597-f714-4b0c-b929-33b86278e22f.webp",
    title: "Dia de Jogo"
  },
  {
    id: 11,
    image: "https://i.ibb.co/s9stCQT4/Chat-GPT-Image-25-de-mai-de-2026-17-03-44.webp",
    title: "Inscrições Abertas"
  },
  {
    id: 12,
    image: "https://i.ibb.co/RpxQtGg2/Chat-GPT-Image-25-de-mai-de-2026-17-02-20.webp",
    title: "Peneira e Seletiva"
  }
];

export default function PostMockupShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPeeking, setIsPeeking] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsPeeking(true);
    }, 1000); // 1 second delay before starting

    const endTimeout = setTimeout(() => {
      setIsPeeking(false);
    }, 2000); // end after 1 second of animation duration

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(endTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const getOffset = (idx: number) => {
    let offset = idx - currentIndex;
    if (offset < -1) offset += CAROUSEL_IMAGES.length;
    if (offset > 1) offset -= CAROUSEL_IMAGES.length;
    return offset;
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-10 px-4 md:px-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 3D Perspective Container */}
      <div 
        className={`relative w-[85%] sm:w-[70%] md:w-[58%] max-w-[520px] aspect-square mx-auto flex items-center justify-center ${
          isPeeking ? "animate-carousel-peek" : ""
        }`}
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false}>
          {CAROUSEL_IMAGES.map((slide, idx) => {
            const offset = getOffset(idx);
            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            // Positioning & visual variables for 3D depth effect (making sides visible but not overlapping too much)
            const xVal = isPrev ? "-68%" : isNext ? "68%" : "0%";
            const scaleVal = isActive ? 1.0 : 0.85;
            const opacityVal = isActive ? 1.0 : isPrev || isNext ? 0.45 : 0;
            const rotateYVal = isPrev ? 20 : isNext ? -20 : 0;
            const zIndexVal = isActive ? 30 : isPrev || isNext ? 20 : 0;

            return (
              <motion.div
                key={slide.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  transformOrigin: "center center",
                }}
                animate={{
                  x: xVal,
                  scale: scaleVal,
                  opacity: opacityVal,
                  rotateY: rotateYVal,
                  zIndex: zIndexVal,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                }}
                onClick={() => {
                  if (isPrev) handlePrev();
                  if (isNext) handleNext();
                }}
                className={`rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-gray-200/20 select-none ${
                  isActive ? "cursor-default" : "cursor-pointer hover:opacity-75 transition-opacity"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle sheen highlight overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-black/25 pointer-events-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Styled Floating Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#071B33] shadow-xl flex items-center justify-center transition-all duration-250 hover:scale-108 active:scale-95 cursor-pointer z-40 outline-hidden border border-gray-100"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#071B33] shadow-xl flex items-center justify-center transition-all duration-250 hover:scale-108 active:scale-95 cursor-pointer z-40 outline-hidden border border-gray-100"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Bottom Nav Dot Indicators */}
      <div className="flex justify-center items-center gap-2.5 mt-8 relative z-40">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-xs cursor-pointer ${
              idx === currentIndex 
                ? "w-8 bg-[#16A34A]" 
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
