
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: string;
  content: string;
  rating: number;
  createdAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface User {
  id: string;
  name: string;
  purchasedProducts: number[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Satroka Gasy",
    description: "Chapeau traditionnel malgache tissé à la main avec des fibres naturelles.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1495709747088-f4d40871ae9b?q=80&w=1600&auto=format&fit=crop",
    category: "Artisanat"
  },
  {
    id: 2,
    name: "Lambamena",
    description: "Tissu traditionnel malgache utilisé pour diverses cérémonies.",
    price: 50000,
    image: "https://images.unsplash.com/photo-1589041087771-44ba37029128?q=80&w=1600&auto=format&fit=crop",
    category: "Textile"
  },
  {
    id: 3,
    name: "Koba Akondro",
    description: "Délicieuse spécialité culinaire malgache à base de bananes et d'arachides.",
    price: 5000,
    image: "https://images.unsplash.com/photo-1528750924720-e357890953b2?q=80&w=1600&auto=format&fit=crop",
    category: "Nourriture"
  },
  {
    id: 4,
    name: "Sculpture en Bois",
    description: "Sculpture artisanale en bois représentant des motifs traditionnels malgaches.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1610149579549-e9bec47551cf?q=80&w=1600&auto=format&fit=crop",
    category: "Artisanat"
  },
  {
    id: 5,
    name: "Valiha",
    description: "Instrument de musique traditionnel malgache fait de bambou.",
    price: 75000,
    image: "https://images.unsplash.com/photo-1619452886913-1c31ed3d613b?q=80&w=1600&auto=format&fit=crop",
    category: "Musique"
  },
  {
    id: 6,
    name: "Panier en Raphia",
    description: "Panier tressé à la main avec du raphia malgache.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1580421383874-31c1abafae23?q=80&w=1600&auto=format&fit=crop",
    category: "Artisanat"
  },
  {
    id: 7,
    name: "Ravinala",
    description: "Plante endémique de Madagascar, aussi connue sous le nom d'arbre du voyageur.",
    price: 40000,
    image: "https://images.unsplash.com/photo-1588051454451-3e935ddd902e?q=80&w=1600&auto=format&fit=crop",
    category: "Plantes"
  },
  {
    id: 8,
    name: "Café de Madagascar",
    description: "Café premium cultivé dans les hauts plateaux de Madagascar.",
    price: 20000,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=1600&auto=format&fit=crop",
    category: "Nourriture"
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 'user1',
    content: "Très beau satroka, excellente qualité et livraison rapide !",
    rating: 5,
    createdAt: "2023-05-15T14:22:00Z",
    sentiment: "positive"
  },
  {
    id: 2,
    productId: 2,
    userId: 'user2',
    content: "Les couleurs sont magnifiques, mais le tissu est un peu fin.",
    rating: 4,
    createdAt: "2023-06-10T09:15:00Z",
    sentiment: "positive"
  },
  {
    id: 3,
    productId: 3,
    userId: 'user3',
    content: "Délicieux ! Goût authentique qui me rappelle mon enfance à Madagascar.",
    rating: 5,
    createdAt: "2023-07-22T18:40:00Z",
    sentiment: "positive"
  }
];

// Sample user with purchase history
export const currentUser: User = {
  id: 'user1',
  name: 'John Rakoto',
  purchasedProducts: [1, 3]
};

// Helper function to check if a user has purchased a product
export const hasUserPurchasedProduct = (userId: string, productId: number): boolean => {
  const user = userId === currentUser.id ? currentUser : null;
  return user ? user.purchasedProducts.includes(productId) : false;
};

// Helper function to format price in Ariary
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-MG', {
    style: 'currency',
    currency: 'MGA',
    minimumFractionDigits: 0
  }).format(price);
};
