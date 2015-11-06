var express = require('express');
var router = express.Router();
var controller = require('./controller');


/* GET home page. */
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}

//page endpoints
router.get('/:id/edit', ensureAuthenticated, controller.editPost);
router.get('/:name', controller.showPost);


module.exports = router;