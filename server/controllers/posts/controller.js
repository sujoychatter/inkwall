var React = require('react');
var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var edit_post = require(_dir.DIR_COMPONENTS + '/edit_post');
var show_post = require(_dir.DIR_COMPONENTS + '/show_post');
var Article = require(_dir.DIR_MODELS + '/article');
var Comment = require(_dir.DIR_MODELS + '/comment');
var Base64 = require(_dir.DIR_REACT + '/helpers/base64');
var manifest = require(_dir.DIR_APP + '/rev-manifest.json');
var css_file_name_edit = manifest["edit-post.css"]
var css_file_name_show = manifest["show-post.css"]


/* GET users listing. */
module.exports = {
	editPost: function (req, res, next) {
		Article.find(Base64.decode(req.params.id.toString())).then(
			function(articles){
				var wrapper_element = React.createElement(wrapper, {child: edit_post, user: req.user, posts: articles, hideFooter: true});
				var data = {}
				if (req.user) {
					data.user = {name: req.user.name, id: req.user.id, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
				}
				data.posts = articles;
				data.posts_visibility = "SHOW_ONE";
				data.selected_post = articles[0];
				return res.render('new_post', {
					title: 'Inkwall : Edit Post',
					markup: React.renderToString(wrapper_element),
					tracking: req.tracking_element,
					page_data: "var inkwall_data = " + JSON.stringify(data) + "; var manifest = " + JSON.stringify(manifest),
					css_file_name: css_file_name_edit,
					main_file: manifest["main.js"],
					app_css: manifest["app.css"]
				});
			}
		)
	},
	showPost: function (show_comments, req, res, next){
		var filter = {active: true}
		preview = false
		if(req.params.id){
			filter["articles.id"] = Base64.decode(req.params.id.toString());
			preview=true
		}
		else if(req.params.name){
			filter.url = req.params.name;
			filter.published = true;
			filter.approved  = true;
		}
		Article.all().where(filter).then(
			function(articles){
				if(!articles.length){
					return res.status(404).send({error: "Not Found"})
				}
				return Comment.all({article_id: articles[0].id}).then(function(comments){
					var wrapper_element = React.createElement(wrapper, {child: show_post, user: req.user, posts: articles, preview: preview, comments: comments, showComments: show_comments});
					var data = {};
					if (req.user) {
						data.user = {id: req.user.id, name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email};
					}
					data.comments = comments;
					data.posts = articles;
					data.posts_visibility = "SHOW_ONE";
					data.selected_post = articles[0];
					return res.render('show_post', {
						title: 'Inkwall: ' + articles[0].title,
						markup: React.renderToString(wrapper_element),
						tracking: req.tracking_element,
						page_data: "var inkwall_data = " + JSON.stringify(data) + "; var manifest = " + JSON.stringify(manifest),
						css_file_name: css_file_name_show,
						main_file: manifest["main.js"],
						app_css: manifest["app.css"]
					});
				})
			}
		)
	}
};
