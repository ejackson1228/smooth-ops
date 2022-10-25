const { Post } = require('../models');

const postData = [
    {
        title: 'Gotta Catch em All!',
        description: 'This is the BEST dream team',
        pokemon_team: 1,
        user_id: 2
    },
    {
        title: 'I am going to defeat Ash with this team!',
        description: 'MY dream team is the BEST dream team. Forget Ash!',
        pokemon_team: 2,
        user_id: 3
    },
    {
        title: 'This team will beat both Gary and Ash!',
        description: 'Those boys need some humbling!',
        pokemon_team: 3,
        user_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;