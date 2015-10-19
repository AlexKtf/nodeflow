var homeController = require('../app/controllers/homeController');
var usersController = require('../app/controllers/usersController');

module.exports = function (app) {
  app.get('/', homeController.home);
  app.get('/admin/login', usersController.login);
};
