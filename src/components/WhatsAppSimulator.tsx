import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, CheckCheck, Smartphone, Landmark, Award } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "client" | "business";
  text: string;
  time: string;
}

export default function WhatsAppSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState(0);

  const scenario: ChatMessage[] = [
    {
      id: 1,
      sender: "client",
      text: "Olá! Vi a foto do serviço de vocês de limpeza de sofás e adorei. Gostaria de pedir um orçamento para o meu de 3 lugares.",
      time: "11:51"
    },
    {
      id: 2,
      sender: "business",
      text: "Olá! Que ótimo! Claro, nós fazemos a limpeza, higienização e remoção completa de odores e ácaros. Pode me mandar uma foto dele e me dizer sua cidade por favor?",
      time: "11:52"
    },
    {
      id: 3,
      sender: "client",
      text: "Mando sim! Sou daqui de perto mesmo. O estofado está com algumas manchas de suco de laranja.",
      time: "11:53"
    },
    {
      id: 4,
      sender: "business",
      text: "Perfeito! Conseguimos remover essas manchas e deixar o tecido protegido. Nosso orçamento fica em R$ 180,00 e temos horário disponível para quinta-feira agora às 14h. Conseguimos fechar?",
      time: "11:54"
    },
    {
      id: 5,
      sender: "client",
      text: "Nossa, excelente! Vamos agendar sim. Pode marcar por favor para quinta às 14h! Muito obrigado pelo profissionalismo.",
      time: "11:55"
    }
  ];

  useEffect(() => {
    if (step < scenario.length) {
      const delay = step === 0 ? 1000 : scenario[step - 1].text.length * 15 + 800;
      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, scenario[step]]);
        setStep((s) => s + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Loop simulator every 12 seconds
      const resetTimeout = setTimeout(() => {
        setMessages([]);
        setStep(0);
      }, 12000);
      return () => clearTimeout(resetTimeout);
    }
  }, [step]);

  return (
    <div className="bg-primary-dark text-white rounded-3xl p-6 md:p-10 shadow-xl max-w-5xl mx-auto border border-[#35C2B3]/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side: Argumentation */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-[#35C2B3]/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-accent font-display font-semibold text-xs tracking-wide uppercase">Alta Conversão por WhatsApp</span>
          </div>

          <h3 className="font-display font-black text-2xl md:text-4xl text-white leading-tight">
            Mais posts profissionais = Mais orçamentos fechados
          </h3>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            O cliente não compra o seu serviço só porque você limpa bem. Ele compra porque seu Instagram e suas publicações passam <strong>segurança, seriedade e capricho</strong>.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            Ao se deparar com suas redes organizadas com o nosso pack de artes editáveis, o cliente sente confiança imediata para te chamar no WhatsApp e aceitar seu preço sem pedir descontos.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent shrink-0">
                <CheckCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-gray-200">Artes limpas</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent shrink-0">
                <CheckCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-gray-200">Copy de fechamento</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent shrink-0">
                <CheckCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-gray-200">Gera autoridade</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent shrink-0">
                <CheckCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-gray-200">Sem objeções</span>
            </div>
          </div>
        </div>

        {/* Right Side: Smartphone Simulation */}
        <div className="flex justify-center">
          <div className="w-full max-w-[340px] aspect-[9/18] bg-black rounded-[40px] p-3 shadow-2xl relative border-[6px] border-gray-800 flex flex-col justify-between overflow-hidden">
            
            {/* Camera notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-800" />
            </div>

            {/* Chat header */}
            <div className="bg-[#123B4A] pt-4 pb-3 px-4 rounded-t-[30px] flex items-center justify-between border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#35C2B3]/25 border border-accent flex items-center justify-center font-bold text-xs text-accent">
                  🛋️
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-white">Cliente de Estofados</h4>
                  <span className="text-[9px] text-accent font-bold">Online agora</span>
                </div>
              </div>
              <span className="text-[10px] text-white/50 font-mono">WhatsApp</span>
            </div>

            {/* Messages body stream */}
            <div className="flex-1 bg-neutral-900/90 overflow-y-auto p-3 space-y-3 flex flex-col justify-end text-[11px] leading-snug">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-10 font-mono italic text-[10px] my-auto">
                  Aguardando contatos...
                </div>
              ) : (
                messages.map((msg) => {
                  const isBusiness = msg.sender === "business";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ scale: 0.9, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className={`max-w-[85%] rounded-2xl p-2.5 shadow-xs relative ${
                        isBusiness
                          ? "bg-[#123B4A] text-white rounded-tr-none self-end ml-auto"
                          : "bg-neutral-800 text-gray-100 rounded-tl-none self-start mr-auto"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 opacity-60 text-[8px] text-right font-mono">
                        <span>{msg.time}</span>
                        {isBusiness && <CheckCheck className="w-3 h-3 text-[#35C2B3]" />}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Simulated TextInput area */}
            <div className="bg-neutral-900 p-2 rounded-b-[28px] flex items-center gap-2 border-t border-white/5">
              <div className="flex-1 bg-neutral-800 rounded-full py-1.5 px-3.5 text-[10px] text-gray-400">
                Digitando...
              </div>
              <div className="w-7 h-7 bg-[#35C2B3] rounded-full flex items-center justify-center text-white">
                <Send className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
