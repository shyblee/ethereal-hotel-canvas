import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Presidential Suites',
    description: 'Luxurious accommodations with breathtaking views and personalized service.',
    image: hero1,
  },
  {
    title: 'World-Class Spa',
    description: 'Rejuvenate your mind, body, and soul with our premium wellness treatments.',
    image: hero2,
  },
  {
    title: 'Infinity Pool',
    description: 'Swim into the horizon with our stunning infinity pool overlooking the valley.',
    image: hero3,
  },
  {
    title: 'Gourmet Dining',
    description: 'Savor exquisite culinary creations from our award-winning chefs.',
    image: hero1,
  },
  {
    title: 'Adventure Activities',
    description: 'Experience thrilling outdoor adventures in pristine natural surroundings.',
    image: hero2,
  },
  {
    title: 'Private Events',
    description: 'Host unforgettable celebrations in our elegant event spaces.',
    image: hero3,
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const sections = scrollRef.current.children;
    const totalWidth = sections.length * window.innerWidth;

    // Horizontal scroll animation
    const scrollTween = gsap.to(scrollRef.current, {
      x: -totalWidth + window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Parallax effect for each feature
    Array.from(sections).forEach((section, index) => {
      const image = section.querySelector('.feature-image');
      const content = section.querySelector('.feature-content');
      
      if (image && content) {
        gsap.set(image, { scale: 1.2 });
        
        gsap.to(image, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "left right",
            end: "right left",
            scrub: true,
            containerAnimation: scrollTween,
          }
        });

        gsap.fromTo(content, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "left center",
              end: "center center",
              scrub: 1,
              containerAnimation: scrollTween,
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={scrollRef} className="flex">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-screen h-screen flex-shrink-0 relative overflow-hidden"
          >
            <div
              className="feature-image absolute inset-0 bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className="absolute inset-0 bg-background/20" />
            </div>
            
            <div className="feature-content absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-6">
                <motion.h3
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl font-light mb-6 tracking-wide"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl leading-relaxed opacity-90"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {feature.description}
                </motion.p>
                <motion.button
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 px-10 py-4 bg-gradient-luxury text-foreground rounded-full font-medium hover:shadow-luxury transition-all duration-500 hover:scale-105"
                >
                  Explore More
                </motion.button>
              </div>
            </div>

            {/* Feature number indicator */}
            <div className="absolute bottom-8 right-8 text-white/60 text-2xl font-light">
              {String(index + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-2 text-white/60">
          <span className="text-sm">Scroll horizontally</span>
          <div className="w-8 h-0.5 bg-white/40 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-luxury"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}