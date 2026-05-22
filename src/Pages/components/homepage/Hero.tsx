import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import heroBg from "../../../assets/Hero section pic 1.png";
import { AppleSvg, GoogleSvg } from "../../../lib/Svg";

type HeroSection = {
  main_title?: string;
  title?: string;
  subtitle?: string;
  background_image?: string;
  button_text?: string;
  button_link?: string;
};

type TestimonialSection = {
  items?: {
    avg_rating?: number;
    total_count?: number;
  };
};

type HeroProps = {
  heroSection?: HeroSection;
  testimonialSection?: TestimonialSection;
};

const navLinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];

const reviewAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
];

export default function Hero({ heroSection, testimonialSection }: HeroProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let animationFrameId = 0;

    const handleScroll = () => {
      animationFrameId = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const imageBaseUrl = import.meta.env.VITE_API_URL_IMAGE || "";

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return heroBg;
    if (imagePath.startsWith("http")) return imagePath;

    return `${imageBaseUrl}${imagePath}`;
  };

  const backgroundImageUrl = getImageUrl(heroSection?.background_image);

  const avgRating = testimonialSection?.items?.avg_rating || 5;
  const totalReviews = testimonialSection?.items?.total_count || 0;
  const totalStars = Math.max(0, Math.min(5, Math.round(avgRating)));

  const scrollRatio = Math.min(scrollY / 700, 1);
  const contentTranslateY = scrollY * -0.045;
  const badgesTranslateY = scrollY * -0.025;
  const heroOpacity = Math.max(1 - scrollRatio * 0.45, 0.55);
  const backgroundShift = scrollY * 0.08;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat flex flex-col justify-between font-['Outfit'] select-none"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: `center calc(50% + ${backgroundShift}px)`,
      }}
    >
      <style>
        {`
          @keyframes heroFadeUp {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes heroSoftFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          .hero-reveal {
            opacity: 0;
            animation-name: heroFadeUp;
            animation-duration: 800ms;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }

          .hero-reveal-1 {
            animation-delay: 100ms;
          }

          .hero-reveal-2 {
            animation-delay: 240ms;
          }

          .hero-reveal-3 {
            animation-delay: 380ms;
          }

          .hero-reveal-4 {
            animation-delay: 520ms;
          }

          .hero-reveal-5 {
            animation-delay: 660ms;
          }

          .hero-floating {
            animation: heroSoftFloat 4s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-reveal,
            .hero-floating {
              opacity: 1;
              animation: none;
              transform: none;
            }
          }
        `}
      </style>

      {/* ==================== HERO CONTENT SPLIT AREA ==================== */}
      <div
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 px-5 xl:px-0 pt-36 pb-16 flex-grow grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
        style={{
          transform: `translateY(${contentTranslateY}px)`,
          opacity: heroOpacity,
          transition: "opacity 120ms linear",
          willChange: "transform, opacity",
        }}
      >
        {/* Left Side: Content Column */}
        <div className="flex flex-col items-start text-left">
          <h1 className="hero-reveal hero-reveal-1 text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.15] tracking-tight">
            {heroSection?.main_title || "What Is Your Dog Really"}{" "}
            <span className="text-[#146DE1] block sm:inline">
              {heroSection?.title || "Saying?"}
            </span>
          </h1>

          <p className="hero-reveal hero-reveal-2 mt-6 text-base sm:text-lg text-white/80 font-medium leading-relaxed max-w-[490px]">
            {heroSection?.subtitle ||
              "BarkBridge listens, analyzes, and translates your dog's voice into simple human understanding."}
          </p>

          {/* Call To Action Button */}
          <a
            href={heroSection?.button_link || "#"}
            className="hero-reveal hero-reveal-3 mt-8 text-white text-base font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:opacity-95 active:scale-98 cursor-pointer transition-all inline-block hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
            }}
          >
            {heroSection?.button_text || "Download now"}
          </a>

          {/* Reviews Rating Widget Box */}
          <div className="hero-reveal hero-reveal-4 hero-floating mt-8 border border-white/10 bg-black/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-inner">
            <div className="flex -space-x-3 overflow-hidden">
              {reviewAvatars.map((url, i) => (
                <img
                  key={i}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#1b2230] object-cover transition-transform duration-300 hover:-translate-y-1"
                  src={url}
                  alt="User Avatar"
                />
              ))}
            </div>

            <div>
              <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                {[...Array(totalStars)].map((_, i) => (
                  <FaStar key={i} className="transition-transform duration-300 hover:scale-110" />
                ))}
              </div>

              <p className="text-white text-xs font-semibold mt-0.5 tracking-wide">
                {avgRating} rating from {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Empty Container: Preserves layout spacing so phone graphic layer shows correctly */}
        <div className="hidden lg:block h-full pointer-events-none" />
      </div>

      <div>
        {/* ==================== FOOTER BADGES AREA ==================== */}
        <div
          className="hero-reveal hero-reveal-5 relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-20 xl:pb-40 flex flex-wrap gap-4 items-center justify-center"
          style={{
            transform: `translateY(${badgesTranslateY}px)`,
            willChange: "transform",
          }}
        >
          <a href="#" className="hover:scale-102 transition-transform">
            <AppleSvg />
          </a>

          <a href="#" className="hover:scale-102 transition-transform">
            <GoogleSvg />
          </a>
        </div>
      </div>

      {/* ==================== MOBILE DRAWER SIDEBAR ==================== */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 lg:hidden
          ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#101622] border-l border-white/10 z-[70] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[#146DE1] font-extrabold text-lg tracking-tight">
                BarkBridge
              </span>

              <span className="bg-[#2606ED] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                AI
              </span>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-[#146DE1] text-2xl p-1 transition-colors"
            >
              <HiOutlineX />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link;

              return (
                <button
                  key={link}
                  onClick={() => {
                    setActiveTab(link);
                    setIsSidebarOpen(false);
                  }}
                  style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  className={`text-left text-lg font-semibold py-2 transition-all block w-full
                    ${
                      isActive
                        ? "text-[#146DE1] underline underline-offset-4 decoration-solid"
                        : "text-white hover:text-[#146DE1]"
                    }`}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <a
            href={heroSection?.button_link || "#"}
            className="text-white text-base cursor-pointer font-semibold w-full py-3.5 rounded-lg shadow-lg active:scale-98 transition-all block text-center"
            style={{
              background:
                "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
            }}
          >
            {heroSection?.button_text || "Get the app"}
          </a>
        </div>
      </div>
    </div>
  );
}