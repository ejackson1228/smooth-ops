const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');
const Pokemon = require('./Pokemon');
const Team = require('./Team');

// User relationships
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
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

//Pokemon Relationships
// Pokemon.belongsToMany(Team, { //needs through relationship otherwise server wont start and seeds wont work
//     foreignKey: 'pokemon_id'
// });

//Team relationships
Team.belongsTo(Post, {
    foreignKey: 'post_id'
});

Team.hasMany(Pokemon, {
    foreignKey: 'pokemon_id'
});

//Post relationships
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

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

Post.hasOne(Team, {  //post has one poke-team
    foreignKey: 'pokemon_team'
});

//Comment relationshps
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

module.exports = { User, Pokemon, Team, Post, Vote, Comment };