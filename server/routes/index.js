var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var myPostsController = require(_dir.DIR_CONTROLLERS + '/myposts');
var postsController = require(_dir.DIR_CONTROLLERS + '/posts');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		app.use('/my-posts', myPostsController);
		app.use('/posts', postsController);
	}
};