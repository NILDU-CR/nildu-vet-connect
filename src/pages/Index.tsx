import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import ModulesSection from "@/components/ModulesSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLang } from "@/lib/i18n";

const titulos = { es: "Nildu · Software para veterinarias", en: "Nildu · Software for veterinary practices" };

const Index = () => {
  const [lang] = useLang();

  useEffect(() => {
    document.title = titulos[lang];
  }, [lang]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PlatformsSection />
        <ModulesSection />
        <PricingSection />
        <FaqSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
