var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var profileController = require(_dir.DIR_CONTROLLERS + '/profile');
var postsController = require(_dir.DIR_CONTROLLERS + '/posts');
var apiCommentsController = require(_dir.DIR_APIS + '/comments');
var apiPostsController = require(_dir.DIR_APIS + '/posts');
var apiProfileController = require(_dir.DIR_APIS + '/profile');
var apiUserController = require(_dir.DIR_APIS + '/users');
module.exports = {
	init: function(app){
		//APIS
		app.use('/api/posts', apiPostsController);
		app.use('/api/profile', apiProfileController);
		app.use('/api/users', apiUserController);
		app.use('/api/comments', apiCommentsController);

		// Frontent
		app.use('/', homeController);
		app.use('/profile', profileController);
		app.use('/posts', postsController);
	}
};