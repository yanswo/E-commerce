import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";
import styles from "./WishlistDropdown.module.css";

function WishlistDropdown() {
  const { wishlist, dispatch } = useContext(WishlistContext);

  const removerDaWishlist = (produto) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: produto });
  };

  return (
    <div className={styles.dropdown}>
      <h2>Sua Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Sua lista de desejos está vazia</p>
      ) : (
        <div className={styles.produtos}>
          {wishlist.map((produto) => (
            <div key={produto.id} className={styles.produto}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                className={styles.produtoImagem}
              />
              <div className={styles.produtoInfo}>
                <h3>{produto.nome}</h3>
                <p>R$ {produto.preco}</p>
                <button onClick={() => removerDaWishlist(produto)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistDropdown;
