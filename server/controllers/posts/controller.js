var React = require('react');
var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var edit_post = require(_dir.DIR_COMPONENTS + '/edit_post');
var Article = require(_dir.DIR_MODELS + '/article');


/* GET users listing. */
module.exports = {
	editPost: function (req, res, next) {
		var wrapper_element = React.createElement(wrapper, {child: edit_post, user: req.user, data: req.params.id});
		var data = {}
		if (req.user) {
			data.user = {name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
		}
		return res.render('new_post', {
			title: 'Fodoo',
			markup: React.renderToString(wrapper_element),
			tracking: req.tracking_element,
			page_data: "var fodoo_data = " + JSON.stringify(data)
		});
	}
};
