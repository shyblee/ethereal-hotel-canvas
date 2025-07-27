import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    title: 'Luxury Suite',
    category: 'Accommodation'
  },
  {
    id: 2,
    type: 'video',
    src: 'https://player.vimeo.com/video/76979871?h=8272103f6e',
    poster: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    title: 'Hotel Experience',
    category: 'Experience'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    title: 'Spa & Wellness',
    category: 'Wellness'
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
    title: 'Fine Dining',
    category: 'Dining'
  },
  {
    id: 5,
    type: 'video',
    src: 'https://player.vimeo.com/video/169599296?h=6b9d22e7b3',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    title: 'Nature Views',
    category: 'Views'
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    title: 'Pool & Recreation',
    category: 'Recreation'
  }
];

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative" style={{ minHeight: '170vh' }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Visual Journey
          </span>
          <h2 className="text-6xl font-light text-foreground mt-4 mb-6 font-headings">
            Explore Our <span className="bg-gradient-emerald bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body">
            Immerse yourself in the beauty and luxury that awaits you at our exceptional destination.
          </p>
        </motion.div>

        {/* Wobble Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateX: index % 2 === 0 ? 5 : -5,
                rotateY: index % 3 === 0 ? 5 : -5,
                scale: 1.02
              }}
              className={`
                relative rounded-3xl overflow-hidden cursor-pointer group
                ${index % 6 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                ${index % 6 === 3 ? 'lg:col-span-2' : ''}
                ${index % 6 === 5 ? 'md:row-span-2' : ''}
              `}
              style={{ 
                height: index % 6 === 0 ? '400px' : index % 6 === 5 ? '350px' : '280px',
                transformStyle: 'preserve-3d'
              }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="absolute inset-0">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-semibold mt-1 font-headings">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-primary text-white rounded-full text-lg font-medium font-headings hover:shadow-luxury transition-all duration-500"
          >
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>

      {/* Modal for selected item */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            {selectedItem.type === 'video' ? (
              <iframe
                src={selectedItem.src}
                className="w-full h-96 md:h-[500px] rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            )}
            
            <div className="mt-4 text-center">
              <h3 className="text-white text-2xl font-semibold font-headings">
                {selectedItem.title}
              </h3>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">
                {selectedItem.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}