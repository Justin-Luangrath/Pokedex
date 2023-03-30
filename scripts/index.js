// Search bar
const searchPokemon = (event) => {
  event.preventDefault();
  const pokedex = document.getElementById("pokedex-data");
  const pokemonName = event.target.elements[0].value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const specialMoves = data.moves
        .slice(0, 2)
        .map((move) => move.move.name)
        .join(", ");
      const pokemonType = data.types.map((type) => type.type.name).join(", ");
      pokedex.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <ul>
          <li>Pokédex number: ${data.id}</li>
          <li>Weight: ${data.weight}</li>
          <li>Height: ${data.height}</li>
          <li>Type: ${pokemonType}</li>
          <li>Special moves: ${specialMoves}</li>
        </ul>
      `;
    })
    .catch((error) => console.error(error));
};

// Scan pokemon
const generatePokemon = () => {
  const pokedex = document.getElementById("pokedex-data");
  const pokemonId = Math.floor(Math.random() * 807) + 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      const specialMoves = data.moves
        .slice(0, 2)
        .map((move) => move.move.name)
        .join(", ");
      const pokemonType = data.types.map((type) => type.type.name).join(", ");
      pokedex.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <img src="${data.sprites.back_default}" alt="${data.name}">
        <ul>
          <li>Pokédex number: ${data.id}</li>
          <li>Weight: ${data.weight}</li>
          <li>Height: ${data.height}</li>
          <li>Type: ${pokemonType}</li>
          <li>Special moves: ${specialMoves}</li>
        </ul>
      `;
    })
    .catch((error) => console.error(error));
};

document
  .getElementById("pokemon-search")
  .addEventListener("submit", searchPokemon);
document
  .getElementById("generate-pokemon")
  .addEventListener("click", generatePokemon);

// Drop down list
const generateOptions = (data) => {
  const select = document.getElementById("pokemon-select");
  data.forEach((pokemon) => {
    const option = document.createElement("option");
    option.value = pokemon.name;
    option.text = pokemon.name;
    select.appendChild(option);
  });
};

fetch("https://pokeapi.co/api/v2/pokemon?limit=807")
  .then((response) => response.json())
  .then((data) => {
    generateOptions(data.results);
  })
  .catch((error) => console.error(error));

const displayPokemon = (event) => {
  const pokedex = document.getElementById("pokedex-data");
  const pokemonName = event.target.value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      const specialMoves = data.moves
        .slice(0, 4)
        .map((move) => move.move.name)
        .join(", ");
      pokedex.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <img src="${data.sprites.back_default}" alt="${data.name}">
        <ul>
          <li>Weight: ${data.weight}</li>
          <li>Height: ${data.height}</li>
          <li>Pokédex number: ${data.id}</li>
          <li>Special moves: ${specialMoves}</li>
        </ul>
      `;
    })
    .catch((error) => console.error(error));
};

document
  .getElementById("pokemon-select")
  .addEventListener("change", displayPokemon);
