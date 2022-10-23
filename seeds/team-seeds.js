const { Team } = require('../models');

const teamData = [
    {
        poke1: 1,
        poke2: 2,
        poke3: 3,
        poke4: 4,
        poke5: 5,
        poke6: 6,
        post_id: 1,
        user_id: 2
    },
    {
        poke1: 7,
        poke2: 8,
        poke3: 9,
        poke4: 10,
        poke5: 11,
        poke6: 12,
        post_id: 2,
        user_id: 3
    },
    {
        poke1: 13,
        poke2: 14,
        poke3: 15,
        poke4: 16,
        poke5: 17,
        poke6: 18,
        post_id: 3,
        user_id: 4
    }
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;