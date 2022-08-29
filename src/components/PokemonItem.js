import React from 'react';

const PokemonItem = (props) => {
  const { pokemonData, attemptAnswer } = props;

  return (
    <li className='pokemon-item hover'
      onClick={() => attemptAnswer(pokemonData.name)}>
      <img src={pokemonData.front_default} />
    </li>
  )
}

export default PokemonItem;