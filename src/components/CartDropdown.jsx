import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import styles from "./CartDropdown.module.css";
import { Link } from "react-router-dom";

function CartDropdown() {
  const { cart, dispatch } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const removerDoCarrinho = (produto) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: produto });
  };

  const aumentarQuantidade = (produto) => {
    if (produto.estoque > produto.quantidade) {
      dispatch({ type: "INCREASE_QUANTITY", payload: produto });
    } else {
      alert("Quantidade máxima disponível no estoque atingida.");
    }
  };

  const diminuirQuantidade = (produto) => {
    if (produto.quantidade > 1) {
      dispatch({ type: "DECREASE_QUANTITY", payload: produto });
    }
  };

  // Calcular o total do carrinho
  const totalCarrinho = cart.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  );

  return (
    <div className={styles.cartDropdownContainer}>
      <div className={styles.cartIcon} onClick={toggleDropdown}>
        🛒
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <h2>Seu Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio</p>
          ) : (
            <div className={styles.produtos}>
              {cart.map((produto) => (
                <div key={produto.id} className={styles.produto}>
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className={styles.produtoImagem}
                  />
                  <div className={styles.produtoInfo}>
                    <h3>{produto.nome}</h3>
                    <p>R$ {produto.preco}</p>
                    <p>Quantidade: {produto.quantidade}</p>
                    <div className={styles.botoes}>
                      <button onClick={() => aumentarQuantidade(produto)}>
                        +
                      </button>
                      <button onClick={() => diminuirQuantidade(produto)}>
                        -
                      </button>
                      <button onClick={() => removerDoCarrinho(produto)}>
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.total}>
            <span>Total:</span>
            <span>R$ {totalCarrinho.toFixed(2)}</span>
          </div>

          <button className={styles.checkoutButton}>
            <Link to="/checkout">Ir para pagamento</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default CartDropdown;
