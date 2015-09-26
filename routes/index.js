var express = require('express');
var router = express.Router();

var React = require('react');
var hello = require('../public/react/components/HelloWorld')

/* GET home page. */
router.get('/', function(req, res, next) {
	var factory = React.createFactory(hello);
  res.render('index', {title: 'Fodoo', markup: React.renderToString(factory())});
});

module.exports = router;
