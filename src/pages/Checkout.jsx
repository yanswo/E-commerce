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
  const [erro, setErro] = useState("");
  const [etapa, setEtapa] = useState(1);

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const validarDadosPagamento = () => {
    if (!nomeNoCartao || !numeroCartao || !dataValidade || !codigoSeguranca) {
      setErro("Todos os campos de pagamento são obrigatórios.");
      return false;
    }
    if (numeroCartao.length !== 16) {
      setErro("Número do cartão inválido.");
      return false;
    }
    if (codigoSeguranca.length !== 3) {
      setErro("Código de segurança inválido.");
      return false;
    }
    setErro("");
    return true;
  };

  const finalizarCompra = () => {
    if (!validarDadosPagamento()) return;

    setEtapa(3);

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
    <div className={styles.checkoutContainer}>
      {etapa === 1 && (
        <div className={styles.checkoutResumo}>
          <h1 className={styles.checkoutTitulo}>Resumo da Compra</h1>
          {cart.length === 0 ? (
            <p className={styles.checkoutMensagem}>Seu carrinho está vazio!</p>
          ) : (
            <div className={styles.checkoutItens}>
              {cart.map((item) => (
                <div key={item.id} className={styles.checkoutItem}>
                  <img
                    className={styles.checkoutItemImagem}
                    src={item.imagem}
                    alt={item.nome}
                  />
                  <div className={styles.checkoutItemDetalhes}>
                    <h2 className={styles.checkoutItemNome}>{item.nome}</h2>
                    <p className={styles.checkoutItemQuantidade}>
                      Quantidade: {item.quantidade}
                    </p>
                    <p className={styles.checkoutItemPreco}>
                      Preço: R$ {item.preco}
                    </p>
                    <p className={styles.checkoutItemSubtotal}>
                      Subtotal: R$ {item.preco * item.quantidade}
                    </p>
                  </div>
                </div>
              ))}
              <h2 className={styles.checkoutTotal}>Total: R$ {total}</h2>
              <button
                className={styles.checkoutBotaoAvancar}
                onClick={() => setEtapa(2)}
              >
                Avançar para o pagamento
              </button>
            </div>
          )}
        </div>
      )}

      {etapa === 2 && (
        <div className={styles.checkoutPagamento}>
          <h1 className={styles.checkoutTitulo}>Dados de Pagamento</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              finalizarCompra();
            }}
            className={styles.checkoutForm}
          >
            <div className={styles.checkoutFormCampo}>
              <label className={styles.checkoutFormLabel}>Nome no Cartão</label>
              <input
                type="text"
                className={styles.checkoutFormInput}
                value={nomeNoCartao}
                onChange={(e) => setNomeNoCartao(e.target.value)}
                required
              />
            </div>
            <div className={styles.checkoutFormCampo}>
              <label className={styles.checkoutFormLabel}>
                Número do Cartão
              </label>
              <input
                type="text"
                className={styles.checkoutFormInput}
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                required
              />
            </div>
            <div className={styles.checkoutFormCampo}>
              <label className={styles.checkoutFormLabel}>
                Data de Validade
              </label>
              <input
                type="text"
                className={styles.checkoutFormInput}
                value={dataValidade}
                onChange={(e) => setDataValidade(e.target.value)}
                required
              />
            </div>
            <div className={styles.checkoutFormCampo}>
              <label className={styles.checkoutFormLabel}>
                Código de Segurança
              </label>
              <input
                type="text"
                className={styles.checkoutFormInput}
                value={codigoSeguranca}
                onChange={(e) => setCodigoSeguranca(e.target.value)}
                required
              />
            </div>
            {erro && <p className={styles.checkoutErro}>{erro}</p>}
            <button type="submit" className={styles.checkoutBotaoFinalizar}>
              Finalizar Compra
            </button>
          </form>
        </div>
      )}

      {etapa === 3 && (
        <div className={styles.checkoutSucesso}>
          <h1 className={styles.checkoutTitulo}>
            Compra Finalizada com Sucesso!
          </h1>
          <p className={styles.checkoutMensagem}>
            Seu pagamento foi realizado com sucesso!
          </p>
          <button
            className={styles.checkoutBotaoFinalizar}
            onClick={() => navigate("/finalizacao")}
          >
            Ir para a Finalização
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
