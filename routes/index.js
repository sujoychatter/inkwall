var express = require('express');
var router = express.Router();

var React = require('react');
var hello = require('../public/react/components/HelloWorld');
var index = require('../public/react/components/index');
var header = require('../public/react/components/header');
var footer = require('../public/react/components/footer');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (process.env.NODE_ENV == "production"){
		var tracking_element = "<script src='/tracking.js' type='text/javascript'></script>"
	}
	var factory_index = React.createFactory(index);
	var factory_header = React.createFactory(header);
	var factory_footer = React.createFactory(footer);
	console.log();
  res.render('index', {title: 'Fodoo', markup: React.renderToString(factory_index()),header: React.renderToString(factory_header()), tracking: tracking_element});
});

module.exports = router;
