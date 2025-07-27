import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import GallerySection from '@/components/GallerySection';
import AccommodationSection from '@/components/AccommodationSection';
import DiningSection from '@/components/DiningSection';
import DestinationsSection from '@/components/DestinationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import RippleEffect from '@/components/RippleEffect';
import cloudyBg from '@/assets/cloudy-bg.jpg';

console.log('Index component loading...');

const Index = () => {
  console.log('Index component rendering...');
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log('Index useEffect running...');
    try {
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
      console.log('Smooth scrolling initialized');
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, []);

  console.log('About to render Index component...');

  return (
    <div 
      ref={pageRef}
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `url(${cloudyBg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Global Ripple Effects */}
      <RippleEffect containerRef={pageRef} />
      
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
          <section id="gallery">
            <GallerySection />
          </section>
          <section id="accommodation">
            <AccommodationSection />
          </section>
          <section id="dining">
            <DiningSection />
          </section>
          <section id="destinations">
            <DestinationsSection />
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

console.log('Index component defined');

export default Index;