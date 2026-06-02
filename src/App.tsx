import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  CheckCircle2,
  X,
  Flame,
  ShieldCheck,
  ArrowRight,
  Lock,
  Sparkles,
  Instagram,
  Smartphone,
  MessageSquare,
  BadgePercent,
  Layers,
  Award,
  CreditCard,
  QrCode,
  Copy,
  ChevronRight
} from "lucide-react";

import UrgencyTimer from "./components/UrgencyTimer";
import PostMockupShowcase from "./components/PostMockupShowcase";
import PostFlatCarousel from "./components/PostFlatCarousel";
import BonusGrid from "./components/BonusGrid";
import FAQAccordion from "./components/FAQAccordion";
import TestimonialCarousel from "./components/TestimonialCarousel";

import { FAQ_LIST, BONUS_LIST, IS_FOR_YOU_LIST, IS_NOT_FOR_YOU_LIST } from "./constants";

const resultsSellIcon = "https://60arteslimpezadeestofados.vercel.app/regenerated_image.webp";

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"basico" | "completo">("completo");
  const [checkoutStep, setCheckoutStep] = useState<"options" | "pix" | "card">("options");
  const [copiedPix, setCopiedPix] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [cardSuccess, setCardSuccess] = useState(false);

  const handleCopyPix = () => {
    const pixCode = selectedPlan === 'basico'
      ? "00020126580014BR.GOV.BCB.PIX0136aff0b6cf-bc74-4436-ab3d-f27f200ad227520400005303986540510.005802BR5925Pack Canva Estofados6009Sao Paulo62070503***6304D1A4"
      : "00020126580014BR.GOV.BCB.PIX0136aff0b6cf-bc74-4436-ab3d-f27f200ad227520400005303986540524.905802BR5925Pack Canva Estofados6009Sao Paulo62070503***6304D1A4";
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleSimulateCard = (e: FormEvent) => {
    e.preventDefault();
    if (!buyerName || !emailInput || !phoneInput) return;
    setCardSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCardSuccess(false);
      setCheckoutStep("options");
      // Reset inputs
      setBuyerName("");
      setEmailInput("");
      setPhoneInput("");
      alert("🎉 Simulação de pagamento concluída com sucesso! Em um cenário real, o cliente seria enviado para a plataforma de pagamento.");
    }, 2500);
  };

  const triggerCheckout = (plan?: "basico" | "completo") => {
    setSelectedPlan(plan || "completo");
    setCheckoutStep("options");
    setIsCheckoutOpen(true);
  };

  const scrollToCompletePlan = () => {
    const element = document.getElementById("plano-completo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Persist Urgently / secure URL state on page landing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      const trackingKeys = [
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
        "xcod", "src", "sck", "subid", "sub_id", "fbclid", "gclid", "click_id", "utmify_source"
      ];
      
      trackingKeys.forEach(key => {
        const val = currentParams.get(key);
        if (val) {
          sessionStorage.setItem(key, val);
          localStorage.setItem(key, val);
        }
      });
    }
  }, []);

  const getDynamicCheckoutUrl = (base: string) => {
    try {
      const url = new URL(base);
      const params = new URLSearchParams();

      // 1. Get from URL
      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((val, key) => {
          if (val) params.set(key, val);
        });
      }

      // 2. Track Keys
      const trackingKeys = [
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
        "xcod", "src", "sck", "subid", "sub_id", "fbclid", "gclid", "click_id", "utmify_source"
      ];

      // 3. Fallback from storage
      trackingKeys.forEach(key => {
        if (!params.has(key)) {
          if (typeof window !== "undefined") {
            let val = sessionStorage.getItem(key);
            if (!val) val = localStorage.getItem(key);
            if (!val && typeof document !== "undefined") {
              const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)'));
              if (match) val = decodeURIComponent(match[2]);
            }
            if (val) {
              params.set(key, val);
            }
          }
        }
      });

      params.forEach((val, key) => {
        url.searchParams.set(key, val);
      });

      return url.toString();
    } catch (err) {
      return base;
    }
  };

  const trackCheckoutEvent = (plan: 'basico' | 'completo') => {
    try {
      if (typeof window !== "undefined") {
        // 1. Meta Pixel via fbq if active
        // @ts-ignore
        if (window.fbq) {
          // @ts-ignore
          window.fbq('track', 'InitiateCheckout', {
            content_name: plan === 'basico' ? 'Plano Básico' : 'Plano Completo',
            value: plan === 'basico' ? 10.00 : 24.90,
            currency: 'BRL'
          });
        }
        
        // 2. Alternative pixel tracker
        // @ts-ignore
        if (window._fbq) {
          // @ts-ignore
          window._fbq('track', 'InitiateCheckout');
        }
      }
    } catch (err) {
      console.warn("Pixel tracking did not trigger standard pixel:", err);
    }
  };

  return (
    <div className="min-h-screen bg-ice font-sans overflow-x-hidden antialiased">
      {/* Urgency Real-Time Counter Bar */}
      <UrgencyTimer />

      {/* Hero Header Area */}
      <header className="bg-primary text-white relative overflow-hidden pt-8 pb-10 lg:pt-12 lg:pb-14 border-b border-[#FACC15]/10">
        {/* Abstract Background Highlights */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-primary-light/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          
          {/* Top Badge */}
          <div
            className="inline-flex items-center gap-2 bg-[#FACC15]/15 border border-[#FACC15]/35 rounded-full px-4 py-1.5 text-accent text-xs font-bold tracking-wider uppercase mb-6"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Compra 100% Segura e Protegida</span>
          </div>

          {/* Main Hero Hook */}
          <h1
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white max-w-5xl mx-auto leading-tight tracking-tight"
          >
            +2.500 artes editáveis no Canva para escolinhas de futebol
          </h1>

          {/* Product Mockup */}
          <div
            className="mt-8 max-w-2xl mx-auto px-4"
          >
            <img
              src="https://i.ibb.co/YBYP5vvm/Chat-GPT-Image-25-de-mai-de-2026-15-20-33.webp"
              alt="Mockup do Pack de Artes"
              className="w-full h-auto object-contain rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-white/5"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Subtitle */}
          <div
            className="flex flex-col items-start w-fit mx-auto gap-y-3.5 mt-8 text-sm sm:text-base md:text-lg font-semibold text-[#FFF5C2]"
          >
            <div className="flex items-center gap-3">
              <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3] text-white" />
              </span>
              <span>Artes prontas pra usar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3] text-white" />
              </span>
              <span>Editável no Canva</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3] text-white" />
              </span>
              <span>Divulgação Profissional</span>
            </div>
          </div>

          {/* Main CTA Section */}
          <div
            className="mt-10 flex flex-col items-center gap-4"
          >
            <a
              href="#plano-completo"
              onClick={(e) => {
                e.preventDefault();
                scrollToCompletePlan();
              }}
              className="group relative inline-flex items-center gap-3 bg-[#FACC15] text-[#071B33] font-display font-black text-base sm:text-lg md:text-xl px-8 py-5 rounded-2xl shadow-lg hover:bg-accent-dark hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full max-w-md justify-center text-center text-[#071B33]"
            >
              <span>QUERO ACESSAR AS ARTES</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
            
            <p className="text-xs text-white/75 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>
                Você recebe tudo na hora, direto no seu <img src="https://i.ibb.co/Bk8WGrn/Design-sem-nome-8-Photoroom.webp" alt="WhatsApp" referrerPolicy="no-referrer" className="w-[18px] h-[18px] inline-block align-text-bottom ml-0 mr-[2px]" />WhatsApp e no seu <img src="https://i.ibb.co/spLPcBXN/4202011emailgmaillogomailsocialsocialmedia-115677-115624-Photoroom.png" alt="E-mail" referrerPolicy="no-referrer" className="w-[18px] h-[18px] inline-block align-text-bottom ml-0 mr-[2px]" />e-mail.
              </span>
            </p>
          </div>

        </div>
      </header>

      {/* INTERACTIVE PREVIEW SECTION */}
      <section className="pt-8 pb-6 bg-ice relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#071B33] mt-2">
              Artes Prontas e totalmente Editáveis
            </h2>

          </div>

          {/* Live Post interactive editor mockup widget */}
          <PostMockupShowcase />
        </div>
      </section>

      {/* WHO IS IT FOR SECTIONS */}
      <section className="pt-8 pb-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mt-2">
              O que esse pack facilita para você:
            </h2>
          </div>

          {/* 4 Cards Grid of Desire */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="bg-[#F0FAF5] border border-[#C8E6C8] rounded-3xl p-6 text-center flex flex-col items-center transition-transform duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 flex items-center justify-center mb-4">
                <img 
                  src="https://i.ibb.co/605kL0hY/Design-sem-nome-10-Photoroom.webp" 
                  alt="Icon" 
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-[16px] leading-snug mb-2">
                Instagram mais profissional
              </h3>
              <p className="font-sans text-gray-700 text-[15px] leading-relaxed">
                Perfil da escolinha mais bonito, organizado e confiável.
              </p>
            </div>

            <div className="bg-[#F0FAF5] border border-[#C8E6C8] rounded-3xl p-6 text-center flex flex-col items-center transition-transform duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 flex items-center justify-center mb-4">
                <img 
                  src="https://i.ibb.co/v6t4sTj5/Design-sem-nome-11-Photoroom.webp" 
                  alt="Icon" 
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-[16px] leading-snug mb-2">
                Posts prontos em minutos
              </h3>
              <p className="font-sans text-gray-700 text-[15px] leading-relaxed">
                Edite no Canva e publique rápido.
              </p>
            </div>

            <div className="bg-[#F0FAF5] border border-[#C8E6C8] rounded-3xl p-6 text-center flex flex-col items-center transition-transform duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 flex items-center justify-center mb-4">
                <img 
                  src="https://i.ibb.co/tN4VgJx/Design-sem-nome-12-Photoroom.webp" 
                  alt="Icon" 
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-[16px] leading-snug mb-2">
                Mais pais interessados
              </h3>
              <p className="font-sans text-gray-700 text-[15px] leading-relaxed">
                Divulgue matrículas, treinos e horários com mais clareza.
              </p>
            </div>

            <div className="bg-[#F0FAF5] border border-[#C8E6C8] rounded-3xl p-6 text-center flex flex-col items-center transition-transform duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 flex items-center justify-center mb-4">
                <img 
                  src="https://i.ibb.co/jkzQQFhJ/Design-sem-nome-13-Photoroom.webp" 
                  alt="Icon" 
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-sans font-bold text-gray-900 text-[16px] leading-snug mb-2">
                Escolinha mais valorizada
              </h3>
              <p className="font-sans text-gray-700 text-[15px] leading-relaxed">
                Mostre jogos, campeonatos, peneiras e conquistas dos alunos.
              </p>
            </div>
          </div>

          {/* Centered CTA Button after Benefits/Desires Grid */}
          <div className="flex flex-col items-center justify-center mb-12 -mt-10">
            <a
              href="#plano-completo"
              onClick={(e) => {
                e.preventDefault();
                scrollToCompletePlan();
              }}
              className="group relative inline-flex items-center gap-3 bg-[#FACC15] text-[#071B33] font-display font-black text-base sm:text-lg px-8 py-5 rounded-2xl shadow-lg hover:bg-accent-dark hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full max-w-md justify-center text-center"
            >
              <span>QUERO ACESSAR AS ARTES</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Faixa de Alerta completa de lado a lado */}
        <div className="w-full bg-[#FFF5F5] border-y border-red-100 py-4 px-4 flex items-center justify-center gap-2.5 shadow-xs mb-16">
          <Flame className="w-5.5 h-5.5 text-red-500 fill-red-500 animate-pulse shrink-0" />
          <span className="font-sans font-black text-red-900 text-sm md:text-base text-center tracking-wider">
            Aproveite o Preço Promocional por Tempo Limitado!
          </span>
        </div>

        {/* Bloco Compacto de Urgência / CTA */}
        <div className="max-w-3xl mx-auto px-4 mb-5">
          <div className="bg-ice rounded-3xl p-8 md:p-12 border border-[#071B33]/5 text-center flex flex-col items-center">
            <h3 className="font-display font-black text-[26px] md:text-[32px] text-[#071B33] leading-tight mb-6 max-w-2xl">
              Sua escolinha é boa, mas seu Instagram não mostra isso?
            </h3>
            
            <ul className="flex flex-col gap-3.5 mb-8 text-left max-w-xs sm:max-w-md mx-auto">
              <li className="flex items-center gap-3 text-[#071B33] text-base md:text-[17px] font-sans font-bold">
                <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0 w-6 h-6">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </span>
                <span>Perfil Profissional E Organizado</span>
              </li>
              <li className="flex items-center gap-3 text-[#071B33] text-base md:text-[17px] font-sans font-bold">
                <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0 w-6 h-6">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </span>
                <span>Artes para matrículas, treinos e jogos</span>
              </li>
              <li className="flex items-center gap-3 text-[#071B33] text-base md:text-[17px] font-sans font-bold">
                <span className="bg-[#16A34A] text-white p-0.5 rounded-full flex items-center justify-center shrink-0 w-6 h-6">
                  <Check className="w-4 h-4 stroke-[3.5]" />
                </span>
                <span>Mais procura por matrícula</span>
              </li>
            </ul>

            <a
              href="#plano-completo"
              onClick={(e) => {
                e.preventDefault();
                scrollToCompletePlan();
              }}
              className="group relative inline-flex items-center justify-center gap-2.5 bg-[#FACC15] text-[#071B33] font-display font-black text-base sm:text-lg min-w-[260px] sm:min-w-[320px] max-w-full px-8 py-4.5 rounded-2xl shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer uppercase text-center"
            >
              <span>QUERO ACESSAR AS ARTES</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Cópia do Carrossel de Visualização de Artes */}
        <div className="max-w-7xl mx-auto px-4 mb-2">
          <PostFlatCarousel />
        </div>
      </section>

      {/* IDEAL FOR YOU IF YOU DESIRE */}
      <section id="ideal-para-voce" className="pt-6 pb-2 bg-ice border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-black text-2xl md:text-3xl.5 text-[#071B33] mt-2">
              Ideal para você que deseja:
            </h2>
            <div className="w-12 h-1 bg-[#16A34A] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Wish 1 */}
            <div className="bg-[#f0faf5] border border-[#c8e6c8] rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.01]">
              <div className="mb-4 flex items-center justify-center shrink-0">
                <img 
                  src="https://i.ibb.co/Pvh8Fkc8/check-mark-2.webp" 
                  alt="Check" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <p className="font-sans text-gray-900 text-sm sm:text-base leading-relaxed font-semibold">
                Quer deixar o perfil da escolinha mais bonito e confiável.
              </p>
            </div>

            {/* Wish 2 */}
            <div className="bg-[#f0faf5] border border-[#c8e6c8] rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.01]">
              <div className="mb-4 flex items-center justify-center shrink-0">
                <img 
                  src="https://i.ibb.co/Pvh8Fkc8/check-mark-2.webp" 
                  alt="Check" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <p className="font-sans text-gray-900 text-sm sm:text-base leading-relaxed font-semibold">
                Postar com frequência sem precisar criar artes do zero.
              </p>
            </div>

            {/* Wish 3 */}
            <div className="bg-[#f0faf5] border border-[#c8e6c8] rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.01]">
              <div className="mb-4 flex items-center justify-center shrink-0">
                <img 
                  src="https://i.ibb.co/Pvh8Fkc8/check-mark-2.webp" 
                  alt="Check" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <p className="font-sans text-gray-900 text-sm sm:text-base leading-relaxed font-semibold">
                Divulgar treinos, matrículas, peneiras, jogos e campeonatos.
              </p>
            </div>

            {/* Wish 4 */}
            <div className="bg-[#f0faf5] border border-[#c8e6c8] rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.01]">
              <div className="mb-4 flex items-center justify-center shrink-0">
                <img 
                  src="https://i.ibb.co/Pvh8Fkc8/check-mark-2.webp" 
                  alt="Check" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <p className="font-sans text-gray-900 text-sm sm:text-base leading-relaxed font-semibold">
                Chamar atenção dos pais com posts bonitos e prontos para usar.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DELIVERABLE HIGHLIGHT */}
      <section className="pt-2 pb-10 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-display font-black text-2xl md:text-3xl.5 text-[#071B33] mt-2">
              O que você vai receber:
            </h2>
            <div className="w-12 h-1 bg-[#16A34A] mx-auto mt-3 rounded-full" />
          </div>

          <div className="max-w-lg mx-auto bg-[#071B33] border border-[#16A34A] rounded-[16px] overflow-hidden shadow-sm">
            {/* 1. Top of card: mockup image */}
            <div className="w-full bg-[#071B33] border-b border-[#16A34A]/20 overflow-hidden relative flex items-center justify-center p-4">
              <img
                src="https://i.ibb.co/YBYP5vvm/Chat-GPT-Image-25-de-mai-de-2026-15-20-33.webp"
                alt="Mockup do Pack de Artes"
                className="w-full h-auto max-h-[360px] object-contain rounded-xl hover:scale-[1.03] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content box with padding */}
            <div className="p-6 md:p-8">
              {/* 2. List of items */}
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFC300] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    +2.500 artes editáveis no Canva
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Posts prontos para divulgar sua escolinha
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Artes para matrículas abertas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Artes para treinos e horários
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Artes para peneiras e seletivas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Artes para jogos e campeonatos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FACC15] stroke-[3] shrink-0 mt-0.5" />
                  <span className="text-white font-sans text-sm sm:text-base leading-normal font-semibold">
                    Artes para resultados e conquistas
                  </span>
                </li>
              </ul>

              {/* Separator */}
              <div className="w-full h-[1px] bg-[#16A34A]/25 my-5" />

              {/* 3. Delivery text */}
              <p className="font-sans text-[#DDEEEF]/90 text-xs sm:text-sm text-center leading-relaxed font-normal">
                Você recebe tudo na hora, direto no seu <img src="https://i.ibb.co/Bk8WGrn/Design-sem-nome-8-Photoroom.webp" alt="WhatsApp" referrerPolicy="no-referrer" className="w-[18px] h-[18px] inline-block align-text-bottom ml-0 mr-[2px]" />WhatsApp e no seu <img src="https://i.ibb.co/spLPcBXN/4202011emailgmaillogomailsocialsocialmedia-115677-115624-Photoroom.png" alt="E-mail" referrerPolicy="no-referrer" className="w-[18px] h-[18px] inline-block align-text-bottom ml-0 mr-[2px]" />e-mail
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* NEW BONUS SECTION - 4 EXCLUSIVE BONUS CARDS */}
      <section className="pt-10 pb-10 bg-ice border-t border-b border-[#DDEEEF] mb-0">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-black uppercase tracking-widest text-[#071B33]/70 block mb-2">
              E não para por aí...
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-[#071B33] leading-tight uppercase">
              TEM MAIS!
            </h2>
            <p className="text-[#071B33]/80 text-sm md:text-base mt-2">
              Você também vai receber...
            </p>
            <div className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-sans text-sm md:text-base font-black px-6 py-2.5 rounded-full mt-4 shadow-sm uppercase tracking-wider">
              <span>🔥 4 BÔNUS EXCLUSIVOS</span>
            </div>
          </div>

          {/* Grid of 4 Bonus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {/* Card 1 — Bônus #1 */}
            <div className="bg-white border border-[#DDEEEF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="p-4 pb-0 bg-ice/30">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#DDEEEF] shadow-sm bg-white">
                    <img 
                      src="https://i.ibb.co/6cRgnfZK/Chat-GPT-Image-25-de-mai-de-2026-17-21-34.webp" 
                      alt="Pack de Stories Prontos" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    Bônus #1
                  </div>
                  <h3 className="font-display font-black text-lg text-[#071B33] mb-2">
                    Pack de Stories Prontos
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Templates de stories prontos para editar, postar e divulgar treinos, matrículas, jogos e avisos da escolinha.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="flex items-center justify-center gap-3 bg-[#071B33] border border-[#FACC15] rounded-xl py-[10px] px-[16px] w-full">
                  <span className="text-sm font-normal text-[#DDEEEF] font-sans">Valor: <span className="line-through">R$27</span></span>
                  <span className="font-sans font-black text-base text-[#FACC15] uppercase tracking-wider">GRÁTIS</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Bônus #2 */}
            <div className="bg-white border border-[#DDEEEF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="p-4 pb-0 bg-ice/30">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#DDEEEF] shadow-sm bg-white">
                    <img 
                      src="https://i.ibb.co/twSVrpT5/b244d3c3-a3b3-4875-9abb-8d58ee1b3e35.webp" 
                      alt="Legendas Prontas Para Postar" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    Bônus #2
                  </div>
                  <h3 className="font-display font-black text-lg text-[#071B33] mb-2">
                    Legendas Prontas Para Postar
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Textos prontos para usar junto com as suas publicações, para você copiar e colar sem precisar ficar travado pensando no que escrever.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="flex items-center justify-center gap-3 bg-[#071B33] border border-[#FACC15] rounded-xl py-[10px] px-[16px] w-full">
                  <span className="text-sm font-normal text-[#DDEEEF] font-sans">Valor: <span className="line-through">R$17</span></span>
                  <span className="font-sans font-black text-base text-[#FACC15] uppercase tracking-wider">GRÁTIS</span>
                </div>
              </div>
            </div>

            {/* Card 3 — Bônus #3 */}
            <div className="bg-white border border-[#DDEEEF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="p-4 pb-0 bg-ice/30">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#DDEEEF] shadow-sm bg-white">
                    <img 
                      src="https://i.ibb.co/HTN2BfMm/Chat-GPT-Image-25-de-mai-de-2026-17-31-31.webp" 
                      alt="Capas de Destaque Para Instagram" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    Bônus #3
                  </div>
                  <h3 className="font-display font-black text-lg text-[#071B33] mb-2">
                    Capas de Destaque Para Instagram
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Destaques prontos para deixar o Instagram da escolinha organizado, bonito e com aparência profissional.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="flex items-center justify-center gap-3 bg-[#071B33] border border-[#FACC15] rounded-xl py-[10px] px-[16px] w-full">
                  <span className="text-sm font-normal text-[#DDEEEF] font-sans">Valor: <span className="line-through">R$27</span></span>
                  <span className="font-sans font-black text-base text-[#FACC15] uppercase tracking-wider">GRÁTIS</span>
                </div>
              </div>
            </div>

            {/* Card 4 — Bônus #4 */}
            <div className="bg-white border border-[#DDEEEF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="p-4 pb-0 bg-ice/30">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#DDEEEF] shadow-sm bg-white">
                    <img 
                      src="https://i.ibb.co/6R4SNbBd/Chat-GPT-Image-25-de-mai-de-2026-17-49-21.webp" 
                      alt="Calendário de Conteúdo Para Escolinhas" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block bg-[#16A34A]/10 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    Bônus #4
                  </div>
                  <h3 className="font-display font-black text-lg text-[#071B33] mb-2">
                    Calendário de Conteúdo Para Escolinhas
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ideias de postagens para divulgar treinos, matrículas, jogos, campeonatos, resultados e conquistas durante o mês.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="flex items-center justify-center gap-3 bg-[#071B33] border border-[#FACC15] rounded-xl py-[10px] px-[16px] w-full">
                  <span className="text-sm font-normal text-[#DDEEEF] font-sans">Valor: <span className="line-through">R$27</span></span>
                  <span className="font-sans font-black text-base text-[#FACC15] uppercase tracking-wider">GRÁTIS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* CORE HIGHLIGHT PRICING SECTION */}
      <section className="pt-10 pb-12 bg-[#071B33] text-white relative overflow-hidden" id="oferta">
        {/* Aesthetic patterns */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FACC15]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-[#FACC15] text-[#071B33] font-display font-semibold text-xs tracking-widest px-4 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5 mb-3 font-extrabold">
              ⏰ ÚLTIMA CHANCE — OFERTA TERMINA HOJE
            </span>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mt-2">
              Escolha o melhor plano para divulgar sua escolinha com mais profissionalismo
            </h2>
          </div>

          {/* Dual columns for plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            
            {/* PLANO BÁSICO */}
            <div className="bg-[#F2F5F7] rounded-[32px] pl-6 pr-6 sm:pl-8 sm:pr-8 py-10 md:py-12 border-2 border-[#FACC15]/80 shadow-[0_14px_35px_rgba(0,0,0,0.22)] relative flex flex-col justify-start transition-all duration-300 hover:translate-y-[-4px]">
              <div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#071B33] mb-8 text-center font-bold">Plano Básico</h3>

                <ul className="space-y-4 mb-5 text-sm sm:text-base text-left">
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Artes personalizadas no Canva</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>100 Artes prontas e editáveis</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Entrega imediata no WhatsApp e e-mail</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[#FACC15]/25 pt-6 mt-auto flex flex-col items-center w-full">
                {/* Preço riscado acima */}
                <div className="text-center mb-1">
                  <span className="text-[#E53935] font-bold line-through text-sm sm:text-base block">
                    de R$30,00 por:
                  </span>
                </div>

                {/* Preço no meio e grande */}
                <div className="text-center">
                  <span className="text-5xl sm:text-6xl font-display font-black text-[#071B33] tracking-tight block font-extrabold pb-1">
                    R$10,00
                  </span>
                </div>

                {/* Parcelado embaixo */}
                <div className="text-center mt-2">
                  <span className="text-sm sm:text-base font-bold text-[#071B33]/90">
                    ou 2x de R$5,00 no cartão
                  </span>
                </div>

                {/* Quanto economiza */}
                <div className="text-center mt-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base text-[#071B33]/85 font-bold">
                    <span className="text-[#16A34A] text-xl leading-none font-black">•</span>
                    <span>Você economiza <strong className="text-[#16A34A] font-extrabold">R$20,00</strong></span>
                  </span>
                </div>

                {/* Botão */}
                <a
                  href={getDynamicCheckoutUrl("https://pay.cakto.com.br/w7z6d26_906588")}
                  onClick={() => trackCheckoutEvent('basico')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#071B33] font-display font-black text-sm sm:text-base md:text-xs lg:text-base xl:text-lg py-5 px-4 sm:px-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap font-bold"
                >
                  <span>QUERO O PLANO BÁSICO</span>
                  <ArrowRight className="w-5 h-5 text-[#071B33]/80 shrink-0" />
                </a>
              </div>
            </div>

            {/* PLANO COMPLETO */}
            <div id="plano-completo" className="bg-[#F2F5F7] rounded-[32px] pl-6 pr-6 sm:pl-8 sm:pr-8 py-10 md:py-12 border-2 border-[#FACC15] shadow-[0_14px_35px_rgba(0,0,0,0.22)] relative flex flex-col justify-start transition-all duration-300 hover:translate-y-[-4px]">
              
              {/* MAIS VENDIDO Badge representation */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FACC15] text-[#071B33] font-display font-black text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap font-extrabold">
                🔥 MAIS VENDIDO
              </div>

              <div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#071B33] mb-8 flex items-center justify-center gap-2 text-center">
                  <span>Plano Completo</span>
                </h3>

                <img
                  src="https://i.ibb.co/YBYP5vvm/Chat-GPT-Image-25-de-mai-de-2026-15-20-33.webp"
                  alt="Mockup do Combo Completo"
                  className="w-full h-auto max-h-[320px] mb-8 object-contain mx-auto rounded-xl"
                  referrerPolicy="no-referrer"
                />

                <ul className="space-y-4 mb-5 text-sm sm:text-base text-left">
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span><strong>+2.500 Artes prontas e editáveis</strong></span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Artes personalizadas no Canva</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Pack de Stories Prontos</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Legendas Prontas Para Postar</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Capas de Destaque Para Instagram</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Checklist de Perfil Profissional</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Calendário de Conteúdo Para Escolinhas</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#071B33] font-semibold">
                    <Check className="w-5.5 h-5.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Entrega imediata no WhatsApp e e-mail</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[#FACC15]/25 pt-6 mt-auto flex flex-col items-center w-full">
                {/* Preço riscado acima */}
                <div className="text-center mb-1">
                  <span className="text-[#E53935] font-bold line-through text-sm sm:text-base block">
                    de R$67,00 por:
                  </span>
                </div>

                {/* Preço no meio e grande */}
                <div className="text-center">
                  <span className="text-5xl sm:text-6xl font-display font-black text-[#071B33] tracking-tight block font-extrabold pb-1">
                    R$24,90
                  </span>
                </div>

                {/* Parcelado embaixo */}
                <div className="text-center mt-2">
                  <span className="text-sm sm:text-base font-bold text-[#071B33]/90">
                    ou 3x de R$8,30 no cartão
                  </span>
                </div>

                {/* Quanto economiza */}
                <div className="text-center mt-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base text-[#071B33]/85 font-bold">
                    <span className="text-[#16A34A] text-xl leading-none font-black">•</span>
                    <span>Você economiza <strong className="text-[#16A34A] font-extrabold font-display">R$42,10</strong></span>
                  </span>
                </div>

                {/* Botão */}
                <a
                  href={getDynamicCheckoutUrl("https://pay.cakto.com.br/mimxysx")}
                  onClick={() => trackCheckoutEvent('completo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#071B33] font-display font-black text-sm sm:text-base md:text-xs lg:text-base xl:text-lg py-5 px-4 sm:px-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap font-bold"
                >
                  <span>QUERO O PLANO COMPLETO</span>
                  <ArrowRight className="w-5 h-5 text-[#071B33]/80 shrink-0" />
                </a>
              </div>
            </div>

          </div>



        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="pt-8 pb-6 bg-ice relative overflow-hidden border-t border-b border-gray-100" id="depoimentos">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#16A34A] bg-[#16A34A]/10 px-4 py-1.5 rounded-full inline-block font-bold">
              DEPOIMENTOS DE CLIENTES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#071B33] tracking-tight leading-tight">
              Vejam o que estão dizendo:
            </h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* HIGHLIGH SECURITY / 7 DAYS GUARANTEE */}
      <section className="pt-4 pb-8 bg-ice border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-accent/20 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            {/* Guarantee Emblem badge representation */}
            <div className="w-24 h-24 shrink-0 rounded-full bg-accent/10 border-2 border-dashed border-accent flex flex-col items-center justify-center text-center relative pointer-events-none">
              <Award className="w-8 h-8 text-accent mb-0.5" />
              <span className="font-display font-extrabold text-[10px] text-primary tracking-wider uppercase leading-none">7 DIAS</span>
              <span className="text-[8px] text-gray-500 font-semibold uppercase leading-none">GARANTIA</span>
            </div>

            {/* Guarantee Text */}
            <div className="space-y-3 text-center md:text-left">
              <h3 className="font-display font-bold text-xl md:text-2xl text-primary">Garantia Incondicional de 7 dias</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Você tem 7 dias para testar todo o material. Se por qualquer motivo perceber que este pacote de artes não é para você ou não gostar das legendas, devolvemos integralmente seu investimento de volta, sem questionamentos ou qualquer complicação. Seu risco é ZERO!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION SECTION) */}
      <section className="pt-6 pb-20 bg-ice" id="perguntas-frequentes">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#16A34A] font-bold">Perguntas Frequentes</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-[#071B33] mt-2">
              Dúvidas Frequentes
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Ainda tem alguma dúvida sobre o funcionamento do Pack Canva? Esclarecemos tudo para você.
            </p>
          </div>

          <FAQAccordion items={FAQ_LIST} />

        </div>
      </section>

      {/* FINAL OFFER OUTCOME HIGHLIGHT REMINDER */}
      <section className="py-20 bg-white border-t border-gray-100 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-3xl block">⚽🏆</span>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#071B33] max-w-2xl mx-auto leading-tight">
            +2.500 artes editáveis no Canva para escolinhas de futebol
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Deixe o perfil da sua escolinha de futebol mais profissional, organizado e confiável, editando posts prontos em poucos minutos para atrair novos alunos.
          </p>

          <div className="pt-4">
            <a
              href="#plano-completo"
              onClick={(e) => {
                e.preventDefault();
                scrollToCompletePlan();
              }}
              className="group inline-flex items-center gap-3 bg-[#FACC15] text-[#071B33] font-display font-black text-base sm:text-lg px-8 py-5 rounded-2xl shadow-lg hover:bg-[#EAB308] hover:scale-[1.03] transition-all cursor-pointer text-center font-bold"
            >
              <span>QUERO ACESSAR AS ARTES</span>
              <ArrowRight className="w-5 h-5 text-[#071B33] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071B33] text-white/60 text-xs py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright description */}
          <div className="text-center md:text-left space-y-1.5">
            <p className="font-display font-bold text-white text-sm">Pack Canva — Escolinhas de Futebol</p>
            <p>Todos os direitos reservados. © {new Date().getFullYear()}</p>
            <p className="text-[10px] text-white/30">
              Canva é uma marca registrada de terceiros. Este produto não possui fins de afiliação ou patrocínio oficial do Canva Inc.
            </p>
          </div>

          {/* Secure lock stamp */}
          <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-4 py-2.5">
            <Lock className="w-4 h-4 text-[#FACC15]" />
            <div className="text-left leading-none">
              <span className="text-[10px] uppercase font-bold text-white tracking-widest block font-extrabold">Sistema Seguro</span>
            </div>
          </div>

        </div>
      </footer>

      {/* DETAILED OPT-IN SIMULATED CHECKOUT MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-primary-dark/80 backdrop-blur-xs"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative z-10 border border-gray-100"
            >
              
              {/* Header */}
              <div className="bg-primary text-white p-6 relative">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <span className="text-[9px] uppercase font-bold tracking-widest text-accent bg-[#0E294A] px-2.5 py-1 rounded-full inline-block">
                  Área Segura e Integrada
                </span>
                
                <h3 className="font-display font-bold text-lg md:text-xl text-white mt-1.5 leading-snug">
                  Checkout Seguro: finalize seu pack
                </h3>
                <p className="text-xs text-[#B9DFE4] mt-1">
                  Selecione o método de preferência para receber seu pacote de artes Canva.
                </p>
              </div>

              {/* Checkout Stepper & Flows */}
              <div className="p-6">
                
                {/* Method Options Selector Step */}
                {checkoutStep === "options" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Selecione o pagamento:</p>
                    
                    {/* Pix Button selection */}
                    <button
                      onClick={() => setCheckoutStep("pix")}
                      className="w-full text-left p-4 rounded-2xl border border-gray-200 hover:border-accent hover:bg-ice/50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                          <QrCode className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-primary">Pagar via Pix (Imediato)</h4>
                          <p className="text-[11px] text-gray-500">Liberação instantânea do pack no WhatsApp e e-mail.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
 
                    {/* Credit Card Button selection */}
                    <button
                      onClick={() => setCheckoutStep("card")}
                      className="w-full text-left p-4 rounded-2xl border border-gray-200 hover:border-accent hover:bg-ice/50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-primary">Pagar via Cartão de Crédito</h4>
                          <p className="text-[11px] text-gray-500">Pague à vista por {selectedPlan === 'basico' ? 'R$ 10,00' : 'R$ 24,90'} ou parcele se preferir.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
 
                    {/* Money-Back Notice */}
                    <div className="bg-ice rounded-xl p-4 flex gap-3 border border-gray-100 mt-6">
                      <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#47626E] leading-relaxed">
                        Seu pagamento é intermediado com criptografia. Você tem <strong>7 dias</strong> de garantia incondicional assegurada.
                      </p>
                    </div>
                  </div>
                )}
 
                {/* PIX SIMULATOR STEP */}
                {checkoutStep === "pix" && (
                  <div className="space-y-5 text-center">
                    <div className="bg-[#EAF9F7] rounded-2xl p-4 inline-block">
                      {/* Generates a nice SVG placeholder representing QR code */}
                      <svg className="w-32 h-32 mx-auto text-[#071B33]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm10-1h2v3h-2v-3zm2 3h2v2h-2v-2zm-2 2h2v-2h-2v2zm6-3h-2v2h2v-2zm-4-4h2v2h-2v-2zm8 0h-2v2h2v-2zm-6 2h2v2h-2v-2zm2-4h2v2h-2v-2zm2 2h2v2h-2V9zm-4-4h2v2h-2V5zm6-2h2v2h-2V3zm-2 12h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-6-2h2v2H9v-2zm2 2h2v2h-2v-2zm-2-4h2v2H9v-2zm-4 4h2v2H5v-2zm2 2h2v2H7v-2zm-2-4h2v2H5v-2z" />
                      </svg>
                    </div>
 
                    <div className="space-y-1.5">
                      <span className="text-xs uppercase text-accent font-extrabold tracking-widest block font-extrabold">PIX COPIA E COLA</span>
                      <h4 className="font-display font-black text-xl text-primary">Valor: {selectedPlan === 'basico' ? 'R$ 10,00' : 'R$ 24,90'}</h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Copie a chave Pix do simulador abaixo, faça o pagamento no aplicativo do seu banco e receba o material instantaneamente.
                      </p>
                    </div>
 
                    {/* Copy field */}
                    <div className="flex rounded-xl overflow-hidden border border-gray-200">
                      <input
                        type="text"
                        readOnly
                        value="00020126580014BR.GOV.BCB.PIX0136aff0b..."
                        className="bg-ice text-xs text-gray-500 px-3 py-3 font-mono flex-1 border-0 focus:outline-[0px] focus:outline-hidden"
                      />
                      <button
                        onClick={handleCopyPix}
                        className="bg-accent hover:bg-accent-dark text-white px-4 py-3 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedPix ? "Copiado!" : "Copiar"}</span>
                      </button>
                    </div>
 
                    {copiedPix && (
                      <p className="text-xs text-accent font-bold animate-pulse">
                        💡 Código copiado! Agora cole no campo "Pix Copia e Cola" do seu banco.
                      </p>
                    )}
 
                    {/* Navigation */}
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-6">
                      <button
                        onClick={() => setCheckoutStep("options")}
                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                      >
                        ← Voltar
                      </button>
                      <button
                        onClick={() => {
                          setIsCheckoutOpen(false);
                          alert("Acesso enviado para o canal simulado! Parabéns pela compra.");
                        }}
                        className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer"
                      >
                        Já realizei o pagamento
                      </button>
                    </div>
                  </div>
                )}
 
                {/* CARD SIMULATOR FORM STEP */}
                {checkoutStep === "card" && (
                  <form onSubmit={handleSimulateCard} className="space-y-4">
                    {cardSuccess ? (
                      <div className="text-center py-8 space-y-3">
                        <CheckCircle2 className="w-14 h-14 text-accent mx-auto animate-bounce" />
                        <h4 className="font-display font-bold text-lg text-primary">Processando Pagamento...</h4>
                        <p className="text-xs text-gray-500">Seus templates estão sendo preparados para envio automático.</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Simular Cadastro de Email & Envio:</p>
                        
                        <div className="space-y-3 text-left">
                          <div>
                            <label className="text-[10px] font-bold text-primary uppercase block mb-1">Seu Nome Completo</label>
                            <input
                              type="text"
                              required
                              placeholder="Digite seu nome..."
                              value={buyerName}
                              onChange={(e) => setBuyerName(e.target.value)}
                              className="w-full bg-ice border border-gray-200 rounded-lg px-3 py-2 text-xs text-primary focus:border-accent focus:outline-hidden"
                            />
                          </div>
 
                          <div>
                            <label className="text-[10px] font-bold text-primary uppercase block mb-1">Seu Melhor E-mail</label>
                            <input
                              type="email"
                              required
                              placeholder="exemplo@gmail.com"
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              className="w-full bg-ice border border-gray-200 rounded-lg px-3 py-2 text-xs text-primary focus:border-accent focus:outline-hidden"
                            />
                          </div>
 
                          <div>
                            <label className="text-[10px] font-bold text-primary uppercase block mb-1">Seu WhatsApp com DDD</label>
                            <input
                              type="tel"
                              required
                              placeholder="(11) 99999-9999"
                              value={phoneInput}
                              onChange={(e) => setPhoneInput(e.target.value)}
                              className="w-full bg-ice border border-gray-200 rounded-lg px-3 py-2 text-xs text-primary focus:border-accent focus:outline-hidden"
                            />
                          </div>
                        </div>
 
                        {/* Dummy credit details */}
                        <div className="bg-ice border border-gray-100 rounded-xl p-3.5 space-y-2 mt-4 text-xs">
                          <div className="flex justify-between font-medium">
                            <span className="text-gray-500">Subtotal Pack Canva:</span>
                            <span className="text-primary font-bold">{selectedPlan === 'basico' ? 'R$ 10,00' : 'R$ 24,90'}</span>
                          </div>
                          <div className="flex justify-between font-bold text-accent border-t border-gray-200/50 pt-2 text-sm">
                            <span>TOTAL HOJE:</span>
                            <span>{selectedPlan === 'basico' ? 'R$ 10,00' : 'R$ 24,90'}</span>
                          </div>
                        </div>
 
                        {/* Actions */}
                        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-6">
                          <button
                            type="button"
                            onClick={() => setCheckoutStep("options")}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                          >
                            ← Voltar
                          </button>
                          
                          <button
                            type="submit"
                            className="bg-accent hover:bg-accent-dark text-[#071B33] font-display font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer font-bold"
                          >
                            Simular Pagamento Seguro
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
