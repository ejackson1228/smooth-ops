const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');
const PokeTeam = require('./PokeTeam');


Pokemon.belongsToMany(Team,{
    foreignKey: 'pokemon_id',
    through: 'poketeam'
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
    onDelete: 'cascade'
});

User.hasMany(Team, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})


Team.belongsToMany(Pokemon, {
    foreignKey: 'team_id',
    through: 'poketeam'
});

Team.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Team.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})
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

Post.hasOne(Team, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

// Comment relationshps
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});


// Vote relationships
Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

module.exports = { User, Pokemon, Team, Post, Vote, Comment, PokeTeam };
