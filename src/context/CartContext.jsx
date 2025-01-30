/* eslint-disable react/prop-types */

import { createContext, useReducer, useEffect, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExistente = state.find((item) => item.id === action.payload.id);

      if (itemExistente) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [...state, { ...action.payload, quantidade: 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "CLEAR_CART":
      return [];

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      );

    case "UPDATE_STOCK": {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, estoque: item.estoque - 1 }
          : item
      );
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const userId = localStorage.getItem("userId");
    const savedCart = localStorage.getItem(`cart-${userId}`);
    let parsedCart = [];
    try {
      parsedCart = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage", error);
    }
    return parsedCart;
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`cart-${userId}`, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
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

export default CartContext;
