var express = require('express');
var router = express.Router();
var controller = require('./controller');

/* GET home page. */
router.put('/:profile_id', controller.update);
router.get('/:profile_id', controller.find);

module.exports = router;