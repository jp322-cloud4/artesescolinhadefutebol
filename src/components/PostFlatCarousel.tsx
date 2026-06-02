import { motion } from "motion/react";

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

// Duplicate the list of images to create a seamless infinite loop
const SEAMLESS_IMAGES = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

export default function PostFlatCarousel() {
  return (
    <div className="relative w-full py-4 overflow-hidden select-none">
      {/* Elegantly fade the edges to focus on center content */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-linear-to-r from-ice via-ice/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-linear-to-l from-ice via-ice/60 to-transparent z-10 pointer-events-none" />

      {/* Repeating track wrapper */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6 pr-4 md:pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 48,
            repeat: Infinity,
          }}
        >
          {SEAMLESS_IMAGES.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-none w-[200px] sm:w-[260px] md:w-[320px] relative rounded-[20px] overflow-hidden aspect-square bg-slate-900 border border-[#071B33]/10 shadow-[0_4px_20px_rgba(7,27,51,0.08)] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Soft sheen effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-black/10 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
