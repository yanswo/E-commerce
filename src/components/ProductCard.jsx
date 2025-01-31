/* eslint-disable react/prop-types */
import { useContext } from "react";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import styles from "./ProductCard.module.css";

function ProductCard({ produto }) {
  const { dispatch: dispatchCart } = useContext(CartContext);
  const { wishlist, dispatch: dispatchWishlist } = useContext(WishlistContext);

  const handleAddToCart = () => {
    dispatchCart({
      type: "ADD_TO_CART",
      payload: produto,
    });
  };

  const handleWishlistToggle = () => {
    const isInWishlist = wishlist.find((item) => item.id === produto.id);
    if (isInWishlist) {
      dispatchWishlist({ type: "REMOVE_FROM_WISHLIST", payload: produto });
    } else {
      dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: produto });
    }
  };

  return (
    <div className={styles.card}>
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
      <p>R${produto.preco}</p>
      <div className={styles.buttonCart}>
        <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      </div>
      <div className={styles.wishlistButton}>
        <button
          onClick={handleWishlistToggle}
          className={styles.wishlistButton}
        >
          {wishlist.find((item) => item.id === produto.id) ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
