
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
  // Added more positive words
  'savoureux', 'superbe', 'impeccable', 'satisfaisant', 'excellent', 'formidable',
  'idéal', 'plaisant', 'parfaitement', 'géniale', 'extraordinaire', 'ravissant',
  'réussi', 'succulent', 'charmant', 'optimal', 'optimal', 'chaleureux', 'élégant',
  'enthousiasmant', 'recommandable', 'à la hauteur', 'conforme', 'satisfaisante',
  'étonnant', 'raffiné', 'top', 'précis', 'ravi', 'enthousiasmé', 'brillant',
  
  // Malagasy positive words
  'tsara', 'mahafinaritra', 'mamy', 'tena tsara', 'mendrika', 'mahavariana',
  'mankasitraka', 'mahafaly', 'manavanana', 'mahatalanjona', 'mahasoa',
  // Added more Malagasy positive words
  'mahafinaritra be', 'tonga lafatra', 'mahay', 'tsara tarehy', 'mamiratra',
  'mahafa-po', 'mahafaly tokoa', 'tsara kalitao', 'matotra', 'mety tsara'
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
  // Added more negative words
  'catastrophique', 'décourageant', 'insupportable', 'regrettable', 'inacceptable',
  'pitoyable', 'déplorable', 'atroce', 'pénible', 'insuffisant', 'mécontentement',
  'problématique', 'défaillant', 'inapproprié', 'désastreux', 'fragile', 'abusif',
  'ennuyant', 'frustrant', 'minable', 'non-fonctionnel', 'perte', 'périmé', 'ridicule',
  'suspect', 'trompeur', 'contrefait', 'défaillance', 'scandaleux', 'inefficace',
  
  // Malagasy negative words
  'ratsy', 'tsy tsara', 'mampalahelo', 'mafy', 'tsy laitra', 'tsy mety',
  'tsy mahafa-po', 'malahelo', 'tsy mankasitraka', 'tsy mankafy',
  // Added more Malagasy negative words
  'very vola', 'ratsy be', 'tsy azo itokisana', 'simba', 'potika',
  'lafo loatra', 'mampahonena', 'tsy mandeha', 'tsy madio', 'ambany kalitao'
];

// Neutral phrases and words (to be avoided in classification)
const neutralPhrases = [
  'comme prévu', 'dans les délais', 'conforme à', 'standard', 'normal',
  'ok', 'correct', 'attendu', 'habituel', 'ordinaire', 'livré',
  'arrivé', 'reçu', 'commandé', 'expédié', 'antonony', 'eo eo ihany'
];

// Phrases that strongly indicate positivity or negativity
const strongPositivePhrases = [
  'très satisfait', 'vraiment excellent', 'je recommande vivement',
  'absolument parfait', 'exceptionnel', 'un délice', 'tena tsara be',
  'mahafinaritra be', 'ravie', 'parfaitement', 'extraordinaire',
  'j\'adore', 'fantastique', 'à recommander sans hésitation',
  'le meilleur'
];

const strongNegativePhrases = [
  'vraiment déçu', 'absolument horrible', 'à éviter', 'catastrophique',
  'jamais plus', 'très déçu', 'grosse déception', 'tsy tsara mihitsy',
  'arnaque totale', 'ne fonctionne pas', 'produit défectueux',
  'je déconseille', 'ne commandez pas', 'terrible expérience',
  'le pire'
];

// Negation words that can flip sentiment
const negationWords = [
  // French
  'ne', 'pas', 'non', 'jamais', 'aucun', 'sans', 'ni', 'aucune', 
  'nullement', 'rien', 'personne',
  // Malagasy
  'tsy', 'tsia', 'tsy misy', 'tsy mba'
];

// Intensifiers that can strengthen sentiment
const intensifiers = [
  // French
  'très', 'fort', 'vraiment', 'extrêmement', 'tellement', 'tout à fait', 'complètement',
  'absolument', 'totalement', 'entièrement', 'particulièrement', 'incroyablement',
  'énormément', 'beaucoup', 'profondément', 'hautement', 'terriblement',
  // Malagasy
  'tena', 'tokoa', 'dia', 'tena be', 'izaitsizy'
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
  
  // Check for strong phrases first (these override other signals)
  for (const phrase of strongPositivePhrases) {
    if (processedText.includes(phrase.toLowerCase())) {
      return 'positive';
    }
  }
  
  for (const phrase of strongNegativePhrases) {
    if (processedText.includes(phrase.toLowerCase())) {
      return 'negative';
    }
  }
  
  // Count word occurrences
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Check for sentiment words with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let sentimentMultiplier = 1;
    
    // Check for negation before the current word (within 3 words)
    const hasNegation = i > 0 && i < words.length &&
      words.slice(Math.max(0, i-3), i).some(w => negationWords.includes(w));
    
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
  
  // Check for neutral phrases - if they dominate the text, it might be neutral
  let neutralScore = 0;
  for (const phrase of neutralPhrases) {
    if (processedText.includes(phrase)) {
      neutralScore += 1;
    }
  }
  
  // Check for star rating as an additional signal
  if (processedText.includes('étoile') || processedText.includes('etoile') || processedText.includes('star')) {
    // Look for numbers near these words
    const ratingMatch = processedText.match(/(\d+).*?(étoile|etoile|star)/);
    if (ratingMatch) {
      const rating = parseInt(ratingMatch[1]);
      if (rating >= 4) {
        positiveScore += 1;
      } else if (rating <= 2) {
        negativeScore += 1;
      }
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
  
  // Reduce neutral classification likelihood by lowering the threshold
  // Determine sentiment with bias away from neutral
  if (positiveScore > negativeScore + 0.2) {
    return 'positive';
  } else if (negativeScore > positiveScore + 0.2) {
    return 'negative';
  } else if (neutralScore > (positiveScore + negativeScore) * 0.8) {
    // Only classify as neutral if there are strong neutral indicators
    return 'neutral';
  } else if (positiveScore >= negativeScore) {
    // Slightly favor positive when scores are close and no strong neutral indicators
    return 'positive';
  } else {
    // Slightly favor negative when scores are close and no strong neutral indicators
    return 'negative';
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
  { text: "Je recommande vivement ce produit à tous mes amis!", expected: "positive" },
  { text: "Une catastrophe totale, à éviter absolument", expected: "negative" },
  { text: "Produit livré comme prévu", expected: "neutral" },
  { text: "Très déçu par la qualité, ne vaut vraiment pas le prix", expected: "negative" },
  { text: "C'est le meilleur produit que j'ai jamais acheté, parfait !", expected: "positive" },
];
