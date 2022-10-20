const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote} = require("../../models")


//Create New User
router.post('/',async (req,res)=>{
    try {
        const userData = await User.create({
            trainer_name: req.body.trainer,
            email: req.body.email,
            password: req.body.password,  
        });

        req.session.save(() => {
            req.session.user_id=userData.id;
            req.session.trainer_name=userData.trainer_name;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }

});

//Login 
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log(dbUserData);
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;