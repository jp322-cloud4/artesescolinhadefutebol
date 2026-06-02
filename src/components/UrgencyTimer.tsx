export default function UrgencyTimer() {
  return (
    <div className="bg-primary-dark border-y border-[#16A34A]/20 text-white py-3 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        {/* Left Side: Alert Title */}
        <div id="countdown-alert-box" className="flex items-center gap-2">
          <p className="font-display font-semibold text-xs sm:text-sm md:text-base tracking-wide text-center leading-tight">
            ⚡ OFERTA ESPECIAL DISPONÍVEL APENAS HOJE
          </p>
        </div>
      </div>
    </div>
  );
}
