import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import heroBg from "../../../assets/Hero section pic 1.png"; // Ensure you have this image in your assets folder or replace with your path
import { AppleSvg, GoogleSvg } from "../../../lib/Svg";

// 2. Pure Content JSON Object
const heroData = {
  nav: {
    links: ["HOME", "ABOUT US", "SERVICES", "CONTACT"],
  },
  content: {
    titleWhite: "What Is Your Dog Really",
    titleBlue: "Saying?",
    description:
      "BarkBridge listens, analyzes, and translates your dog's voice into simple human understanding.",
    ctaText: "Download now",
    appStores: {
      appleUrl: "#", // Add your link here
      googleUrl: "#", // Add your link here
    },
    reviews: {
      rating: 5,
      text: "115+ happy clients",
      avatarUrls: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      ],
    },
  },
};

export default function Hero() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("HOME");

  const { nav, content } = heroData;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat flex flex-col justify-between font-['Outfit'] select-none"
      style={{
        // Replace with your local background image file path e.g., '/images/hero-bg.jpg'
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* ==================== HERO CONTENT SPLIT AREA ==================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 px-5 xl:px-0 pt-36 pb-16 flex-grow grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Side: Content Column */}
        <div className="flex flex-col items-start text-left max-w-[620px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
            {content.titleWhite}{" "}
            <span className="text-[#146DE1] block sm:inline">
              {content.titleBlue}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/80 font-medium leading-relaxed max-w-[490px]">
            {content.description}
          </p>

          {/* Call To Action Button */}
          <button
            className="mt-8 text-white text-base font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:opacity-95 active:scale-98 cursor-pointer transition-all"
            style={{
              background:
                "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
            }}
          >
            {content.ctaText}
          </button>

          {/* Reviews Rating Widget Box */}
          <div className="mt-8 border border-white/10 bg-black/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-inner">
            <div className="flex -space-x-3 overflow-hidden">
              {content.reviews.avatarUrls.map((url, i) => (
                <img
                  key={i}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#1b2230] object-cover"
                  src={url}
                  alt="User Avatar"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                {[...Array(content.reviews.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-white text-xs font-semibold mt-0.5 tracking-wide">
                {content.reviews.text}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Empty Container: Preserves layout spacing so phone graphic layer shows correctly */}
        <div className="hidden lg:block h-full pointer-events-none" />
      </div>

      <div className="">
        {/* ==================== FOOTER BADGES AREA ==================== */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-20 xl:pb-40 flex flex-wrap gap-4 items-center justify-center">
          <a
            href={content.appStores.appleUrl}
            className="hover:scale-102 transition-transform"
          >
            <AppleSvg />
          </a>
          <a
            href={content.appStores.googleUrl}
            className="hover:scale-102 transition-transform"
          >
            <GoogleSvg />
          </a>
        </div>
      </div>

      {/* ==================== MOBILE DRAWER SIDEBAR ==================== */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
            {nav.links.map((link) => {
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
          <button
            className="text-white text-base cursor-pointer font-semibold w-full py-3.5 rounded-lg shadow-lg active:scale-98 transition-all"
            style={{
              background:
                "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
            }}
          >
            Get the app
          </button>
        </div>
      </div>
    </div>
  );
}
