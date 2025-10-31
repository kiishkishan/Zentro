import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
