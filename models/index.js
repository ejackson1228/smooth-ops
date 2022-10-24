const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');

// User Post relationships One to Many
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//User Team Relationship One to Many
User.hasMany(Team, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Team.belongsTo(User,{
    foreignKey: 'user_id'
});

//Team will have Poke Id and User Id
User.belongsToMany(Pokemon,{
    through: Team
});
Pokemon.belongsToMany(User,{
    through: Team
});

// Team to Pokemon Relationship
Team.hasMany(Pokemon,{
    foreignKey: 'team_id',
    onDelete: 'CASCADE'
});
Pokemon.belongsTo(Team,{
    foreignKey: 'team_id'
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

// Pokemon Relationships
// Commented this out because it breaks the code
// Pokemon.belongsToMany(Team, {
//     foreignKey: 'pokemon_id'
// });

// Team relationships
Team.belongsTo(Post, {
    foreignKey: 'post_id'
});

Team.hasMany(Pokemon, {
    foreignKey: 'pokemon_id'
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

Post.hasOne(Team, {  //post has one poke-team
    foreignKey: 'pokemon_team'
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

module.exports = { User, Pokemon, Team, Post, Vote, Comment };
