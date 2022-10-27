const { Team } = require('../../models');
const router = require('express').Router();

router.post('/', (req, res) => {
    Team.create({
        id: req.body.id, // create id manually through a uuid
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbTeamData => res.json(dbTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
