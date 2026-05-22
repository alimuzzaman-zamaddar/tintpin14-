
import { HiOutlineCheckCircle } from "react-icons/hi2";

// 1. TypeScript Interfaces for the Pricing structure
interface FeatureList {
  text: string;
}

interface PricingCard {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  isFeatured: boolean;
  features?: FeatureList[];
}

// 2. Structured JSON Data
const pricingData: PricingCard[] = [
  {
    id: "credits-10",
    title: "10 Credits",
    subtitle: "Perfect for casual users",
    price: "$3.99",
    period: "/ One-time purchase",
    isFeatured: false,
  },
  {
    id: "monthly",
    title: "Monthly",
    subtitle: "Simple & Flexible Pricing",
    price: "$20",
    period: "/ month",
    isFeatured: true,
    features: [
      { text: "Up to 300 scans per month" },
      { text: "Fair use cap applies" },
      { text: "Premium features unlocked" },
      { text: "Monthly usage counter reset" },
      { text: "Faster scan results" },
      { text: "Priority support" },
      { text: "Premium AI translation" },
    ],
  },
  {
    id: "credits-30",
    title: "30 Credits",
    subtitle: "Perfect for casual users",
    price: "$9.99",
    period: "/ One-time purchase",
    isFeatured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative w-full bg-transparent text-white py-20 lg:py-28 font-['Inter'] select-none overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-0 lg:gap-0">
        {pricingData.map((card) => {
          if (card.isFeatured) {
            return (
              /* ==================== FEATURED CARD (CENTER) ==================== */
              <div
                key={card.id}
                className="relative w-full max-w-[360px] bg-[#030712] rounded-2xl border border-white/10 p-8 shadow-2xl z-20 flex flex-col items-start min-h-[580px] overflow-hidden"
              >
                {/* Top Inner Card Gradient Glow effect */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-600/20 blur-[60px] pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-blue-500/10 blur-[40px] pointer-events-none" />

                {/* Card Title */}
                <h3 className="text-2xl font-bold tracking-tight text-[#146DE1] mb-2 relative z-10">
                  {card.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-[13px] text-white/60 mb-8 relative z-10">
                  {card.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 relative z-10">
                  <span className="text-5xl font-extrabold tracking-tight text-white">
                    {card.price}
                  </span>
                  <span className="text-sm font-medium text-white/60">
                    {card.period}
                  </span>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-white/10 mb-8" />

                {/* Features Section */}
                <p className="text-[13px] font-semibold text-white/80 mb-5">
                  What's included
                </p>
                
                <ul className="space-y-4 w-full flex-grow">
                  {card.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 group">
                      <HiOutlineCheckCircle className="w-5 h-5 text-[#146DE1] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-[13px] text-white/90 font-medium tracking-wide">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            /* ==================== STANDARD SIDE CARDS ==================== */
            <div
              key={card.id}
              className="relative w-full max-w-[340px] bg-gradient-to-b from-[#090d16] to-[#030712] rounded-xl border border-white/5 p-8 z-10 flex flex-col justify-between min-h-[220px] my-4 md:my-0 first:md:-mr-4 last:md:-ml-4 overflow-hidden"
            >
              {/* Subtle side glow */}
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-blue-900/10 blur-[40px] pointer-events-none" />

              <div>
                {/* Card Title */}
                <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                  {card.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-[13px] text-white/50 mb-8">
                  {card.subtitle}
                </p>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {card.price}
                </span>
                <span className="text-xs font-medium text-white/40">
                  {card.period}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}