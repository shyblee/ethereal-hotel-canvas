import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '#home', image: '/hero-1.jpg' },
  { name: 'About Us', href: '#about', image: '/hero-2.jpg' },
  { name: 'Accommodation', href: '#accommodation', image: '/hero-3.jpg' },
  { name: 'Events', href: '#events', image: '/hero-1.jpg' },
  { name: 'Gallery', href: '#gallery', image: '/hero-2.jpg' },
  { name: 'Contact Us', href: '#contact', image: '/hero-3.jpg' },
];

const navBarItems = [
  { name: 'VILLAS', href: '#villas' },
  { name: 'GASTRONOMY', href: '#dining' },
  { name: 'WELLNESS', href: '#wellness' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Hero section scroll trigger
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
          scrolled ? 'bg-white/95 backdrop-blur-lg shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xl font-headings tracking-wider ${
                scrolled ? 'text-primary' : 'text-white'
              } transition-colors duration-300`}
            >
              <span className="font-light">ETHEREAL</span>
              <div className="text-xs tracking-widest opacity-80">HOTEL EXPERIENCE</div>
            </motion.div>
            
            {/* Center Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navBarItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  className={`text-sm tracking-widest font-medium transition-colors relative group font-headings ${
                    scrolled ? 'text-primary hover:text-primary/80' : 'text-white hover:text-white/80'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    scrolled ? 'bg-primary' : 'bg-white'
                  }`} />
                </motion.a>
              ))}
            </div>

            {/* Right side - Language and Book button */}
            <div className="hidden lg:flex items-center space-x-6">
              <span className={`text-sm tracking-widest font-headings ${
                scrolled ? 'text-primary' : 'text-white'
              } transition-colors duration-300`}>EN</span>
              <Button
                variant="outline"
                className={`tracking-widest border-2 transition-all duration-300 font-headings rounded-full ${
                  scrolled 
                    ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-primary'
                }`}
              >
                BOOK NOW
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className={`lg:hidden transition-colors ${
                scrolled ? 'text-primary hover:bg-primary/10' : 'text-white hover:bg-white/10'
              }`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Social Media Buttons - Right Side */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col space-y-4">
        <motion.a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.a>
        <motion.a
          href="https://instagram.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Instagram className="h-5 w-5" />
        </motion.a>
        <motion.a
          href="https://facebook.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Facebook className="h-5 w-5" />
        </motion.a>
      </div>

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
                        onMouseEnter={() => setHoveredIndex(index)}
                        className="block text-4xl md:text-6xl font-light text-foreground hover:text-primary transition-all duration-300 group font-headings"
                      >
                        <motion.span 
                          className="relative"
                          whileHover={{ x: 20 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {item.name}
                          <motion.span 
                            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-primary"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
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
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredIndex}
                      src={navItems[hoveredIndex].image}
                      alt="Preview"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </motion.div>
              </div>

              {/* Mobile Social links */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 flex space-x-6 lg:hidden"
              >
                <motion.a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="p-3 rounded-full bg-green-500 text-white"
                >
                  <MessageCircle className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                >
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://facebook.com/your-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="p-3 rounded-full bg-blue-600 text-white"
                >
                  <Facebook className="h-6 w-6" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}