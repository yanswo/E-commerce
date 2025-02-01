import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const { dispatch: dispatchCart } = useContext(CartContext);
  const { wishlist, dispatch: dispatchWishlist } = useContext(WishlistContext);
  const [produtos, setProdutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/produtos?search=${searchQuery}`);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:5000/produtos");
        if (!response.ok) {
          throw new Error("Erro ao carregar produtos");
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    if (produto.disponibilidade) {
      dispatchCart({ type: "ADD_TO_CART", payload: produto });
    } else {
      alert("Produto fora de estoque");
    }
  };

  const toggleWishlist = (produto) => {
    const isInWishlist = wishlist.find((item) => item.id === produto.id);
    if (isInWishlist) {
      dispatchWishlist({ type: "REMOVE_FROM_WISHLIST", payload: produto });
    } else {
      dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: produto });
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Header
        user={user}
        logout={logout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        produtos={produtos}
      />

      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Ofertas Imperdíveis!</h1>
          <p>Até 50% de desconto em todos os produtos</p>
          <button>Confira Agora</button>
        </div>
      </div>

      <div className={styles.produtosEmDestaque}>
        <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
        <div className={styles.produtosGrid}>
          {produtos.slice(0, 6).map((produto) => (
            <div key={produto.id} className={styles.produto}>
              <img
                className={styles.imagemProduto}
                src={produto.imagem}
                alt={produto.nome}
              />
              <h3>{produto.nome}</h3>
              <p className={styles.preco}>R$ {produto.preco}</p>
              <p className={styles.disponibilidade}>
                {produto.disponibilidade ? "Disponível" : "Indisponível"}
              </p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className={
                  produto.disponibilidade
                    ? styles.botaoDisponivel
                    : styles.botaoIndisponivel
                }
              >
                {produto.disponibilidade
                  ? "Adicionar ao Carrinho"
                  : "Produto Indisponível"}
              </button>

              <button
                onClick={() => toggleWishlist(produto)}
                className={styles.wishlistButton}
              >
                {wishlist.find((item) => item.id === produto.id) ? "❤️" : "🤍"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
