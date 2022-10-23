const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        poke1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        },
        poke2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        },
        poke3: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        },
        poke4: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        },
        poke5: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        },
        poke6: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'pokemon_id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'team'
    }
);

module.exports = Team;