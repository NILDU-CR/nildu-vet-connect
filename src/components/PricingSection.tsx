import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();
  
  const features = [
    t('pricing.feature.1'),
    t('pricing.feature.2'),
    t('pricing.feature.3'),
    t('pricing.feature.4'),
    t('pricing.feature.5'),
    t('pricing.feature.6'),
    t('pricing.feature.7'),
    t('pricing.feature.8'),
    t('pricing.feature.9')
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            {t('pricing.title')}{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-fuschia bg-clip-text text-transparent">
              {t('pricing.highlight')}
            </span>
          </h2>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="relative group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card backdrop-blur-glass animate-scale-in focus-within:ring-2 focus-within:ring-brand-fuschia">
            <CardHeader className="text-center pb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-fuschia">$25</span>
                  <span className="text-base md:text-lg text-muted-foreground">{t('pricing.month')}</span>
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  <span className="line-through">{t('pricing.regular')}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3" role="list">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-fuschia/10 flex items-center justify-center" aria-hidden="true">
                      <Check className="w-3 h-3 text-brand-fuschia" />
                    </div>
                    <span className="text-sm md:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-brand-fuschia hover:bg-brand-fuschia/90 text-white font-semibold py-3 rounded-full shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-fuschia focus:ring-offset-2"
                  size="lg"
                  aria-label={t('pricing.cta')}
                >
                  {t('pricing.cta')}
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