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


//api endpoints
router.post('/create', ensureAuthenticated, controller.createPost);
router.get('/:id', controller.getPost);
router.put('/:id/update', ensureAuthenticated, controller.updatePost);

//page endpoints
router.get('/:id/edit', ensureAuthenticated, controller.editPost);


module.exports = router;