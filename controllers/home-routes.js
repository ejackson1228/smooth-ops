
const { Router } = require("express");
const router = require("express").Router();
const {User, Team, Post, Comment, Vote, Pokemon} = require("../models");

//route for homepage
router.get('/', async(req,res)=>[
        res.render("homepage")
]);




module.exports = router;