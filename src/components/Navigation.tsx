import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '#home', image: '/hero-1.jpg' },
  { name: 'Suites', href: '#suites', image: '/hero-2.jpg' },
  { name: 'Spa', href: '#spa', image: '/hero-3.jpg' },
  { name: 'Dining', href: '#dining', image: '/dining-1.jpg' },
  { name: 'Activities', href: '#activities', image: '/feature-1.jpg' },
  { name: 'Events', href: '#events', image: '/hero-1.jpg' },
  { name: 'Contact', href: '#contact', image: '/hero-2.jpg' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-card/80 backdrop-blur-lg shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              EMERALD RESORT
            </motion.div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="text-foreground hover:bg-primary/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="relative h-full overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-hero opacity-50" />
              
              {/* Close button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-card/20 backdrop-blur-md text-foreground hover:bg-card/40 transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>

              <div className="flex h-full">
                {/* Navigation */}
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => setIsOpen(false)}
                        className="block text-6xl font-light text-foreground hover:text-primary transition-colors group"
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-500" />
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                {/* Image preview */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-1/2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
                  <img
                    src={navItems[0].image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Social links */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 flex space-x-6"
              >
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className="p-3 rounded-full bg-card/20 backdrop-blur-md text-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}