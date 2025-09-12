import { Users, Heart, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Users,
      title: t('features.clients.title'),
      description: t('features.clients.description')
    },
    {
      icon: Heart,
      title: t('features.patients.title'), 
      description: t('features.patients.description')
    },
    {
      icon: Calendar,
      title: t('features.schedule.title'),
      description: t('features.schedule.description')
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            {t('features.title')}{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              NILDU?
            </span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card backdrop-blur-glass animate-slide-up focus-within:ring-2 focus-within:ring-brand-fuschia"
              style={{ animationDelay: `${index * 0.2}s` }}
              tabIndex={0}
            >
              <CardContent className="p-6 md:p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-fuschia/10 group-hover:bg-brand-fuschia/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-fuschia" />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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