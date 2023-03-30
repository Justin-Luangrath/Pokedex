import React from "react";
import "./Header.scss";
import pokeball from "../../assets/pokeball.png";

const Header = () => {
  return (
    <header>
      <img src={pokeball} alt="Pokeball" />
      <h1>Pokédex</h1>
    </header>
  );
};

export default Header;
