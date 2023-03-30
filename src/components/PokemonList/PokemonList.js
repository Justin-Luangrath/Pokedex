import React from "react";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(props) {
  return (
    <div className="pokemon-list">
      {props.pokemon.map((p) => (
        <Pokemon
          key={p.id}
          name={p.name}
          image={p.image}
          type={p.type}
          height={p.height}
          weight={p.weight}
        />
      ))}
    </div>
  );
}

export default PokemonList;
