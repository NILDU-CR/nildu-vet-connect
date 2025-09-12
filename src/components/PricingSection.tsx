import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  "1 usuario",
  "Agenda completa",
  "Gestión de clientes",
  "Gestión de pacientes", 
  "Control de vacunas",
  "Historial de pesos",
  "Multiplataforma",
  "Personalización",
  "Soporte técnico"
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Paquete de{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-fuschia bg-clip-text text-transparent">
              lanzamiento
            </span>
          </h2>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="relative group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card backdrop-blur-glass animate-scale-in">
            <CardHeader className="text-center pb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-brand-fuschia">$25</span>
                  <span className="text-lg text-muted-foreground">/mes + IVA</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="line-through">Precio regular $45</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-fuschia/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand-fuschia" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-brand-fuschia hover:bg-brand-fuschia/90 text-white font-semibold py-3 rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Comenzar ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;