var React = require('react');
var header = require(_dir.DIR_COMPONENTS + '/header');
var footer = require(_dir.DIR_COMPONENTS + '/footer');
var wrapper = require(_dir.DIR_REACT + '/wrapper');
var new_post = require(_dir.DIR_COMPONENTS + '/new_post');
var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[process.env.NODE_ENV]);

/* GET users listing. */
module.exports = {
	newpost: function (req, res, next) {
		var wrapper_element = React.createElement(wrapper, {child: new_post, user: req.user});
		var data = {}
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
	newpostSave: function(req, res, next){
		console.log(req.body);
		console.log(knex);
		res.end("yes");
	},
	preview: function (req, res, next) {
		next();
	}
};
