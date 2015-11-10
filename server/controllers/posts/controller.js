var React = require('react');
var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var edit_post = require(_dir.DIR_COMPONENTS + '/edit_post');
var show_post = require(_dir.DIR_COMPONENTS + '/show_post');
var Article = require(_dir.DIR_MODELS + '/article');


/* GET users listing. */
module.exports = {
	editPost: function (req, res, next) {
		Article.find(req.params.id).then(
			function(articles){
				var wrapper_element = React.createElement(wrapper, {child: edit_post, user: req.user, posts: articles});
				var data = {}
				if (req.user) {
					data.user = {name: req.user.name, id: req.user.id, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
				}
				data.posts = articles;
				data.posts_visibility = "SHOW_ONE";
				data.selected_post = articles[0];
				return res.render('new_post', {
					title: 'Fodoo',
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var fodoo_data = " + JSON.stringify(data)
				});
			}
		)
	},

	showPreview: function (req, res, next){
		var filter = {active: true, "articles.id": req.params.id}
		Article.all().where(filter).then(
			function(articles){
				var wrapper_element = React.createElement(wrapper, {child: show_post, user: req.user, posts: articles});
				var data = {};
				if (req.user) {
					data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email};
				}
				data.posts = articles;
				data.posts_visibility = "SHOW_ONE";
				data.selected_post = articles[0];
				return res.render('show_post', {
					title: 'Fodoo: ' + articles[0].title,
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var fodoo_data = " + JSON.stringify(data)
				});
			}
		)
	},
	showPost: function (req, res, next){
		Article.updateCount(req.params.name).then(
			function(articles){
				var wrapper_element = React.createElement(wrapper, {child: show_post, user: req.user, posts: articles});
				var data = {};
				if (req.user) {
					data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email};
				}
				data.posts = articles;
				data.posts_visibility = "SHOW_ONE";
				data.selected_post = articles[0];
				return res.render('show_post', {
					title: 'Fodoo: ' + articles[0].title,
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var fodoo_data = " + JSON.stringify(data)
				});
			}
		)
	}
};
