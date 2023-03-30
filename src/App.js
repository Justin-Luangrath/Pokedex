import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import PokemonList from "./components/PokemonList/PokemonList";
import "./styles.scss";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [displayPokemon, setDisplayPokemon]=useState(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then((res) => {
      setPokemonList(
        res.data.results.map((p, i) => ({
          name: p.name,
          id: i + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
          }.png`,
          type: "",
          height: "",
          weight: "",
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`)
        .then((res) => {
          setDisplayPokemon({
            ...selectedPokemon,
            type: res.data.types[0].type.name,
            height: res.data.height,
            weight: res.data.weight,
          });
        });
    }
  }, [selectedPokemon]);

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];
    setSelectedPokemon(randomPokemon);
    setShowPokemon(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredPokemon = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredPokemon.length > 0) {
      setSelectedPokemon(filteredPokemon[0]);
      setShowPokemon(true);
    } else {
      setSelectedPokemon(null);
      setShowPokemon(false);
    }
  };

  const handlePokemonSelect = (id) => {
    if (id) {
      const selected = pokemonList.find((p) => p.id === id);
      setSelectedPokemon(selected);
      setShowPokemon(true);
    } else {
      setSelectedPokemon(null);
      setShowPokemon(false);
    }
  };
  return (
    <div className="App">
      <Header />
      {showPokemon && (
        <PokemonList
          pokemon={displayPokemon?[displayPokemon]:pokemonList}
        />
      )}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleRandomClick}>Scan Pokemon</button>
      <select onChange={(e) => handlePokemonSelect(parseInt(e.target.value))}>
        <option value="">Pokemon List</option>
        {pokemonList.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );

}

export default App;
