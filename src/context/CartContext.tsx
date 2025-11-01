import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, type: 'inc' | 'dec') => void;
  clearCart: () => void;
  payNow: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  payNow: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);

      if (exists) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: item.quantity } : p,
        );
      }

      // add new product WITH the passed quantity
      return [...prev, { ...item }];
    });
  };

  const updateQuantity = (id: number, type: 'inc' | 'dec') => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([] as CartItem[]);

  const payNow = () => {
    console.log('Payment done!');
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart, payNow }}
    >
      {children}
    </CartContext.Provider>
  );
};
