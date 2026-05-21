import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { FaTimeline } from "react-icons/fa6";

import logo from "../../../assets/sitelogo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("HOME");

  const navLinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];

  return (
    <>
      {/* 1. Main Navbar Header Container */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1440px] z-50">
        <div className="bg-[#b3c3e3]/10 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3 lg:py-4 flex items-center justify-between shadow-xl">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="Logo" />
          </div>

          {/* Desktop Links (Hidden on Mobile & Tablet) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link;
              return (
                <button
                  key={link}
                  onClick={() => setActiveTab(link)}
                  style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  className={`text-base font-normal transition-all duration-200 outline-none
                    ${
                      isActive
                        ? "text-[#146DE1] underline underline-offset-4 decoration-solid decoration-auto [text-underline-position:from-font]"
                        : "text-white hover:text-[#146DE1]"
                    }`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          {/* Desktop Button (Hidden on Mobile & Tablet) */}
          <div className="hidden lg:block">
            <button
              className="text-white text-base font-semibold px-6 py-3 rounded-lg shadow-lg hover:opacity-95 active:scale-98 transition-all"
              style={{
                background:
                  "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
              }}
            >
              Get the app
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white hover:text-[#146DE1] text-2xl p-1 transition-colors"
          >
            <FaHamburger />
          </button>
        </div>
      </nav>

      {/* 2. Mobile/Tablet Slider Sidebar */}
      {/* Backdrop Dimmer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 lg:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sliding Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-70 sm:w-[320px] bg-[#b3c3e3]/10 backdrop-blur-md border  rounded-xl px-6 py-3 lg:py-4 flex items-center shadow-xlborder-l border-[rgba(0,0,0,0.16)] z-70 p-6 shadow-2xl  flex-col justify-between font-['Outfit'] transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div>
          {/* Slider Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-[#146DE1] font-extrabold text-lg tracking-tight">
                BarkBridge
              </span>
              <span className="bg-[#2606ED] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                AI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#146DE1] text-2xl p-1 transition-colors"
            >
              <FaTimeline />
            </button>
          </div>

          {/* Slider Menu Navigation Links */}
          <div className="flex flex-col gap-4 mt-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link;
              return (
                <button
                  key={link}
                  onClick={() => {
                    setActiveTab(link);
                    setIsOpen(false); // Closes slider on click
                  }}
                  style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  className={`text-left text-lg font-normal py-2 transition-all block w-full
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

        {/* Slider Footer Button */}
        <div className="mt-auto pt-6 border-t border-white/20">
          <button
            className="text-white text-base font-semibold w-full py-3.5 rounded-lg shadow-lg active:scale-98 transition-all"
            style={{
              background:
                "linear-gradient(156deg, #3B53FF 1.44%, #2606ED 63.36%)",
            }}
          >
            Get the app
          </button>
        </div>
      </div>
    </>
  );
}
