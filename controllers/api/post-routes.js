const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote} = require("../../models")

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



module.exports = router;