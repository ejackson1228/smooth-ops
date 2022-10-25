const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, Team, Pokemon, User } = require("../../models");

//only test in imsomnia until front end is set up
router.post('/', async (req,res) => {
    try {
        const postData = Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
        res.json(postData);
        
    } catch (error) {
        res.json(error);
    }
});

//create new post 
router.post('/'), (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description,
        // pokemon_team: /* input reference to pokemon team creation */ ,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

//get all posts 
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'created_at',
            'pokemon_team',
            [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id'), 'vote_count'] //total votes on post
        ],
        order: ['created_at'],
        include: [
            {  //include team with pokemon under column "poke_team"
                model: Team,
                attributes: [
                    'id',
                ],
                include: {
                    model: Pokemon, //sql literal to try and include pokemon in "team" include
                    attributes: [sequelize.literal('(SELECT * FROM pokemon WHERE pokemon.pokemon_id = poke_1, poke_2, poke_3, poke_4, poke_5, poke_6'), 'poke_team']
                }
            },
            {
                model: Comment, 
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include: {
                    model: User, //comment creator 
                    attributes: ['trainer_name']
                }
            },
            {
                mode: User,  //post creator 
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
            'created_at',
            'pokemon_team',
            [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id'), 'vote_count'] //total votes on post
        ],
        include: [
            {  //include team with pokemon under column "poke_team"
                model: Team,
                attributes: [
                    'id',
                ],
                include: {
                    model: Pokemon, //sql literal to try and include pokemon in "team" include
                    attributes: [sequelize.literal('(SELECT * FROM pokemon WHERE pokemon.pokemon_id = poke_1, poke_2, poke_3, poke_4, poke_5, poke_6'), 'poke_team']
                }
            },
            {
                model: Comment, 
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include: {
                    model: User, //comment creator 
                    attributes: ['trainer_name']
                }
            },
            {
                mode: User,  //post creator 
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
router.put('/:id', (req, res) => {
    Post.update(
    {
        where: {
            id: req.params.id
        },
    },
    {

        title: req.body.title,
        description: req.body.description
    
    })
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


// TODO: add route to upvote on a post



module.exports = router;