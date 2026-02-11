import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CartModal from '@/components/CartModal';
import LazyImage from '@/components/LazyImage';
import { Phone, MapPin, Star, UtensilsCrossed, Home, Wifi, ParkingCircle, Clock, MessageCircle, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { menuItems } from '@/data/menuItems';

export default function Index() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/919414649999?text=${message}`, '_blank');
    setFormData({ name: '', phone: '', message: '' });
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleAddToCart = (item: typeof menuItems[0]) => {
    const quantity = selectedQuantities[item.id] || 1;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      category: item.category,
    });
    setSelectedQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
  };

  const facilities = [
    { icon: UtensilsCrossed, name: 'Pure Veg Food', description: '100% vegetarian cuisine' },
    { icon: Home, name: 'AC & Non-AC Rooms', description: 'Comfortable stay options' },
    { icon: Wifi, name: 'WiFi Available', description: 'Free high-speed internet' },
    { icon: ParkingCircle, name: 'Parking Available', description: 'Secure parking facility' },
    { icon: Clock, name: '24×7 Open', description: 'Always available for you' },
    { icon: Star, name: 'Family Friendly', description: 'Perfect for families' },
  ];

  const rooms = [
    {
      title: 'AC Rooms',
      features: ['Comfortable beds', 'Air conditioning', 'Attached bathroom', 'Hot water 24×7', 'Room service'],
      color: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Non-AC Rooms',
      features: ['Budget friendly', 'Clean & spacious', 'Attached bathroom', 'Natural ventilation', 'Room service'],
      color: 'from-orange-50 to-orange-100'
    }
  ];

  const groupedMenu = menuItems.reduce((acc, item) => {
    const existing = acc.find(g => g.category === item.category);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ category: item.category, items: [item] });
    }
    return acc;
  }, [] as Array<{ category: string; items: typeof menuItems }>);

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-green to-brand-dark opacity-80 z-0"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(26, 85, 34, 0.85) 0%, rgba(234, 158, 36, 0.85) 50%, rgba(26, 85, 34, 0.85) 100%),
              radial-gradient(circle at 20% 50%, rgba(234, 158, 36, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(234, 158, 36, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 animate-fade-in">
          <div className="mb-6 sm:mb-8 inline-block">
            <span className="text-5xl sm:text-6xl md:text-8xl">🍽️</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
            Welcome to Hotel Laxmi Resto
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-100 drop-shadow-lg">
            Pure Veg Family Restaurant | Open 24×7
          </p>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-2xl mx-auto drop-shadow">
            Delicious food, comfortable rooms, and warm hospitality on Budsu Road, Kuchaman City
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center flex-wrap">
            <button
              onClick={() => {
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </button>
            <a
              href="tel:9414649999"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="https://wa.me/919414649999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <span>💬</span>
              WhatsApp Inquiry
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-6 sm:mb-8 text-center animate-slide-up">
            About Hotel Laxmi Resto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg h-80 bg-gradient-to-br from-brand-green to-brand-gold opacity-80 flex items-center justify-center animate-scale-in">
              <span className="text-9xl">🏨</span>
            </div>

            <div className="animate-fade-in">
              <p className="text-lg text-brand-dark mb-6 leading-relaxed">
                Hotel Laxmi Resto is a pure vegetarian family restaurant located on Budsu Road, Kuchaman City, Rajasthan. We pride ourselves on providing delicious food, comfortable AC & Non-AC rooms, and exceptional 24×7 service for travelers and families.
              </p>

              <p className="text-lg text-brand-dark mb-6 leading-relaxed">
                With over years of experience, we have become a trusted name for authentic Indian vegetarian cuisine and comfortable accommodation. Our commitment to quality, hygiene, and customer satisfaction makes us the perfect choice for your family restaurant needs.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-brand-cream p-4 rounded-lg">
                  <p className="text-2xl font-bold text-brand-green">100%</p>
                  <p className="text-sm text-brand-dark">Pure Vegetarian</p>
                </div>
                <div className="bg-brand-cream p-4 rounded-lg">
                  <p className="text-2xl font-bold text-brand-green">24×7</p>
                  <p className="text-sm text-brand-dark">Always Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-3 sm:mb-4 text-center animate-slide-up">
            🍛 Our Menu
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Delicious vegetarian dishes with easy ordering • Add items to cart • Flexible quantity selector</p>

          {/* Menu Items by Category */}
          {groupedMenu.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-16">
              <h3 className="text-3xl font-bold text-brand-green mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-brand-gold rounded"></span>
                {group.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {item.prepTime}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-brand-dark">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>

                      {/* Price */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="text-xl sm:text-2xl font-bold text-brand-gold">₹{item.price}</span>
                        <span className="text-xs bg-brand-cream text-brand-green px-2 py-1 rounded">
                          {item.veg ? '🌱 Veg' : '🍖 Non-Veg'}
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, (selectedQuantities[item.id] || 1) - 1)}
                          className="p-1 text-gray-600 hover:text-brand-green transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center font-semibold text-brand-dark">
                          {selectedQuantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (selectedQuantities[item.id] || 1) + 1)}
                          className="p-1 text-gray-600 hover:text-brand-green transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-6 sm:mb-12 text-center animate-slide-up">
            🏨 Our Rooms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {rooms.map((room, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${room.color} rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in`}
              >
                <h3 className="text-3xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                  🏨 {room.title}
                </h3>

                <ul className="space-y-4 mb-8">
                  {room.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3 text-brand-dark">
                      <span className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                        ✓
                      </span>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:9414649999"
                    className="btn-primary flex-1 text-center"
                  >
                    Call to Book
                  </a>
                  <a
                    href="https://wa.me/919414649999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="section-padding bg-brand-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-6 sm:mb-12 text-center animate-slide-up">
            ✨ Our Facilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {facilities.map((facility, idx) => {
              const Icon = facility.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-fade-in"
                >
                  <div className="inline-block p-4 bg-gradient-to-br from-brand-green to-brand-gold rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-6 sm:mb-12 text-center animate-slide-up">
            📍 Our Location
          </h2>

          <div className="rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 md:h-96 animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.5589622055346!2d74.77969712346095!3d27.11778657248479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c3b5e8b3b3b3b%3A0x8b3b3b3b8b3b3b3b!2sKuchaman%20City%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-8 bg-brand-cream p-8 rounded-lg">
            <p className="text-xl text-brand-dark text-center mb-2">
              <MapPin className="inline-block w-6 h-6 mr-2 text-brand-green" />
              <strong>Budsu Road, Kuchaman City, Rajasthan</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-brand-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-6 sm:mb-12 text-center animate-slide-up">
            📞 Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Call Us</h3>
                  <a href="tel:9414649999" className="text-brand-green hover:text-brand-dark text-lg font-semibold">
                    9414649999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">WhatsApp</h3>
                  <a href="https://wa.me/919414649999" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-dark text-lg font-semibold">
                    Chat with us
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Address</h3>
                  <p className="text-gray-600 text-lg">Budsu Road, Kuchaman City, Rajasthan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Hours</h3>
                  <p className="text-gray-600 text-lg">Open 24 Hours, 7 Days a Week</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="bg-white p-4 sm:p-8 rounded-lg shadow-lg animate-fade-in">
              <div className="mb-6">
                <label htmlFor="name" className="block text-brand-dark font-semibold mb-2 text-sm sm:text-base">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border-2 border-brand-cream rounded-lg focus:outline-none focus:border-brand-green transition-colors text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-brand-dark font-semibold mb-2 text-sm sm:text-base">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 border-2 border-brand-cream rounded-lg focus:outline-none focus:border-brand-green transition-colors text-base"
                  placeholder="Your phone number"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-brand-dark font-semibold mb-2 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-brand-cream rounded-lg focus:outline-none focus:border-brand-green transition-colors resize-none text-base"
                  placeholder="Your message"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send via WhatsApp
              </button>

              {formSubmitted && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                  Message sent! We'll respond soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
