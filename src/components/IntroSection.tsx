import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    timeline
      .fromTo(videoRef.current, 
        { x: -100, opacity: 0.8 }, 
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(contentRef.current, 
        { x: 100, opacity: 0.8 }, 
        { x: 0, opacity: 1, duration: 1 }, 
        "-=0.5"
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      {/* First page - Video left, content right */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <motion.div
            ref={videoRef}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[600px] object-cover"
                poster="/hero-2.jpg"
              >
                <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-primary font-medium tracking-wider uppercase text-sm"
              >
                About Our Resort
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-5xl font-light text-foreground mt-4 leading-tight"
              >
                Where Luxury Meets
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Nature</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Nestled in the heart of pristine wilderness, Emerald Resort offers an unparalleled luxury experience. 
              Our commitment to excellence and attention to detail ensures every moment of your stay is extraordinary.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              From our world-class spa treatments to our gourmet dining experiences, every aspect of our resort 
              is designed to exceed your expectations and create memories that will last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex space-x-6"
            >
              <button className="px-8 py-3 bg-gradient-primary text-white rounded-full hover:shadow-luxury transition-all duration-500 hover:scale-105">
                Learn More
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-500">
                View Gallery
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Second page - Content left, video right */}
      <div className="container mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-primary font-medium tracking-wider uppercase text-sm"
              >
                Sustainable Luxury
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl font-light text-foreground mt-4 leading-tight"
              >
                Harmony with
                <span className="bg-gradient-emerald bg-clip-text text-transparent"> Environment</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Our commitment to environmental stewardship drives every decision we make. From renewable energy 
              sources to locally sourced organic cuisine, we believe luxury and sustainability go hand in hand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <h4 className="text-2xl font-semibold text-primary">500+</h4>
                <p className="text-muted-foreground">Native Plants</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-semibold text-primary">100%</h4>
                <p className="text-muted-foreground">Renewable Energy</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-semibold text-primary">25</h4>
                <p className="text-muted-foreground">Awards Won</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-semibold text-primary">98%</h4>
                <p className="text-muted-foreground">Guest Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[600px] object-cover"
                poster="/hero-3.jpg"
              >
                <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}