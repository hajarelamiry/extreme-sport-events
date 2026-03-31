                                                    import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { FlyTaghazoutSection } from "@/components/FlyTaghazoutSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { ReservationSection } from "@/components/ReservationSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhyUsSection } from "@/components/WhyUsSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <FlyTaghazoutSection />
      <DestinationsSection />
      <WhyUsSection />
      <ReservationSection />
      <Footer />
      <WhatsAppButton />
      </div>
    </main>
  );
};

export default Index;
