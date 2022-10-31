const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, Team, Pokemon, User, PokeTeam, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create new post 
router.post('/', (req, res) => {
    Post.create(
        { 
        id: req.body.id, 
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id /* user_id: req.session.user_id */ 
        }
    )
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});

//get all posts 
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'created_at'
            // [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id'), 'vote_count'] //iceboxed votes for now
        ],
        order: ['created_at'],
        include: [
            {  //include team with pokemon under column "poke_team"
                model: Team,
                include: [{
                    model: Pokemon,
                    through: PokeTeam // include pokemon in "team" 
                }]
            },
            {
                model: Comment, 
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include: [{
                    model: User, //comment creator 
                    attributes: ['trainer_name']
                }]
            },
            {
                model: User,  //post creator 
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//get single post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'created_at'
            // [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id'), 'vote_count'] //icebox votes for now 
        ],
        include: [
            {  
                model: Team,
                include: [
                    {
                        model: Pokemon,
                        through: PokeTeam
                    }
                ]
            },
            {
                model: Comment, 
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include: [{
                    model: User, //comment creator 
                    attributes: ['trainer_name']
                }]
            },
            {
                model: User,  //post creator 
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with that ID.'});
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


//edit post by id 
router.put('/:id', withAuth, (req, res) => {
    Post.update(
    {

        title: req.body.title,
        description: req.body.description
    
    },
    {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that ID.'});
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//delete post by id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData  => {
        if (!dbPostData)  {
            res.status(404).json({ message: 'No post found with that ID.'});
            return;
        }

        res.json(dbPostData, 'Success!');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// TODO: add route to upvote on a post // ICEBOXED



module.exports = router;