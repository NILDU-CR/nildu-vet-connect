import { Users, Heart, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Gestión de clientes",
    description: "Administra toda la información de los dueños y su historial de manera organizada y eficiente."
  },
  {
    icon: Heart,
    title: "Gestión de pacientes", 
    description: "Lleva un registro completo del historial médico, vacunas, peso y tratamientos de cada mascota."
  },
  {
    icon: Calendar,
    title: "Agenda y recordatorios",
    description: "Programa citas y envía notificaciones automáticas para mantener a tus clientes informados."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            ¿Qué puedes encontrar en{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              NILDU?
            </span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card backdrop-blur-glass animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-fuschia/10 group-hover:bg-brand-fuschia/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-brand-fuschia" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;