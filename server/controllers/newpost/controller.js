var React = require('react');
var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var new_post = require(_dir.DIR_COMPONENTS + '/new_post');

/* GET users listing. */
module.exports = {
	newpost: function(req, res, next) {
		var header_element = React.createElement(header, {user: req.user});
		var wrapper_element = React.createElement(wrapper, {child: new_post});
		return res.render('new_post', {title: 'Fodoo',
			markup: React.renderToString(wrapper_element),
			header: React.renderToString(header_element),
			tracking: req.tracking_element,
			user: req.user
		});
	},
	preview: function(req, res, next){
		next();
	}
};
