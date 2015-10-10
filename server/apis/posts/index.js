var express = require('express');
var router = express.Router();
var controller = require('./api_controller');

/* GET home page. */
function ensureAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(403).json({message: "Access Denied"});
	}
	next();
}

router.get('/', controller.fetchPosts);
router.post('/create', ensureAuthenticated, controller.createPost);
router.get('/:id', controller.getPost);
router.put('/:id/update', controller.updatePost);

module.exports = router;