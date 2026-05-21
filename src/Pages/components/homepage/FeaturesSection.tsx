import React from 'react';
import { 
  HiOutlineMicrophone, 
  HiOutlineCpuChip, 
  HiOutlineHeart, 
  HiOutlineSparkles, 
  HiOutlineCheckCircle, 
  HiOutlineEnvelope 
} from 'react-icons/hi2';

// 1. TypeScript Interfaces for Feature Items
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeaturesContentData {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

// 2. Structured JSON Data
const featuresData: FeaturesContentData = {
  title: "Powerful features for deeper understanding",
  subtitle: "Everything you need to communicate with your canine companion",
  features: [
    {
      id: 1,
      title: "Real-Time Translation",
      description: "Instant translation of barks, whines, and howls into clear messages you can understand in real-time.",
      icon: HiOutlineMicrophone
    },
    {
      id: 2,
      title: "Behavior Analysis",
      description: "Advanced AI analyzes body language, tail position, and ear movement to decode emotional states.",
      icon: HiOutlineCpuChip
    },
    {
      id: 3,
      title: "Personalized Learning",
      description: "The AI learns your dog's unique patterns and personality for increasingly accurate translations over time.",
      icon: HiOutlineHeart
    },
    {
      id: 4,
      title: "Health Alerts",
      description: "Detect early signs of distress, pain, or illness through vocal pattern changes and behavior shifts.",
      icon: HiOutlineSparkles
    },
    {
      id: 5,
      title: "Training Insights",
      description: "Get actionable recommendations to improve training based on your dog's communication patterns.",
      icon: HiOutlineCheckCircle
    },
    {
      id: 6,
      title: "Daily Reports",
      description: "Receive comprehensive daily summaries of your dog's mood, needs, and important communications.",
      icon: HiOutlineEnvelope
    }
  ]
};

export default function FeaturesSection() {
  const { title, subtitle, features } = featuresData;

  return (
    <section className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden">
      
      {/* ==================== TOP CENTER AMBIENT GLOW ==================== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6  lg:px-0">
        
        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center max-w-[800px] mx-auto mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>
          <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* ==================== FEATURES GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id}
                className="relative overflow-hidden border border-white/[0.06] rounded-3xl bg-[radial-gradient(105.8%_105.8%_at_50%_50%,#000_24.87%,rgba(0,0,0,0)_100%),linear-gradient(180deg,rgba(0,26,255,0.80)_0%,rgba(17,31,156,0.80)_100%)] p-8 text-center flex flex-col items-center group transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                {/* Micro Ambient Radial Light Bleed inside the card behind the icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-600/15 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-600/25 transition-colors duration-300" />
                
                {/* Icon Shell Wrapper */}
                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#146DE1] text-white shadow-[0_4px_20px_rgba(20,109,225,0.4)]">
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>

                {/* Feature Header Title */}
                <h3 className="relative z-10 text-lg sm:text-xl font-semibold tracking-tight text-white mb-3">
                  {feature.title}
                </h3>

                {/* Feature Body Context Description */}
                <p className="relative z-10 text-[rgba(255,255,255,0.65)] text-xs sm:text-sm font-normal leading-relaxed tracking-normal max-w-[290px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}