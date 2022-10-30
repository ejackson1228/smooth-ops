const { Model, DataTypes } =  require('sequelize');
const sequelize = require('../config/connection');

class PokeTeam extends Model {}

PokeTeam.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'pokemon',
                key: 'id'
            }
        },
        team_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'team',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        timestamps: false,
        modelName: 'poketeam'
    }
)

module.exports = PokeTeam