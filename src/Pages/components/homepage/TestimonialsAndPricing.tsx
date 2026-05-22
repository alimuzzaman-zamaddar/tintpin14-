/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import FAQSection from "./FAQSection";
import NewsletterSection from "./NewsletterSection";

// ==================== API TYPE INTERFACES ====================
interface ApiTestimonialItem {
  id?: number;
  name?: string;
  position?: string;
  bio?: string | null;
  image?: string;
  rating?: number;
  text?: string;
}

interface TestimonialSectionData {
  title?: string;
  subtitle?: string;
  items?: {
    testimonials?: ApiTestimonialItem[];
    avg_rating?: number;
    total_count?: number;
  };
}

interface PlanSectionData {
  title?: string;
  subtitle?: string;
}

interface FAQItem {
  id?: number;
  faq_category_id?: number;
  question?: string;
  answer?: string;
  status?: string;
}

interface FAQSectionData {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

interface NewsletterSectionData {
  title?: string;
  description?: string;
}

interface TestimonialsAndPricingProps {
  testimonialSection?: TestimonialSectionData;
  planSection?: PlanSectionData;
  faqSection?: FAQSectionData;
  newsletterSection?: NewsletterSectionData;
}

// ==================== PRICING TYPE INTERFACES ====================
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

interface PricingData {
  title: string;
  subtitle: string;
  cards: PricingCard[];
}

// ==================== FALLBACK TESTIMONIAL DATA ====================
const fallbackTestimonials = [
  {
    id: 1,
    rating: 5,
    text: '"BarkBridge changed everything! I discovered my dog was trying to tell me about his hip pain for weeks. Got him to the vet and he\'s so much happier now."',
    name: "Sarah Johnson",
    position: "Golden Retriever Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    rating: 5,
    text: '"As a first-time dog owner, this app has been a lifesaver. I finally understand when Bella is hungry, playful, or needs to go out. It\'s like having a translator!"',
    name: "Michael Chen",
    position: "Border Collie Owner",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    rating: 5,
    text: '"The accuracy is incredible. Max has separation anxiety and BarkBridge helps me understand his stress levels. The insights have made training so much more effective."',
    name: "Emily Rodriguez",
    position: "German Shepherd Owner",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
];

// ==================== STRUCTURED STATIC PRICING CARD DATA ====================
const pricingContent: PricingData = {
  title: "Unlock Premium Dog Translation Experience",
  subtitle:
    "Choose the perfect plan for unlimited dog voice scans, premium insights, and smarter pet communication.",
  cards: [
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
  ],
};

export default function TestimonialsAndPricing({
  testimonialSection,
  planSection,
  faqSection,
  newsletterSection,
}: TestimonialsAndPricingProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const section = sectionRef.current;
    const testimonialsBlock = testimonialsRef.current;
    const pricingBlock = pricingRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsTestimonialsVisible(true);
      setIsPricingVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === testimonialsBlock) {
            setIsTestimonialsVisible(true);
          }

          if (entry.target === pricingBlock) {
            setIsPricingVisible(true);
          }
        });
      },
      {
        threshold: 0.16,
      },
    );

    if (testimonialsBlock) observer.observe(testimonialsBlock);
    if (pricingBlock) observer.observe(pricingBlock);

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

  const imageBaseUrl = import.meta.env.VITE_API_URL_IMAGE || "";

  const getImageUrl = (imagePath?: string, fallbackImage?: string) => {
    if (!imagePath) return fallbackImage || "";
    if (imagePath.startsWith("http")) return imagePath;

    return `${imageBaseUrl}${imagePath}`;
  };

  const testimonialTitle =
    testimonialSection?.title || "Loved by dog owners everywhere";

  const testimonialSubtitle =
    testimonialSection?.subtitle || "See what our community has to say";

  const testimonials =
    testimonialSection?.items?.testimonials &&
    testimonialSection.items.testimonials.length > 0
      ? testimonialSection.items.testimonials
      : fallbackTestimonials;

  const pricingTitle = planSection?.title || pricingContent.title;
  const pricingSubtitle = planSection?.subtitle || pricingContent.subtitle;

  const topGlowY = (scrollProgress - 0.5) * -80;
  const leftGlowY = (scrollProgress - 0.5) * 55;
  const centerGlowY = (scrollProgress - 0.5) * -45;
  const textureShiftY = (scrollProgress - 0.5) * 28;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#030712] text-white py-24 lg:py-32 select-none overflow-hidden font-['Inter']"
      >
        {/* ==================== BACKGROUND AMBIENT GLOWS & LINES ==================== */}
        <div
          className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-[rgba(36,0,255,0.3)] blur-[150px] pointer-events-none mix-blend-screen z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${topGlowY}px)`,
            willChange: "transform",
          }}
        />

        <div
          className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${leftGlowY}px)`,
            willChange: "transform",
          }}
        />

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(-50%, ${centerGlowY}px)`,
            willChange: "transform",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${textureShiftY}px)`,
            willChange: "transform",
          }}
        >
          <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[160vw] h-[50px] bg-white -rotate-[30deg]" />
          <div className="absolute top-[400px] left-1/2 -translate-x-1/2 w-[160vw] h-[50px] bg-white -rotate-[30deg]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${-textureShiftY}px)`,
            willChange: "transform",
          }}
        >
          <div className="absolute bottom-1/3 right-0 w-[180vw] h-[50px] bg-white rotate-30 transform -translate-y-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[180vw] h-[50px] bg-white rotate-30 transform -translate-y-1/2" />
        </div>

        {/* ==================== 1. TESTIMONIALS SUBSECTION ==================== */}
        <div
          ref={testimonialsRef}
          className="relative z-10 max-w-[1440px] mx-auto px-6 mb-28 lg:mb-36"
        >
          {/* Testimonials Header */}
          <div
            className={`text-center max-w-[800px] mx-auto mb-16 lg:mb-20 transition-all duration-[800ms] ease-out ${
              isTestimonialsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 font-['Outfit']">
              {testimonialTitle}
            </h2>

            <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide">
              {testimonialSubtitle}
            </p>
          </div>

          {/* Testimonials 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((item, index) => {
              const rating = Math.max(
                0,
                Math.min(5, Math.round(item.rating || 5)),
              );
              const fallbackImage = fallbackTestimonials[index]?.image;

              return (
                <div
                  key={item.id || index}
                  className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#060b18]/60 backdrop-blur-md p-8 lg:p-10 flex flex-col justify-between group shadow-2xl transition-all duration-[800ms] ease-out hover:border-white/[0.15] hover:-translate-y-2 ${
                    isTestimonialsVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${180 + index * 130}ms`,
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-20 -left-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Rating Row */}
                    <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="transition-transform duration-300 group-hover:scale-110"
                          style={{
                            transitionDelay: `${i * 40}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-white/75 text-sm sm:text-base font-normal leading-relaxed tracking-normal mb-2">
                      {item.text}
                    </p>
                  </div>

                  {/* Reviewer Profile Module */}
                  <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                    <img
                      src={getImageUrl(item.image, fallbackImage)}
                      alt={item.name || "Reviewer"}
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10 shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                        {item.name}
                      </h4>

                      <p className="text-white/45 text-xs font-medium mt-0.5 truncate">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== 2. PRICING SUBSECTION ==================== */}
        <div
          ref={pricingRef}
          className="relative z-10 max-w-[1440px] mx-auto px-6"
        >
          {/* Pricing Header */}
          <div
            className={`text-center max-w-[800px] mx-auto mb-16 lg:mb-20 transition-all duration-[800ms] ease-out ${
              isPricingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {pricingTitle}
            </h2>

            <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide max-w-[650px] mx-auto leading-relaxed">
              {pricingSubtitle}
            </p>
          </div>

          {/* Pricing Card Grid Layout */}
          <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center justify-center gap-0">
            {pricingContent.cards.map((card, index) => {
              if (card.isFeatured) {
                return (
                  <div
                    key={card.id}
                    className={`relative w-full max-w-[364px] bg-rounded-[20px] bg-linear-[to_bottom] from-sky-500 to-indigo-500 rounded-2xl shadow-2xl z-20 flex flex-col items-start min-h-[584px] overflow-hidden transition-all duration-[900ms] ease-out ${
                      isPricingVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-12 scale-95"
                    }`}
                    style={{
                      transitionDelay: `${220 + index * 130}ms`,
                    }}
                  >
                    <div className="relative w-full max-w-[360px] bg-[#030712] rounded-2xl p-8 shadow-2xl z-30 flex flex-col items-start min-h-[580px] overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-600/50 blur-[60px] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-[#146DE1] mb-2 relative z-10">
                        {card.title}
                      </h3>

                      <p className="text-[13px] text-white/60 mb-8 relative z-10">
                        {card.subtitle}
                      </p>

                      <div className="flex items-baseline gap-2 mb-8 relative z-10">
                        <span className="text-5xl font-extrabold tracking-tight text-white">
                          {card.price}
                        </span>

                        <span className="text-sm font-medium text-white/60">
                          {card.period}
                        </span>
                      </div>

                      <div className="w-full h-[1px] bg-white/10 mb-8 relative z-10" />

                      <p className="text-[13px] font-semibold text-white/80 mb-5 relative z-10">
                        What's included
                      </p>

                      <ul className="space-y-4 w-full flex-grow relative z-10">
                        {card.features?.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center gap-3 group/item transition-all duration-500 ease-out ${
                              isPricingVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4"
                            }`}
                            style={{
                              transitionDelay: `${520 + idx * 70}ms`,
                            }}
                          >
                            <HiOutlineCheckCircle className="w-5 h-5 text-[#146DE1] shrink-0 transition-transform duration-200 group-hover/item:scale-110" />

                            <span className="text-[13px] text-white/90 font-medium tracking-wide">
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.id}
                  className={`relative w-full max-w-[340px] bg-gradient-to-b from-[#090d16] to-[#030712] rounded-xl border border-white/5 p-8 z-10 flex flex-col justify-between min-h-[220px] my-4 md:my-0 first:md:-mr-4 last:md:-ml-4 overflow-hidden shadow-xl group transition-all duration-[800ms] ease-out hover:-translate-y-2 hover:border-white/10 ${
                    isPricingVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${220 + index * 130}ms`,
                  }}
                >
                  <div className="absolute -top-10 -right-0 w-32 h-32 rounded-full border border-blue-500/50 hover:border-blue-500 bg-blue-900/50 blur-[40px] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                      {card.title}
                    </h3>

                    <p className="text-[13px] text-white/50 mb-8">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-baseline gap-2">
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
        </div>

        <FAQSection faqSection={faqSection} />
      </section>

      <NewsletterSection newsletterSection={newsletterSection} />
    </>
  );
}