
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  // Remove the image loading state - images will show immediately
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm card-hover animate-slide-in">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {product.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <Images className="h-4 w-4 text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <div className="p-4">
        <div className="mb-2">
          <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
            {product.category}
          </div>
          <h3 className="font-medium text-gray-900 text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="button-hover"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
