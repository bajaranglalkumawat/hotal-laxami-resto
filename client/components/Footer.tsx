import { Phone, MapPin, Clock, Facebook, Instagram, Smartphone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🍽️</span>
              Hotel Laxmi Resto
            </h3>
            <p className="text-gray-300 mb-4">
              Pure vegetarian family restaurant with 24×7 service
            </p>
            <p className="text-sm text-gray-400">
              Serving delicious authentic Indian cuisine since the beginning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#menu" className="hover:text-brand-gold transition-colors">Our Menu</a></li>
              <li><a href="#rooms" className="hover:text-brand-gold transition-colors">Rooms</a></li>
              <li><a href="#facilities" className="hover:text-brand-gold transition-colors">Facilities</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-gold" />
                <a href="tel:9414649999" className="hover:text-brand-gold transition-colors">
                  9414649999
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-brand-gold" />
                <a href="https://wa.me/919414649999" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-brand-gold mt-1" />
                <span>Budsu Road, Kuchaman City, Rajasthan</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Hotel Laxmi Resto. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://www.instagram.com/hotel_laxmi_restaurant/" className="hover:text-brand-gold transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/hotel_laxmi_restaurant/" className="hover:text-brand-gold transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
