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
router.get('/',  controller.newpost);
router.post('/save', controller.newpostSave); //ensureAuthenticated,

module.exports = router;