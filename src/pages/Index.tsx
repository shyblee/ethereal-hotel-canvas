import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DiningSection from '@/components/DiningSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import cloudyBg from '@/assets/cloudy-bg.jpg';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <div 
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `url(${cloudyBg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay */}
      <div className="fixed inset-0 bg-background/80 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <section id="home">
            <HeroSection />
          </section>
          <section id="about">
            <IntroSection />
          </section>
          <section id="features">
            <FeaturesSection />
          </section>
          <section id="dining">
            <DiningSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
