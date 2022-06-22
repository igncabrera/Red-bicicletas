var express = require('express');
var router = express.Router();
var userController = require('../../controllers/api/userControllerAPI');

router.get('/', userController.user_list);
router.post('/create', userController.users_create);
router.post('/book', userController.users_book);

module.exports = router; 