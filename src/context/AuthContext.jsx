import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const userCart = localStorage.getItem(`cart-${parsedUser.id}`);
      if (userCart) {
        const parsedCart = JSON.parse(userCart);

        dispatch({ type: "CLEAR_CART" });
        parsedCart.forEach((item) => {
          dispatch({ type: "ADD_TO_CART", payload: item });
        });
      }
    }
    setLoading(false);
  }, [dispatch]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    const userCart = localStorage.getItem(`cart-${userData.id}`);
    if (userCart) {
      const parsedCart = JSON.parse(userCart);
      dispatch({ type: "CLEAR_CART" });
      parsedCart.forEach((item) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    dispatch({ type: "CLEAR_CART" });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
