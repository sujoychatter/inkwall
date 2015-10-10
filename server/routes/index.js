var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var myPostsController = require(_dir.DIR_CONTROLLERS + '/myposts');
var postsController = require(_dir.DIR_CONTROLLERS + '/posts');
var apiPostsController = require(_dir.DIR_APIS + '/posts');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		app.use('/my-posts', myPostsController);
		app.use('/posts', postsController);

		//APIS
		app.use('/api/posts', apiPostsController);
	}
};