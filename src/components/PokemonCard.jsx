import PropTypes from 'prop-types';

// Função para obter o gradiente suave com base no tipo
const getTypeGradient = (type) => {
  const gradients = {
    fire: 'linear-gradient(to bottom, #FF7043, #FFCC80)', // Gradiente de laranja
    water: 'linear-gradient(to bottom, #42A5F5, #81D4FA)', // Gradiente azul
    grass: 'linear-gradient(to bottom, #81C784, #C8E6C9)', // Gradiente verde
    electric: 'linear-gradient(to bottom, #FFEB3B, #FFEE58)', // Gradiente amarelo
    psychic: 'linear-gradient(to bottom, #F06292, #F8BBD0)', // Gradiente rosa
    bug: 'linear-gradient(to bottom, #A5D6A7, #C8E6C9)', // Gradiente verde claro
    dragon: 'linear-gradient(to bottom, #64B5F6, #BBDEFB)', // Gradiente azul claro
    ghost: 'linear-gradient(to bottom, #B39DDB, #D1C4E9)', // Gradiente roxo claro
    fairy: 'linear-gradient(to bottom, #F48FB1, #F8BBD0)', // Gradiente rosa claro
    normal: 'linear-gradient(to bottom, #B0BEC5, #CFD8DC)', // Gradiente cinza claro
  };
  return gradients[type] || 'linear-gradient(to bottom, #E0E0E0, #B0BEC5)'; // Gradiente padrão
};

const PokemonCard = ({ pokemon }) => {
  const type = pokemon.types?.[0]?.type?.name || 'normal'; // Pega o primeiro tipo do Pokémon ou 'normal' se não houver
  const backgroundGradient = getTypeGradient(type);

  return (
    <div className="card text-center shadow-sm" style={{ minHeight: '250px', background: backgroundGradient }}>
      {pokemon.sprites?.front_default ? (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="card-img-top rounded-circle mx-auto mt-3"
          style={{ width: '100px', height: '100px' }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded-circle mx-auto mt-3"
          style={{ width: '100px', height: '100px' }}
        >
          <span className="fs-3 fw-bold">{pokemon.name.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
        <div>
          {pokemon.abilities.map((ability, index) => (
            <span 
              key={index} 
              className="badge bg-secondary me-1 mb-1"
            >
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      })
    ),
  }).isRequired,
};

export default PokemonCard;
