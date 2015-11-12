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

router.post('/create', ensureAuthenticated, controller.createPost);
router.get('/my', ensureAuthenticated, controller.getMyPosts);
router.get('/by_name', controller.getPostsByName);
router.get('/:id', controller.getPost);
router.get('/', controller.getPosts);
router.put('/:id/update', ensureAuthenticated, controller.updatePost);

module.exports = router;