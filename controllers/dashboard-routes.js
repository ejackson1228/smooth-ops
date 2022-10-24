const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote} = require("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, async (req,res)=>{
    try {
        const userPostData = await Post.findOne({
            where:{user_id: req.session.user_id}
        })
    } catch (error) {
        
    }
})


module.exports = router;