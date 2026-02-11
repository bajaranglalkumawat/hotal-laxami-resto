import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onCartClick?: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Rooms', id: 'rooms' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-brand-green">Hotel Laxmi Resto</h1>
              <p className="text-xs text-brand-dark">Pure Veg • Family Restaurant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-2 text-sm font-medium text-brand-dark hover:text-brand-green hover:bg-brand-cream rounded-md transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative hidden md:inline-block mx-4 p-3 rounded-lg hover:bg-brand-cream transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-brand-dark" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Call Button - Desktop */}
          <a
            href="tel:9414649999"
            className="hidden md:flex btn-primary text-sm"
          >
            Call: 9414649999
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-brand-cream active:bg-brand-gold transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brand-dark" />
            ) : (
              <Menu className="w-6 h-6 text-brand-dark" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-brand-dark hover:text-brand-green hover:bg-brand-cream rounded-md transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onCartClick?.();
              }}
              className="relative block w-full text-left px-3 py-2 text-base font-medium text-brand-dark hover:text-brand-green hover:bg-brand-cream rounded-md transition-colors duration-300"
            >
              <ShoppingCart className="inline w-5 h-5 mr-2" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
            <a
              href="tel:9414649999"
              className="block w-full btn-primary text-center text-sm mt-4"
            >
              Call: 9414649999
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
