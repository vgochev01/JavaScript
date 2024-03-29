const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const playController = require('../controllers/playController');

module.exports = (app) => {
    app.use('/', homeController); // mounting the router to '/'
    app.use('/auth', authController);
    app.use('/plays', playController);
};