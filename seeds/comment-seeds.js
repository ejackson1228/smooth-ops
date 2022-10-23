const { Comment } = require('../models');

const commentData = [
    {
        text: 'Yeah right!',
        user_id: 3,
        post_id: 3
    },
    {
        text: 'You wish!',
        user_id: 2,
        post_id: 3
    },
    {
        text: 'GRRR!',
        user_id: 3,
        post_id: 1
    },
    {
        text: 'Lets battle then!',
        user_id: 4,
        post_id: 1
    },
    {
        text: 'You dont stand a chance!',
        user_id: 2,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;