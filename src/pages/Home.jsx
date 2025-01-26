import { useContext } from "react";
import CartContext from "../context/CartContext";
import styles from "./Home.module.css";

function Home() {
  const { dispatch } = useContext(CartContext);

  const produtos = [
    {
      id: 1,
      nome: "Camiseta",
      preco: 50,
      imagem: "https://placehold.co/600x400",
      estoque: 23,
    },
    {
      id: 2,
      nome: "Tênis",
      preco: 200,
      imagem: "https://placehold.co/600x400",
      estoque: 55,
    },
    {
      id: 3,
      nome: "Moletom",
      preco: 130,
      imagem: "https://placehold.co/600x400",
      estoque: 43,
    },
    {
      id: 4,
      nome: "Jaqueta de Couro",
      preco: 300,
      imagem: "https://placehold.co/600x400",
      estoque: 10,
    },
    {
      id: 5,
      nome: "Boné",
      preco: 40,
      imagem: "https://placehold.co/600x400",
      estoque: 34,
    },
    {
      id: 6,
      nome: "Óculos de Sol",
      preco: 150,
      imagem: "https://placehold.co/600x400",
      estoque: 109,
    },
  ];

  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque > 0) {
      dispatch({ type: "ADD_TO_CART", payload: produto });
      dispatch({ type: "UPDATE_STOCK", payload: produto });
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
        <div className={styles.searchCart}>
          <input type="text" placeholder="Buscar produtos" />
          <div className={styles.cartIcon}>🛒</div>
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
              <p>Estoque: {produto.estoque}</p>
              <button onClick={() => adicionarAoCarrinho(produto)}>
                {produto.estoque > 0
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
