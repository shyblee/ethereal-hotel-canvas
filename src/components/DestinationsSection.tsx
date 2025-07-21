import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Camera, Mountain, Waves } from 'lucide-react';
import RippleEffect from './RippleEffect';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: 'Emerald Valley',
    distance: '5 min walk',
    description: 'A pristine valley with crystal-clear streams and lush greenery',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    icon: Mountain,
    activities: ['Hiking', 'Photography', 'Meditation']
  },
  {
    name: 'Crystal Lake',
    distance: '10 min drive',
    description: 'Perfect for kayaking and peaceful morning reflections',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    icon: Waves,
    activities: ['Kayaking', 'Swimming', 'Fishing']
  },
  {
    name: 'Golden Peaks',
    distance: '20 min drive',
    description: 'Breathtaking mountain views and sunrise photography spots',
    image: 'https://images.unsplash.com/photo-1464822759844-d150331fc3c3?w=800&h=600&fit=crop',
    icon: Camera,
    activities: ['Rock Climbing', 'Sunrise Tours', 'Scenic Drives']
  },
  {
    name: 'Ancient Forest',
    distance: '15 min walk',
    description: 'Centuries-old trees and hidden waterfalls await discovery',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    icon: Mountain,
    activities: ['Nature Walks', 'Bird Watching', 'Waterfall Tours']
  }
];

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    // Parallax background effect
    gsap.to('.destinations-bg', {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Staggered card animations
    const cards = cardsRef.current.children;
    gsap.fromTo(cards, 
      { 
        y: 100, 
        opacity: 0,
        rotateX: 45,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for icons
    const icons = document.querySelectorAll('.destination-icon');
    icons.forEach((icon, index) => {
      gsap.to(icon, {
        y: -10,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="destinations" className="py-20 relative overflow-hidden">
      <RippleEffect containerRef={sectionRef} />
      
      {/* Parallax background */}
      <div 
        className="destinations-bg absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Explore Nearby
          </span>
          <h2 className="text-6xl font-light text-foreground mt-4 mb-6">
            Natural <span className="bg-gradient-emerald bg-clip-text text-transparent">Wonders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking destinations within minutes of your luxurious retreat. 
            From tranquil lakes to majestic peaks, adventure awaits at every turn.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotateY: 5,
              }}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-700 perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Floating icon */}
                <motion.div
                  className="destination-icon absolute top-4 right-4 w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <destination.icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Distance badge */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-foreground">{destination.distance}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {destination.description}
                </p>

                {/* Activities */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Activities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, actIndex) => (
                      <motion.span
                        key={actIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: actIndex * 0.1 }}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {activity}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-3 bg-gradient-primary text-white rounded-full font-medium hover:shadow-luxury transition-all duration-300"
                >
                  Explore Destination
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="px-12 py-4 bg-gradient-luxury text-luxury-foreground rounded-full text-lg font-medium hover:shadow-luxury transition-all duration-500"
          >
            Plan Your Adventure
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}