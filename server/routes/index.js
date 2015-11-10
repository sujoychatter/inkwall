var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var profileController = require(_dir.DIR_CONTROLLERS + '/profile');
var postsController = require(_dir.DIR_CONTROLLERS + '/posts');
var apiPostsController = require(_dir.DIR_APIS + '/posts');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		app.use('/profile', profileController);
		app.use('/posts', postsController);

		//APIS
		app.use('/api/posts', apiPostsController);
	}
};