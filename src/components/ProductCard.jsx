/* eslint-disable react/prop-types */
import { useContext } from "react";
import CartContext from "../context/CartContext";
import styles from "./ProductCard.module.css";

function ProductCard({ produto }) {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: produto,
    });
  };

  return (
    <div className={styles.card}>
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
      <p>R${produto.preco}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductCard;
