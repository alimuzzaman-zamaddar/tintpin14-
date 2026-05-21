import React from "react";
import { FaStar } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import FAQSection from "./FAQSection";
import NewsletterSection from "./NewsletterSection";

// ==================== TYPE INTERFACES ====================
interface TestimonialItem {
  id: number;
  rating: number;
  text: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
}

interface TestimonialsData {
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

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

// ==================== STRUCTURED JSON DATA ====================
const testimonialsContent: TestimonialsData = {
  title: "Loved by dog owners everywhere",
  subtitle: "See what our community has to say",
  testimonials: [
    {
      id: 1,
      rating: 5,
      text: '"BarkBridge changed everything! I discovered my dog was trying to tell me about his hip pain for weeks. Got him to the vet and he\'s so much happier now."',
      authorName: "Sarah Johnson",
      authorRole: "Golden Retriever Owner",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 2,
      rating: 5,
      text: '"As a first-time dog owner, this app has been a lifesaver. I finally understand when Bella is hungry, playful, or needs to go out. It\'s like having a translator!"',
      authorName: "Michael Chen",
      authorRole: "Border Collie Owner",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 3,
      rating: 5,
      text: '"The accuracy is incredible. Max has separation anxiety and BarkBridge helps me understand his stress levels. The insights have made training so much more effective."',
      authorName: "Emily Rodriguez",
      authorRole: "German Shepherd Owner",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
  ],
};

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

export default function TestimonialsAndPricing() {
  return (
    <>
      <section className="relative w-full bg-[#030712] text-white py-24 lg:py-32 select-none overflow-hidden font-['Inter']">
        {/* ==================== BACKGROUND AMBIENT GLOWS & LINES ==================== */}
        {/* Global Requested Corner Glow */}
        <div className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-[rgba(36,0,255,0.3)] blur-[150px] pointer-events-none mix-blend-screen z-0" />

        {/* Left Bottom Corner Ambient Glow */}
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none z-0" />

        {/* Centered Ambient Glow behind Pricing Grid */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none z-0" />

        {/* Angled background decorative texture lines matching the mockup image */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[160vw] h-[50px] bg-white -rotate-[30deg]" />

          <div className="absolute top-[400px] left-1/2 -translate-x-1/2 w-[160vw] h-[50px] bg-white -rotate-[30deg]" />
        </div>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
          <div className="absolute bottom-1/3 right-0 w-[180vw] h-[50px] bg-white rotate-30 transform -translate-y-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[180vw] h-[50px] bg-white rotate-30 transform -translate-y-1/2" />
        </div>

        {/* ==================== 1. TESTIMONIALS SUBSECTION ==================== */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 mb-28 lg:mb-36">
          {/* Testimonials Header */}
          <div className="text-center max-w-[800px] mx-auto mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 font-['Outfit']">
              {testimonialsContent.title}
            </h2>
            <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide">
              {testimonialsContent.subtitle}
            </p>
          </div>

          {/* Testimonials 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonialsContent.testimonials.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#060b18]/60 backdrop-blur-md p-8 lg:p-10 flex flex-col justify-between group transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1 shadow-2xl"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                <div>
                  {/* 5-Star Rating Row */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-white/75 text-sm sm:text-base font-normal leading-relaxed tracking-normal mb-2">
                    {item.text}
                  </p>
                </div>

                {/* Reviewer Profile Module */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                  <img
                    src={item.avatarUrl}
                    alt={item.authorName}
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                      {item.authorName}
                    </h4>
                    <p className="text-white/45 text-xs font-medium mt-0.5 truncate">
                      {item.authorRole}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== 2. PRICING SUBSECTION ==================== */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6">
          {/* Pricing Header */}
          <div className="text-center max-w-[800px] mx-auto mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {pricingContent.title}
            </h2>
            <p className="text-white/60 text-sm sm:text-base font-normal tracking-wide max-w-[650px] mx-auto leading-relaxed">
              {pricingContent.subtitle}
            </p>
          </div>

          {/* Pricing Card Grid Layout */}
          <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center justify-center gap-0">
            {pricingContent.cards.map((card) => {
              if (card.isFeatured) {
                return (
                  /* Featured Main Card (Center Option) */
                  <div className="relative w-full max-w-[364px] bg-rounded-[20px]  bg-linear-[to_bottom] from-sky-500 to-indigo-500 rounded-2xl shadow-2xl z-20 flex flex-col items-start min-h-[584px] overflow-hidden">
                    <div
                      key={card.id}
                      className="relative w-full max-w-[360px] bg-[#030712] rounded-2xl p-8 shadow-2xl z-30 flex flex-col items-start min-h-[580px] overflow-hidden"
                    >
                      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-600/50 blur-[60px] pointer-events-none" />

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

                      <div className="w-full h-[1px] bg-white/10 mb-8" />

                      <p className="text-[13px] font-semibold text-white/80 mb-5">
                        What's included
                      </p>

                      <ul className="space-y-4 w-full flex-grow">
                        {card.features?.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 group"
                          >
                            <HiOutlineCheckCircle className="w-5 h-5 text-[#146DE1] shrink-0 transition-transform duration-200 group-hover:scale-110" />
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
                /* Standard Side Plan Cards */
                <div
                  key={card.id}
                  className="relative w-full max-w-[340px] bg-gradient-to-b from-[#090d16] to-[#030712] rounded-xl border border-white/5 p-8 z-10 flex flex-col justify-between min-h-[220px] my-4 md:my-0 first:md:-mr-4 last:md:-ml-4 overflow-hidden shadow-xl"
                >
                  <div className="absolute -top-10 -right-0 w-32 h-32 rounded-full bg-blue-900/50 blur-[40px] pointer-events-none" />

                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-white/50 mb-8">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
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

        <FAQSection />
      </section>
      <NewsletterSection />
    </>
  );
}
