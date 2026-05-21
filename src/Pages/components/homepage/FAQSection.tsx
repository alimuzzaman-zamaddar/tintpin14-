import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

// 1. TypeScript Interfaces for the FAQ structure
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQContentData {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

// 2. Structured JSON Data matching the mockup text completely
const faqData: FAQContentData = {
  title: "Frequently Asked Questions",
  subtitle: "Got questions? We've got answers. Find everything you need to know about using our platform, plans, and features.",
  faqs: [
    {
      id: 1,
      question: "1. How does BarkBridge work?",
      answer: "BarkBridge uses advanced AI technology to analyze your dog's voice and translate it into human-understandable emotions and meanings.",
    },
    {
      id: 2,
      question: "2. What do I get with the monthly subscription?",
      answer: "With the monthly subscription, you get up to 300 scans per month, unlocked access to premium behavior analysis dashboards, faster cloud processing speeds, priority customer support channels, and advanced high-fidelity AI translation features.",
    },
    {
      id: 3,
      question: "3. Can I cancel my subscription anytime?",
      answer: "Yes, you can absolutely cancel your subscription at any point. There are no locking contracts or hidden exit fees. You will retain full access to premium tools until the expiration of your current active billing cycle.",
    },
    {
      id: 4,
      question: "4. Do unused monthly scans roll over?",
      answer: "No, the monthly scan tier balance resets automatically at the start of each new billing period cycle. Unused monthly allocations do not accumulate over into subsequent months.",
    },
    {
      id: 5,
      question: "5. Will my credits expire?",
      answer: "Purchased package credits (like the 10 or 30 credit bundles) never expire. They remain securely stored on your account balance interface until you decide to expend them dynamically.",
    },
    {
      id: 6,
      question: "6. Is BarkBridge available on iOS and Android?",
      answer: "Yes, the native companion mobile app is completely optimized and free to download across both Apple App Store and Google Play Store systems.",
    },
  ],
};

export default function FAQSection() {
  const { title, subtitle, faqs } = faqData;
  
  // Track open state per item index (supports opening one at a time comfortably)
  const [openFAQId, setOpenFAQId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <section className="relative w-full text-white py-20 lg:py-28 font-['Inter'] select-none overflow-hidden">
      {/* Background Ambient Glow Texture to maintain design consistency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1040px] mx-auto px-6">
        
        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center max-w-[800px] mx-auto mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-['Outfit']">
            {title}
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide max-w-[620px] mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ==================== ACCORDION LIST WRAPPER ==================== */}
        <div className="max-w-[880px] mx-auto flex flex-col">
          {faqs.map((faq) => {
            const isOpen = openFAQId === faq.id;

            return (
              <div
                key={faq.id}
                className="w-full border-b border-white/[0.08] transition-colors duration-200"
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-200 tracking-wide">
                    {faq.question}
                  </span>
                  <HiChevronDown
                    className={`w-5 h-5 text-white/40 group-hover:text-white/80 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-white/90" : ""
                    }`}
                  />
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