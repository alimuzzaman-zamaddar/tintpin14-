/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSubscribeNewsletterMutation } from "../../../redux/Slices/cmsApi";

interface NewsletterSectionData {
  title?: string;
  description?: string;
}

interface NewsletterSectionProps {
  newsletterSection?: NewsletterSectionData;
}

export default function NewsletterSection({
  newsletterSection,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [subscribeNewsletter, { isLoading }] =
    useSubscribeNewsletterMutation();

  const title = newsletterSection?.title || "Get notified when we launch";

  const description =
    newsletterSection?.description ||
    "Stay updated with our latest meditations, wellness tips, and mindful practices delivered straight to your inbox.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await subscribeNewsletter({ email }).unwrap();

      setSuccessMessage(
        response?.message || "Thank you! You have subscribed successfully.",
      );

      setEmail("");
    } catch (error: any) {
      console.log("Newsletter subscribe error:", error);

      setErrorMessage(
        error?.data?.message ||
          error?.message ||
          "Subscription failed. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#030712] text-white font-['Outfit'] select-none pb-10 overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* ==================== CORE BANNER CONTAINER ==================== */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#060c22] via-[#04091a] to-[#030712] p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Subtle horizontal highlight overlay line at the very top edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

          {/* Left Block: Content Typography */}
          <div className="flex flex-col items-start text-left max-w-[580px] w-full">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3.5">
              {title}
            </h2>

            <p className="text-[rgba(255,255,255,0.60)] text-sm sm:text-base font-normal leading-relaxed tracking-wide">
              {description}
            </p>
          </div>

          {/* Right Block: Interactive Form Layer */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-3.5 w-full lg:w-auto max-w-[500px] lg:max-w-none shrink-0"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
              {/* Input Box Component */}
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                className="w-full sm:w-[280px] md:w-[320px] h-12 rounded-xl bg-[#0b132e] border border-white/[0.08] px-5 text-sm font-normal text-white placeholder-[rgba(255,255,255,0.35)] focus:outline-none focus:border-blue-500/50 transition-colors tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoading}
              />

              {/* Subscribe Action Button Component */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-[0_4px_20px_rgba(36,0,255,0.25)] hover:opacity-95 active:scale-98 transition-all duration-150 shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {successMessage && (
              <p className="text-sm font-medium text-green-400">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="text-sm font-medium text-red-400">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}