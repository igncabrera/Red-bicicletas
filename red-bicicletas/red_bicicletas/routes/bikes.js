var express = require('express');
var router = express.Router();
var bikeController = require('../controllers/bike');

router.get('/', bikeController.bike_list);

module.exports = router;
