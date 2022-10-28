const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const teamRoutes = require('./team-routes');
const poketeamRoutes = require('./poketeam-routes');

router.use('/users', userRoutes);
router.use('/posts',postRoutes);
router.use('/comments', commentRoutes);
router.use('./teams', teamRoutes);
router.use('./poketeams', poketeamRoutes);

module.exports = router;