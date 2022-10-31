const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            // onDelete: 'cascade' //if user is deleted, their comments will be deleted as well
        },
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            },
            // onDelete: 'cascade' //if post is deleted, comments for post will be deleted
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;