
import { Review as ReviewType } from '@/data/products';
import { User, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getSentimentColor } from '@/utils/sentimentAnalysis';
import { cn } from '@/lib/utils';

interface ReviewProps {
  review: ReviewType;
}

const Review = ({ review }: ReviewProps) => {
  const { content, rating, createdAt, sentiment } = review;
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-7.07 3.706 1.35-7.887L.358 7.326l7.896-1.146L10 0l3.746 6.18 7.896 1.146-6.422 6.078 1.35 7.887z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };
  
  const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm mb-4 animate-fade-in">
      <div className="flex items-start">
        <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center text-gray-600 mr-3">
          <User className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div className="font-medium text-gray-900">Client vérifié</div>
              {sentiment && (
                <div className={cn(
                  "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                  getSentimentColor(sentiment)
                )}>
                  {sentiment === 'positive' ? (
                    <ThumbsUp className="h-3 w-3 mr-1" />
                  ) : sentiment === 'negative' ? (
                    <ThumbsDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </div>
              )}
            </div>
            {renderStars(rating)}
          </div>
          
          <p className="text-gray-700 mb-2">{content}</p>
          
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
