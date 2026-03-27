import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { FlyTaghazoutSection } from "@/components/FlyTaghazoutSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { ReservationSection } from "@/components/ReservationSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <FlyTaghazoutSection />
      <DestinationsSection />
      <WhyUsSection />
      <ReservationSection />
      <Footer />
    </main>
  );
};

export default Index;
