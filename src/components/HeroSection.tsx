import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import cloudyBg from '@/assets/cloudy-bg.jpg';
import RippleEffect from './RippleEffect';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  { src: hero1, title: 'Luxury Redefined', subtitle: 'Experience unparalleled elegance' },
  { src: hero2, title: 'Premium Suites', subtitle: 'Where comfort meets sophistication' },
  { src: hero3, title: 'Wellness Sanctuary', subtitle: 'Rejuvenate your mind and body' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVariant, setCursorVariant] = useState('default');
  const heroRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    // Parallax effect for hero section
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rippleRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute w-4 h-4 bg-primary/20 rounded-full pointer-events-none animate-ping';
    ripple.style.left = `${x - 8}px`;
    ripple.style.top = `${y - 8}px`;
    
    rippleRef.current.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 1000);

    // Determine cursor variant based on position
    const leftThird = rect.width / 3;
    const rightThird = rect.width * 2 / 3;
    
    if (x < leftThird) {
      setCursorVariant('left');
    } else if (x > rightThird) {
      setCursorVariant('right');
    } else {
      setCursorVariant('default');
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const leftThird = rect.width / 3;
    const rightThird = rect.width * 2 / 3;
    
    if (x < leftThird) {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    } else if (x > rightThird) {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }
  };

  const getCursorClass = () => {
    switch (cursorVariant) {
      case 'left':
        return 'cursor-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDE4TDkgMTJMMTUgNiIgc3Ryb2tlPSIjMDA4MDA4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"),_12_12),_pointer]';
      case 'right':
        return 'cursor-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMThMMTUgMTJMOSA2IiBzdHJva2U9IiMwMDgwMDgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="),_12_12),_pointer]';
      default:
        return 'cursor-default';
    }
  };

  return (
    <div
      ref={heroRef}
      className={`relative h-screen w-full overflow-hidden ${getCursorClass()}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${cloudyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Enhanced Ripple Effects */}
      <RippleEffect containerRef={heroRef} />
      <div ref={rippleRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-hero/30" />
      
      {/* Image slider */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-7xl md:text-8xl font-light mb-6 tracking-wider"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                {heroImages[currentIndex].title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl font-light tracking-wide opacity-90"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                {heroImages[currentIndex].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <button className="px-12 py-4 bg-gradient-primary text-white rounded-full text-lg font-medium hover:shadow-luxury transition-all duration-500 hover:scale-105">
              Discover Luxury
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}