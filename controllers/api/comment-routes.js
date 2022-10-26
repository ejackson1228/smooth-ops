const router = require('express').Router()
const { Comment, Post, User } = require('../../models');


//read all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'text', 'user_id', 'post_id']
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


//create new comment (only if logged in)
router.post('/', (req, res) => {
    if (req.session) { //check for exisiting session, only allowing logged in users to comment 
        Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
    }
});

// update comment text by ID
router.put('/:id', (req, res) => {
    Comment.update(
        {
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No Comment found with that ID.'});
            return;
        }

        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//delete comment by ID 
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No Comment foudn with that ID.'});
            return;
        }

        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});



module.exports = router