import { useContext } from "react";
import styles from "./Cart.module.css";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  console.log("Carrinho:", cart);

  const removerDoCarrinho = (produto) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: produto });
  };

  return (
    <div className={styles.CartContainer}>
      <h1>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <div className={styles.produtos}>
          {cart.map((produto) => (
            <div key={produto.id} className={styles.produto}>
              <img src={produto.imagem} alt={produto.nome} />
              <h2>{produto.nome}</h2>
              <p>R$ {produto.preco}</p>
              <button onClick={() => removerDoCarrinho(produto)}>
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
