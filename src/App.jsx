import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Historico from "./pages/Historico";
import Checkout from "./pages/Checkout";
import Finalizacao from "./pages/Finalizacao";
import Login from "./acess/Login";
import Cadastro from "./acess/Cadastro";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Cadastro />} />
            <Route path="/cart" element={<Cart />} />

            {/* Rotas protegidas */}
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
