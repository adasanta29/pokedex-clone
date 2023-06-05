import { useGlobalContext } from "@/context/global"
import Router from "next/router";

export default function Home() {
  const {allPokemonData} = useGlobalContext();

  return (
      <main>
        <div className="all__pokemon">
          {allPokemonData ? allPokemonData.map((pokemon) => {
            return (
              <div key={pokemon.id} className="card" onClick={() => {
                Router.push(`/pokemon/${pokemon.name}`)
              }}>
                <div className="card__image">
                  <img 
                    src={pokemon.sprites.other.home.front_shiny} 
                    alt={pokemon.name}
                  />
                </div>
                <div className="card__body">
                  <h3>{pokemon.name}</h3>
                  <p>More Details &nbsp; &rarr;</p>
                </div>
              </div>
            );
          }) : <h1>Loading...</h1>}
        </div>
      </main>
  )
}
