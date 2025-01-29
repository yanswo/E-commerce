import { useNavigate } from "react-router-dom";
import styles from "./Finalizacao.module.css";

const Finalizacao = () => {
  const navigate = useNavigate();

  const handleVoltarParaHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.finalizacaoContainer}>
      <div className={styles.finalizacaoCard}>
        <div className={styles.iconContainer}>
          <svg
            className={styles.checkIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
          >
            <path
              fill="currentColor"
              d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-2-7.586l-3.707-3.707 1.414-1.414L10 12.586l6.293-6.293 1.414 1.414L10 14.414z"
            />
          </svg>
        </div>
        <h1 className={styles.finalizacaoTitulo}>
          Compra Finalizada com Sucesso!
        </h1>
        <p className={styles.finalizacaoMensagem}>
          Obrigado pela sua compra! O número do seu pedido foi enviado para o
          seu email.
        </p>
        <p className={styles.finalizacaoMensagem}>
          Caso tenha dúvidas, entre em contato conosco.
        </p>
        <button
          className={styles.finalizacaoBotao}
          onClick={handleVoltarParaHome}
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default Finalizacao;
