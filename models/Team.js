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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
        // post_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'post',
        //         key: 'id'
        //     }
        // }
        // poke_1:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
        // poke_2:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
        // poke_3:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
        // poke_4:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
        // poke_5:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
        // poke_6:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'pokemon',
        //         key: 'pokemon_id'
        //     }
        // },
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