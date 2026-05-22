import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import { AppleSvg, GoogleSvg } from "../../../lib/Svg";
import logo from "../../../assets/sitelogo.png";
import { Link } from "react-router-dom";

interface SocialMediaItem {
  id?: number;
  social_media?: string;
  profile_link?: string;
}

interface FooterSettings {
  id?: number;
  title?: string;
  email?: string;
  system_name?: string;
  copyright_text?: string;
  gemini_kill_switch?: number;
  logo?: string;
  favicon?: string;
  description?: string;
}

interface FooterSectionData {
  image?: string;
  description?: string;
  items?: {
    social_media?: SocialMediaItem[];
    settings?: FooterSettings;
  };
}

interface FooterProps {
  footerSection?: FooterSectionData;
}

const Footer = ({ footerSection }: FooterProps) => {
  const imageBaseUrl = import.meta.env.VITE_API_URL_IMAGE || "";

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return logo;
    if (imagePath.startsWith("http")) return imagePath;

    return `${imageBaseUrl}${imagePath}`;
  };

  const footerLogo = getImageUrl(footerSection?.image);

  const description =
    footerSection?.description ||
    "Bridging the communication gap between humans and their best friends.";

  const copyrightText =
    footerSection?.items?.settings?.copyright_text ||
    "© 2026 BarkBridge. All rights reserved.";

  const socialMedia = footerSection?.items?.social_media || [];

  const getSocialIcon = (name?: string) => {
    const socialName = name?.toLowerCase();

    if (socialName === "facebook") return <FaFacebookF />;
    if (socialName === "twitter") return <FaTwitter />;
    if (socialName === "instagram") return <FaInstagram />;
    if (socialName === "linkedin") return <FaLinkedinIn />;

    return <FaFacebookF />;
  };

  return (
    <footer className="relative w-full bg-[#030712] text-white pt-16 pb-8 font-['Outfit'] select-none overflow-hidden">
      {/* ==================== TOP AMBIENT SHINE ==================== */}
      {/* Subtle top centered blue lighting flare bleeding from the preceding sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[30px] bg-blue-500/80 blur-[50px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-0">
        {/* ==================== UPPER CORE LINK MAPS GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 items-start">
          {/* Column 1: Brand Messaging Block (Spans 5 Columns) */}
          <div className="md:col-span-3 flex flex-col items-start max-w-[320px]">
            {/* Brand Logo Identity */}
            <div className="flex items-center gap-2 cursor-pointer group mb-6">
              <Link to="/">
              <img src={footerLogo} alt="Footer Logo" />
              </Link>
            </div>

            {/* Corporate Subtitle Statement */}
            <p className="text-[rgba(255,255,255,0.60)] text-sm font-normal leading-relaxed tracking-wide">
              {description}
            </p>
          </div>

          {/* Column 2: Company Navigation Tree (Spans 2 Columns) */}
          <div className="md:col-span-3 flex flex-col md:items-center items-start">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Company
            </h4>

            <div className="flex flex-col space-y-3">
              <a
                href="#overview"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                Overview
              </a>

              <a
                href="#about"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                About Us
              </a>

              <a
                href="#service"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                Service
              </a>
            </div>
          </div>

          {/* Column 3: Legal Compliance Node Tree (Spans 2 Columns) */}
          <div className="md:col-span-3 flex flex-col md:items-center items-start">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Legal
            </h4>

            <div className="flex flex-col space-y-3">
              <a
                href="#contact"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                Contact
              </a>

              <a
                href="#privacy"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                Privacy
              </a>

              <a
                href="#terms"
                className="text-sm font-normal text-[rgba(255,255,255,0.55)] hover:text-white transition-colors tracking-wide"
              >
                Terms
              </a>
            </div>
          </div>

          {/* Column 4: App Store Integration Row Block (Spans 3 Columns) */}
          <div className="md:col-span-3 flex flex-col md:items-end items-start">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-5">
              Get the app
            </h4>

            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
              {/* App Store Download Badge Anchor */}
              <a href="#ios">
                <AppleSvg />
              </a>

              {/* Google Play Download Badge Anchor */}
              <a href="#android">
                <GoogleSvg />
              </a>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM FOOTER FLOOR SPLIT ==================== */}
        <div className="w-full border-t border-white/[0.05] pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Copyright Text Metric */}
          <p className="text-[rgba(255,255,255,0.40)] text-xs sm:text-sm font-medium tracking-wide text-center sm:text-left">
            {copyrightText}
          </p>

          {/* Right Social Interaction Icon Badges Row */}
          <div className="flex items-center gap-5">
            {socialMedia.length > 0 ? (
              socialMedia.map((item) => (
                <a
                  key={item.id || item.social_media}
                  href={item.profile_link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.social_media || "Social"} profile link`}
                  className="text-[rgba(255,255,255,0.45)] hover:text-blue-400 text-base transition-colors duration-150"
                >
                  {getSocialIcon(item.social_media)}
                </a>
              ))
            ) : (
              <>
                <a
                  href="#twitter"
                  aria-label="Twitter Profile link"
                  className="text-[rgba(255,255,255,0.45)] hover:text-blue-400 text-base transition-colors duration-150"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#linkedin"
                  aria-label="LinkedIn Profile link"
                  className="text-[rgba(255,255,255,0.45)] hover:text-blue-500 text-base transition-colors duration-150"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="#facebook"
                  aria-label="Facebook Profile link"
                  className="text-[rgba(255,255,255,0.45)] hover:text-blue-600 text-base transition-colors duration-150"
                >
                  <FaFacebookF />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;