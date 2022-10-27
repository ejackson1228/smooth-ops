const { PokeTeam } = require('../../models');
const router = require('express').Router();

router.post('/', (req, res) => {
    PokeTeam.create({
        id: req.body.id, //create id manually throught uuid
        team_id: req.body.team_id,
        pokemon_id: req.body.pokemon_id
    })
    .then(dbPokeTeamData  => res.json(dbPokeTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;