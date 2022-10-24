const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');


router.use('/', homeRoutes);
//for signed in users
router.use('/profile',dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

