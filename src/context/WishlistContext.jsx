/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext"; // Importe o AuthContext

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
  const { user } = useAuth(); // Acesse o usuário logado
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  // Carregar a wishlist do backend quando o usuário faz login
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:5000/usuarios/${user.id}`
          );
          const data = await response.json();
          dispatch({ type: "SET_WISHLIST", payload: data.wishlist });
        } catch (error) {
          console.error("Erro ao carregar a wishlist do backend", error);
        }
      } else {
        dispatch({ type: "CLEAR_WISHLIST" }); // Limpa a wishlist se não houver usuário logado
      }
    };

    fetchWishlist();
  }, [user]);

  // Sincronizar a wishlist com o backend sempre que ela mudar
  useEffect(() => {
    const syncWishlist = async () => {
      if (user) {
        try {
          await fetch(`http://localhost:5000/usuarios/${user.id}`, {
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
