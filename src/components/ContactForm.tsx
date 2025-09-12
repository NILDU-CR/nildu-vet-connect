import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    pais: "",
    veterinaria: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.success.title'),
      description: t('contact.success.description'),
    });
    setFormData({
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      pais: "",
      veterinaria: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-footer relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              {t('contact.title')}{" "}
              <span className="bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
                {t('contact.highlight')}
              </span>{" "}
              {t('contact.subtitle')}
            </h2>
          </div>
          
          <Card className="border-0 bg-white/10 backdrop-blur-glass shadow-glass animate-scale-in">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-white/90 text-sm md:text-base">
                      {t('contact.name')}
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder={t('contact.name')}
                      aria-label={t('contact.name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidos" className="text-white/90 text-sm md:text-base">
                      {t('contact.surname')}
                    </Label>
                    <Input
                      id="apellidos"
                      name="apellidos"
                      type="text"
                      value={formData.apellidos}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder={t('contact.surname')}
                      aria-label={t('contact.surname')}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90 text-sm md:text-base">
                      {t('contact.email')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder="tu@email.com"
                      aria-label={t('contact.email')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-white/90 text-sm md:text-base">
                      {t('contact.phone')}
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder="+506 8888-8888"
                      aria-label={t('contact.phone')}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pais" className="text-white/90 text-sm md:text-base">
                      {t('contact.country')}
                    </Label>
                    <Input
                      id="pais"
                      name="pais"
                      type="text"
                      value={formData.pais}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder="Costa Rica"
                      aria-label={t('contact.country')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="veterinaria" className="text-white/90 text-sm md:text-base">
                      {t('contact.clinic')}
                    </Label>
                    <Input
                      id="veterinaria"
                      name="veterinaria"
                      type="text"
                      value={formData.veterinaria}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-brand-fuschia"
                      placeholder="Veterinaria San José"
                      aria-label={t('contact.clinic')}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold py-3 rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2"
                    size="lg"
                    aria-label={t('contact.submit')}
                  >
                    {t('contact.submit')}
                  </Button>
                </div>
                
                <p className="text-xs md:text-sm text-white/70 text-center mt-4">
                  {t('contact.privacy')}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;