import React, { useState, useEffect } from 'react';
import PokemonItem from './PokemonItem';

const PokemonContainer = (props) => {

  const { addPoint, lose } = props;
  const [guesses, setGuesses] = useState([]);

  const [cardChoices, setCardChoices] = useState(props.cardChoices)

  const attemptAnswer = (pokemonName) => {
    const newValues = [...guesses, pokemonName];

    if (guesses.includes(pokemonName)) {
      setGuesses([]);
      lose();
    } else {
      setGuesses(newValues)
      addPoint();
      setCardChoices(getShuffledCards());
    }
  }

  useEffect(() => {
    setCardChoices(props.cardChoices);
  }, [props.cardChoices])


  const getShuffledCards = () => {
    let shuffledCards = [];
    let copyCardChoices = cardChoices.slice(0)
    do {
      const randomIndex = Math.floor(Math.random() * copyCardChoices.length)

      shuffledCards.push(copyCardChoices.splice(randomIndex, 1)[0]);
    } while (copyCardChoices.length >= 1)
    return shuffledCards;
  }

  const renderPokemonItems = () => {
    return cardChoices.map((pokemonItem) => {
      return <PokemonItem key={pokemonItem.name} pokemonData={pokemonItem} attemptAnswer={attemptAnswer} />
    });
  }


  return (
    <div className='pokemon-container'>
      <h2>Here are the pokemon</h2>
      <ul>
        {renderPokemonItems()}
      </ul>
    </div>
  )
}

export default PokemonContainer;