import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => (
        <details
          key={item.id}
          id={`faq-item-${item.id}`}
          className="group border border-[#071B33]/10 rounded-2xl overflow-hidden bg-white shadow-xs transition-shadow duration-300 hover:shadow-md"
        >
          <summary className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden list-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#16A34A] shrink-0" />
              <span className="font-display font-semibold text-lg text-primary md:text-xl leading-snug">
                {item.question}
              </span>
            </div>
            <div className="shrink-0 p-1.5 rounded-full bg-ice text-primary group-open:rotate-180 transition-transform duration-300">
              <ChevronDown className="w-5 h-5" />
            </div>
          </summary>

          <div className="px-6 pb-6 pt-2 text-[#47626E] text-base leading-relaxed border-t border-[#071B33]/5 transition-all duration-300">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
