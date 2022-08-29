import React, { useEffect, useState } from 'react';
import PlayArea from './PlayArea';
const Game = (props) => {

  const [pokemonCollection, setPokemonCollection] = useState([]);
  const POKEMON_COLLLECTION_STRING = 'pokemonCollection';
  const API_BASE = 'https://pokeapi.co/api/v2/pokemon?';
  const LIMIT = '151';

  const initialize = async () => {
    if (!getPokemonCollectionCachedFromLocalStorage()) {
      console.log('make api call')
      const dataFromApi = await fetchPokemonDataFromApi();
      savePokemonDatatoLocalStorage(dataFromApi);
    }
    setPokemonCollection(JSON.parse(getPokemonCollectionCachedFromLocalStorage()));
  }

  useEffect(() => {
    initialize()
  }, []);

  const savePokemonDatatoLocalStorage = (newPokemonData) => {
    localStorage.setItem(POKEMON_COLLLECTION_STRING, JSON.stringify(newPokemonData))
  }

  const fetchPokemonDataFromApi = async () => {
    let pokemonNamesAndApiPointsArray = await getArrayOfPokemonNamesAndApiPoints();
    const pokemonWithImageLinksArray = await getPokemonImages(pokemonNamesAndApiPointsArray);
    return pokemonWithImageLinksArray;
  }

  const getPokemonCollectionCachedFromLocalStorage = () => localStorage.getItem(POKEMON_COLLLECTION_STRING);

  const getArrayOfPokemonNamesAndApiPoints = async () => {
    const newPokemonCollection = await fetchPokemonNamesAndApiPoints();
    return new Promise((resolve, reject) => {
      resolve(newPokemonCollection);
    });


  }

  const fetchPokemonNamesAndApiPoints = async () => {
    const response = await fetch(`${API_BASE}limit=${LIMIT}`)
    const data = await response.json();
    savePokemonCollectionToLocalStorage(JSON.stringify(data.results));
    setPokemonCollection(data.results)
    return new Promise((resolve, reject) => {
      resolve(data.results)
    });
  }

  const getPokemonImages = async (collection) => {
    let outputArray = []
    let promises = collection.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      const { front_default } = data.sprites;
      return { ...pokemon, front_default }
    })

    const promiseResults = Promise.all(promises);
    (await promiseResults).forEach(pokemonInfo => {
      outputArray.push(pokemonInfo);
    })

    return new Promise((resolve, reject) => {
      resolve(outputArray);
    })
  }

  const savePokemonCollectionToLocalStorage = (pokemonCollection) => {
    localStorage.setItem(POKEMON_COLLLECTION_STRING, pokemonCollection)
  }

  if (!pokemonCollection || pokemonCollection.length < 1) { return <div>Loading...</div> }

  return (
    <div>
      <PlayArea pokemonCollection={pokemonCollection} />
    </div>
  )
}

export default Game;