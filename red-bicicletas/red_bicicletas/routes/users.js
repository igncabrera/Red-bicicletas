var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');

router.get('/', userController.listUsers);
router.get('/new', userController.newUser);
router.post('/create', userController.createUser);
router.get('/:id/edit', userController.editUser);
router.post('/:id/delete', userController.deleteUser);
router.post('/:id/update', userController.updateUser);



module.exports = router;
