import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      // Product already exists → increase quantity
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  Number(product.stock)
                ),
              }
            : item
        );
      }

      // New product → add to cart
      return [
        ...prevItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(
                  quantity,
                  Number(item.stock)
                )
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}