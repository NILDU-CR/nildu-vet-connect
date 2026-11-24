import { useEffect, useState } from "react";
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
import type { PlanElegido } from "@/lib/pricing";

const titulos = { es: "Nildu · Software para veterinarias", en: "Nildu · Software for vets" };

const Index = () => {
  const [lang] = useLang();
  // El plan que la persona arma en Precios viaja con su solicitud de demo.
  const [plan, setPlan] = useState<PlanElegido | null>(null);

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
        <PricingSection onElegir={setPlan} />
        <FaqSection />
        <ContactForm plan={plan} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
