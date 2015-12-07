var React = require('react');

var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var home = require(_dir.DIR_COMPONENTS + '/home');
var Article = require(_dir.DIR_MODELS + '/article');
var manifest = require(_dir.DIR_APP + '/rev-manifest.json');
var css_file_name = manifest["home.css"]

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
					title: 'Inkwall : Blogs for everyone',
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var inkwall_data = " + JSON.stringify(data) + "; var manifest = " + JSON.stringify(manifest),
					css_file_name: css_file_name,
					main_file: manifest["main.js"]
			})
		})
	}
}