const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');
const PokeTeam = require('./PokeTeam');


Pokemon.belongsToMany(Team,{
    foreignKey: 'pokemon_id',
    through: PokeTeam
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Vote, {
    foreignKey: 'user_id',
});

User.hasMany(Team, {
    foreignKey: 'user_id'
})


Team.belongsToMany(Pokemon, {
    foreignKey: 'team_id',
    through: PokeTeam
});

Team.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post relationships

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment relationshps
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


// Vote relationships
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});


// User Post relationships One to Many
//User Team Relationship One to Many
// User.hasMany(Team, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

// Team.belongsTo(User,{
//     foreignKey: 'user_id'
// });

//Team will have Poke Id and User Id
// User.belongsToMany(Pokemon,{
//     through: Team
// });
// Pokemon.belongsToMany(User,{
//     through: Team
// });

// Team to Pokemon Relationship
// Team.hasMany(Pokemon,{
//     foreignKey: 'team_id',
//     onDelete: 'CASCADE'
// });
// Post.hasOne(Team, {  //post has one poke-team
//     foreignKey: 'pokemon_team'
// });
// Pokemon Relationships
// Commented this out because it breaks the code
// Pokemon.belongsToMany(Team, {
//     foreignKey: 'pokemon_id',
//     through: PokeTeam
// });

// Team relationships
// Team.belongsTo(Post, {
//     foreignKey: 'post_id'
// });

module.exports = { User, Pokemon, Team, Post, Vote, Comment, PokeTeam };
