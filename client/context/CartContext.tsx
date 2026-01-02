import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  selectedSize?: string;
  selectedSizePrice?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
  ) => {
    setCartItems((prevItems) => {
      // Check if item already exists (for non-sized items)
      if (!selectedSize) {
        const existingItem = prevItems.find(
          (item) => item.productId === product.id,
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
      }

      // Add new item
      const price = selectedSize
        ? product.sizes?.find((s) => s.label === selectedSize)?.price ||
          product.price ||
          0
        : product.price || 0;

      const newItem: CartItem = {
        id: `${product.id}-${selectedSize || Date.now()}`,
        productId: product.id,
        name: product.name,
        price: price,
        quantity,
        image: product.image,
        description: product.description,
        selectedSize,
        selectedSizePrice: price,
      };

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
