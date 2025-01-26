import styles from "./Checkout.module.css";
import CartContext from "../context/CartContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [nomeNoCartao, setNomeNoCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pagamento realizado com sucesso!");
  };

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const finalizarCompra = () => {
    const comprasAnteriores =
      JSON.parse(localStorage.getItem("historicoDeCompras")) || [];
    comprasAnteriores.push({ id: Date.now(), itens: cart, total: total });
    localStorage.setItem(
      "historicoDeCompras",
      JSON.stringify(comprasAnteriores)
    );

    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");

    navigate("/finalizacao");
  };

  return (
    <div className={styles.CheckoutContainer}>
      <h1>Resumo da Compra</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.imagem} alt={item.nome} />
              <h2>{item.nome}</h2>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço: R$ {item.preco}</p>
              <p>Subtotal: R$ {item.preco * item.quantidade}</p>
            </div>
          ))}

          <h2>Total: R$ {total}</h2>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome no Cartão</label>
          <input
            type="text"
            value={nomeNoCartao}
            onChange={(e) => setNomeNoCartao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Número do Cartão</label>
          <input
            type="text"
            value={numeroCartao}
            onChange={(e) => setNumeroCartao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Validade</label>
          <input
            type="text"
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código de Segurança</label>
          <input
            type="text"
            value={codigoSeguranca}
            onChange={(e) => setCodigoSeguranca(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pagar</button>
      </form>

      {cart.length > 0 && (
        <button className={styles.finalizarCompra} onClick={finalizarCompra}>
          Finalizar Compra
        </button>
      )}
    </div>
  );
}

export default Checkout;
