const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        poke1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poke2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        poke3: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        poke4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        poke5: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        poke6: {
            type: DataTypes.STRING,
            allowNull: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        timestamps: false,
        modelName: 'pokemon'
    }
);

module.exports = Pokemon;