import { createContext, useState, useContext, useEffect } from 'react';

// creating the context for the cart
const CartContext = createContext();

// creates a custom hook for consuming the context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// creates the provider component for the cart
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => { // checks the local storage for the cart, if it cannot be found, returns an empty cart
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { // whenever cart changes, save to local storage
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }, [cart]);

  const addToCart = (media) => {
    if (!cart.some(m => m.id === media.id)) {
      setCart(prev => [...prev, media]);
    }
  };

  // might need to change
  const removeFromCart = (mediaId) => {
    setCart(prev => prev.filter(media => media.id !== mediaId));
  };

  // might also need to change
  const isInCart = (mediaId) => {
    return cart.some(media => media.id === mediaId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};