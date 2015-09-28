var express = require('express');
var router = express.Router();

var React = require('react');

var header = require('../public/react/components/header');
var footer = require('../public/react/components/footer');
var wrapper =require('../public/react/wrapper');
var index = require('../public/react/components/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	var factory_header = React.createFactory(header);
	var factory_footer = React.createFactory(footer);
	var wrapper_element = React.createElement(wrapper, {child: index});
	res.render('index', {title: 'Fodoo', markup: React.renderToString(wrapper_element), header: React.renderToString(factory_header()), tracking: req.tracking_element});
});

module.exports = router;
