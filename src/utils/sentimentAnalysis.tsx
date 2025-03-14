
// This is a simplified sentiment analysis model for educational purposes
// In a real application, you would use scikit-learn and joblib as mentioned in the requirements

// Enhanced sentiment lexicon in French/Malagasy
const positiveLexicon = [
  // French positive words
  'bien', 'bon', 'excellente', 'super', 'magnifique', 'génial', 'parfait',
  'incroyable', 'merveilleux', 'agréable', 'fantastique', 'délicieux',
  'heureux', 'content', 'satisfait', 'beau', 'joli', 'authentique', 'qualité',
  'recommande', 'rapide', 'facile', 'utile', 'professionnel', 'sympathique',
  'meilleur', 'adoré', 'adore', 'aime', 'apprécie', 'impressionné',
  'efficace', 'convivial', 'pratique', 'fiable', 'exceptionnel', 'remarquable',
  
  // Malagasy positive words
  'tsara', 'mahafinaritra', 'mamy', 'tena tsara', 'mendrika', 'mahavariana',
  'mankasitraka', 'mahafaly', 'manavanana', 'mahatalanjona', 'mahasoa'
];

const negativeLexicon = [
  // French negative words
  'mauvais', 'horrible', 'terrible', 'pauvre', 'déçu', 'décevant', 'pas bon',
  'déteste', 'n\'aime pas', 'problème', 'dommage', 'malheureusement', 'cher',
  'défectueux', 'cassé', 'retard', 'difficile', 'compliqué', 'moche', 'laid',
  'insatisfait', 'médiocre', 'ne recommande pas', 'lent', 'inutile', 
  'arnaque', 'escroquerie', 'ennuyeux', 'ordinaire', 'pire', 'jamais',
  'abîmé', 'incomplet', 'endommagé', 'trop cher', 'pas recommandé', 'déçoit',
  'éviter', 'faux', 'gaspillage', 'dysfonctionnement',
  
  // Malagasy negative words
  'ratsy', 'tsy tsara', 'mampalahelo', 'mafy', 'tsy laitra', 'tsy mety',
  'tsy mahafa-po', 'malahelo', 'tsy mankasitraka', 'tsy mankafy'
];

// Negation words that can flip sentiment
const negationWords = [
  // French
  'ne', 'pas', 'non', 'jamais', 'aucun', 'sans', 'ni',
  // Malagasy
  'tsy', 'tsia', 'tsy misy'
];

// Intensifiers that can strengthen sentiment
const intensifiers = [
  // French
  'très', 'fort', 'vraiment', 'extrêmement', 'tellement', 'tout à fait', 'complètement',
  // Malagasy
  'tena', 'tokoa', 'dia', 'tena be'
];

/**
 * Analyzes the sentiment of a given text written by a user.
 * This function does NOT generate any text, it only analyzes existing text.
 * In a real application, scikit-learn and joblib would be used for more accurate analysis.
 */
export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  // Convert to lowercase and prepare the text
  const processedText = text.toLowerCase();
  const words = processedText.split(/\s+/);
  
  // Count word occurrences
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Check for sentiment words with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let sentimentMultiplier = 1;
    
    // Check for negation before the current word (within 2 words)
    const hasNegation = i > 0 && i < words.length &&
      words.slice(Math.max(0, i-2), i).some(w => negationWords.includes(w));
    
    // Check for intensifiers before the current word
    const hasIntensifier = i > 0 && 
      words.slice(Math.max(0, i-2), i).some(w => intensifiers.includes(w));
    
    // Adjust multiplier based on context
    if (hasNegation) {
      sentimentMultiplier = -1; // Flip the sentiment
    }
    
    if (hasIntensifier) {
      sentimentMultiplier = sentimentMultiplier * 2; // Double the intensity
    }
    
    // Check positive lexicon
    if (positiveLexicon.includes(word)) {
      positiveScore += 1 * sentimentMultiplier;
    }
    
    // Check negative lexicon
    if (negativeLexicon.includes(word)) {
      negativeScore += 1 * sentimentMultiplier;
    }
  }
  
  // Also check for key phrases that might not be caught by individual words
  for (const word of positiveLexicon) {
    if (processedText.includes(word)) {
      positiveScore += 0.5; // Add partial score for phrases
    }
  }
  
  for (const word of negativeLexicon) {
    if (processedText.includes(word)) {
      negativeScore += 0.5; // Add partial score for phrases
    }
  }
  
  // Apply some simple rules for better analysis
  // If text is very short, be more cautious
  if (words.length < 3) {
    // Require stronger evidence for very short texts
    positiveScore *= 0.7;
    negativeScore *= 0.7;
  }
  
  // Emotional intensity usually indicates stronger sentiment
  if (processedText.includes('!')) {
    const exclamationCount = (processedText.match(/!/g) || []).length;
    if (positiveScore > negativeScore) {
      positiveScore += exclamationCount * 0.5;
    } else if (negativeScore > positiveScore) {
      negativeScore += exclamationCount * 0.5;
    }
  }
  
  // Determine sentiment
  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
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

// Useful examples for testing the sentiment analysis (not used in the app)
const testExamples = [
  { text: "Le produit est vraiment excellent, j'adore!", expected: "positive" },
  { text: "Tena tsara be ny entana", expected: "positive" }, // Very good product in Malagasy
  { text: "Ce produit est terrible, je ne recommande pas", expected: "negative" },
  { text: "Tsy tsara mihitsy io vokatra io", expected: "negative" }, // Not good product at all in Malagasy
  { text: "La livraison était correcte", expected: "neutral" },
  { text: "Je n'ai pas aimé ce produit", expected: "negative" }, // Negation example
  { text: "Ce n'est pas mauvais du tout", expected: "positive" }, // Double negation
  { text: "Tsy ratsy ilay izy", expected: "positive" }, // Not bad in Malagasy
];
