/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  HiOutlineMicrophone,
  HiOutlineCpuChip,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineEnvelope,
} from "react-icons/hi2";

interface ServiceItem {
  icon?: string;
  title?: string;
  description?: string;
}

interface ServicesSectionData {
  title?: string;
  subtitle?: string;
  items?: ServiceItem[];
}

interface FeaturesSectionProps {
  servicesSection?: ServicesSectionData;
}

interface FallbackFeatureItem {
  id: number;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const fallbackFeatures: FallbackFeatureItem[] = [
  {
    id: 1,
    title: "Real-Time Translation",
    description:
      "Instant translation of barks, whines, and howls into clear messages you can understand in real-time.",
    icon: HiOutlineMicrophone,
  },
  {
    id: 2,
    title: "Behavior Analysis",
    description:
      "Advanced AI analyzes body language, tail position, and ear movement to decode emotional states.",
    icon: HiOutlineCpuChip,
  },
  {
    id: 3,
    title: "Personalized Learning",
    description:
      "The AI learns your dog's unique patterns and personality for increasingly accurate translations over time.",
    icon: HiOutlineHeart,
  },
  {
    id: 4,
    title: "Health Alerts",
    description:
      "Detect early signs of distress, pain, or illness through vocal pattern changes and behavior shifts.",
    icon: HiOutlineSparkles,
  },
  {
    id: 5,
    title: "Training Insights",
    description:
      "Get actionable recommendations to improve training based on your dog's communication patterns.",
    icon: HiOutlineCheckCircle,
  },
  {
    id: 6,
    title: "Daily Reports",
    description:
      "Receive comprehensive daily summaries of your dog's mood, needs, and important communications.",
    icon: HiOutlineEnvelope,
  },
];

export default function FeaturesSection({
  servicesSection,
}: FeaturesSectionProps) {
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
        threshold: 0.16,
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
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    return `${imageBaseUrl}${imagePath}`;
  };

  const title =
    servicesSection?.title || "Powerful features for deeper understanding";

  const subtitle =
    servicesSection?.subtitle ||
    "Everything you need to communicate with your canine companion";

  const features: Array<ServiceItem | FallbackFeatureItem> =
    servicesSection?.items && servicesSection.items.length > 0
      ? servicesSection.items
      : fallbackFeatures;

  const glowParallaxY = (scrollProgress - 0.5) * -50;
  const gridParallaxY = (scrollProgress - 0.5) * 14;

  return (
    <section
    id="services"
      ref={sectionRef}
      className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden"
    >
      {/* ==================== TOP CENTER AMBIENT GLOW ==================== */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, ${glowParallaxY}px)`,
          willChange: "transform",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0">
        {/* ==================== SECTION HEADER ==================== */}
        <div
          className={`text-center max-w-[800px] mx-auto mb-16 lg:mb-20 transition-all duration-800 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>

          <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* ==================== FEATURES GRID ==================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${gridParallaxY}px)`,
            willChange: "transform",
          }}
        >
          {features.map((feature, index) => {
            const iconUrl =
              typeof feature.icon === "string" ? getImageUrl(feature.icon) : "";

            const IconComponent =
              typeof feature.icon === "function"
                ? feature.icon
                : fallbackFeatures[index]?.icon;

            return (
              <div
                key={index}
                className={`relative overflow-hidden border border-white/[0.06] rounded-3xl bg-[radial-gradient(105.8%_105.8%_at_50%_50%,#000_24.87%,rgba(0,0,0,0)_100%),linear-gradient(180deg,rgba(0,26,255,0.80)_0%,rgba(17,31,156,0.80)_100%)] p-8 text-center flex flex-col items-center group shadow-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-white/[0.14] ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
                style={{
                  transitionDelay: `${180 + index * 110}ms`,
                }}
              >
                {/* Micro Ambient Radial Light Bleed inside the card behind the icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-600/15 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-600/25 transition-colors duration-300" />

                {/* Soft moving shine layer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Icon Shell Wrapper */}
                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#146DE1] text-white shadow-[0_4px_20px_rgba(20,109,225,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={feature.title || "Feature icon"}
                      className="h-6 w-6 object-contain"
                    />
                  ) : IconComponent ? (
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  ) : null}
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