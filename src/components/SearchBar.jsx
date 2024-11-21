import PropTypes from "prop-types";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ search, setSearch }) => {
  const inputRef = useRef(null);

  const handleShortcut = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="input-group mt-4">
      <span className="input-group-text">
        <BsSearch />
      </span>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Pesquisar Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;
