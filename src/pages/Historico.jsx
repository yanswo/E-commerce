import { useNavigate } from "react-router-dom";

function Historico() {
  const navigate = useNavigate();
  const historicoDeCompras =
    JSON.parse(localStorage.getItem("historicoDeCompras")) || [];

  return (
    <div>
      <h1>Histórico de Compras</h1>
      {historicoDeCompras.length === 0 ? (
        <p>Você ainda não fez nenhuma compra.</p>
      ) : (
        <div>
          {historicoDeCompras.map((compra) => (
            <div key={compra.id}>
              <h3>Pedido {compra.id}</h3>
              <p>Total: R$ {compra.total}</p>
              <button onClick={() => navigate(`/checkout`)}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;
