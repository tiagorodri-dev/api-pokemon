import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card text-center shadow-sm">
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
  }).isRequired,
};

export default PokemonCard;
