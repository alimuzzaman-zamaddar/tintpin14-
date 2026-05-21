import AboutSection from "./components/homepage/AboutSection";
import FeaturesSection from "./components/homepage/FeaturesSection";
import Hero from "./components/homepage/Hero";
import StepsSection from "./components/homepage/StepsSection";
import TestimonialsAndPricing from "./components/homepage/TestimonialsAndPricing";
import VideoDemoSection from "./components/homepage/VideoDemoSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <StepsSection />
      <VideoDemoSection />
      <TestimonialsAndPricing />
    </div>
  );
};

export default Home;
