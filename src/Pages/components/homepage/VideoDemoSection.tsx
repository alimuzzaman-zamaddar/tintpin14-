import React, { useState } from 'react';
import { HiCheckCircle, HiPlay } from 'react-icons/hi2';

// 1. TypeScript Interfaces for the structure
interface FeatureBullet {
  id: number;
  title: string;
  description: string;
  iconColor: string; // Dynamic coloring for the different bullet checkmarks
}

interface DemoContentData {
  title: string;
  description: string;
  videoPlaceholderUrl: string;
  youtubeEmbedUrl: string; // Target path field for embedding video source frames
  bullets: FeatureBullet[];
}

// 2. Structured JSON Data
const demoData: DemoContentData = {
  title: "Watch BarkBridge translate in real-time",
  description: "See how our AI instantly decodes barks, whines, and body language into clear, actionable insights. Experience the magic of truly understanding your dog's needs.",
  videoPlaceholderUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  // Standard placeholder YouTube embed link (using autoplay feature flags)
  youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1", 
  bullets: [
    {
      id: 1,
      title: "Instant Voice Recognition",
      description: "Advanced AI processes barks in milliseconds",
      iconColor: "text-amber-500" // Orange-yellow bullet
    },
    {
      id: 2,
      title: "Context-Aware Translation",
      description: "Understands situation and environment",
      iconColor: "text-cyan-400" // Light blue bullet
    },
    {
      id: 3,
      title: "Multi-Language Support",
      description: "Translations available in 12+ languages",
      iconColor: "text-pink-500" // Pink bullet
    }
  ]
};

export default function VideoDemoSection() {
  const { title, description, videoPlaceholderUrl, youtubeEmbedUrl, bullets } = demoData;
  
  // Track player interface playback toggle state flags
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <section className="relative w-full bg-[#030712] text-white py-20 lg:py-28 font-['Outfit'] select-none overflow-hidden">
      
      {/* Subtle corner light background ambiance to stay uniform with your design style */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/40 blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-blue-600/40 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Context Typography & Multi-Color Checkbox List (Spans 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 leading-tight max-w-[450px]">
            {title}
          </h2>
          
          <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal leading-relaxed mb-10 max-w-[480px]">
            {description}
          </p>

          {/* Feature List Wrapper */}
          <div className="space-y-6 w-full">
            {bullets.map((bullet) => (
              <div key={bullet.id} className="flex items-start gap-3.5 group">
                {/* Dynamic Styled Custom Color Bullet Icons */}
                <HiCheckCircle className={`h-6 w-6 shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110 ${bullet.iconColor}`} />
                
                <div className="flex flex-col">
                  <h4 className="text-base font-semibold text-white tracking-wide">
                    {bullet.title}
                  </h4>
                  <p className="text-[rgba(255,255,255,0.50)] text-xs sm:text-sm font-normal mt-0.5">
                    {bullet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Custom Video Playback Wrapper Layer (Spans 7 Columns) */}
        <div className="lg:col-span-7 w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl group">
            
            {!isPlaying ? (
              /* THUMBNAIL INTERFACE SHIELD VIEW */
              <div 
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {/* Background Image Frame Overlay */}
                <img 
                  src={videoPlaceholderUrl} 
                  alt="Demo video frame thumbnail preview" 
                  className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-102 group-hover:opacity-50 transition-all duration-500"
                />

                {/* Dark Tint Dimmer Matte layer */}
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/20" />

                {/* Interactive Centered Play Button Module */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50">
                    <HiPlay className="h-8 w-8 ml-0.5 text-white" />
                  </div>
                  <span className="text-sm font-medium tracking-wide text-white/90 drop-shadow-md select-none">
                    Click to play demo video
                  </span>
                </div>
              </div>
            ) : (
              /* LIVE INLINE VIDEO EMISSION LAYER */
              <iframe
                title="BarkBridge Production Presentation Video"
                src={youtubeEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}

          </div>
        </div>

      </div>
    </section>
  );
}