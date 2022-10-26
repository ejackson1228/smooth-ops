const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote, Team, PokeTeam} = require("../models");
const withAuth = require("../utils/auth");


//render homepage with logged in user's posts
router.get('/', withAuth, async (req,res)=>{
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'description', 'created_at'],
        include: [
            {
                model: Team,
                include: [{
                    model: Pokemon,
                    through: PokeTeam
                }]
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include: [{
                    model: User,
                    attributes: ['trainer_name']
                }]
            },
            {
                model: User,
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true })); //map each post to display as seperate entity 
        res.render('dashboard', { 
            posts,
            loggedIn: true // only render the page if a user is logged in 
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// TODO: add route to edit user's posts and render edit-post page with post to be edited
//route to edit user's post by rendering edit-post page with user authentication 
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'description', 'created_at'],
        include: [
            {
                model: Team,
                include: {
                    model: Pokemon,
                    through: PokeTeam
                }
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'user_id', 'created_at'],
                include:  {
                    model: User,
                    attributes: ['trainer_name']
                }
            },
            {
                model: User,
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostdata => {
        if (!dbPostdata) {
            res.status(404).json({ message: 'No Post found with that ID.'})
            return;
        }

        const post = dbPostdata.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        re.status(500).json(err);
    })
});

module.exports = router;