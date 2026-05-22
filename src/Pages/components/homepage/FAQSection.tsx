/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

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

interface FAQSectionProps {
  faqSection?: FAQSectionData;
}

const fallbackFAQData: Required<FAQSectionData> = {
  title: "Frequently Asked Questions",
  subtitle:
    "Got questions? We've got answers. Find everything you need to know about using our platform, plans, and features.",
  items: [
    {
      id: 1,
      question: "How does BarkBridge work?",
      answer:
        "BarkBridge uses advanced AI technology to analyze your dog's voice and translate it into human-understandable emotions and meanings.",
      status: "active",
      faq_category_id: 1,
    },
    {
      id: 2,
      question: "What do I get with the monthly subscription?",
      answer:
        "With the monthly subscription, you get up to 300 scans per month, unlocked access to premium behavior analysis dashboards, faster cloud processing speeds, priority customer support channels, and advanced high-fidelity AI translation features.",
      status: "active",
      faq_category_id: 1,
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can absolutely cancel your subscription at any point. There are no locking contracts or hidden exit fees.",
      status: "active",
      faq_category_id: 1,
    },
  ],
};

export default function FAQSection({ faqSection }: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  const title = faqSection?.title || fallbackFAQData.title;
  const subtitle = faqSection?.subtitle || fallbackFAQData.subtitle;

  const faqs =
    faqSection?.items && faqSection.items.length > 0
      ? faqSection.items.filter((faq) => faq.status !== "inactive")
      : fallbackFAQData.items;

  const [openFAQId, setOpenFAQId] = useState<number | null>(
    faqs?.[0]?.id || 1,
  );

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

  const toggleFAQ = (id: number) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  const glowParallaxY = (scrollProgress - 0.5) * -36;
  const listParallaxY = (scrollProgress - 0.5) * 12;

  return (
    <section
      ref={sectionRef}
      className="relative w-full text-white py-20 lg:py-28 font-['Inter'] select-none overflow-hidden"
    >
      {/* Background Ambient Glow Texture to maintain design consistency */}
      <div
        className="absolute top-1/2 left-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[140px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, calc(-50% + ${glowParallaxY}px))`,
          willChange: "transform",
        }}
      />

      <div className="relative z-10 max-w-[1040px] mx-auto px-6">
        {/* ==================== SECTION HEADER ==================== */}
        <div
          className={`text-center max-w-[800px] mx-auto mb-16 lg:mb-20 transition-all duration-[800ms] ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-['Outfit']">
            {title}
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide max-w-[620px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ==================== ACCORDION LIST WRAPPER ==================== */}
        <div
          className="max-w-[880px] mx-auto flex flex-col transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${listParallaxY}px)`,
            willChange: "transform",
          }}
        >
          {faqs.map((faq, index) => {
            const faqId = faq.id || index + 1;
            const isOpen = openFAQId === faqId;

            return (
              <div
                key={faqId}
                className={`w-full border-b border-white/[0.08] transition-all duration-[700ms] ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${160 + index * 90}ms`,
                }}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faqId)}
                  className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-200 tracking-wide">
                    {index + 1}. {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ml-4 ${
                      isOpen
                        ? "border-[#146DE1]/40 bg-[#146DE1]/10"
                        : "border-white/[0.06] bg-white/[0.02] group-hover:border-white/[0.14]"
                    }`}
                  >
                    <HiChevronDown
                      className={`w-5 h-5 text-white/40 group-hover:text-white/80 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-white/90" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Smooth Max-Height Panel Transition Container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/60 text-[13px] sm:text-sm font-normal leading-relaxed tracking-wide max-w-[820px] pl-4 border-l border-blue-500/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}