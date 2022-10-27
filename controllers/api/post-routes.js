const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, Team, Pokemon, User, PokeTeam, Comment } = require("../../models");

//only test in imsomnia until front end is set up
// router.post('/', async (req,res) => {
//     try {
//         const postData = Post.create({
//             title: req.body.title,
//             description: req.body.description,
//             user_id: req.session.user_id
//         });
//         res.json(postData);
        
//     } catch (error) {
//         res.json(error);
//     }
// });

//create new post 
router.post('/'), (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    //TODO: add capability to create new team/poketeam from create post 
    // this can either be done by expanding on this route or possibly creating a new route and linking both routes to the create post page that will be created
};

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


// TODO: add route to upvote on a post // ICEBOXED



module.exports = router;