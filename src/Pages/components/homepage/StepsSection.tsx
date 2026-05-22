/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

interface ProcessItem {
  title?: string;
  description?: string;
}

interface ProcessSectionData {
  title?: string;
  subtitle?: string;
  items?: ProcessItem[];
}

interface StepsSectionProps {
  processSection?: ProcessSectionData;
}

const fallbackStepsData: Required<ProcessSectionData> = {
  title: "Loved by dog owners everywhere",
  subtitle: "See what our community has to say",
  items: [
    {
      title: "Download & Setup",
      description:
        "Install the BarkBridge app and create a profile for your dog with basic information like breed, age, and personality traits.",
    },
    {
      title: "Start Listening",
      description:
        "Activate the AI listener to capture your dog's sounds and movements. The AI begins learning their unique communication style.",
    },
    {
      title: "Understand & Connect",
      description:
        "Receive instant translations and insights. Build a stronger bond as you understand your dog's needs, emotions, and desires.",
    },
  ],
};

export default function StepsSection({ processSection }: StepsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.18,
      },
    );

    observer.observe(section);

    let animationFrameId = 0;

    const updateScrollProgress = () => {
      window.cancelAnimationFrame(animationFrameId);

      animationFrameId = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || 1;
        const progress =
          (windowHeight - rect.top) / (windowHeight + rect.height);

        setScrollProgress(Math.max(0, Math.min(1, progress)));
      });
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const title = processSection?.title || fallbackStepsData.title;
  const subtitle = processSection?.subtitle || fallbackStepsData.subtitle;

  const steps =
    processSection?.items && processSection.items.length > 0
      ? processSection.items
      : fallbackStepsData.items;

  const gridParallaxY = (scrollProgress - 0.5) * 18;
  const glowParallaxY = (scrollProgress - 0.5) * -32;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden"
    >
      {/* Soft animated background glow */}
      <div
        className="absolute top-1/2 left-1/2 h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, calc(-50% + ${glowParallaxY}px))`,
          willChange: "transform",
        }}
      />

      {/* Background container layout constraint */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0">
        {/* ==================== SECTION HEADER ==================== */}
        <div
          className={`text-center max-w-[800px] mx-auto mb-16 lg:mb-20 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {title}
          </h2>

          <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* ==================== STEPS 3-COLUMN GRID ==================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${gridParallaxY}px)`,
            willChange: "transform",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl border border-[#146DE1]/20 bg-[#060b18] p-8 lg:p-10 text-center flex flex-col items-center group shadow-2xl transition-all duration-700 ease-out hover:border-[#146DE1]/40 hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{
                transitionDelay: `${180 + index * 140}ms`,
              }}
            >
              {/* Internal micro ambient card glow behind the numbers */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue-600/10 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-300" />

              {/* Soft hover shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              </div>

              {/* Step Pill Counter Indicator */}
              <div
                className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold shadow-lg shadow-blue-900/40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
                  transitionDelay: `${320 + index * 140}ms`,
                }}
              >
                {index + 1}
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