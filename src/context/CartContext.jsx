/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExistente = state.find((item) => item.id === action.payload.id);

      if (itemExistente) {
        return state;
      }

      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const savedCart = localStorage.getItem("cart");
    let parsedCart = [];
    try {
      parsedCart = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage", error);
    }
    return parsedCart;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
