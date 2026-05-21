import React from "react";

// 1. TypeScript Interfaces for the Content structure
interface StatItem {
  value: string;
  label: string;
}

interface AboutContentData {
  title: string;
  paragraphs: string[];
  stats: StatItem[];
  imageSrc: string;
  imageAlt: string;
}

// 2. Structured JSON Data
const aboutData: AboutContentData = {
  title: "About BarkBridge",
  paragraphs: [
    'Founded by a team of veterinarians, AI researchers, and passionate dog lovers, BarkBridge was born from a simple question: "What if we could truly understand our dogs?"',
    "After years of research combining animal behavior science, machine learning, and acoustic analysis, we've created the world's most advanced dog communication platform.",
    "Our mission is to strengthen the bond between humans and their canine companions by bridging the communication gap. Every bark, every tail wag, every subtle gesture tells a story—and we're here to help you understand it.",
  ],
  stats: [
    { value: "5+", label: "Years of Research" },
    { value: "200+", label: "Dog Breeds Supported" },
    { value: "1M+", label: "Translations Daily" },
    { value: "24/7", label: "Support Available" },
  ],
  // Replace this with your local vector or graphic image path
  imageSrc:
    "https://i.ibb.co.com/Q7P94Crh/Gemini-Generated-Image-hy4k5phy4k5phy4k-1.png",
  imageAlt: "Illustration of a woman with headphones hugging a corgi dog",
};

export default function AboutSection() {
  const { title, paragraphs, stats, imageSrc, imageAlt } = aboutData;

  return (
    <section className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden">
      {/* ==================== AMBIENT GLOW EFFECTS ==================== */}
      {/* Top Right Corner Glow Container */}
      <div className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-[rgba(36,0,255,0.55)] blur-[120px] pointer-events-none mix-blend-screen z-0" />
      {/* Extra subtle secondary cyan/blue streak for matching the design sample */}
      <div className="absolute top-0 right-0 w-40 h-96 rounded-full bg-[#146DE1]/20 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6  lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Illustration (Spans 5 blocks on large viewports) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
          {/* Subtle blue ambient glow behind the artwork */}
          <div className="absolute inset-0 bg-blue-600/40 blur-[100px] rounded-full pointer-events-none" />

          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-[420px] lg:max-w-full h-auto object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(20,109,225,0.15)] animate-fade-in"
          />
        </div>

        {/* Right Column: Copywriting & Stats Grid (Spans 7 blocks) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {title}
          </h2>

          {/* Description Paragraphs Loop */}
          <div className="space-y-4 max-w-[680px]">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[rgba(255,255,255,0.70)]  text-sm sm:text-lg font-normal leading-relaxed tracking-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Metrics Grid Setup */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 w-full max-w-[500px]">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start group">
                {/* Accentuated Highlight Metrics */}
                <span className="text-2xl sm:text-3xl font-extrabold text-[#146DE1] tracking-tight group-hover:scale-102 transition-transform duration-200">
                  {stat.value}
                </span>
                {/* Secondary Gray Subtitle Metadata descriptors */}
                <span className="text-xs sm:text-sm text-[rgba(255,255,255,0.70)] font-medium mt-1 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
