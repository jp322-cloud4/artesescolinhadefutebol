import { motion } from "motion/react";
import { FileText, MessageSquareQuote, TicketPercent, Sparkles, CheckSquare } from "lucide-react";
import { BonusItem } from "../types";

interface BonusGridProps {
  bonuses: BonusItem[];
}

const BONUS_ICONS: Record<number, any> = {
  1: FileText,
  2: MessageSquareQuote,
  3: TicketPercent,
  4: Sparkles,
  5: CheckSquare,
};

export default function BonusGrid({ bonuses }: BonusGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {bonuses.map((bonus, index) => {
        const IconComponent = BONUS_ICONS[bonus.id] || FileText;
        return (
          <motion.div
            key={bonus.id}
            id={`bonus-card-${bonus.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative bg-white border border-[#071B33]/10 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300"
          >
            {/* Corner Badge */}
            <div className="absolute top-0 right-0 bg-accent text-[#071B33] font-display text-xs font-bold tracking-wider px-4 py-1.5 rounded-bl-xl shadow-xs">
              100% GRÁTIS
            </div>

            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Bonus Tag */}
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#16A34A] mb-1 block">
                {bonus.tag}
              </span>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-primary leading-tight mb-3">
                {bonus.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {bonus.description}
              </p>
            </div>

            {/* Price section inside card */}
            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">
                Valor original: <span className="line-through">R$ {bonus.originalPrice.toFixed(2)}</span>
              </span>
              <span className="font-display font-extrabold text-lg text-[#16A34A] uppercase">
                Grátis
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
