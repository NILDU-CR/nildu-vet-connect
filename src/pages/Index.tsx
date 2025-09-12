import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;