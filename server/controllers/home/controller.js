var React = require('react');

var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var home = require(_dir.DIR_COMPONENTS + '/home');

module.exports = {
	init: function(req, res, next) {
		var header_element = React.createElement(header, {user: req.user});
		var wrapper_element = React.createElement(wrapper, {child: home});
		return res.render('home', {title: 'Fodoo',
				markup: React.renderToString(wrapper_element),
				header: React.renderToString(header_element),
				tracking: req.tracking_element,
				user: req.user
			}
		)
	}
}