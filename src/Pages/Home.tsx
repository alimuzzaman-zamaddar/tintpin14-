/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "../lib/Loader";
import { useGetHomeCmsQuery } from "../redux/Slices/cmsApi";
import AboutSection from "./components/homepage/AboutSection";
import FeaturesSection from "./components/homepage/FeaturesSection";
import Footer from "./components/homepage/Footer";
import Hero from "./components/homepage/Hero";
import StepsSection from "./components/homepage/StepsSection";
import TestimonialsAndPricing from "./components/homepage/TestimonialsAndPricing";
import VideoDemoSection from "./components/homepage/VideoDemoSection";

const Home = () => {
  const { data, isLoading, isError, error } = useGetHomeCmsQuery();
  const homeCmsData = data?.data as any;

  if (isLoading) {
    return <Loader title="Loading homepage..." fullScreen />;
  }

  if (isError) {
    console.log("Home CMS error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load homepage content.
      </div>
    );
  }

  console.log("Home CMS data:", homeCmsData);
  return (
    <div>
      <Hero
        heroSection={homeCmsData?.hero_section}
        testimonialSection={homeCmsData?.testimonial_section}
      />
      <AboutSection aboutSection={homeCmsData?.about_section} />
      <FeaturesSection servicesSection={homeCmsData?.services_section} />
      <StepsSection processSection={homeCmsData?.process_section} />
      <VideoDemoSection mainSection={homeCmsData?.main_section} />
      <TestimonialsAndPricing
        testimonialSection={homeCmsData?.testimonial_section}
        planSection={homeCmsData?.plan_section}
        faqSection={homeCmsData?.faq_section}
        newsletterSection={homeCmsData?.newsletter_section}
      />

      <Footer footerSection={homeCmsData?.footer_section} />
    </div>
  );
};

export default Home;
