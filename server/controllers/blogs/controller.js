var React = require('react');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var blogs = require(_dir.DIR_COMPONENTS + '/blogs');

/* GET users listing. */
module.exports = {
	myposts: function (req, res, next) {
		var wrapper_element = React.createElement(wrapper, {child: blogs, store: {}, user: req.user, store: {}});
		var data = {};
		if (req.user) {
			data.user = {name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
		}
		;
		return res.render('new_post', {
			title: 'Fodoo',
			markup: React.renderToString(wrapper_element),
			tracking: req.tracking_element,
			page_data: "var fodoo_data = " + JSON.stringify(data)
		});
	},
	preview: function (req, res, next) {
		next();
	}
};
