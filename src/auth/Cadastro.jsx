import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api-11ed.onrender.com/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          carrinho: [],
          wishlist: [],
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Erro ao cadastrar usuário");
      }
    } catch (error) {
      setError("Erro ao conectar ao servidor: " + error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.signupTitle}>Cadastro</h2>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nome:</label>
          <input
            type="text"
            className={styles.formInput}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            type="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Senha:</label>
          <input
            type="password"
            className={styles.formInput}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.signupError}>{error}</p>}
        <button type="submit" className={styles.signupButton}>
          Cadastrar
        </button>
      </form>
      <p className={styles.signupLink}>
        Já tem conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default Cadastro;
