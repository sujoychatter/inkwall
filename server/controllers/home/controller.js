var React = require('react');

var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var home = require(_dir.DIR_COMPONENTS + '/home');

module.exports = {
	init: function(req, res, next) {
		var wrapper_element = React.createElement(wrapper, {child: home, user: req.user});
		var data = {}
		if(req.user){
			data.user = {name: req.user.name, admin: req.user.admin, photo: req.user.photo, email: req.user.email}
		}
		return res.render('home', {title: 'Fodoo',
				markup: React.renderToString(wrapper_element),
				tracking: req.tracking_element,
				page_data: "var fodoo_data = " + JSON.stringify(data)
			}
		)
	}
}