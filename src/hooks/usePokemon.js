import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemon = (url) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
              setLoading(true);
              const response = await axios.get(url);
              console.log('Response inicial:', response.data);
              const results = await Promise.all(
                response.data.results.map(async (pokemon) => {
                  const details = await axios.get(pokemon.url);
                  return details.data;
                })
              );
              console.log(results);
              setPokemons(results);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };

        fetchPokemons();
    }, [url]);

    return {pokemons, loading, error};
}