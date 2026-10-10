import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ModulesSection />
      <PricingSection />
      <FaqSection />
      <ContactForm />
    </main>
    <Footer />
  </>
);

export default Index;
