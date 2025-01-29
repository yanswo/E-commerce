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

        {/* Seção de Autenticação */}
        <div className={styles.authSection}>
          {user ? (
            <div className={styles.userInfo}>
              <span>Olá, {user.nome}</span>
              <button onClick={() => navigate("/historico")}>
                Minha Conta
              </button>
              <button onClick={logout}>Sair</button>
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
          <input type="text" placeholder="Buscar produtos" />
          <div className={styles.cartIcon}>
            <CartDropdown>🛒</CartDropdown>
          </div>
        </div>
      </header>

      <div className={styles.banner}>
        <h1>Ofertas Imperdíveis!</h1>
        <p>Até 50% de desconto em todos os produtos</p>
        <button>Confira Agora</button>
      </div>

      <div className={styles.categorias}>
        <h2>Categorias</h2>
        <div className={styles.categoriaItem}>Roupas</div>
        <div className={styles.categoriaItem}>Acessórios</div>
        <div className={styles.categoriaItem}>Calçados</div>
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
              <p>R$ {produto.preco}</p>
              <p>{produto.disponibilidade ? "Disponível" : "Indisponível"}</p>
              <button onClick={() => adicionarAoCarrinho(produto)}>
                {produto.disponibilidade
                  ? "Adicionar ao Carrinho"
                  : "Produto Indisponível"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.produtosEmOferta}>
        <h2>Produtos em Oferta</h2>
        <div className={styles.produtos}>
          <div className={styles.produto}>
            <img
              className={styles.imagemProduto}
              src="https://placehold.co/600x400"
              alt="Oferta 1"
            />
            <h3>Produto em Oferta 1</h3>
            <p>R$ 80</p>
            <p>Estoque: 5</p>
            <button>Adicionar ao Carrinho</button>
          </div>
          <div className={styles.produto}>
            <img
              className={styles.imagemProduto}
              src="https://placehold.co/600x400"
              alt="Oferta 2"
            />
            <h3>Produto em Oferta 2</h3>
            <p>R$ 150</p>
            <p>Estoque: 8</p>
            <button>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>

      <div className={styles.novidades}>
        <h2>Novidades</h2>
        <div className={styles.produtos}>
          <div className={styles.produto}>
            <img
              className={styles.imagemProduto}
              src="https://placehold.co/600x400"
              alt="Novo 1"
            />
            <h3>Produto Novo 1</h3>
            <p>R$ 120</p>
            <p>Estoque: 10</p>
            <button>Adicionar ao Carrinho</button>
          </div>
          <div className={styles.produto}>
            <img
              className={styles.imagemProduto}
              src="https://placehold.co/600x400"
              alt="Novo 2"
            />
            <h3>Produto Novo 2</h3>
            <p>R$ 180</p>
            <p>Estoque: 3</p>
            <button>Adicionar ao Carrinho</button>
          </div>
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
