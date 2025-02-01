import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Historico from "./pages/Historico";
import Checkout from "./pages/Checkout";
import Finalizacao from "./pages/Finalizacao";
import Login from "./auth/Login";
import Cadastro from "./auth/Cadastro";
import ProtectedRoute from "./routes/ProtectedRoute";
import Produtos from "./pages/Produtos";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Cadastro />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/produtos" element={<Produtos />} />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/historico"
                element={
                  <ProtectedRoute>
                    <Historico />
                  </ProtectedRoute>
                }
              />
              <Route path="/finalizacao" element={<Finalizacao />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
