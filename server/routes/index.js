var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var blogsController = require(_dir.DIR_CONTROLLERS + '/blogs');
var newPostController = require(_dir.DIR_CONTROLLERS + '/newpost');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		//app.use('/auth', authController);
		//app.use('/blogs', blogsController);
		app.use('/new_post', newPostController);
	}
};