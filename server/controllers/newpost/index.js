var express = require('express');
var router = express.Router();
var controller = require('./controller');

/* GET home page. */
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/')
}
router.get('/', ensureAuthenticated, controller.newpost);

module.exports = router;