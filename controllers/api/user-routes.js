const router = require("express").Router();
const { User, Post, Comment, Pokemon, Vote} = require("../../models")

//FOR TESTING ONLY
// router.get("/",(req,res)=>{
//   User.findAll({include:[Post,Pokemon]}).then(function(userData){res.json(userData)})
// });
//Remove before deployment




//Create New User Tested in imsomnia it works 
router.post('/',async (req,res)=>{
    try {
        const userData = await User.create({
            trainer_name: req.body.trainer_name,
            email: req.body.email,
            password: req.body.password,  
        });

        req.session.save(() => {
            req.session.user_id=userData.id;
            req.session.trainer_name=userData.trainer_name;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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
        req.session.user_id=dbUserData.id;
        req.session.trainer_name=dbUserData.trainer_name;
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

//logout to terminate session
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});


// find all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']}
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


//get single user by ID
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['password']}
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with that ID'})
      return
    }

    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


//update existing user info by id
router.put('/:id', (req, res) => {
  User.update(req.body, { //req.body should contain username and password
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No User found with that ID.'})
      return;
    }

    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


//delete user by id
router.delete('/:id', (req, res) => [
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData  => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with that ID'})
      return;
    }

    res.json({ user: dbUserData, message: 'success'});
  })
  .catch(err  => {
    console.log(err);
    res.status(500).json(err);
  })
]);



module.exports = router;