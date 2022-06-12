var express = require('express');
const { route } = require('..');
var router = express.Router();
var bikeController = require('../../controllers/api/bikeControllerAPI');

router.get('/', bikeController.bike_list);
router.post('/create', bikeController.bike_create);
router.delete('/delete', bikeController.bike_delete);
router.post('/update',bikeController.bike_update);

module.exports = router;