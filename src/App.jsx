import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Finalizacao from "./pages/Finalizacao";
import Historico from "./pages/Historico";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/finalizacao" element={<Finalizacao />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
