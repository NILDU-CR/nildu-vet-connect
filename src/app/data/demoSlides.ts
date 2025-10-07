import scheduleView from '@/assets/scheduleView.png';
import PatientView from '@/assets/PatientView.png';
import homePage from '@/assets/homePage.png';

export interface DemoSlide { id: number; src: string; alt: string }
export const demoSlides: DemoSlide[] = [
  { id: 1, src: homePage, alt: 'Home page overview' },
  { id: 2, src: PatientView, alt: 'Patient record view' },
  { id: 3, src: scheduleView, alt: 'Scheduling interface' }
];
