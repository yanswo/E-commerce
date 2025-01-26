import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import styles from "./Finalizacao.module.css";

function Finalizacao() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const gerarNumeroPedido = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return (
    <div className={styles.finalizacao}>
      <h1>Obrigado pela sua compra!</h1>
      <p>Seu pedido foi realizado com sucesso.</p>
      <p>Numero do pedido: {gerarNumeroPedido()}</p>
      <h2>Resumo da compra</h2>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <h3>{item.nome}</h3>
            <p>Quantidade: {item.quantidade}</p>
            <p>Preço: R$ {item.preco}</p>
            <p>Subtotal: R$ {item.preco * item.quantidade}</p>
          </div>
        ))}
      </div>
      <h3>Total: R$ {total}</h3>
      <button onClick={() => navigate("/")}>Voltar à Loja</button>
    </div>
  );
}

export default Finalizacao;
