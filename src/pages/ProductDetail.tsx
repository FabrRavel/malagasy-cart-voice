
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews as allReviews, Review, formatPrice } from '@/data/products';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ShieldCheck, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ReviewComponent from '@/components/Review';
import ReviewForm from '@/components/ReviewForm';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');
  const { addItem, purchasedItems } = useCart();
  
  const [product, setProduct] = useState(products.find(p => p.id === productId));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isPurchased = purchasedItems.includes(productId);
  
  useEffect(() => {
    if (!product) {
      navigate('/');
      return;
    }
    
    // Filter reviews for this product
    setReviews(allReviews.filter(review => review.productId === productId));
  }, [product, productId, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const handleReviewSubmit = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };
  
  if (!product) {
    return null;
  }
  
  // Calculate average rating
  const avgRating = reviews.length 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-fade-in">
          {/* Breadcrumb */}
          <div className="py-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour aux produits
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className={cn(
                  "w-full h-full object-cover aspect-square",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-4">
                {product.category}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {reviews.length} avis
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-6">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-gray-700 mb-8">
                {product.description}
              </p>
              
              {isPurchased ? (
                <div className="flex items-center mb-8 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-green-700 mr-2" />
                  <span className="text-green-800 text-sm font-medium">Produit déjà acheté</span>
                </div>
              ) : (
                <div className="flex items-end mb-8">
                  <div className="mr-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantité
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    size="lg" 
                    onClick={handleAddToCart}
                    className="button-hover flex-1"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Détails du produit</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Produit authentique malgache</li>
                  <li>Fabriqué à la main par des artisans locaux</li>
                  <li>Matériaux de haute qualité</li>
                  <li>Expédition depuis Antananarivo</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-6">
                Avis des clients ({reviews.length})
              </h2>
              
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewComponent key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis pour le moment</h3>
                  <p className="text-gray-600">
                    Soyez le premier à partager votre expérience avec ce produit.
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <ReviewForm 
                productId={productId} 
                onReviewSubmit={handleReviewSubmit} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
