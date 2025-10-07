import { demoSlides } from '@/app/data/demoSlides'
import { useLanguage } from '@/contexts/LanguageContext'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const DemoCarousel = () => {
  const { t } = useLanguage()
  return (
    <section id='demo' className='py-20 bg-gradient-hero/40'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>{t('demo.title')}</h2>
          <p className='text-white/70'>{t('demo.subtitle')}</p>
        </div>
        <div className='relative'>
          <Carousel className='w-full'>
            <CarouselContent>
              {demoSlides.map(slide => (
                <CarouselItem key={slide.id} className='md:basis-1/2 lg:basis-1/3'>
                  <div className='aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center'>
                    <img src={slide.src} alt={slide.alt} className='w-full h-full object-cover' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='hidden md:block'>
              <CarouselPrevious className='bg-white/10 hover:bg-white/20 border-0 text-white' />
              <CarouselNext className='bg-white/10 hover:bg-white/20 border-0 text-white' />
            </div>
          </Carousel>
          <div className='flex md:hidden justify-center gap-2 mt-6' role='tablist' aria-label={t('demo.title')}>
            {demoSlides.map((s, idx) => (
              <span
                key={s.id}
                role='tab'
                aria-selected={idx === 0 ? 'true' : 'false'}
                aria-label={`${t('demo.title')} slide ${idx + 1}`}
                className='h-2 w-2 rounded-full bg-white/30'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoCarousel
