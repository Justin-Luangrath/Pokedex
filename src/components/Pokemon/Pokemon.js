import React from "react";
import "./Pokemon.scss";

function Pokemon(props) {
  // console.log(props);
  return (
    <div className="pokemon-card">
      <h2>{props.name}</h2>
      <img className="pokemon-card__img"src={props.image} alt={props.name} />
      <p>Type: {props.type}</p>
      <p>Height: {props.height}</p>
      <p>Weight: {props.weight}</p>
    </div>
  );
}

export default Pokemon;
