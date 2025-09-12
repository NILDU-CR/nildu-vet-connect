import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
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
      title: "¡Gracias por tu interés!",
      description: "Nos pondremos en contacto contigo pronto.",
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
    <section className="py-24 bg-gradient-footer relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Quieres{" "}
              <span className="bg-gradient-to-r from-brand-fuschia to-brand-pink bg-clip-text text-transparent">
                NILDU
              </span>{" "}
              en tu veterinaria?
            </h2>
          </div>
          
          <Card className="border-0 bg-white/10 backdrop-blur-glass shadow-glass animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-white/90">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidos" className="text-white/90">Apellidos</Label>
                    <Input
                      id="apellidos"
                      name="apellidos"
                      type="text"
                      value={formData.apellidos}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-white/90">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="+506 8888-8888"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pais" className="text-white/90">País</Label>
                    <Input
                      id="pais"
                      name="pais"
                      type="text"
                      value={formData.pais}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="Costa Rica"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="veterinaria" className="text-white/90">Nombre de la veterinaria</Label>
                    <Input
                      id="veterinaria"
                      name="veterinaria"
                      type="text"
                      value={formData.veterinaria}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                      placeholder="Veterinaria San José"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold py-3 rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    Enviar solicitud
                  </Button>
                </div>
                
                <p className="text-xs text-white/70 text-center mt-4">
                  Tus datos se usarán solo para atender tu solicitud y respetamos tu privacidad.
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