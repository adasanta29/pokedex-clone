import { useGlobalContext } from "@/context/global"
import Router from "next/router";
import { useState } from "react";

export default function Home() {
  const {allPokemonData, searchResults, getPokemon, loading, realTimeSearch, next} = useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);

    realTimeSearch(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return <div 
      key={pokemon.id} 
      onClick={() => {Router.push(`/pokemon/${pokemon.name}`)}}
      className="pokemon-name"
      >
        {pokemon.name}
      </div>;
    });
  };

  return (
      <main>
        <form className="search-form" action="" onSubmit={handleSearch}>
          <div className="input-control">
            <input 
              type="text" 
              value={search} 
              onChange={handleChange} 
              placeholder="Search Pokemon..."
            />
            <button className="submit-btn" type="submit">
              Search
            </button>
          </div>
        </form>

        {search && searchResults.length > 0 && <div className="search__results">{displaySearchResults()}</div>}

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

        <div className="next">
          { allPokemonData.length > 0 && (
            <button className="next-btn" onClick={next}>
              Load More &darr;
            </button>
            )}
        </div>
      </main>
  )
}
