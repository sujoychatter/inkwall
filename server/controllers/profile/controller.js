var React = require('react');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var myPosts = require(_dir.DIR_COMPONENTS + '/profile');
var Article = require(_dir.DIR_MODELS + '/article');
var User = require(_dir.DIR_MODELS + '/user'); 

/* GET users listing. */
module.exports = {
	show_profile: function (req, res) {
		var query, profile_user_id = parseInt(req.params.profile_user_id);
		if(!profile_user_id){
			res.redirect('/')
		}
		if(req.user && req.user.admin && req.user.id == profile_user_id){
			query = {published: true}
		}else if(req.user && req.user.id == profile_user_id){
			query = {user_id: profile_user_id}
		}else{
			query = {user_id: profile_user_id, approved: true}
		}
		var data = {}
		return Article.all(query).then(function(posts){
			data.posts = posts;
			if (req.user) {
				data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
			}
			data.posts_visibility = "SHOW_PROFILE";
			return User.find(profile_user_id, req.user)
		}).then(function(profile_user){
			data.profile_user = profile_user[0];
			data.profile_user_id = profile_user_id;
			var wrapper_element = React.createElement(wrapper, {child: myPosts, posts: data.posts , user: data.user, profile_user: data.profile_user});
			return res.render('profile', {
				title: data.profile_user.name + " | Inkwall",
				markup: React.renderToString(wrapper_element),
				tracking: req.tracking_element,
				page_data: "var inkwall_data = " + JSON.stringify(data)
			});
		});
	},
	preview: function (req, res, next) {
		next();
	}
};
