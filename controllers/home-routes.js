//Post last 5 teams from any/all users upon login
//import our Pokemon Team model

const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote, Team, PokeTeam} = require("../models")
//GET last 5 Pokemon teams posted:  
//for sake of MVP, let's fetch all posts from all users and work on limiting the amount later  <<<<<<
router.get('/', (req,res) => {
    Post.findAll({
        attributes: ['id', 'title', 'description', 'created_at'],
        order: ['created_at'],
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
                include: [
                    {
                        model: User,
                        attributes: ['trainer_name']
                    }
                ]
            },
            {
                model: User,
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true})) // map each post to display as separate entity
        res.render('homepage', { //named as homepage, change if needed to match handlebars file names 
            posts, 
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}); 

router.get('/login', async (req,res) => {
    res.render("login")
});

router.get('/signup', async (req,res) => {
    res.render("signup")
});

router.get('/logout', (req, res) => {

})


//FETCH call to PokeApi  will be done on front end?
// fetch from pokemon table for options, rendering the pokemon sepcific data won't come until we have to display a team on a post
//Select pokemon Modal 
router.get('/select', async (req,res) => {
    Pokemon.findAll({
        attributes: ['name', 'url'],
        order: ['name']
    })
    .then(dbPokemonData => {
        const pokemon = dbPokemonData.map(pokemon  => pokemon.get({ plain: true }))
        res.render('modal', { // <<<<<<< change the name of the render to whatever the modal file is 
            pokemon, // Render Pokemon Selector Modal ^
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Logged in User Teams 
router.get('/teams', async (req,res) => {
    Team.findAll({
        where: {
            user_id: req.session.user_id // only find teams created by the logged in user
        },
        attributes: ['id', 'user_id'],
        include: [ // include the pokemon that make up the team 
            {
                model: Pokemon,
                through: PokeTeam
            }
        ]
    })
    .then(dbTeamData => {
        const teams = dbTeamData.map(team  => team.get({plain: true}))
        res.render('userTeams', {
            teams,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'description', 'user_id', 'created_at'],
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
                attributes: ['id', 'text', 'user_id', 'post_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['trainer_name']
                    }
                ]
            },
            {
                model: User,
                attributes: ['trainer_name']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with that ID.'})
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});



module.exports = router;




