import { useState, useRef } from "react";
import { usePokemon } from "../hooks/usePokemon";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/pokemonCard";
import pokemon from "../assets/logo.webp";
import "./style.css";
import { BsExclamationCircle } from "react-icons/bs";

const PokemonList = () => {
  const { pokemons, loading, error } = usePokemon(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [search, setSearch] = useState("");
  const listRef = useRef(null);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!listRef.current) return;

    const items = listRef.current.querySelectorAll(".pokemon-item");
    const active = document.activeElement;
    const currentIndex = Array.from(items).indexOf(active);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[currentIndex + 1] || items[0];
      next.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[currentIndex - 1] || items[items.length - 1];
      prev.focus();
    }
  };

  if (loading) {
    return (
      <div className="loading-container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="spinner-border" role="status"></div>
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  if (error) return <p>Erro ao carregar os dados: {error}</p>;

  return (
    <div onKeyDown={handleKeyDown} className="container p-4">
      <div className="d-flex align-items-center justify-content-center">
        <img src={pokemon} alt="Logo Pokéapi" width={200} />
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      <div ref={listRef} className="row gy-4 mt-3">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-item col-12 col-sm-6 col-md-4 col-lg-3 card-focusable"
              tabIndex={0}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p
              className="d-flex align-items-center justify-content-center fs-5"
              style={{ fontSize: "18px", color: "#555" }}
            >
              <BsExclamationCircle size={20} className="me-2" />
              Pokémon não encontrado!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
