/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

interface AboutItem {
  title?: string;
  subtitle?: string;
}

interface AboutSectionData {
  title?: string;
  description?: string;
  image?: string;
  items?: AboutItem[];
}

interface AboutSectionProps {
  aboutSection?: AboutSectionData;
}

const fallbackAboutData = {
  title: "About BarkBridge",
  description:
    'Founded by a team of veterinarians, AI researchers, and passionate dog lovers, BarkBridge was born from a simple question: "What if we could truly understand our dogs?"\nAfter years of research combining animal behavior science, machine learning, and acoustic analysis, we\'ve created the world\'s most advanced dog communication platform.\nOur mission is to strengthen the bond between humans and their canine companions by bridging the communication gap. Every bark, every tail wag, every subtle gesture tells a story—and we\'re here to help you understand it.',
  image:
    "https://i.ibb.co.com/Q7P94Crh/Gemini-Generated-Image-hy4k5phy4k5phy4k-1.png",
  items: [
    { title: "5+", subtitle: "Years of Research" },
    { title: "200+", subtitle: "Dog Breeds Supported" },
    { title: "1M+", subtitle: "Translations Daily" },
    { title: "24/7", subtitle: "Support Available" },
  ],
};

export default function AboutSection({ aboutSection }: AboutSectionProps) {
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
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = Math.max(0, Math.min(1, progress));

        setScrollProgress(clampedProgress);
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

  const imageBaseUrl = import.meta.env.VITE_API_URL_IMAGE || "";

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return fallbackAboutData.image;
    if (imagePath.startsWith("http")) return imagePath;

    return `${imageBaseUrl}${imagePath}`;
  };

  const title = aboutSection?.title || fallbackAboutData.title;

  const paragraphs = (aboutSection?.description || fallbackAboutData.description)
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const stats =
    aboutSection?.items && aboutSection.items.length > 0
      ? aboutSection.items
      : fallbackAboutData.items;

  const imageSrc = getImageUrl(aboutSection?.image);
  const imageAlt = title;

  const imageParallaxY = (scrollProgress - 0.5) * -36;
  const textParallaxY = (scrollProgress - 0.5) * 18;
  const glowParallaxY = (scrollProgress - 0.5) * -28;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden"
    >
      {/* ==================== AMBIENT GLOW EFFECTS ==================== */}
      <div
        className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-[rgba(36,0,255,0.55)] blur-[120px] pointer-events-none mix-blend-screen z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${glowParallaxY}px)`,
        }}
      />

      <div
        className="absolute top-0 right-0 w-40 h-96 rounded-full bg-[#146DE1]/20 blur-[100px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${glowParallaxY * 0.7}px)`,
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Illustration */}
        <div
          className={`lg:col-span-5 flex justify-center lg:justify-start relative transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="absolute inset-0 bg-blue-600/40 blur-[100px] rounded-full pointer-events-none" />

          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-[420px] lg:max-w-full h-auto object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(20,109,225,0.15)] transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${imageParallaxY}px)`,
              willChange: "transform",
            }}
          />
        </div>

        {/* Right Column: Copywriting & Stats Grid */}
        <div
          className="lg:col-span-7 flex flex-col items-start transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${textParallaxY}px)`,
            willChange: "transform",
          }}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {title}
          </h2>

          <div className="space-y-4 max-w-[680px]">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[rgba(255,255,255,0.70)] text-sm sm:text-lg font-normal leading-relaxed tracking-normal transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${160 + index * 120}ms`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 w-full max-w-[500px]">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-start group transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: `${420 + index * 110}ms`,
                }}
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-[#146DE1] tracking-tight group-hover:scale-102 transition-transform duration-200">
                  {stat.title}
                </span>

                <span className="text-xs sm:text-sm text-[rgba(255,255,255,0.70)] font-medium mt-1 tracking-wide">
                  {stat.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}