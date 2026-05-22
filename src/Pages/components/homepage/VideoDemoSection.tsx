import { useState } from "react";
import { HiCheckCircle, HiPlay } from "react-icons/hi2";

interface MainSectionItem {
  title?: string;
  subtitle?: string;
}

interface MainSectionData {
  title?: string;
  description?: string;
  video?: string;
  items?: MainSectionItem[];
}

interface VideoDemoSectionProps {
  mainSection?: MainSectionData;
}

const fallbackDemoData: Required<MainSectionData> = {
  title: "Watch BarkBridge translate in real-time",
  description:
    "See how our AI instantly decodes barks, whines, and body language into clear, actionable insights. Experience the magic of truly understanding your dog's needs.",
  video: "",
  items: [
    {
      title: "Instant Voice Recognition",
      subtitle: "Advanced AI processes barks in milliseconds",
    },
    {
      title: "Context-Aware Translation",
      subtitle: "Understands situation and environment",
    },
    {
      title: "Multi-Language Support",
      subtitle: "Translations available in 12+ languages",
    },
  ],
};

const bulletColors = ["text-amber-500", "text-cyan-400", "text-pink-500"];

export default function VideoDemoSection({
  mainSection,
}: VideoDemoSectionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const imageBaseUrl = import.meta.env.VITE_API_URL_IMAGE || "";

  const getMediaUrl = (mediaPath?: string) => {
    if (!mediaPath) return "";
    if (mediaPath.startsWith("http")) return mediaPath;

    return `${imageBaseUrl}${mediaPath}`;
  };

  const title = mainSection?.title || fallbackDemoData.title;

  const description = mainSection?.description || fallbackDemoData.description;

  const videoUrl = getMediaUrl(mainSection?.video || fallbackDemoData.video);

  const bullets =
    mainSection?.items && mainSection.items.length > 0
      ? mainSection.items
      : fallbackDemoData.items;

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
            {bullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-3.5 group">
                {/* Dynamic Styled Custom Color Bullet Icons */}
                <HiCheckCircle
                  className={`h-6 w-6 shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110 ${
                    bulletColors[index % bulletColors.length]
                  }`}
                />

                <div className="flex flex-col">
                  <h4 className="text-base font-semibold text-white tracking-wide">
                    {bullet.title}
                  </h4>

                  <p className="text-[rgba(255,255,255,0.50)] text-xs sm:text-sm font-normal mt-0.5">
                    {bullet.subtitle}
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
                {/* Background Video Frame Preview */}
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-102 group-hover:opacity-50 transition-all duration-500"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div className="absolute inset-0 h-full w-full bg-[#111827]" />
                )}

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
              <video
                src={videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}