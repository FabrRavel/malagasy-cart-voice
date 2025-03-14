
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { analyzeSentiment } from '@/utils/sentimentAnalysis';
import { useCart } from '@/context/CartContext';
import { reviews } from '@/data/products';
import { toast } from '@/components/ui/use-toast';

interface ReviewFormProps {
  productId: number;
  onReviewSubmit: (newReview: any) => void;
}

const ReviewForm = ({ productId, onReviewSubmit }: ReviewFormProps) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const { purchasedItems } = useCart();
  
  const hasPurchased = purchasedItems.includes(productId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasPurchased) {
      toast({
        title: "Vous devez acheter ce produit",
        description: "Seuls les clients ayant acheté ce produit peuvent laisser un avis.",
        variant: "destructive"
      });
      return;
    }
    
    if (content.trim().length < 3) {
      toast({
        title: "Avis trop court",
        description: "Votre avis doit contenir au moins 3 caractères.",
        variant: "destructive"
      });
      return;
    }
    
    // Analyze sentiment of the customer's review
    const sentiment = analyzeSentiment(content);
    
    // Create new review
    const newReview = {
      id: reviews.length + 1,
      productId,
      userId: 'user1', // Current user ID
      content,
      rating,
      createdAt: new Date().toISOString(),
      sentiment
    };
    
    // Add review
    onReviewSubmit(newReview);
    
    // Reset form
    setContent('');
    setRating(5);
    
    toast({
      title: "Avis ajouté",
      description: "Votre avis a été ajouté avec succès.",
    });
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Laisser un avis</h3>
      
      {!hasPurchased ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mb-4">
          <p className="text-sm">
            Vous devez acheter ce produit avant de pouvoir laisser un avis.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                >
                  <svg
                    className={`h-6 w-6 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } transition-colors`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 3.706 1.35-7.887L.358 7.326l7.896-1.146L10 0l3.746 6.18 7.896 1.146-6.422 6.078 1.35 7.887z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Votre avis
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partagez votre expérience personnelle avec ce produit..."
              rows={4}
              className="resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Notre système analysera automatiquement le sentiment de votre avis une fois soumis.
            </p>
          </div>
          
          <Button type="submit" className="w-full button-hover">
            Soumettre l'avis
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
