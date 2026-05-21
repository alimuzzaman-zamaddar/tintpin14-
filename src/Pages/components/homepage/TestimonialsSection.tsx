import React from 'react';
import { FaStar } from 'react-icons/fa6';

// 1. TypeScript Interfaces for the Testimonials structure
interface TestimonialItem {
  id: number;
  rating: number;
  text: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
}

interface TestimonialsContentData {
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

// 2. Structured JSON Data
const testimonialsData: TestimonialsContentData = {
  title: "Loved by dog owners everywhere",
  subtitle: "See what our community has to say",
  testimonials: [
    {
      id: 1,
      rating: 5,
      text: '"BarkBridge changed everything! I discovered my dog was trying to tell me about his hip pain for weeks. Got him to the vet and he\'s so much happier now."',
      authorName: "Sarah Johnson",
      authorRole: "Golden Retriever Owner",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 2,
      rating: 5,
      text: '"As a first-time dog owner, this app has been a lifesaver. I finally understand when Bella is hungry, playful, or needs to go out. It\'s like having a translator!"',
      authorName: "Michael Chen",
      authorRole: "Border Collie Owner",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 3,
      rating: 5,
      text: '"The accuracy is incredible. Max has separation anxiety and BarkBridge helps me understand his stress levels. The insights have made training so much more effective."',
      authorName: "Emily Rodriguez",
      authorRole: "German Shepherd Owner",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    }
  ]
};

export default function TestimonialsSection() {
  const { title, subtitle, testimonials } = testimonialsData;

  return (
    <section className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden">
      
   
      
      {/* Left side corner ambient glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0" />
      
      {/* Angled background decorative lines matching the image background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 w-[200%] h-[120px] bg-white -rotate-12 transform -translate-y-1/2" />
        <div className="absolute top-1/3 left-0 w-[200%] h-[40px] bg-white -rotate-12 transform -translate-y-1/2" />
      </div>

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

        {/* ==================== TESTIMONIALS 3-COLUMN GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#060b18]/60 backdrop-blur-md p-8 lg:p-10 flex flex-col justify-between group transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1 shadow-2xl"
            >
              {/* Subtle top horizontal lighting accent on the individual card overlay */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              
              <div>
                {/* 5-Star Rating Row */}
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-[rgba(255,255,255,0.75)] text-sm sm:text-base font-normal leading-relaxed tracking-normal mb-8">
                  {item.text}
                </p>
              </div>

              {/* Reviewer Profile Module Footer */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/[0.04]">
                <img 
                  src={item.avatarUrl} 
                  alt={item.authorName} 
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                    {item.authorName}
                  </h4>
                  <p className="text-[rgba(255,255,255,0.45)] text-xs font-medium mt-0.5 truncate">
                    {item.authorRole}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}