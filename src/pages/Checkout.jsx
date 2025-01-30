import styles from "./Checkout.module.css";
import CartContext from "../context/CartContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importe o AuthContext

function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useAuth(); // Acesse o usuário logado
  const navigate = useNavigate();
  const [nomeNoCartao, setNomeNoCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const [erro, setErro] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  // Máscara para número de cartão
  const handleNumeroCartaoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setNumeroCartao(valor.slice(0, 16));
  };

  // Máscara para data de validade
  const handleDataValidadeChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 2) {
      setDataValidade(valor);
    } else {
      setDataValidade(valor.slice(0, 2) + "/" + valor.slice(2, 4));
    }
  };

  // Máscara para código de segurança
  const handleCodigoSegurancaChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setCodigoSeguranca(valor.slice(0, 3));
  };

  const validarDadosPagamento = () => {
    if (!nomeNoCartao || !numeroCartao || !dataValidade || !codigoSeguranca) {
      setErro("Todos os campos de pagamento são obrigatórios.");
      return false;
    }
    if (numeroCartao.length !== 16) {
      setErro("Número do cartão inválido.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(dataValidade)) {
      setErro("Data de validade inválida.");
      return false;
    }
    if (codigoSeguranca.length !== 3) {
      setErro("Código de segurança inválido.");
      return false;
    }
    setErro("");
    return true;
  };

  const salvarHistorico = async (compra) => {
    try {
      const response = await fetch("http://localhost:5000/historico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar histórico");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
      throw error;
    }
  };

  const finalizarCompra = async () => {
    if (!validarDadosPagamento()) return;
    setCarregando(true);

    try {
      const compra = {
        usuarioId: user.id,
        data: new Date().toISOString(),
        produtos: cart.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade,
          precoUnitario: item.preco,
        })),
        total: total,
      };

      await salvarHistorico(compra);
      dispatch({ type: "CLEAR_CART" });
      navigate("/finalizacao");
    } catch (error) {
      setErro("Erro ao finalizar a compra. Tente novamente." + error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      {/* Indicador de Progresso */}
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressStep} ${
            etapa >= 1 ? styles.activeStep : ""
          }`}
        >
          Resumo
        </div>
        <div
          className={`${styles.progressStep} ${
            etapa >= 2 ? styles.activeStep : ""
          }`}
        >
          Pagamento
        </div>
        <div
          className={`${styles.progressStep} ${
            etapa === 3 ? styles.activeStep : ""
          }`}
        >
          Finalização
        </div>
      </div>

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
                onChange={handleNumeroCartaoChange}
                required
              />
            </div>
            <div className={styles.checkoutFormCampo}>
              <label className={styles.checkoutFormLabel}>
                Data de Validade (MM/AA)
              </label>
              <input
                type="text"
                className={styles.checkoutFormInput}
                value={dataValidade}
                onChange={handleDataValidadeChange}
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
                onChange={handleCodigoSegurancaChange}
                required
              />
            </div>
            {erro && <p className={styles.checkoutErro}>{erro}</p>}
            <button
              type="submit"
              className={styles.checkoutBotaoFinalizar}
              disabled={carregando} // Desativa enquanto carrega
            >
              {carregando ? "Processando..." : "Finalizar Compra"}
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
