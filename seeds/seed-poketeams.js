const { PokeTeam } = require('../models');

const pokeTeamData = [
    {
        pokemon_id: 1,
        team_id: 1
    },
    {
        pokemon_id: 2,
        team_id: 1
    },
    {
        pokemon_id: 3,
        team_id: 1
    },
    {
        pokemon_id: 4,
        team_id: 1
    },
    {
        pokemon_id: 5,
        team_id: 1
    },
    {
        pokemon_id: 6,
        team_id: 1
    }
];

const seedPokeTeam = () => PokeTeam.bulkCreate(pokeTeamData);

module.exports = seedPokeTeam;