
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  
  return (
    <div className="flex items-center py-4 border-b border-gray-100 animate-fade-in">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link to={`/product/${product.id}`} className="hover:text-gray-600 transition-colors">
              <h3>{product.name}</h3>
            </Link>
            <p className="ml-4">{formatPrice(product.price * quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.category}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="font-medium">{quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeItem(product.id)}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
