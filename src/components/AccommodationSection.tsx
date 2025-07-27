import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wifi, Car, Coffee, Bath, Bed, Users } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Elegant comfort with premium amenities and stunning garden views.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    price: '$299',
    period: 'per night',
    features: ['King Size Bed', 'Garden View', 'Premium Bathroom', 'Work Desk'],
    amenities: [Wifi, Coffee, Bath, Car],
    maxGuests: 2,
    size: '35 m²'
  },
  {
    id: 2,
    name: 'Premium Room',
    description: 'Spacious luxury suite with panoramic mountain views and exclusive amenities.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    price: '$499',
    period: 'per night',
    features: ['King Size Bed', 'Mountain View', 'Jacuzzi', 'Living Area', 'Balcony'],
    amenities: [Wifi, Coffee, Bath, Car],
    maxGuests: 3,
    size: '55 m²'
  },
  {
    id: 3,
    name: 'Accessible Room',
    description: 'Thoughtfully designed for accessibility without compromising on luxury and comfort.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
    price: '$349',
    period: 'per night',
    features: ['Accessible Design', 'Roll-in Shower', 'Lowered Amenities', 'Emergency Systems'],
    amenities: [Wifi, Coffee, Bath, Car],
    maxGuests: 2,
    size: '40 m²'
  }
];

export default function AccommodationSection() {
  return (
    <section className="py-20 bg-background">
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
            Luxury Accommodation
          </span>
          <h2 className="text-6xl font-light text-foreground mt-4 mb-6 font-headings">
            Your Perfect <span className="bg-gradient-emerald bg-clip-text text-transparent">Retreat</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body">
            Choose from our carefully curated selection of rooms, each designed to provide unparalleled comfort and luxury.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-500 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  <span className="text-xl font-semibold font-headings">{room.price}</span>
                  <span className="text-sm ml-1">{room.period}</span>
                </div>

                {/* Room info overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{room.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span>{room.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors font-headings">
                  {room.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                  {room.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2 font-headings">Room Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-body"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-2 font-headings">Amenities:</h4>
                  <div className="flex space-x-3">
                    {room.amenities.map((IconComponent, amenityIndex) => (
                      <div
                        key={amenityIndex}
                        className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                      >
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="default"
                    className="flex-1 rounded-full font-headings"
                    size="sm"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full font-headings"
                    size="sm"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl"
        >
          <h3 className="text-3xl font-semibold text-foreground mb-4 font-headings">
            Need Help Choosing?
          </h3>
          <p className="text-muted-foreground mb-6 font-body">
            Our concierge team is here to help you find the perfect accommodation for your stay.
          </p>
          <Button
            size="lg"
            className="px-12 py-4 rounded-full text-lg font-headings"
          >
            Contact Concierge
          </Button>
        </motion.div>
      </div>
    </section>
  );
}