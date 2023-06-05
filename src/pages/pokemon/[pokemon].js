import { useGlobalContext } from '@/context/global';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'

function Pokemon() {

    const router = useRouter();

    const {pokemon} = router.query;

    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

    useEffect(() => {
        if (pokemon) {
            getPokemon(pokemon);
        }
    }, []);

    console.log(pokemonItem);

  return (
    <div>
        {pokemonItem && 
            <div>
                <img src={pokemonItem?.sprites?.other?.home.front_default} alt=''/>
            </div>
        }
    </div>
  )
}

export default Pokemon;