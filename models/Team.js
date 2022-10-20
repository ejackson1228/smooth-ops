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
                key: 'id'
            }
        },
        poke2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'id'
            }
        },
        poke3: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'id'
            }
        },
        poke4: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'id'
            }
        },
        poke5: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'id'
            }
        },
        poke6: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pokemon',
                key: 'id'
            }
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
        modelName: 'team'
    }
);

module.exports = Team;