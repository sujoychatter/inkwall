var express = require('express');
var router = express.Router();
var controller = require('./controller');
var Article = require(_dir.DIR_MODELS + '/article');

/* GET home page. */
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}
router.get('/', ensureAuthenticated, controller.newpost);
router.post('/save', ensureAuthenticated, Article.save, controller.newpostSave);

module.exports = router;