var React = require('react');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var myPosts = require(_dir.DIR_COMPONENTS + '/profile');
var Article = require(_dir.DIR_MODELS + '/article');
var User = require(_dir.DIR_MODELS + '/user'); 

/* GET users listing. */
module.exports = {
	show_profile: function (req, res) {
		var query, profile_id = parseInt(req.params.profile_id);
		if(!profile_id){
			res.redirect('/')
		}
		if(req.user && req.user.admin && req.user.id == profile_id){
			query = {}
		}else{
			query = {user_id: req.params.profile_id}
		}
		var data = {}
		function sendResponse(data){
			var wrapper_element = React.createElement(wrapper, {child: myPosts, posts: data.posts , user: data.user, profile_user: data.profile_user});
			return res.render('profile', {
				title: 'Fodoo',
				markup: React.renderToString(wrapper_element),
				tracking: req.tracking_element,
				page_data: "var fodoo_data = " + JSON.stringify(data)
			});
		}
		Article.all(query).then(function(posts){
			data.posts = posts;
			if (req.user) {
				data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
			}
			data.posts_visibility = "SHOW_MY";
			if(req.user && profile_id == req.user.id){
				data.profile_id = data.user.id
				data.profile_user = data.user;
				return sendResponse(data)
			}
			return User.find(profile_id, req.user)
		}).then(function(profile_user){
			data.profile_user = profile_user[0];
			data.profile_id = profile_id;
			return  sendResponse(data)
		});
	},
	preview: function (req, res, next) {
		next();
	}
};
