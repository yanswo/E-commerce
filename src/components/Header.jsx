/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartDropdown from "../components/CartDropdown";
import WishlistDropdown from "../components/WishlistDropdown";
import styles from "./Header.module.css";
import CartContext from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function Header({
  user,
  logout,
  searchQuery,
  setSearchQuery,
  handleSearch,
  produtos,
}) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { wishlist, dispatch: wishlistDispatch } = useWishlist();
  const searchDropdownRef = useRef(null); // Referência para o dropdown de pesquisa

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`cart-${userId}`);
    }
    logout();
  };

  const filteredProducts = (produtos || []).filter((produto) => {
    if (
      produto &&
      typeof produto.nome === "string" &&
      produto.nome.trim() !== ""
    ) {
      return produto.nome.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleAddToCart = (produto) => {
    cartDispatch({ type: "ADD_TO_CART", payload: produto });
  };

  const handleAddToWishlist = (produto) => {
    wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: produto });
  };

  // Fecha o dropdown de pesquisa ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        E-Store
      </div>
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/produtos")}>Produtos</li>
          <li
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/yan-lucas-03128021a/",
                "_blank"
              )
            }
          >
            Contato
          </li>
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
                <button onClick={handleLogout}>Sair</button>
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
        <div className={styles.searchBar} ref={searchDropdownRef}>
          <input
            type="text"
            placeholder="Buscar produtos"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                setShowSearchResults(false);
              }
            }}
          />

          {showSearchResults && searchQuery && (
            <div className={styles.searchResultsDropdown}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((produto) => (
                  <div key={produto.id} className={styles.searchResultItem}>
                    <div className={styles.productInfo}>
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className={styles.productImage}
                      />
                      <div className={styles.productDetails}>
                        <span className={styles.productName}>
                          {produto.nome}
                        </span>
                        <span className={styles.productPrice}>
                          R$ {produto.preco.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.productActions}>
                      <button
                        className={styles.addToCartButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(produto);
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                      <button
                        className={styles.addToWishlistButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWishlist(produto);
                        }}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  Nenhum produto encontrado
                </div>
              )}
            </div>
          )}
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
                viewBox="0 0 600 600"
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
