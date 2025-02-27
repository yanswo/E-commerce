/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        return state;
      }
      return [...state, action.payload];
    }

    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.id !== action.payload.id);

    case "CLEAR_WISHLIST":
      return [];

    case "SET_WISHLIST":
      return action.payload;

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await fetch(
            `https://api-11ed.onrender.com/usuarios/${user.id}`
          );
          const data = await response.json();
          dispatch({ type: "SET_WISHLIST", payload: data.wishlist });
        } catch (error) {
          console.error("Erro ao carregar a wishlist do backend", error);
        }
      } else {
        dispatch({ type: "CLEAR_WISHLIST" });
      }
    };

    fetchWishlist();
  }, [user]);

  useEffect(() => {
    const syncWishlist = async () => {
      if (user) {
        try {
          await fetch(`https://api-11ed.onrender.com/usuarios/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlist }),
          });
        } catch (error) {
          console.error("Erro ao sincronizar a wishlist com o backend", error);
        }
      }
    };

    syncWishlist();
  }, [wishlist, user]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export default WishlistContext;
