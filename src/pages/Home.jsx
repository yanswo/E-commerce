import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import styles from "./Home.module.css";
import CartDropdown from "../components/CartDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { dispatch } = useContext(CartContext);
  const [produtos, setProdutos] = useState([]);

  const { user, logout } = useAuth();
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

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
      dispatch({ type: "ADD_TO_CART", payload: produto });
    } else {
      alert("Produto fora de estoque");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>E-Store</div>
        <nav className={styles.nav}>
          <ul>
            <li>Home</li>
            <li>Produtos</li>
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
                  <button onClick={logout}>Sair</button>
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
            <input type="text" placeholder="Buscar produtos" />
            <button className={styles.searchButton}>🔍</button>
          </div>
          <div className={styles.cartIcon}>
            <CartDropdown>🛒</CartDropdown>
          </div>
        </div>
      </header>

      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Ofertas Imperdíveis!</h1>
          <p>Até 50% de desconto em todos os produtos</p>
          <button>Confira Agora</button>
        </div>
      </div>

      <div className={styles.categorias}>
        <h2>Categorias</h2>
        <div className={styles.categoriasLista}>
          <div className={styles.categoriaItem}>Roupas</div>
          <div className={styles.categoriaItem}>Acessórios</div>
          <div className={styles.categoriaItem}>Calçados</div>
        </div>
      </div>

      <div className={styles.produtosEmDestaque}>
        <h2>Produtos em Destaque</h2>
        <div className={styles.produtos}>
          {produtos.map((produto) => (
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
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blog}>
        <h2>Artigos e Dicas</h2>
        <div className={styles.artigo}>
          <h3>Como escolher o melhor produto para você</h3>
          <p>Leia mais sobre como fazer compras inteligentes em nosso blog!</p>
        </div>
        <div className={styles.artigo}>
          <h3>Guia de Tamanhos: Encontre o tamanho perfeito</h3>
          <p>
            Veja nosso guia completo de tamanhos para não errar na escolha do
            seu produto.
          </p>
        </div>
      </div>

      <div className={styles.newsletter}>
        <h2>Inscreva-se para receber novidades!</h2>
        <input type="email" placeholder="Digite seu e-mail" />
        <button>Inscrever</button>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 E-Store. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
