
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/data/products';

const Cart = () => {
  const { items, totalPrice, checkout } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    checkout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-fade-in">
          <div className="py-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continuer vos achats
            </Button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Votre Panier</h1>
          
          {items.length === 0 ? (
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-12 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-6">
                Parcourez notre catalogue et découvrez nos produits exceptionnels.
              </p>
              <Button onClick={() => navigate('/')}>
                Découvrir les produits
              </Button>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:p-6 border-t border-gray-100">
                <div className="flex justify-between mb-4">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Taxes et frais de livraison calculés lors de la validation de la commande
                </p>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full button-hover"
                  size="lg"
                >
                  Acheter maintenant
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
