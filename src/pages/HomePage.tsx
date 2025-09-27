import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { InstituteFooter } from '../components/InstituteFooter';
import { HowItWorksSection } from '../components/HowItWorksSection';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <InstituteFooter />
    </div>
  );
}