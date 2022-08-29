import React, { useState, useEffect } from 'react';
import PokemonContainer from './PokemonContainer';

const PlayArea = (props) => {
  const { pokemonCollection } = props;
  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(1);

  const NUM_POKEMON_TO_CHOOSE = 10;

  const addPoint = () => {
    setPoints(points + 1);
  }

  const lose = () => {
    console.log('you lose')
    resetGame()
    console.log('should render ')
  }

  const resetGame = () => {
    setPoints(0);
    setRound(1);
    setArrayOfCurrentPokemon(getRandomArrayOfNPokemon(NUM_POKEMON_TO_CHOOSE));
  }

  const getRandomArrayOfNPokemon = (numberOfItems) => {
    if (numberOfItems > pokemonCollection.length) {
      numberOfItems = pokemonCollection.length;
    }

    let outputArray = [];
    let indexesUsed = [];
    let randomIndex;

    for (let i = 1; i <= numberOfItems; i++) {
      do {
        randomIndex = Math.floor(Math.random() * pokemonCollection.length);
      } while (indexesUsed.includes(randomIndex))

      indexesUsed.push(randomIndex);
      outputArray.push(pokemonCollection[randomIndex]);
    }
    return outputArray;
  }

  const [arrayOfCurrentPokemon, setArrayOfCurrentPokemon] = useState(getRandomArrayOfNPokemon(NUM_POKEMON_TO_CHOOSE));

  return (
    <div className='play-area'>
      <h1>Game</h1>
      <h3>Round: {round}</h3>
      <div>{`Points: ${points}`}</div>
      <PokemonContainer
        cardChoices={arrayOfCurrentPokemon}
        addPoint={addPoint}
        lose={lose}
      />
    </div>
  )
}

export default PlayArea;