var React = require('react');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var myPosts = require(_dir.DIR_COMPONENTS + '/profile');
var Article = require(_dir.DIR_MODELS + '/article');

/* GET users listing. */
module.exports = {
	show_profile: function (req, res) {
		Article.all({user_id: req.params.profile_id}).then(function(posts){
			var data = {};
			var wrapper_element = React.createElement(wrapper, {child: myPosts, posts: posts , user: req.user});
			data.posts = posts;
			if (req.user) {
				data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
			}
			data.posts_visibility = "SHOW_MY";
			return res.render('profile', {
				title: 'Fodoo',
				markup: React.renderToString(wrapper_element),
				tracking: req.tracking_element,
				page_data: "var fodoo_data = " + JSON.stringify(data)
			});
		});
	},
	preview: function (req, res, next) {
		next();
	}
};
