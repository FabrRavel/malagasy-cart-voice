
// This is a simplified sentiment analysis model for educational purposes
// In a real application, you would use scikit-learn and joblib as mentioned

// Basic sentiment lexicon
const positiveLexicon = [
  'bien', 'bon', 'excellente', 'super', 'magnifique', 'génial', 'parfait',
  'incroyable', 'merveilleux', 'agréable', 'fantastique', 'délicieux',
  'heureux', 'content', 'satisfait', 'beau', 'joli', 'authentique', 'qualité',
  'recommande', 'rapide', 'facile', 'utile', 'professionnel', 'sympathique',
  'meilleur', 'adoré', 'adore', 'aime', 'apprécie', 'impressionné'
];

const negativeLexicon = [
  'mauvais', 'horrible', 'terrible', 'pauvre', 'déçu', 'décevant', 'pas bon',
  'déteste', 'n\'aime pas', 'problème', 'dommage', 'malheureusement', 'cher',
  'défectueux', 'cassé', 'retard', 'difficile', 'compliqué', 'moche', 'laid',
  'insatisfait', 'médiocre', 'ne recommande pas', 'lent', 'inutile', 
  'arnaque', 'escroquerie', 'ennuyeux', 'ordinaire', 'pire', 'jamais'
];

// Simple sentiment analysis function
export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  // Convert to lowercase and prepare the text
  const processedText = text.toLowerCase();
  
  // Count word occurrences
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Check for positive words
  for (const word of positiveLexicon) {
    if (processedText.includes(word)) {
      positiveCount++;
    }
  }
  
  // Check for negative words
  for (const word of negativeLexicon) {
    if (processedText.includes(word)) {
      negativeCount++;
    }
  }
  
  // Determine sentiment
  if (positiveCount > negativeCount) {
    return 'positive';
  } else if (negativeCount > positiveCount) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Function to get sentiment badge color
export const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral'): string => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
    case 'neutral':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
