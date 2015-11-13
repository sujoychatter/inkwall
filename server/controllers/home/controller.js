var React = require('react');

var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var home = require(_dir.DIR_COMPONENTS + '/home');
var Article = require(_dir.DIR_MODELS + '/article');

module.exports = {
	init: function (req, res, next) {
		Article.all({approved: true, published: true}).then(function(posts){
			var wrapper_element = React.createElement(wrapper, {child: home, user: req.user, posts: posts});
			var data = {};
			if (req.user) {
				data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
			}
			data.posts = posts;
			data.posts_visibility = "SHOW_ALL_APPROVED";
			return res.render('home', {
					title: 'Fodoo : Blogs for everyone',
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var fodoo_data = " + JSON.stringify(data)
			})
		})
	}
}