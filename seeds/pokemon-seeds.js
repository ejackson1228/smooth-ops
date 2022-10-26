const { Pokemon } = require('../models');

const seedPokemon = async() => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1154`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(allPokeInfo => {
            console.log(allPokeInfo);
            allPokeInfo.results.forEach(poke => {
                const pokemon_name = poke.name
                const pokemon_url = poke.url
                Pokemon.create({
                    name: pokemon_name,
                    url: pokemon_url
                })
            });
        });
    
};

module.exports = seedPokemon;