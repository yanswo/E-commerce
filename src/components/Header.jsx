/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartDropdown from "../components/CartDropdown";
import WishlistDropdown from "../components/WishlistDropdown";
import styles from "./Header.module.css";
import CartContext from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";

function Header({ user, logout, searchQuery, setSearchQuery, handleSearch }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const { wishlist } = useWishlist();

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`cart-${userId}`);
    }
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>E-Store</div>
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/produtos")}>Produtos</li>
          <li>Promoções</li>
          <li>Contato</li>
        </ul>
      </nav>

      <div className={styles.authSection}>
        {user ? (
          <div className={styles.userMenu}>
            <button
              className={styles.minhaContaButton}
              onClick={() => setMostrarMenu(!mostrarMenu)}
            >
              👤 Minha Conta <span className={styles.seta}>▼</span>
            </button>
            {mostrarMenu && (
              <div className={styles.menuDropdown}>
                <button onClick={() => navigate("/historico")}>
                  Histórico
                </button>
                <button onClick={() => navigate("/configuracoes")}>
                  Configurações
                </button>
                <button onClick={handleLogout}>Sair</button>{" "}
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Entrar/Cadastrar
          </button>
        )}
      </div>

      <div className={styles.searchCart}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar produtos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className={styles.icons}>
          <div className={styles.wishdropdown}>
            <button
              className={styles.wishlistButton}
              onClick={() => setWishlistOpen(!wishlistOpen)}
            >
              <FaHeart
                className={`${styles.heartIcon} ${
                  wishlist.length > 0 ? styles.activeHeart : ""
                }`}
              />
            </button>
            {wishlistOpen && <WishlistDropdown />}
          </div>

          <div className={styles.cartIcon}>
            <CartDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
