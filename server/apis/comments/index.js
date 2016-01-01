var express = require('express');
var router = express.Router();
var controller = require('./controller');

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}

router.post('/', ensureAuthenticated, controller.saveComment);

module.exports = router;