import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./Historico.module.css";

function Historico() {
  const { user } = useAuth();
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarHistorico = async () => {
      if (user) {
        try {
          const responseHistorico = await fetch(
            `https://api-11ed.onrender.com/historico?usuarioId=${user.id}`
          );
          const historicoData = await responseHistorico.json();

          const responseProdutos = await fetch(
            "https://api-11ed.onrender.com/produtos"
          );
          const produtosData = await responseProdutos.json();

          const historicoCompleto = historicoData.map((pedido) => ({
            ...pedido,
            produtos: pedido.produtos.map((item) => ({
              ...item,
              nome:
                produtosData.find((produto) => produto.id === item.produtoId)
                  ?.nome || "Produto não encontrado",
            })),
          }));

          setHistorico(historicoCompleto);
        } catch (error) {
          console.error("Erro ao buscar histórico:", error);
        } finally {
          setCarregando(false);
        }
      }
    };

    buscarHistorico();
  }, [user]);

  if (carregando) {
    return <div className={styles.carregando}>Carregando histórico...</div>;
  }

  if (historico.length === 0) {
    return <div className={styles.semHistorico}>Nenhum pedido encontrado.</div>;
  }

  return (
    <div className={styles.historicoContainer}>
      <h2>Meu Histórico de Compras</h2>
      {historico.map((pedido) => (
        <div key={pedido.id} className={styles.pedido}>
          <div className={styles.pedidoCabecalho}>
            <span>Pedido #{pedido.id}</span>
            <span>{new Date(pedido.data).toLocaleDateString()}</span>
            <span>Total: R$ {pedido.total.toFixed(2)}</span>
          </div>
          <div className={styles.produtos}>
            {pedido.produtos.map((item) => (
              <div key={item.produtoId} className={styles.produto}>
                <span>{item.quantidade}x</span>
                <span>{item.nome || "Produto não encontrado"}</span>
                <span>R$ {item.precoUnitario.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Historico;
