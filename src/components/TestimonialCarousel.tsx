import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCheck, 
  ArrowLeft, 
  Phone, 
  Paperclip, 
  MoreVertical, 
  Smile, 
  Camera, 
  Mic 
} from "lucide-react";

interface Testimonial {
  id: number;
  clientName: string;
  avatar: string;
  badgeText: string;
  clientMessage: string;
  clientTime: string;
  businessMessage: string;
  businessTime: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    clientName: "Felipe Ramos",
    avatar: "https://ogimg.infoglobo.com.br/in/16843710-d8f-bab/FT1086A/10995427_436092376574325_6200206639059942670_n.jpg",
    badgeText: "O Instagram da escolinha ficou muito mais profissional!",
    clientMessage: "Eu só troquei o nome da escolinha, coloquei os horários dos treinos e postei. Ficou bem mais bonito do que as artes que eu fazia antes. Já recebi mensagem de pais perguntando sobre matrícula.",
    clientTime: "11:53",
    businessMessage: "Que ótimo, professor! Ficamos muito felizes em saber. A ideia do pack é justamente facilitar a divulgação da escolinha sem precisar criar tudo do zero. ⚽",
    businessTime: "11:55"
  },
  {
    id: 2,
    clientName: "Rodrigo Carlos",
    avatar: "https://ogimg.infoglobo.com.br/in/22286655-81b-b82/FT1086A/reproducao-facebook.jpg",
    badgeText: "Matrículas aumentaram nessa semana!",
    clientMessage: "Excepcional! Com as artes prontas, comecei a postar a divulgação das matrículas abertas de inverno. Conseguimos agendar 5 novas visitas de pais para conhecer o treino só nessa semana. O visual profissional passa muita confiança.",
    clientTime: "11:54",
    businessMessage: "Que gol de placa, Carlos! Foco total nos treinos agora. Parabéns pelos novos alunos! ⚽🚀",
    businessTime: "11:55"
  },
  {
    id: 3,
    clientName: "Amanda Costa",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJCOOR4fkQkMdMEPW3EGhf_CdOb-uwagyCA&s",
    badgeText: "Ficou lindo, muito fácil de editar!",
    clientMessage: "Ficou maravilhoso! Consigo editar direto pelo celular em 5 minutos. Mudo as cores para as da nossa escola e coloco nosso escudo. Até as fotos dos alunos parecem de time profissional agora.",
    clientTime: "11:52",
    businessMessage: "Show de bola, Amanda! Ver a evolução dos alunos com um design de alta qualidade faz toda a diferença. Obrigado pelo carinho! 🙌",
    businessTime: "11:55"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        slideNext();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.97,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div
      id="testemunhos-carousel"
      className="relative w-full max-w-lg mx-auto px-2 md:px-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden min-h-[450px] sm:min-h-[410px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center py-4"
          >
            {/* Visual highlight badge */}
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#16A34A]/15 text-[#071B33] uppercase tracking-wide border border-[#16A34A]/25 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                {current.badgeText}
              </span>
            </div>

            {/* HIGH FIDELITY WHATSAPP "PRINT SCREEN" CARD */}
            <div className="w-full bg-[#efeae2] rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
              
              {/* WhatsApp Premium Title Bar */}
              <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center justify-between select-none shadow-sm">
                <div className="flex items-center gap-1.5">
                  <ArrowLeft className="w-5 h-5 cursor-pointer hover:opacity-80 shrink-0" />
                  <img
                    src={current.avatar}
                    alt={current.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="leading-tight ml-0.5">
                    <h4 className="font-whatsapp font-bold text-[14.5px] sm:text-[15px] text-white flex items-center gap-1">
                      {current.clientName}
                    </h4>
                    <span className="text-[11px] text-emerald-100 font-light block font-whatsapp select-none">online</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white">
                  <Phone className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
                  <Paperclip className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
                  <MoreVertical className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
                </div>
              </div>

              {/* Chat Content Panel */}
              <div 
                className="p-4 space-y-4 flex flex-col relative min-h-[230px] justify-end"
                style={{
                  backgroundColor: "#efeae2",
                  backgroundImage: "radial-gradient(#dfdcd6 1px, transparent 0)",
                  backgroundSize: "16px 16px"
                }}
              >
                {/* Received Bubble (Client) */}
                <div className="max-w-[85%] rounded-[10px] pt-2 px-3 pb-4 shadow-sm relative bg-white self-start mr-auto rounded-tl-none">
                  {/* Pointed corner tail */}
                  <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                  
                  <p className="font-whatsapp text-[14.5px] text-[#111111] font-normal leading-[1.38] tracking-normal whitespace-pre-line pr-6">
                    {current.clientMessage}
                  </p>
                  
                  <div className="absolute bottom-1 right-2 font-whatsapp text-[10px] text-[#788285] select-none">
                    {current.clientTime}
                  </div>
                </div>

                {/* Sent Bubble (Business) */}
                <div className="max-w-[85%] rounded-[10px] pt-2 px-3 pb-4 shadow-sm relative bg-[#dcf8c6] self-end ml-auto rounded-tr-none">
                  {/* Pointed corner tail */}
                  <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[8px] border-t-[#dcf8c6] border-r-[8px] border-r-transparent" />
                  
                  <p className="font-whatsapp text-[14.5px] text-[#111111] font-normal leading-[1.38] tracking-normal whitespace-pre-line pr-8">
                    {current.businessMessage}
                  </p>
                  
                  <div className="absolute bottom-1 right-2 flex items-center gap-1 font-whatsapp text-[10px] text-[#5e776a] font-normal select-none">
                    <span>{current.businessTime}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#34b7f1] shrink-0 fill-current" />
                  </div>
                </div>
              </div>

              {/* WhatsApp bottom control bar layout styling */}
              <div className="p-2.5 bg-[#efeae2] border-t border-gray-200/40 flex items-center gap-2 select-none">
                <div className="flex-1 bg-white rounded-full py-2 px-3 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2 flex-1">
                    <Smile className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="font-whatsapp text-[14.5px] text-[#7d7d7d] font-normal select-none">Digite aqui...</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Paperclip className="w-4.5 h-4.5 text-gray-400 shrink-0 rotate-45" />
                    <Camera className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                  </div>
                </div>

                <div className="w-10 h-10 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Mic className="w-4.5 h-4.5" />
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Sliding controls */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 sm:-left-12 sm:-right-12 flex justify-between pointer-events-none z-20">
        <button
          onClick={slidePrev}
          aria-label="Depoimento Anterior"
          className="w-10 h-10 rounded-full bg-[#071B33] hover:bg-[#16A34A] text-white flex items-center justify-center shadow-lg pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={slideNext}
          aria-label="Próximo Depoimento"
          className="w-10 h-10 rounded-full bg-[#071B33] hover:bg-[#16A34A] text-white flex items-center justify-center shadow-lg pointer-events-auto transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 pb-2">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Ir para depoimento ${index + 1}`}
            className={`h-2 text-xs rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? "w-6 bg-[#16A34A]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
