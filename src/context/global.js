import React, { createContext, useContext, useEffect, useReducer, useState } from "react"

const GlobalContext = createContext();

// actions
const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

const reducer = (state, action) => {

    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        
        case GET_ALL_POKEMON: 
            return {...state, allPokemon: action.payload, loading: false};

        case GET_POKEMON: 
            return {...state, pokemon: action.payload, loading: false};
    };

    return state;
};

export const GlobalProvider = ({ children }) => {

    // base url
    const baseUrl = 'https://pokeapi.co/api/v2/';

    const initialState = {
        allPokemon: [],
        pokemon: {},
        pokemonDatabase: [],
        searchResults: [],
        next: "",
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);

    const allPokemon = async () => {
        dispatch({type: "LOADING"});

        const res = await fetch (`${baseUrl}pokemon?limit=20`);
        const data = await res.json();
        dispatch({ type: "GET_ALL_POKEMON", payload: data.results});

        //fetch character data
        const allPokemonData = [];

        for(const pokemon of data.results) {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            allPokemonData.push(pokemonData);
        }


        setAllPokemonData(allPokemonData);
    };

    //get Pokemon
    const getPokemon = async (name) => {
        dispatch({ type: "LOADING" });

        const res = await fetch(`${baseUrl}pokemon/${name}`);
        const data = await res.json();

        dispatch({ type: "GET_POKEMON", payload: data });
    }

    useEffect(() => {
        allPokemon();
    }, []);

    return (
        <GlobalContext.Provider value ={{
            ...state,
            allPokemonData,
            getPokemon,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}