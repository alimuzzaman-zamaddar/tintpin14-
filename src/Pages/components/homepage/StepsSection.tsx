import React from 'react';

// 1. TypeScript Interfaces for the Steps structure
interface StepItem {
  id: number;
  title: string;
  description: string;
}

interface StepsContentData {
  title: string;
  subtitle: string;
  steps: StepItem[];
}

// 2. Structured JSON Data
const stepsData: StepsContentData = {
  title: "Loved by dog owners everywhere",
  subtitle: "See what our community has to say",
  steps: [
    {
      id: 1,
      title: "Download & Setup",
      description: "Install the BarkBridge app and create a profile for your dog with basic information like breed, age, and personality traits."
    },
    {
      id: 2,
      title: "Start Listening",
      description: "Activate the AI listener to capture your dog's sounds and movements. The AI begins learning their unique communication style."
    },
    {
      id: 3,
      title: "Understand & Connect",
      description: "Receive instant translations and insights. Build a stronger bond as you understand your dog's needs, emotions, and desires."
    }
  ]
};

export default function StepsSection() {
  const { title, subtitle, steps } = stepsData;

  return (
    <section className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden">
      
      {/* Background container layout constraint */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0">
        
        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center max-w-[800px] mx-auto mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {title}
          </h2>
          <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* ==================== STEPS 3-COLUMN GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative overflow-hidden rounded-2xl border border-[#146DE1]/20 bg-[#060b18] p-8 lg:p-10 text-center flex flex-col items-center group transition-all duration-300 hover:border-[#146DE1]/40 hover:-translate-y-1 shadow-2xl"
            >
              {/* Internal micro ambient card glow behind the numbers */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue-600/10 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-300" />
              
              {/* Step Pill Counter Indicator using your Main-Liner gradient tokens */}
              <div 
                className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold shadow-lg shadow-blue-900/40"
                style={{ background: 'linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)' }}
              >
                {step.id}
              </div>

              {/* Step Title Header */}
              <h3 className="relative z-10 text-lg sm:text-xl font-bold tracking-tight text-white mb-4">
                {step.title}
              </h3>

              {/* Step Body Copy block */}
              <p className="relative z-10 text-[rgba(255,255,255,0.65)] text-xs sm:text-sm font-normal leading-relaxed tracking-normal max-w-[310px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}