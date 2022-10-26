const { Team } = require('../models');

const teamData = [
    {
        user_id: 2,
        post_id: 1
    },
    {
        user_id: 3,
        post_id: 2
    },
    {
        user_id: 4,
        post_id: 3
    }
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;