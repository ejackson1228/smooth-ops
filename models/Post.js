const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'title',
                    'description',
                    'pokemon_team',
                    'created_at',
                    [
                        sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            })
        })
    }
};

Post.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        // pokemon_team: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'team',
        //         key: 'id'
        //     }
        // },
        user_id: {
            type: DataTypes.BIGINT,
            // allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;