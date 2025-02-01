/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import styles from "./Produtos.module.css";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function Produtos({ handleSearch }) {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [availability, setAvailability] = useState("");
  const [isOnSale, setIsOnSale] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNew, setIsNew] = useState("");
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch("https://api-11ed.onrender.com/produtos");
      const data = await response.json();
      setProdutos(data);
      setFilteredProdutos(data);

      const uniqueCategories = [
        ...new Set(data.map((produto) => produto.categoria)),
      ];
      setCategories(uniqueCategories);

      const query = new URLSearchParams(location.search).get("search");
      if (query) {
        filterBySearchQuery(query);
      }
    };

    fetchProdutos();
  }, [location.search]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      setSearchQuery(query);
      filterBySearchQuery(query);
    }
  }, [location.search, produtos]);

  const filterBySearchQuery = (query) => {
    const filtered = produtos.filter((produto) => {
      if (produto && produto.nome && typeof produto.nome === "string") {
        return produto.nome.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
    setFilteredProdutos(filtered);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProdutos(produtos);
    } else {
      let filtered = [...produtos];
      filtered = filtered.filter((produto) => produto.categoria === category);
      setFilteredProdutos(filtered);
    }
  };

  const filterByRating = (rating) => {
    setSelectedRating(rating);
    if (rating === "") {
      setFilteredProdutos(produtos);
    } else {
      let filtered = [...produtos];
      filtered = filtered.filter((produto) => produto.avaliacao >= rating);
      setFilteredProdutos(filtered);
    }
  };

  const sortByPrice = (order) => {
    setPriceOrder(order);
    let filtered = [...produtos];
    if (order === "") {
      setFilteredProdutos(produtos);
    } else if (order === "asc") {
      filtered.sort((a, b) => a.preco - b.preco);
    } else if (order === "desc") {
      filtered.sort((a, b) => b.preco - a.preco);
    }
    setFilteredProdutos(filtered);
  };

  const filterByAvailability = (isAvailable) => {
    setAvailability(isAvailable);
    if (isAvailable === "") {
      setFilteredProdutos(produtos);
    } else {
      let filtered = [...produtos];
      filtered = filtered.filter(
        (produto) => produto.disponibilidade === isAvailable
      );
      setFilteredProdutos(filtered);
    }
  };

  const filterBySale = (isOnSale) => {
    setIsOnSale(isOnSale);
    if (isOnSale === "") {
      setFilteredProdutos(produtos);
    } else {
      let filtered = [...produtos];
      filtered = filtered.filter((produto) => produto.emPromocao === isOnSale);
      setFilteredProdutos(filtered);
    }
  };

  const filterByNew = (isNew) => {
    setIsNew(isNew);
    if (isNew === "") {
      setFilteredProdutos(produtos);
    } else {
      let filtered = [...produtos];
      filtered = filtered.filter((produto) => produto.novidade === isNew);
      setFilteredProdutos(filtered);
    }
  };
  return (
    <div className={styles.Produtos}>
      <h2>Produtos</h2>
      <div className={styles.produtoContainer}>
        <Header
          user={user}
          logout={logout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          produtos={produtos}
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
              onChange={(e) =>
                filterByAvailability(
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : ""
                )
              }
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
              onChange={(e) =>
                filterBySale(
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : ""
                )
              }
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
              onChange={(e) =>
                filterByNew(
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : ""
                )
              }
            >
              <option value="">Todas</option>
              <option value="true">Novidade</option>
              <option value="false">Não é Novidade</option>
            </select>
          </div>
        </div>

        <div className={styles.produtos}>
          {filteredProdutos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
