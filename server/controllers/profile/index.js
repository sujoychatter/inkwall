var express = require('express');
var router = express.Router();
var controller = require('./controller');

/* GET home page. */
router.get('/:profile_user_id', controller.show_profile);

module.exports = router;