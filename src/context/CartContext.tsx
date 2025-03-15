
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, currentUser } from '../data/products';
import { toast } from '@/components/ui/use-toast';
import { initIndexedDB, saveDataToIndexedDB, getDataFromIndexedDB } from '@/utils/indexedDB';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  totalItems: number;
  totalPrice: number;
  purchasedItems: number[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<number[]>(
    currentUser.purchasedProducts || []
  );
  const [isDBInitialized, setIsDBInitialized] = useState(false);
  
  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        await initIndexedDB();
        setIsDBInitialized(true);
      } catch (error) {
        console.error('Failed to initialize IndexedDB', error);
        // Fallback to localStorage if IndexedDB fails
        setIsDBInitialized(true);
      }
    };
    
    initDB();
  }, []);

  // Load cart and purchases from IndexedDB or localStorage
  useEffect(() => {
    if (!isDBInitialized) return;
    
    const loadData = async () => {
      try {
        // Try to get data from IndexedDB
        const cartData = await getDataFromIndexedDB('cart');
        if (cartData) {
          setItems(cartData);
        } else {
          // Fallback to localStorage for cart
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            try {
              setItems(JSON.parse(savedCart));
              // Also save to IndexedDB for future use
              await saveDataToIndexedDB('cart', JSON.parse(savedCart));
            } catch (error) {
              console.error('Failed to parse saved cart', error);
            }
          }
        }
        
        // Try to get purchases from IndexedDB
        const purchasesData = await getDataFromIndexedDB('purchases');
        if (purchasesData) {
          setPurchasedItems(purchasesData);
        } else {
          // Fallback to localStorage for purchases
          const savedPurchases = localStorage.getItem('purchasedItems');
          if (savedPurchases) {
            try {
              setPurchasedItems(JSON.parse(savedPurchases));
              // Also save to IndexedDB for future use
              await saveDataToIndexedDB('purchases', JSON.parse(savedPurchases));
            } catch (error) {
              console.error('Failed to parse saved purchases', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    
    loadData();
  }, [isDBInitialized]);

  // Save cart to IndexedDB and localStorage whenever it changes
  useEffect(() => {
    if (!isDBInitialized) return;
    
    const saveCart = async () => {
      try {
        await saveDataToIndexedDB('cart', items);
        localStorage.setItem('cart', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart', error);
        // Fallback to just localStorage
        localStorage.setItem('cart', JSON.stringify(items));
      }
    };
    
    saveCart();
  }, [items, isDBInitialized]);
  
  // Save purchased items to IndexedDB and localStorage whenever it changes
  useEffect(() => {
    if (!isDBInitialized) return;
    
    const savePurchases = async () => {
      try {
        await saveDataToIndexedDB('purchases', purchasedItems);
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
      } catch (error) {
        console.error('Error saving purchases', error);
        // Fallback to just localStorage
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
      }
    };
    
    savePurchases();
  }, [purchasedItems, isDBInitialized]);

  // Add item to cart
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
    
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name}`,
      duration: 3000,
    });
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Checkout - simulate a purchase
  const checkout = () => {
    const newPurchasedProductIds = items.map(item => item.product.id);
    
    // Update purchased items
    setPurchasedItems(prev => {
      const combinedIds = [...prev, ...newPurchasedProductIds];
      return [...new Set(combinedIds)]; // Remove duplicates
    });
    
    // Clear the cart
    clearCart();
    
    // Show success message
    toast({
      title: "Achat effectué avec succès!",
      description: "Vous pouvez maintenant laisser des avis sur vos produits achetés.",
      duration: 5000,
    });
  };

  return (
    <CartContext.Provider 
      value={{
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        checkout,
        totalItems,
        totalPrice,
        purchasedItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
