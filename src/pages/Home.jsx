import styles from "./Home.module.css";
import Camisa from "../imgs/Camisa.jpg";
import Tenis from "../imgs/Tenis.jpg";
import Moletom from "../imgs/Moletom.jpg";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function Home() {
  const { dispatch } = useContext(CartContext);
  const produtos = [
    {
      id: 1,
      nome: "Camiseta",
      preco: 50,
      imagem: `${Camisa}`,
    },
    { id: 2, nome: "Tênis", preco: 200, imagem: `${Tenis}` },
    { id: 3, nome: "Moletom", preco: 130, imagem: `${Moletom}` },
  ];

  const adicionarAoCarrinho = (produto) => {
    dispatch({ type: "ADD_TO_CART", payload: produto });
    console.log(produto);
  };

  return (
    <div className={styles.HomeContainer}>
      <h1>Bem-vindo à Loja!</h1>
      <div className={styles.produtos}>
        {produtos.map((produto) => (
          <div key={produto.id} className={styles.produto}>
            <img src={produto.imagem} alt={produto.nome} />
            <h2>{produto.nome}</h2>
            <p>R$ {produto.preco}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
