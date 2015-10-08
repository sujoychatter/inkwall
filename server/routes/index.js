var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var blogsController = require(_dir.DIR_CONTROLLERS + '/blogs');
var postsController = require(_dir.DIR_CONTROLLERS + '/posts');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		app.use('/blogs', blogsController);
		app.use('/posts', postsController);
	}
};