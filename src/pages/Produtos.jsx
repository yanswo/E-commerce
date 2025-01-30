/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import styles from "./Produtos.module.css";
import { useAuth } from "../context/AuthContext";

function Produtos({ searchQuery, setSearchQuery, handleSearch }) {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [categories, setCategories] = useState([]); // Para armazenar as categorias
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selecionada
  const [selectedRating, setSelectedRating] = useState(""); // Avaliação selecionada
  const [priceOrder, setPriceOrder] = useState(""); // Ordenação por preço
  const [availability, setAvailability] = useState(""); // Disponibilidade
  const [isOnSale, setIsOnSale] = useState(""); // Promoção
  const [isNew, setIsNew] = useState(""); // Novidade
  const { user, logout } = useAuth();
  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch("http://localhost:5000/produtos");
      const data = await response.json();
      setProdutos(data);
      setFilteredProdutos(data);

      // Para preencher as categorias (supondo que os produtos tenham a propriedade 'categoria')
      const uniqueCategories = [
        ...new Set(data.map((produto) => produto.categoria)),
      ];
      setCategories(uniqueCategories);
    };

    fetchProdutos();
  }, []);

  // Função para filtrar os produtos por categoria
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    let filtered = [...produtos];
    if (category) {
      filtered = filtered.filter((produto) => produto.categoria === category);
    }
    setFilteredProdutos(filtered);
  };

  // Função para filtrar por rating
  const filterByRating = (rating) => {
    setSelectedRating(rating);
    let filtered = [...produtos];
    if (rating) {
      filtered = filtered.filter((produto) => produto.avaliacao >= rating);
    }
    setFilteredProdutos(filtered);
  };

  // Função para ordenar por preço
  const sortByPrice = (order) => {
    setPriceOrder(order);
    let filtered = [...produtos];
    if (order === "asc") {
      filtered.sort((a, b) => a.preco - b.preco);
    } else if (order === "desc") {
      filtered.sort((a, b) => b.preco - a.preco);
    }
    setFilteredProdutos(filtered);
  };

  // Função para filtrar por disponibilidade
  const filterByAvailability = (isAvailable) => {
    setAvailability(isAvailable);
    let filtered = [...produtos];
    if (isAvailable) {
      filtered = filtered.filter((produto) => produto.disponibilidade === true);
    }
    setFilteredProdutos(filtered);
  };

  // Função para filtrar por "em promoção"
  const filterBySale = (isOnSale) => {
    setIsOnSale(isOnSale);
    let filtered = [...produtos];
    if (isOnSale) {
      filtered = filtered.filter((produto) => produto.emPromocao === true);
    }
    setFilteredProdutos(filtered);
  };

  // Função para filtrar por "novidade"
  const filterByNew = (isNew) => {
    setIsNew(isNew);
    let filtered = [...produtos];
    if (isNew) {
      filtered = filtered.filter((produto) => produto.novidade === true);
    }
    setFilteredProdutos(filtered);
  };

  return (
    <div className={styles.produtoContainer}>
      <Header
        user={user}
        logout={logout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <div className={styles.filters}>
        <h3>Filtros</h3>

        <div>
          <label>Categorias</label>
          <select
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Avaliação (Estrelas)</label>
          <select
            value={selectedRating}
            onChange={(e) => filterByRating(e.target.value)}
          >
            <option value="">Todas</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Estrelas
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Ordenar por Preço</label>
          <select
            value={priceOrder}
            onChange={(e) => sortByPrice(e.target.value)}
          >
            <option value="">Nenhuma</option>
            <option value="asc">Menor para Maior</option>
            <option value="desc">Maior para Menor</option>
          </select>
        </div>

        <div>
          <label>Disponibilidade</label>
          <select
            value={availability}
            onChange={(e) => filterByAvailability(e.target.value === "true")}
          >
            <option value="">Todas</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>
        </div>

        <div>
          <label>Em Promoção</label>
          <select
            value={isOnSale}
            onChange={(e) => filterBySale(e.target.value === "true")}
          >
            <option value="">Todas</option>
            <option value="true">Em Promoção</option>
            <option value="false">Não está em Promoção</option>
          </select>
        </div>

        <div>
          <label>Novidade</label>
          <select
            value={isNew}
            onChange={(e) => filterByNew(e.target.value === "true")}
          >
            <option value="">Todas</option>
            <option value="true">Novidade</option>
            <option value="false">Não é Novidade</option>
          </select>
        </div>
      </div>

      <div className={styles.produtos}>
        <h2>Produtos</h2>
        {filteredProdutos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

export default Produtos;
