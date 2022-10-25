const { User } = require('../models');

const userData = [
    {
        email: 'test@gmail.com',
        trainer_name: 'test',
        password: 'password'
    },
    {
        email: 'ash@mail.com',
        trainer_name: 'Ash',
        password: 'gold'
    },
    {
        email: 'gary@mail.com',
        trainer_name: 'Gary',
        password: 'silver'
    },
    {
        email: 'amy@mail.com',
        trainer_name: 'amy',
        password: 'yellow'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;