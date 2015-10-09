var homeController = require(_dir.DIR_CONTROLLERS + '/home');
var authController = require(_dir.DIR_CONTROLLERS + '/auth');
var myPostsController = require(_dir.DIR_CONTROLLERS + '/myposts');
var newPostController = require(_dir.DIR_CONTROLLERS + '/newpost');
module.exports = {
	init: function(app){
		app.use('/', homeController);
		//app.use('/auth', authController);
		app.use('/my-posts', myPostsController);
		app.use('/new_post', newPostController);
	}
};