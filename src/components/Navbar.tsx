
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur border-b shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-malagasy-red to-malagasy-green flex items-center justify-center">
            <span className="text-white font-bold text-xs">MG</span>
          </div>
          <span className={cn(
            "font-bold text-xl transition-colors",
            scrolled ? "text-gray-900" : "text-gray-900"
          )}>
            Malagasy Market
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={cn(
            "text-sm font-medium transition-colors hover:text-gray-900",
            scrolled ? "text-gray-600" : "text-gray-800"
          )}>
            Accueil
          </Link>
          <Link to="/" className={cn(
            "text-sm font-medium transition-colors hover:text-gray-900",
            scrolled ? "text-gray-600" : "text-gray-800"
          )}>
            Produits
          </Link>
          <Link to="/" className={cn(
            "text-sm font-medium transition-colors hover:text-gray-900",
            scrolled ? "text-gray-600" : "text-gray-800"
          )}>
            À propos
          </Link>
        </nav>
        
        <div className="flex items-center">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className={cn(
                "h-5 w-5 transition-colors",
                scrolled ? "text-gray-600" : "text-gray-800"
              )} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-malagasy-red text-white text-xs flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
