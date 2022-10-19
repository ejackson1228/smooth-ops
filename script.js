document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(name);

    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".pokemonBox").innerHTML = `

        <div class="pokemonInfo">
          <h3>${capitalizeFirstLetter(data.name)}</h3>
          <p>Weight: ${data.weight}</p>
        </div>`;
      })
      .catch((err) => {
        document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokemon not found</h4>
        `;
        console.log("Pokemon gone", err);
      });
  
    e.preventDefault();
  }