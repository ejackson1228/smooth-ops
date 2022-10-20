//Post last 5 teams from any/all users upon login
//import our Pokemon Team model

const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote} = require("../models")
//GET last 5 Pokemon teams posted:  
router.get('/', async (req,res) => {
        res.render("homepage")
        //use pokemon team model to find last 5 teams created by any user
        //pass results to appropreat handlebars tem using res.render     

});

router.get('/login', async (req,res) => {
    res.render("login")
});

router.get('/signup', async (req,res) => {
    res.render("signup")
});

//Select pokemon Modal 
router.get('/select', async (req,res) => {

    //FETCH call to PokeApi  will be done on front end?
    // Render Pokemon Selector Modal
    
});

// Logged in User Teams 
router.get('/teams', async (req,res) => {

    // Get userId from req.session
    //use userId to get all teams for user from DB using pokemon team Model 
    
});


module.exports = router;




