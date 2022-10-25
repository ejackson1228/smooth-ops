const seedUsers = require('./seed-users');
const seedPokemon = require('./pokemon-seeds');
const seedPosts = require('./seed-posts');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');
const seedPokeTeam  = require('./seed-poketeams');

const sequelize = require('../config/connection');
const seedTeams = require('./team-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedPokemon();
    console.log('\n----- POKEMON SEEDED -----\n');
    
    await seedTeams();;
    console.log('\n----- TEAMS SEEDED -----\n');

    await seedPokeTeam();
    console.log('\n----- POKETEAMS SEEDED -----\n');
    
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    // await seedVotes();
    // console.log('\n----- VOTES SEEDED -----\n');

    process.exit(0);
};

seedAll();